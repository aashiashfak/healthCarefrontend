import React from "react";
import {Player} from "@lottiefiles/react-lottie-player";
import healthLoader from "../../assets/HealthLoader.json";

const HealthLoader = ({height = "100vh"}) => {
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
        src={healthLoader}
        style={{height: "100px", width: "100px"}}
      />
    </div>
  );
};

export default HealthLoader;
