import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../pages/patient/Home";
import Navbar from "@/components/Layout/Navbar";
import Doctors from "@/pages/patient/Doctors";

const UserRoutes = () => {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
    </>
  );
}

export default UserRoutes;
