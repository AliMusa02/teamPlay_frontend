import { Link } from "react-router-dom";
import CustomInput from "../../components/ui/customInput";
import Image from "../../assets/images/footballer.png"; // Replace with the actual path to your image
import { useState } from "react";
import { API_URL } from "../../API/const";
import Loader from "../../components/common/Loader";
import CustomAlert from "../../components/ui/customAlert";

const Register = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    first_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
  });
  const [loading, setLoading] = useState(false);

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
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setLoading(true);

      const formPayload = new FormData();
      formPayload.append("user_name", formData.user_name);
      formPayload.append("first_name", formData.first_name);
      formPayload.append("email", formData.email);
      formPayload.append("password", formData.password);
      formPayload.append("about", formData.about);

      // if (images.length > 0 && images[0]) {
      //   formPayload.append("profilePic", images[0]); // must be File object
      // }

      const response = await fetch(`${API_URL}/api/user/register/`, {
        method: "POST",
        body: formPayload,
      });

      // const response = await fetch(`${API_URL}api/user/register/`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     user_name: formData.user_name,
      //     first_name: formData.first_name,
      //     email: formData.email,
      //     password: formData.password,
      //     about: formData.about,
      //     profilePic: images[0].name,
      //   }),
      // });

      const result = await response.json();

      if (response.ok) {
        setNotif({
          open: true,
          type: "success",
          message: "Account Successfully Created!",
        });
        setFormData({
          user_name: "",
          first_name: "",
          email: "",
          password: "",
          about: "",
        });
        // setImages([]);
        // setCoverIndex(null);
      }

      if (!response.ok) {
        const firstError =
          result?.details?.email?.[0] ||
          result?.details?.user_name?.[0] ||
          result?.details?.password?.[0] ||
          result?.error ||
          "Something went wrong!";

        setNotif({
          open: true,
          type: "error",
          message: firstError,
        });
        return;
      }
    } catch (error) {
      console.error("Unexpected error:", error.details);
      setNotif({
        open: true,
        type: "error",
        message: error.details,
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
            <span className="text-blue-700">TeamPlay</span>
          </h1>
          <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">
            Welcome back, please sign in using your TeamPlay ID
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-600">User Name</label>
              <CustomInput
                value={formData.user_name}
                onChange={handleChange("user_name")}
                error={errors.user_name}
                helperText={errors.user_name && "Fill in all fields!"}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">First Name</label>
              <CustomInput
                value={formData.first_name}
                onChange={handleChange("first_name")}
                error={errors.first_name}
                helperText={errors.first_name && "Fill in all fields!"}
              />
            </div>
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
              <label className="block text-sm text-gray-600">About</label>
              <CustomInput
                value={formData.about}
                onChange={handleChange("about")}
                error={errors.about}
                helperText={errors.about && "Fill in all fields!"}
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
            <div>
              <label className="block text-sm text-gray-600">
                Confirm Password
              </label>
              <CustomInput
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange("confirmPassword")}
                error={errors.confirmPassword}
                helperText={
                  errors.confirmPassword == "Passwords do not match!"
                    ? "Passwords do not match!"
                    : errors.confirmPassword && "Fill in all fields!"
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 transition"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already a member?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
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
