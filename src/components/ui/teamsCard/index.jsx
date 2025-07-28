import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TeamCard = ({ team, fetchTeams }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 4,
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
        // width: "380px",
        // maxWidth: 500,
        mx: "auto",
        my: 2,
      }}
      className="w-75 md:w-95"
    >
      <CardMedia
        component="img"
        height="300px"
        image={team.team_logo}
        alt={team.team_name}
        sx={{
          objectFit: "contain",
          width: "100%",
          maxHeight: 300,
          p: 2,
          backgroundColor: "#f9f9f9",
          borderBottom: "1px solid #eee",
        }}
      />
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {team.team_name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>About:</strong> {team.about}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Captain:</strong> {team.captain_username}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Created At:</strong>{" "}
          {new Date(team.created_at).toLocaleDateString()}
        </Typography>
        <Button
          variant="contained"
          //   color="primary"
          onClick={() => navigate(`/teams/${team.id}`)}
          sx={{
            textTransform: "none",
            backgroundColor: "#FDC700",
            "&:hover": { backgroundColor: "#f1d779" },
          }}
        >
          Get Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
