import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/ui/customInput";
import Image from "../../assets/images/footballer.png"; // Replace with the actual path to your image
import { useState } from "react";
import { API_URL } from "../../API/const";
import Loader from "../../components/common/Loader";
import CustomAlert from "../../components/ui/customAlert";
import { useDispatch } from "react-redux";





const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [notif, setNotif] = useState({
    open: false,
    type: "success", // "error" da ola bilər
    message: "",
  });



  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = true;
      }
    });


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/token/get/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        // setNotif({
        //   open: true,
        //   type: "success",
        //   message: "Login Successful!",
        // });
        setFormData({
          email: "",
          password: "",
        });
        const decodeJwt = (token) => {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.exp * 1000; // JWT `exp` saniyədir, onu millisekundla vururuq
          } catch (error) {
            return null;
          }
        };

        const token = result.access;
        const refreshToken = result.refresh;

        // const decodedUser = jwtDecode(token);

        // dispatch(login({
        //   user: decodedUser, // or decodeJwt(token) if your API doesn't return user info
        //   token: token,
        // }));

        // Əlavə et: token expiration-u localStorage-a yaz
        const expiration = decodeJwt(token);
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiration", expiration.toString());
        localStorage.setItem("refreshToken", refreshToken);
        setTimeout(() => {
          navigate("/");
        }, 1000); // 1 saniyə sonra yönləndir
      }
      if (!response.ok) {
        throw result; // result içində error detallar var
      }

      // qeydiyyat uğurlu oldu
    } catch (error) {
      setNotif({
        open: true,
        type: "error",
        message: error?.detail?.email?.[0] || error?.detail || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };
  return !loading ? (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#0019a9] px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-2xl rounded-lg overflow-hidden bg-white md:bg-transparent">
        {/* Left Panel */}
        <div className="w-full md:w-2/5 bg-white flex flex-col justify-center px-8 sm:px-12 py-12 md:rounded-bl-[50px]">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            <span className="text-gray-500 font-medium">We are </span>
            <span className="text-blue-700">AliTeam</span>
          </h1>
          <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">
            Welcome back, please sign in using your AliTeam ID
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-600">
                Email Address
              </label>
              <CustomInput
                value={formData.email}
                onChange={handleChange("email")}
                type="email"
                error={errors.email}
                helperText={errors.email && "Fill in all fields!"}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Password</label>
              <CustomInput
                type="password"
                value={formData.password}
                onChange={handleChange("password")}
                error={errors.password}
                helperText={errors.password && "Fill in all fields!"}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 transition"
            >
              Log in
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Not a member yet?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        {/* Right Panel */}
        <div className="hidden md:block w-full md:w-3/5 relative bg-white/10 backdrop-blur-3xl md:rounded-tr-[50px]">
          <img
            src={Image}
            alt="football player"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <CustomAlert
        open={notif.open}
        type={notif.type}
        message={notif.message}
        onClose={() => setNotif((prev) => ({ ...prev, open: false }))}
      />
    </div>
  ) : (
    <div>
      <Loader loader={loading} />
    </div>
  );
};

export default Register;
