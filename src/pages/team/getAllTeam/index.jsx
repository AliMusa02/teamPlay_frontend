import React, { useEffect, useState } from "react";
import CustomCard from "../../../components/ui/customCard";
import TeamsCard from "../../../components/ui/teamsCard";
import "./getAllTeam.css";
import bgImage from "../../../assets/images/bgIMage.webp";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { api } from "../../../API/const";
import Loader from "../../../components/common/Loader";
import TeamCard from "../../../components/ui/teamsCard";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { fetchUserData } from "../../../API/userService";

const GetAllTeams = () => {
  // const dispatch = useDispatch();
  // const teams = useSelector((state) => state.team.teams);
  // const loading = useSelector((state) => state.team.loading);

  // const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [teamCards, setTeamCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await api("/api/teams/", {
        method: "GET",
      });

      if (res.ok) {
        setTeamCards(res.data);
      } else {
        console.error("Failed to fetch teams");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    const getUser = async () => {
      const { data, loading } = await fetchUserData(user_id);
      setUserData(data.user);
      // setLoading(loading);
    };

    getUser();
  }, []);

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div
      className="bg-cover bg-center min-h-screen "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
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
          {userData?.team === null && (
            <button
              onClick={() => navigate("/teams/create")}
              className="bg-yellow-400 text-blue-900 px-3 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow-md flex items-center gap-2 mb-6"
            >
              <FiPlus />
              Create Team
            </button>
          )}
          {/* <button
            onClick={() => navigate("/teams/create")}
            className="bg-yellow-400 text-blue-900 px-3 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow-md flex items-center gap-2 mb-6"
          >
            <FiPlus />
            Create Team
          </button> */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {teamCards.map((team) => (
              <div className="" key={team.id}>
                <TeamCard team={team} fetchTeams={fetchTeams} />
              </div>
            ))}
          </div>
        </div>
        <Loader loader={loading} />
      </div>
    </div>
  );
};

export default GetAllTeams;
