import React from "react";
import MainCard from "./MainCard";
import appoinmentImg from "../../assets/Appoinment.jpeg";
import doctorsImg from "../../assets/Doctors.jpeg";
import locationImg from "../../assets/location.avif";
import { useNavigate } from "react-router-dom";

const MainCardParent = () => {
    const navigate = useNavigate();
  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  const navigateDoctor = () => {    
    navigate("/doctors");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-7">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:p-1 lg:p-12">
        <MainCard
          title="Doctors"
          description="Our doctors are highly qualified and experienced."
          buttonText="Find Doctor"
          buttonAction={navigateDoctor}
          imageUrl={doctorsImg}
        />
        <MainCard
          title="Appoinment"
          description="Book your appointment with us today!"
          buttonText="Book Now"
          buttonAction={handleButtonClick}
          imageUrl={appoinmentImg}
        />
        <MainCard
          title="Locations"
          description="Find us at our locations across the city"
          buttonText="Find"
          buttonAction={handleButtonClick}
          imageUrl={locationImg}
        />
      </div>
    </div>
  );
};

export default MainCardParent