import React from "react";
import {MapPin} from "lucide-react";
import doctor1Img from "../../assets/Appoinment.jpeg";
import {Button} from "../ui/button";
import { useNavigate } from "react-router-dom";


const HospitalCard = ({hospital}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center px-4">
      <div
        className="w-full max-w-md bg-opacity-80 rounded-md shadow-2xl overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col h-[360px]"
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
            <h2 className="text-xl font-bold text-white mb-1 truncate">
              {`${hospital.user.username} (${hospital.short_name})`}
            </h2>
          </div>
        </div>
        <div className="h-[220px] flex flex-col justify-between ">
          <div className="p-4 space-y-4 ">
            <div className="flex space-x-1 ">
              <div className="p-1">
                <MapPin className="w-5 h-5 " />
              </div>
              <div className="">
                {hospital.user.address.street_name_1},{" "}
                {hospital.user.address.city}, {hospital.user.address.state},{" "}
                {hospital.user.address.pincode}
              </div>
            </div>
          </div>

          <div className="p-6 ">
            <Button
              onClick={() =>
                navigate("/doctors", {state: {hospitalId: hospital.user.id}})
              }
              className="bg-theme-gradient text-white text-lg transition duration-300 hover:bg-gray-200 w-full"
            >
              View Doctors
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
