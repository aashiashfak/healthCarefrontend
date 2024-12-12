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
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <h1 className="text-white text-2xl md:text-4xl font-bold">
          Your Health, Our Priority – Trusted Care, Anytime, Anywhere 
        </h1>
      </div>
    </div>
  );
};

export default Banner;
