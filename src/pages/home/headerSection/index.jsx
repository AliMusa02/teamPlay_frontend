import React from "react";
import headerImage from "../../../assets/images/player.webp";
import { isAuthenticated } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

const HeaderSection = () => {
  const loggedIn = isAuthenticated();

  const navigate = useNavigate()

  const navigateGetStarted = () => {
    if (loggedIn) {
      navigate('/teams')
    } else {
      navigate('/login')
    }
  }
  return (
    <section className="w-full min-h-screen bgImageset px-6 md:px-12 py-12 flex items-center justify-center">
      <div className="flex flex-col-reverse lg:flex-row items-center pt-10 justify-between gap-12 max-w-7xl w-full">
        <div className="flex-1 relative group">
          <div className="rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition duration-500 backdrop-blur-xl bg-white/5  flex items-center justify-center">
            <img
              src={headerImage}
              alt="Football Player"
              width={"100%"}
              className="  h-[500px] md:h-[700px] rounded-2xl"
            />
          </div>
          {/* Blur efekt */}
          <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-30 z-[-1]"></div>
        </div>
        {/* Sol Panel */}
        <div className="flex-1 text-white text-center lg:text-left space-y-6 mt-5">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-14 md:leading-[90px] drop-shadow-lg ">
            <span className="block">Build Your</span>
            <span className="block text-yellow-400">Dream Team</span>
            <span className="block">
              with <span className="text-cyan-400">AliTeam</span>
            </span>
          </h1>
          <p className="text-lg text-white/80 max-w-md mx-auto lg:mx-0 ">
            Create, manage, and grow your football community with one platform.
          </p>
          <button onClick={navigateGetStarted} className="bg-yellow-400 text-blue-900 cursor-pointer px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition shadow-md">
            Get Started
          </button>
        </div>

        {/* Sağ Panel - Futbolçu şəkli */}
      </div>
    </section>
  );
};

export default HeaderSection;
