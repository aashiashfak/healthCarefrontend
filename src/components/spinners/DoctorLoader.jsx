import React from "react";
import {Player} from "@lottiefiles/react-lottie-player";
import doctorLottie from "../../assets/DoctorLottie.json";


const DoctorLoader = ({height = "100vh"}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: height,
      }}
    >
      <Player
        autoplay
        loop
        src={doctorLottie}
        style={{height: "100px", width: "100px"}}
      />
    </div>
  );
};

export default DoctorLoader;
