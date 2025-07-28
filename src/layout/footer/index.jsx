import React from "react";
import { isAuthenticated } from "../../services/authService";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Footer = () => {
  const loggedIn = isAuthenticated();
  return (
    <footer className="bg-[#010c37] text-white py-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo və ad */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-[#fdc700]">AliTeam</h2>
          <p className="text-sm text-white/70 mt-2">
            Build your dream football team. Passion. Power. Play.
          </p>
        </div>

        {/* Navigasiya linkləri */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Link
            key="Home"
            state={{ scrollTo: "home" }}
            to="/"
            className="mx-2 font-bold text-white hover:text-yellow-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            key="About"
            state={{ scrollTo: "about" }}
            to="/#about"
            className="mx-2 font-bold text-white hover:text-yellow-400 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            key="Contact"
            state={{ scrollTo: "contact" }}
            to="/#contact"
            className="mx-2 font-bold text-white hover:text-yellow-400 transition-colors duration-300"
          >
            Contact
          </Link>
          {loggedIn && (
            <>
              <Link
                key="Teams"
                to="/teams"
                className="mx-2 font-bold text-white hover:text-yellow-400 transition-colors duration-300"
              >
                Teams
              </Link>
              <Link
                key="Blogs"
                to="/Blogs"
                className="mx-2 font-bold text-white hover:text-yellow-400 transition-colors duration-300"
              >
                Blogs
              </Link>
              <Link
                key="invitations"
                to="/invitations"
                className="mx-2 font-bold text-white hover:text-yellow-400 transition-colors duration-300"
              >
                Notifications
              </Link>
            </>
          )}
        </Box>

        {/* Sosial linklər və ya iconlar (əgər istəsən əlavə edə bilərik) */}
      </div>

      {/* Alt hissə */}
      <div className="text-center text-base text-white/40 mt-8">
        © {new Date().getFullYear()} AliTeam. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
