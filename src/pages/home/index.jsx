import React, { useEffect } from "react";
import headerImage from "../../assets/images/player.webp"; // Adjust the path as necessary
import "./style.css"; // Assuming you have some styles in index.css
import HeaderSection from "./headerSection";
import AboutSection from "./aboutSection";
import ContactSection from "./contactSection";
import Loader from "../../components/common/Loader";
import Header from "../../layout/header";
import { useLocation } from "react-router-dom";
const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div>
      <div id="home">
        <HeaderSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>

      <div class=" bg-gradient-to-b from-[#03215c] to-[#03215c] opacity-30">
        <div class="flex justify-center gap-12 px-6 py-2 text-white">
          <div class="text-center">
            <p class="text-3xl font-bold">+10K</p>
            <p>Users</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold">150+</p>
            <p>Teams Created</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold">98%</p>
            <p>Positive Feedback</p>
          </div>
        </div>
      </div>

      <ContactSection />
    </div>
  );
};

export default Home;
