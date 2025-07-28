import { CiClock2 } from "react-icons/ci";
import moment from "moment";
import "./blogPost.css";
import { MdDelete } from "react-icons/md";
import { api } from "../../../API/const";
import { useState } from "react";
import CustomAlert from "../customAlert";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const CustomCard = ({ blog, fetchBlogs }) => {
  const { user_id } = useSelector((state) => state.user);

  const navigate = useNavigate()



  const [notif, setNotif] = useState({
    open: false,
    type: "error",
    message: "",
  });

  const deleteBlog = async (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await api(`/api/posts/delete/${blog.id}/`, {
        method: "DELETE",
      });

      setNotif({
        open: true,
        type: "success",
        message: "Blog deleted successfully!",
      });
      fetchBlogs(); //refresh page

    } catch (error) {
      setNotif({
        open: true,
        type: "error",
        message: error.message || "Delete failed!",
      });
    }
  };

  const timeAgo = moment.utc(blog.created_at).local().fromNow();
  return (
    <>
      <div class="relative   flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-75 md:w-95 hover:scale-102 transition-transform duration-300">
        <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
          <img
            src={blog.post_pic}
            // src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
            alt="card-image"
            class="object-cover w-full h-full"
          />
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between mb-2">
            {/* yumuru profil sekli */}
            <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              {/* Username */}
              {blog.author_username}
            </p>
            {/* <Link to={'/'}> */}
            {

            }
            <p onClick={() => {
              if (blog.author_team_id) {
                navigate(`/teams/${blog.author_team_id}`)
              }
            }} class="block font-sans text-base antialiased p-1 rounded-md cursor-pointer font-medium leading-relaxed text-blue-gray-600 hover:text-blue-gray-900 bg-blue-50 hover:bg-blue-200">
              {/* User team */}
              {blog.author_team_name}
            </p>
            {/* </Link> */}

            {/* <button onClick={deleteBlog} className="delete_post">
              <MdDelete />
            </button> */}
            {user_id === blog.author_id && (
              <button onClick={deleteBlog} className="delete_post">
                <MdDelete />
              </button>
            )}
          </div>
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75 mb-2">
            {blog.content}
          </p>
          <p className="flex items-center gap-1 mb-1">
            <CiClock2 />{" "}
            <span class="text-gray-500 font-medium">
              {/* {blog.created_at} */}
              {/* {timeAgo} */}
              {timeAgo}
            </span>
          </p>
        </div>
      </div>
      <CustomAlert
        open={notif.open}
        type={notif.type}
        message={notif.message}
        onClose={() => setNotif((prev) => ({ ...prev, open: false }))}
        autoHideDuration={3000}
      />
    </>
  );
};

export default CustomCard;
