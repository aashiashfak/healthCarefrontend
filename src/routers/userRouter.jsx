import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../pages/patient/Home";
import Navbar from "@/components/Layout/Navbar";
import Doctors from "@/pages/patient/Doctors";
import Locations from "@/pages/patient/Locations";

const UserRoutes = () => {
  return (
    <>
      <Navbar />
      {/* Main Content */}
      <div className="pt-4 md:pt-0 pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/locations" element={<Locations />} />
        </Routes>
      </div>
    </>
  );
}

export default UserRoutes;
