import React from "react";
import { Button } from "../ui/button";

const MainCard = ({title, description, buttonText, buttonAction, imageUrl}) => {
  return (
    <div
      className="bg-theme-gradient rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-150"
      style={{
        boxShadow:
          "5px 5px 5px rgba(0, 0, 0, 0.1), -5px 5px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="relative h-48 md:h-64">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-300 text-lg font-bold">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
      </div>
      <div className="p-6 flex flex-col justify-between">
        <div className="">
          <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
          <p className="text-gray-300 mb-4">{description}</p>
        </div>
        <Button
          onClick={buttonAction}
          className="w-full bg-white text-black rounded transition-all duration-300 ease-in-out transform hover:bg-theme-gradient-hover hover:shadow-lg "
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default MainCard;
