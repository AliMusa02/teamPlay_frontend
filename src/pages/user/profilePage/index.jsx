import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsernameFromToken } from "../../../services/authService";
import { useDispatch } from "react-redux";
import { closeProfileModal } from "../../../redux/modelSlice";

const ProfilePage = ({ user, handleChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = getUsernameFromToken();

  return (
    <div className="min-w-full bg-gradient-to-r from-slate-100 to-white py-10 px-4 sm:px-8">
      <div className="w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="">
          {/* Left Section */}
          <div className="bg-[#FDC700] p-6 flex flex-col items-center justify-center text-white">
            <img
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
              src={user.profilePic || "/default-avatar.png"}
              alt="User avatar"
            />
            <h2 className="text-2xl font-bold mt-4">{user.user_name}</h2>
          </div>

          {/* Right Section */}
          <div className="col-span-2 p-6 sm:p-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Profile Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Full Name
                </label>
                <p className="text-lg font-semibold text-gray-800">
                  {user.first_name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Email Address
                </label>
                <p className="text-lg font-semibold text-gray-800">
                  {user.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  About
                </label>
                <p className="text-base text-gray-700 whitespace-pre-line">
                  {user.about || "No information provided."}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Team
                </label>
                {/* <Link to={`/teams/${user?.team?.id}`}> */}
                <p
                  className="text-lg text-indigo-600 hover:text-indigo-800 hover:font-bold cursor-pointer transition duration-200"
                  onClick={() => {
                    if (user?.team?.id) {
                      dispatch(closeProfileModal());
                      navigate(`/teams/${user.team.id}`);
                    }
                  }}
                >
                  {user?.team?.team_name || "No information provided."}
                </p>
                {/* </Link> */}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => {
                  dispatch(closeProfileModal());
                  navigate(`/user/${username.id}`);
                }}
                className="px-4 py-2 text-sm font-semibold rounded-md text-black border border-[#FDC700] hover:bg-blue-50 transition"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
