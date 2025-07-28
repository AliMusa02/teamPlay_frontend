import React, { useState } from "react";
import CustomCard from "../../../components/ui/customCard";
import bgImage from "../../../assets/images/bgIMage.webp";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../components/ui/customInput";
import ImageUpload from "../../../components/common/ImageUpload";
import "./createBlog.css";
import { api } from "../../../API/const";
import CustomAlert from "../../../components/ui/customAlert";
import CustomTextarea from "../../../components/ui/customTextarea";

const CreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [coverIndex, setCoverIndex] = useState(null);

  const [notif, setNotif] = useState({
    open: false,
    type: "error",
    message: "",
  });

  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append("content", desc);
      if (images.length > 0 && images[0]) {
        formPayload.append("post_pic", images[0]);
      }

      const response = await api("/api/posts/", {
        method: "POST",
        body: formPayload,
      });

      if (response.ok) {
        setNotif({
          open: true,
          type: "success",
          message: "Blog posted successfully!",
        });
      }

      setImages([]);
      setDesc("");
      setCoverIndex(null);

      navigate("/Blogs");
    } catch (error) {
      setNotif({
        open: true,
        type: "error",
        message: error.message || "Submission failed!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div class="flex justify-center items-center min-h-screen p-10 container mx-auto">
        <div className="p-6 rounded-2xl bg-white/80  w-full">
          <h2 className="text-4xl font-semibold text-[#002975]">
            Create New Blog
          </h2>
          <div className="border border-gray-[#002975] p-2 rounded-xl mt-4">
            <p className="mb-1">Blog image</p>
            <ImageUpload
              images={images}
              onChange={setImages}
              coverIndex={coverIndex}
              onCoverChange={setCoverIndex}
              multiple={true}
            />

            <div>
              <CustomTextarea
                label={"Blog Description"}
                width="100%"
                height="200px"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center justify-end mt-4">
              <button
                onClick={handleSubmit}
                className="bg-yellow-400 text-blue-900 px-3 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow-md"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
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

export default CreateBlog;
