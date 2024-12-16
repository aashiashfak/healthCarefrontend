import React from "react";
import {MapPin, Heart, Award, Clock} from "lucide-react";
import doctor1Img from "../../assets/Appoinment.jpeg";

const DoctorCard = ({doctor}) => {

    console.log('doctor----', doctor)
  return (
    <div className="flex justify-center items-center  px-4">
      <div className="w-full max-w-md bg-black bg-opacity-80 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="relative h-48 z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800"></div>
          <img
            src={doctor1Img}
            alt={doctor.user.username}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
            <h2 className="text-3xl font-bold text-white mb-1">
              {doctor.user.username}
            </h2>
            <p className="text-white font-semibold">
              {doctor.qualifications.replace(/"/g, "")}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-2 text-white">
            <MapPin className="w-5 h-5" />
            <span>New York City, NY</span>
          </div>

          <div className="flex items-center space-x-2 text-white">
            <Heart className="w-5 h-5" />
            <span>{doctor.department}</span>
          </div>

          <div className="flex items-center space-x-2 text-white">
            <Award className="w-5 h-5" />
            <span>{doctor.specialties.join(", ")}</span>
          </div>

          <div className="flex items-center space-x-2 text-white">
            <Clock className="w-5 h-5" />
            <span>18 Years Experience</span>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-700">
          <button className="w-full py-3 px-6 bg-white text-gray-900 rounded-full font-bold text-lg transition duration-300 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
