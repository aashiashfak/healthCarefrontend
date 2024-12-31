import React from "react";
import BannerImg from "../../assets/Banner.jpeg"

const Banner = () => {
  return (
    <div className="w-full h-[50vh] relative">
      <img
        src={BannerImg} // Replace with your image URL
        alt="Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex  justify-center">
        <h1
          className="text-2xl md:text-4xl font-bold text-center text-border mt-5"
          style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" , }}
        >
          Your Health, Our Priority – Trusted Care, Anytime, Anywhere
        </h1>
      </div>
    </div>
  );
};

export default Banner;
