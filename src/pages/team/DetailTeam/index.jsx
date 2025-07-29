import React, { useEffect, useState } from "react";
import { Button } from "@mui/material"; // istəsən Tailwind button da yaza bilərsən
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { fetchTeamData } from "../../../API/teamDetailService";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import bgImage from "../../../assets/images/bgIMage.webp";
import Loader from "../../../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../API/const";
import CustomAlert from "../../../components/ui/customAlert";
import { IoLocationOutline } from "react-icons/io5";
import { login } from "../../../redux/userSlice";

const TeamDetail = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userLoggedIn = useSelector((state) => state.user.user);
  const { id } = useParams();
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user_id, isCapitan } = useSelector((state) => state.user);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [matchDate, setMatchDate] = useState("");
  const [matchTime, setMatchTime] = useState("");
  const [userTeamStatus, setUserTeamStatus] = useState("");
  const availableTimes = [
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];
  console.log(userLoggedIn.data?.user, "first");
  // console.log(user.data?.user, "second");
  const dispatch = useDispatch()

  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [matches, setMatches] = useState([]);

  // GET ALL STADIUMS
  const fetchVenues = async () => {
    try {
      const res = await api("/api/venues/", {
        method: "GET",
      });
      if (res.ok) {
        setVenues(res.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  // CUSTOM TOAST
  const [notif, setNotif] = useState({
    open: false,
    type: "success", // "error" da ola bilər
    message: "",
  });

  useEffect(() => {
    fetchVenues();
  }, []);

  //GET TEAMS
  const getTeam = async () => {
    const { data, loading } = await fetchTeamData(id);
    setTeamData(data);
    setLoading(loading);

    teamData?.members?.map((member) => {
      if (member.user.id === userLoggedIn.data.user.id) {
        setUserTeamStatus(true);
      } else {
        setUserTeamStatus(false);
      }
    });
  };
  React.useEffect(() => {
    getTeam();
  }, [id]);

  const handleVenueChange = (e) => {
    setSelectedVenue(parseInt(e.target.value));
    setErrors((prev) => ({ ...prev, selectedVenue: "" }));
  };

  const handleDateChange = (e) => {
    setMatchDate(e.target.value);
    setErrors((prev) => ({ ...prev, matchDate: "" }));
  };

  const handleTimeChange = (time) => {
    setMatchTime((prev) => (prev === time ? "" : time));
    setErrors((prev) => ({ ...prev, matchTime: "" }));
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setErrors((prev) => ({ ...prev, message: "" }));
  };

  // SET USER
  const fetchAndSetUser = async () => {
    try {
      const res = await api(`/api/users/${userLoggedIn.data?.user.id}/`, { method: "GET" }); // Adjust URL to match your backend
      if (res.ok) {
        console.log(res.data);

        const token = localStorage.getItem("accessToken");
        dispatch(login({ data: res.data, token }));
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };



  //SEND INVITATION
  const sendInvitation = async () => {
    const newErrors = {};

    if (!selectedVenue) newErrors.selectedVenue = "Venue is required.";
    if (!matchDate) newErrors.matchDate = "Match date is required.";
    if (!matchTime) newErrors.matchTime = "Match time is required.";
    if (!message.trim()) newErrors.message = "Message cannot be empty.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    try {
      setLoading(true);
      const formPayload = new FormData();
      formPayload.append("receiver_team_id", parseInt(id));
      formPayload.append("venue_id", selectedVenue);
      formPayload.append("time_slot", matchTime);
      formPayload.append("date", matchDate);
      formPayload.append("message", message);

      const res = await api("/api/invitations/get-post/", {
        method: "POST",
        body: formPayload,
      });

      if (res.ok) {
        setNotif({
          open: true,
          type: "success",
          message: "Invitation sent successfully!",
        });
        return true;
      } else {
        setNotif({
          open: true,
          type: "error",
          message: "Failed to send invitation.",
        });
        return false;
      }
    } catch (error) {
      setNotif({
        open: true,
        type: "error",
        message: error.message || "Failed to send invitation.",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // JOIN TEAM
  const handleSendRequest = async () => {
    try {
      const res = await api(`/api/teams/join/${id}/`, {
        method: "POST",
        // body: payload,
      });
      setLoading(true);
      if (res.status === 201) {
        setNotif({
          open: true,
          type: "success",
          message: "You Joined Successfully!",
        });
        await fetchAndSetUser()
        getTeam();
        // window.location.reload();

        // navigate("/teams");
      }
    } catch (err) {
      setLoading(false);
      if (err) {
        setNotif({
          open: true,
          type: "error",
          message: err.detail || "Something went wrong!",
        });
      }
      console.error("Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // LEAVE A TEAM
  const leaveTeam = async () => {
    try {
      const res = await api("/api/teams/leave/", {
        method: "DELETE",
      });
      if (res.ok) {

        // alert("Leaved team successfully");
        setNotif({
          open: true,
          type: "success",
          message: "You Left Successfully!",
        });
        await fetchAndSetUser()
        getTeam();
        // window.location.reload();

        // navigate("/teams");
        // window.location.reload();
      } else {
        alert("Operation failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // GET TEAMS
  const fetchMatches = async () => {
    try {
      const res = await api(`/api/matches/${teamData.id}/`, {
        method: "GET",
      });
      if (res.ok) {
        setMatches(res.data);
      } else {
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [teamData.id]);

  // RESET INVITATION SETUP
  const handleCloseInviteModal = () => {
    setOpenInviteModal(false);
    setMatchDate("");
    setMatchTime("");
    setSelectedVenue("");
    setMessage("");
  };

  const today = new Date().toISOString().split("T")[0];

  const [actionButton, setActionButton] = useState(null);

  const isMember = teamData.members?.some(
    (member) => member.user.id === userLoggedIn.data?.user.id
  );
  // useEffect(() => {
  //   const user = userLoggedIn.data?.user;
  //   const userTeam = user?.team;
  //   const isCaptain = user?.id === userTeam?.captain;
  //   const isSameTeam = userTeam?.id === teamData?.id;
  //   const hasTeam = Boolean(userTeam);

  //   if (isMember) {
  //     if (isCaptain) {
  //       if (!isSameTeam) {
  //         // Kapitan və başqa komandanın səhifəsindədir
  //         setActionButton(
  //           <button
  //             className="text-1xl font-bold text-white rounded-[5px] cursor-pointer bg-[blue] p-1.5"
  //             onClick={() => setOpenInviteModal(true)}
  //           >
  //             Invite to match
  //           </button>
  //         );
  //       } else {
  //         // Kapitan və öz komandasının səhifəsindədir
  //         setActionButton(
  //           <button
  //             className="text-1xl font-bold text-white rounded-[5px] cursor-pointer bg-green-600 p-1.5"
  //             onClick={() => navigate(`/teams/update/${teamData?.id}`)}
  //           >
  //             Update Team
  //           </button>
  //         );
  //       }
  //     } else {
  //       if (isMember) {
  //         setActionButton(
  //           <Button
  //             variant="contained"
  //             onClick={leaveTeam}
  //             sx={{
  //               textTransform: "none",
  //               backgroundColor: "#FDC700",
  //               "&:hover": { backgroundColor: "#f1d779" },
  //             }}
  //           >
  //             Leave Team
  //           </Button>
  //         );
  //       } else {
  //         setActionButton(
  //           <Button
  //             variant="contained"
  //             onClick={handleSendRequest}
  //             sx={{
  //               textTransform: "none",
  //               backgroundColor: "#FDC700",
  //               "&:hover": { backgroundColor: "#f1d779" },
  //             }}
  //           >
  //             Join team
  //           </Button>
  //         );
  //         // setActionButton(null); // Başqa komandadadır və kapitan deyil
  //       }
  //     }
  //   } else {
  //     if (!isMember) {
  //       setActionButton(
  //         <Button
  //           variant="contained"
  //           onClick={handleSendRequest}
  //           sx={{
  //             textTransform: "none",
  //             backgroundColor: "#FDC700",
  //             "&:hover": { backgroundColor: "#f1d779" },
  //           }}
  //         >
  //           Join Team
  //         </Button>
  //       );
  //     }
  //     // Komandası yoxdur
  //   }
  // }, [isMember]);

  useEffect(() => {
    if (!teamData || !userLoggedIn?.data?.user) return;

    const loggedInUser = userLoggedIn.data.user;
    const myTeam = loggedInUser.team; // Your team (can be null)
    const isViewingOwnTeam = myTeam?.id === teamData.id;
    const isMemberOfViewingTeam = teamData.members?.some(
      (member) => member.user.id === loggedInUser.id
    );
    const isCaptain = loggedInUser.id === myTeam?.captain;

    console.log(isMemberOfViewingTeam, "is member");

    // Case 1: You are viewing your own team
    if (isViewingOwnTeam) {
      if (isCaptain) {
        setActionButton(
          <button
            className="text-1xl font-bold text-white rounded-[5px] cursor-pointer bg-green-600 p-1.5"
            onClick={() => navigate(`/teams/update/${teamData?.id}`)}
          >
            Update Team
          </button>
        );
      } else if (isMemberOfViewingTeam) {
        setActionButton(
          <Button
            variant="contained"
            onClick={leaveTeam}
            sx={{
              textTransform: "none",
              backgroundColor: "#FDC700",
              "&:hover": { backgroundColor: "#f1d779" },
            }}
          >
            Leave Team
          </Button>
        );
      }
      return;
    }

    // Case 2: You are captain of a different team
    if (isCaptain && !isViewingOwnTeam) {
      setActionButton(
        <button
          className="text-1xl font-bold text-white rounded-[5px] cursor-pointer bg-blue-600 p-1.5"
          onClick={() => setOpenInviteModal(true)}
        >
          Invite to Match
        </button>
      );
      return;
    }

    // Case 3: You are member of another team (not captain)
    if (myTeam && !isViewingOwnTeam) {
      setActionButton(null); // You cannot join other teams
      return;
    }

    // Case 4: You are not in any team
    if (!myTeam) {
      setActionButton(
        <Button
          variant="contained"
          onClick={handleSendRequest}
          sx={{
            textTransform: "none",
            backgroundColor: "#FDC700",
            "&:hover": { backgroundColor: "#f1d779" },
          }}
        >
          Join Team
        </Button>
      );
      return;
    }
  }, [teamData, userLoggedIn]);


  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center py-20"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Loader loader={loading} />
      <div className=" w-[90%] lg:w-[60%] mx-auto p-6 bg-[#f9f8f8] rounded-lg shadow-md">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between  md:items-center   mb-6">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={teamData.team_logo}
              alt="Team Logo"
              className="w-30 h-30 rounded-full object-cover border border-gray-300"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <SportsSoccerIcon className="text-yellow-500" />
                {teamData.team_name}
              </h2>
              <p className="text-sm text-gray-500">
                Created at: {new Date(teamData.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {actionButton}
        </div>

        {/* About */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">About</h3>
          <p className="text-gray-600">{teamData.about}</p>
        </div>

        {/* Captain */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Captain</h3>
          <div className="flex items-center gap-4 bg-[#e0f0f6] p-4 rounded-lg shadow-sm">
            <div>
              <p className="text-lg font-medium text-gray-800">
                {teamData?.captain_username}
              </p>
              {/* <p className="text-sm text-gray-500">Role: {member?.role}</p> */}
            </div>
          </div>
        </div>

        {/* Members */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Members</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teamData.members?.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-lg"
              >
                <div className="flex items-center justify-center rounded-full border border-[#e0f0f6] ">
                  <img
                    src={`https://teamplaybackend.up.railway.app${member.user?.profilePic}`}
                    alt={member.user.user_name}
                    className="w-18 h-18 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {member.user.user_name}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    Role: {member.role}
                  </p>
                </div>

                <button
                  onClick={async () => {
                    // setSelectedUser(member.user);
                    try {
                      setIsModalOpen(true);
                      const res = await api(`/api/users/${member.user.id}/`, {
                        method: "GET",
                      });
                      if (res.ok) {
                        setSelectedUser(res.data.user);
                      }
                    } catch (error) {
                      console.error("Failed to fetch user", error);
                    }
                  }}
                  className="w-full py-2 mt-3 text-base font-semibold text-white bg-gray-500 rounded-lg cursor-pointer shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition"
                >
                  Visit user
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Matches */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Upcoming Matches
          </h3>
          {matches && matches.length > 0 ? (
            <div className="space-y-4">
              {matches
                .filter((match) => !match.is_played)
                .map((match) => {
                  const isHome = match.home_team.id === teamData.id;
                  const opponent = isHome ? match.away_team : match.home_team;
                  const date = new Date(
                    match.time_slot.date
                  ).toLocaleDateString();
                  const time = match.time_slot.slot_time.slice(0, 5);

                  return (
                    <div
                      key={match.id}
                      className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={opponent.team_logo}
                          alt={opponent.team_name}
                          className="w-14 h-14 rounded-full border object-cover"
                        />
                        <div>
                          <p className="text-lg font-semibold text-gray-800">
                            {opponent.team_name}
                          </p>
                          <p className="flex items-center text-sm text-gray-600">
                            {" "}
                            <IoLocationOutline />
                            {match.venue.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {date} at {time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p className="font-medium text-gray-700">Venue:</p>
                        <p>{match.venue.location}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="text-gray-500">No upcoming matches scheduled.</p>
          )}
        </div>

        {/* Send Request Button */}
        <div className="text-right">{/* {} */}</div>
        <CustomAlert
          open={notif.open}
          type={notif.type}
          message={notif.message}
          onClose={() => setNotif((prev) => ({ ...prev, open: false }))}
        />
      </div>
      {openInviteModal && (
        <div
          className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm bg-opacity-20 flex items-center justify-center"
          onClick={() => {
            setOpenInviteModal(false);
            handleCloseInviteModal();
          }}
        >
          <div
            className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Schedule a Match
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Select Venue
                </label>
                <div className="relative">
                  <select
                    // value={selectedVenue}
                    required
                    onChange={handleVenueChange}
                    className="block w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  >
                    <option value="" disabled>
                      Select a venue
                    </option>

                    {venues.map((venue) => {
                      return (
                        <option key={venue.id} value={venue.id}>
                          {venue.name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    ▼
                  </div>
                </div>
                {errors.selectedVenue && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.selectedVenue}
                  </p>
                )}
              </div>

              {/* MATCH DATE */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Match Date
                </label>
                <input
                  type="date"
                  required
                  value={matchDate}
                  min={today}
                  onChange={handleDateChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.matchDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.matchDate}
                  </p>
                )}
              </div>

              {/* SELECT MATCH TIME */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Select Match Time
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleTimeChange(time)}
                      className={`px-3 py-2 text-sm rounded border ${matchTime === time
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {errors.matchTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.matchTime}
                  </p>
                )}
              </div>
              {/* MESSAGE INPUT */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Message for Rival Team
                </label>
                <input
                  type="text"
                  onChange={handleMessageChange}
                  value={message}
                  placeholder="Write a short message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm text-gray-800 placeholder-gray-400"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpenInviteModal(false);
                    handleCloseInviteModal();
                  }}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const success = await sendInvitation();
                    if (success) {
                      setOpenInviteModal(false);
                      handleCloseInviteModal();
                      setErrors({}); // Reset errors after successful submission
                    }
                    // sendInvitation();
                  }}
                  // disabled={!selectedVenue || !matchDate || !matchTime}
                  className="text-white px-4 py-2 rounded bg-sky-500 hover:bg-sky-700"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isModalOpen && selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30"
          onClick={() => setIsModalOpen(false)} // Clicking background closes modal
        >
          <div
            className="bg-white rounded-xl p-6 w-96 relative shadow-xl"
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing
          >
            <button
              className="absolute top-3 right-4 cursor-pointer text-red-700 hover:text-black text-4xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <div className="flex flex-col items-center gap-4">
              <img
                src={`${selectedUser.profilePic}`}
                alt={selectedUser.user_name}
                className="w-24 h-24 rounded-full object-cover border"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedUser.first_name}
              </h2>
              <p>{selectedUser.user_name}</p>
              <p className="text-gray-600 text-sm">
                Email: {selectedUser.email || "N/A"}
              </p>
              <p className="text-gray-600 text-sm">
                About: {selectedUser.about || "N/A"}
              </p>
              {/* Add more user info if needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetail;
