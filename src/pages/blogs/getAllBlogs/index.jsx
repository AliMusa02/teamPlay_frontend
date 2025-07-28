import React, { useEffect, useState } from "react";
import CustomCard from "../../../components/ui/customCard";
import bgImage from "../../../assets/images/bgIMage.webp";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { api } from "../../../API/const";
import Loader from "../../../components/common/Loader";

const GetAllBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await api("/api/posts/", {
        method: "GET",
      });
      setBlogs(data.data);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Loader loader={loading} />
      <div class="flex justify-center items-center min-h-screen py-25">
        <div
          className="p-6 rounded-2xl bg-white"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)", // açıq ağ, şəffaf
            backdropFilter: "blur(10px)", // arxa plan bulanıqlaşma effekti
            WebkitBackdropFilter: "blur(10px)", // Safari üçün
            boxShadow: "none",
          }}
        >
          <button
            onClick={() => navigate("/blogs/create")}
            className="bg-yellow-400 text-blue-900 px-3 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow-md flex items-center gap-2 mb-6"
          >
            <FiPlus />
            Create Blog
          </button>
          {blogs.length > 0 ? (
            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6  ">
              {blogs.map((blog) => {
                return (
                  <CustomCard
                    key={blog.id}
                    blog={blog}
                    fetchBlogs={fetchBlogs}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-white">No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetAllBlogs;
