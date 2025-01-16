import React from "react";
import {MapPin, Heart, Award, Clock} from "lucide-react";
import doctor1Img from "../../assets/Appoinment.jpeg";
import {Button} from "../ui/button";

const HospitalCard = ({hospital}) => {
  console.log("doctor----", hospital);
  return (
    <div className="flex justify-center items-center  px-4 ">
      <div
        className="w-full max-w-md bg-opacity-80 rounded-md shadow-2xl overflow-hidden transform transition duration-300 hover:scale-105"
        style={{
          boxShadow:
            "5px 5px 5px rgba(0, 0, 0, 0.2), -5px 5px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="relative h-48 z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800"></div>
          <img
            src={doctor1Img}
            alt={hospital.user.username}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
            <h2 className="text-xl font-bold text-white mb-1">
              {`${hospital.user.username} (${hospital.short_name})`}
            </h2>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-2  ">
            <MapPin className="w-5 h-5" />
            <div className="pl-2">
              {hospital.user.address.street_name_1},{" "}
              {hospital.user.address.city}, {hospital.user.address.state},{" "}
              {hospital.user.address.pincode}
            </div>
          </div>
        </div>

        <div className="p-6 ">
          <Button className="bg-theme-gradient  text-white text-lg transition duration-300 hover:bg-gray-200 w-full">
            view Doctors
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
