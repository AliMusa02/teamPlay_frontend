import React from "react";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="w-full  bg-gradient-to-b from-[#02124a] via-[#02174f] to-[#03215c]
px-6 md:px-12 py-20"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 text-white space-y-6 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">
            About <span className="text-cyan-400">TeamPlay</span>
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            TeamPlay is a platform where football lovers can build their dream
            teams, join existing squads, and compete together. Our mission is to
            connect people through sport, teamwork and passion. Whether you're a
            casual player or a future champion, TeamPlay is for you!
          </p>
        </div>
        {/* Şəkil tərəfi */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-3xl overflow-hidden shadow-lg backdrop-blur-md bg-white/10 ">
            <img
              src="https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3Ac2168110-f2d7-4108-a1a2-9ae20253d383?source=next-article&fit=scale-down&quality=highest&width=1440&dpr=1"
              alt="About TeamPlay"
              className="w-full h-[500px] object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Mətn tərəfi */}
      </div>
    </section>
  );
};

export default AboutSection;
