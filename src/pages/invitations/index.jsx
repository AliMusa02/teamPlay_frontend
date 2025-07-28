import InvitationCard from "../../components/ui/invitationCard";
import bgImage from "../../assets/images/bgIMage.webp";
import { FiPlus } from "react-icons/fi";
import "./style.css";
import { useEffect, useState } from "react";
import { api } from "../../API/const";
import { colors } from "@mui/material";
import CustomAlert from "../../components/ui/customAlert";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Invitation = () => {
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchInvitations = async () => {
    try {
      setLoading(true);
      const res = await api("/api/invitations/get-post/", {
        method: "GET",
      });

      if (res.ok) {
        setInvitations(res.data);
      } else {
        console.error("Failed to fetch teams");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      // alert(error.message)
      // navigate()
      // console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  return (
    <>
      <div
        className="bg-cover bg-center min-h-screen"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div class="flex justify-center items-center min-h-screen p-6 ">
          <div
            className="p-6 rounded-2xl bg-white"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)", // açıq ağ, şəffaf
              backdropFilter: "blur(10px)", // arxa plan bulanıqlaşma effekti
              WebkitBackdropFilter: "blur(10px)", // Safari üçün
              boxShadow: "none",
            }}
          >
            <p className="notification">Notifications</p>
            <div className="team_cards_container flex flex-col gap-6">
              <div className="invitationCards_container w-full">
                {invitations.data && invitations.data.length > 0 ? (
                  invitations.data.map((invitation) => {
                    return (
                      <InvitationCard
                        key={invitation.id}
                        invitation={invitation}
                        fetchInvitations={fetchInvitations}
                      />
                    );
                  })
                ) : (
                  <p className="error_message">{invitations.message}</p>
                )}

                {errorMessage && (
                  <div className="bg-red-900 p-4 rounded">
                    <h3 className="text-white font-bold text-xl">
                      {" "}
                      {errorMessage}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invitation;
