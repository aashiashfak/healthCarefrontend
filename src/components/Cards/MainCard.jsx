import React from "react";

const MainCard = ({title, description, buttonText, buttonAction, imageUrl}) => {
  return (
    <div className="w-full md:max-w-md bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
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
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
        <p className="text-gray-300 mb-4">{description}</p>
        <button
          onClick={buttonAction}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default MainCard;
