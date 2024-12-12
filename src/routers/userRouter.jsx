import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../pages/patient/Home";
import Navbar from "@/components/Layout/Navbar";

const UserRoutes = () => {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default UserRoutes;
