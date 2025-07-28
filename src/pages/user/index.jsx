import React, { useEffect, useState } from "react";
import bgImage from "../../assets/images/bgIMage.webp";
import ImageUpload from "../../components/common/ImageUpload";
import CustomInput from "../../components/ui/customInput";
import { useParams } from "react-router-dom";
import { api } from "../../API/const";
import CustomTextarea from "../../components/ui/customTextarea";
import Loader from "../../components/common/Loader";
import CustomAlert from "../../components/ui/customAlert";
import { useDispatch, useSelector } from "react-redux";

const UserDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [images, setImages] = useState([]);
  const [coverIndex, setCoverIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user_id } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    user_id: "",
    user_name: "",
    first_name: "",
    email: "",
    about: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: false });
  };
  const [notif, setNotif] = useState({
    open: false,
    type: "success", // "error" da ola bilər
    message: "",
  });
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await api(`/api/users/${params.id}/`, {
          method: "GET",
        });
        setFormData({
          user_id: data.data?.user.id,
          user_name: data.data?.user.user_name,
          first_name: data.data?.user.first_name,
          email: data.data?.user.email,
          about: data.data?.user.about,
        });
        setImages(data?.data.user?.profilePic);
      } catch (error) {
        setLoading(false);
        console.log("Failed to fetch blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    payload.append("user_id", formData.user_id);
    payload.append("user_name", formData.user_name);
    payload.append("first_name", formData.first_name);
    payload.append("email", formData.email);
    payload.append("about", formData.about);
    //   payload.append("team", formData.team);

    // Əgər şəkillər array-dirsə:
    if (images[0] instanceof File) {
      payload.append("profilePic", images[0]);
    }

    try {
      setLoading(true);

      const res = await api("/api/user/update/", {
        method: "PATCH",
        body: payload,
      });
      if (res.ok) {
        setNotif({
          open: true,
          type: "success",
          message: "Profile Successfully Updated!",
        });
        // dispatch(updateUserInfo(res.data.user));
        fetchBlogs();
      }
    } catch (err) {
      if (err) {
        setLoading(false);

        setNotif({
          open: true,
          type: "error",
          message:
            result?.details?.email?.[0] ||
            result?.details?.user_name?.[0] ||
            result?.error ||
            "Something went wrong!",
        });
      }
      console.error("Failed:", err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="bg-cover bg-center min-h-screen "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Loader loader={loading} />
      <div class="flex justify-center items-center min-h-screen ">
        <div
          className="p-6 rounded-2xl bg-white container"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.917)", // açıq ağ, şəffaf
            backdropFilter: "blur(10px)", // arxa plan bulanıqlaşma effekti
            WebkitBackdropFilter: "blur(10px)", // Safari üçün
            boxShadow: "none",
          }}
        >
          <div>
            <p className=" mb-2">User Image</p>
            <ImageUpload
              images={images}
              onChange={setImages}
              coverIndex={coverIndex}
              onCoverChange={setCoverIndex}
              multiple={false}
            />
          </div>
          <div className="mt-4">
            <CustomInput
              value={formData.user_name}
              onChange={handleChange("user_name")}
              label={"User Name"}
              width="100%"
              height="40px"
            />
          </div>
          <div className="mt-4">
            <CustomInput
              value={formData.first_name}
              onChange={handleChange("first_name")}
              label={"First Name"}
              width="100%"
              height="40px"
            />
          </div>
          <div className="mt-4">
            <CustomInput
              value={formData.email}
              onChange={handleChange("email")}
              label={"Email"}
              width="100%"
              height="40px"
            />
          </div>

          <div className="mt-4">
            <CustomTextarea
              value={formData.about}
              onChange={handleChange("about")}
              label={"About"}
              width="100%"
              height="200px"
              backgroundColor="transparent"
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <button
              onClick={handleSubmit}
              className="bg-yellow-400 text-blue-900 px-3 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <CustomAlert
        open={notif.open}
        type={notif.type}
        message={notif.message}
        onClose={() => setNotif((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default UserDetail;
