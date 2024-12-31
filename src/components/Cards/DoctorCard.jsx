import React from "react";
import {MapPin, Heart, Award, Clock} from "lucide-react";
import doctor1Img from "../../assets/Appoinment.jpeg";
import { Button } from "../ui/button";

const DoctorCard = ({doctor}) => {

    console.log('doctor----', doctor)
  return (
    <div className="flex justify-center items-center  px-4">
      <div
        className="w-full max-w-md  bg-opacity-80 rounded-md shadow-2xl overflow-hidden"
        style={{
          boxShadow:
            "5px 5px 5px rgba(0, 0, 0, 0.2), -5px 5px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="relative h-48 z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800"></div>
          <img
            src={doctor1Img}
            alt={doctor.user.username}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
            <h2 className="text-xl font-bold text-white mb-1">
              {doctor.user.username}
            </h2>
            <p className="font-semibold text-white truncate">
              {doctor.qualifications.replace(/"/g, "")}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-2  ">
            <MapPin className="w-5 h-5" />
            <span>New York City, NY</span>
          </div>

          <div className="flex items-center space-x-2 ">
            <Heart className="w-5 h-5" />
            <span>{doctor.department}</span>
          </div>

          <div className="flex items-center space-x-2 ">
            <Award className="w-5 h-5" />
            <span className="truncate" >{doctor.specialties.join(", ")}</span>
          </div>

          <div className="flex items-center space-x-2 ">
            <Clock className="w-5 h-5" />
            <span>18 Years Experience</span>
          </div>
        </div>

        <div className="p-6 ">
          <Button className="bg-theme-gradient  text-white text-lg transition duration-300 hover:bg-gray-200 w-full">
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
