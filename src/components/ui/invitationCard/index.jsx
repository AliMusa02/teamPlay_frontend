import "./style.css";
import { api } from "../../../API/const";
import { FaCheck } from "react-icons/fa6";

const InvitationCard = ({ invitation, fetchInvitations }) => {
  const id = invitation.id;
  const acceptInvitation = async () => {
    try {
      const res = await api(`/api/invitations/update/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ status: "accepted" }),
      });
      if (res.ok) {
        alert("Invitation accepted successfully!");
        fetchInvitations();
      }
    } catch (error) {
      console.error("Error accepting invitation:", error);
      alert("Failed to accept the invitation.");
    }
  };

  const declineInvitation = async () => {
    try {
      const res = await api(`/api/invitations/update/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ status: "declined" }),
      });
      if (res.ok) {
        alert("Invitation declined successfully!");
        fetchInvitations();
      }
    } catch (error) {
      console.error("Error accepting invitation:", error);
      alert("Failed to decline the invitation.");
      fetchInvitations();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between w-[95%] bg-white rounded-xl shadow-md m-4 p-4 gap-4 hover:shadow-lg transition">
        <div className="flex items-center gap-4">
          <img
            src={invitation.sender_team.team_logo}
            alt={invitation.sender_team.team_name}
            className="w-16 h-16 rounded-full border object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {invitation.sender_team.team_name}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Message:</span> {invitation.message}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Location:</span>{" "}
              {invitation.venue.name}
            </p>
            <p className="text-sm text-gray-600">
              {invitation.time_slot.split(":").slice(0, 2).join(":")} on{" "}
              {invitation.date}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            onClick={acceptInvitation}
          >
            <FaCheck />
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
            onClick={declineInvitation}
          >
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default InvitationCard;
