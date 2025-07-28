import React, { useEffect, useState } from "react";
import CustomCard from "../../../components/ui/customCard";
import bgImage from "../../../assets/images/bgIMage.webp";
import { FiPlus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import CustomInput from "../../../components/ui/customInput";
import ImageUpload from "../../../components/common/ImageUpload";
import CustomTextarea from "../../../components/ui/customTextarea";
import CustomAlert from "../../../components/ui/customAlert";
import Loader from "../../../components/common/Loader";
import { api } from "../../../API/const";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../API/userService";
import { login } from "../../../redux/userSlice";

const UpdateTeam = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const params = useParams();

  const [coverIndex, setCoverIndex] = useState(null);
  const { user_id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    about: "",
    team_name: "",
  });
  const [notif, setNotif] = useState({
    open: false,
    type: "success", // "error" da ola bilər
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: false });
  };
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await api(`/api/teams/${params.id}/`, {
          method: "GET",
        });

        setFormData({
          team_name: data.data?.team_name,
          about: data.data?.about,
        });
        setImages(data?.data?.team_logo);
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
    const payload = new FormData();

    payload.append("team_name", formData.team_name);
    payload.append("about", formData.about);
    //   payload.append("team", formData.team);

    // Əgər şəkillər array-dirsə:
    if (images[0] instanceof File) {
      payload.append("team_logo", images[0]);
    }
    try {
      setLoading(true);
      const res = await api(`/api/teams/${params.id}/update/`, {
        method: "PATCH",
        body: payload,
      });
      if (res.status === 200) {
        setNotif({
          open: true,
          type: "success",
          message: "Team Successfully Updated!",
        });
        const userData = await fetchUserData(user_id);
        dispatch(login(userData));

        // navigate("/teams");
      }
    } catch (err) {
      setLoading(false);
      if (err) {
        setNotif({
          open: true,
          type: "error",
          message: "res.message" || "Something went wrong!",
        });
      }
      console.error("Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Loader loader={loading} />

      <div class="flex justify-center items-center min-h-screen p-10 container mx-auto">
        <div className="p-6 rounded-2xl bg-white/80  w-full">
          <h2 className="text-4xl font-semibold text-[#002975]">Update Team</h2>
          <div className="border border-gray-[#002975] p-2 rounded-xl mt-4">
            <p className="mb-1">Upload team images</p>
            <ImageUpload
              images={images}
              onChange={setImages}
              coverIndex={coverIndex}
              onCoverChange={setCoverIndex}
              multiple={false}
            />
            <div className="mt-4 mb-4">
              <CustomInput
                value={formData.team_name}
                onChange={handleChange("team_name")}
                label={"Team Name"}
                width="100%"
                height="40px"
                error={errors.team_name}
                helperText={errors.team_name && "Fill in all fields!"}
              />
            </div>
            <div>
              <CustomTextarea
                value={formData.about}
                onChange={handleChange("about")}
                label={"About"}
                width="100%"
                height="200px"
                backgroundColor="transparent"
                error={errors.about}
                helperText={errors.about && "Fill in all fields!"}
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
          <CustomAlert
            open={notif.open}
            type={notif.type}
            message={notif.message}
            onClose={() => setNotif((prev) => ({ ...prev, open: false }))}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateTeam;
