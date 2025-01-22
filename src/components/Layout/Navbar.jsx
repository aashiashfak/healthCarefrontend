import React, {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {Bell, User, Home, Phone, Info} from "lucide-react";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import "../../components/Dropdown/dropdown.css";
import ProfileDropdown from "../Dropdown/ProfileDropdown";
import StyledButton from "../Buttons/StyledButtons";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = (path) => location.pathname === path;

  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
        {/* Left Side: Heading */}
        <div className="text-xl font-bold bg-gradient-to-r from-[#004d60] via-[#007c91] to-[#0097a7] bg-clip-text text-transparent">
          Health Care
        </div>

        {/* Center: Navigation Links (hidden on small screens) */}
        <div className="hidden md:flex space-x-6">
          <Button
            variant="link"
            className={` text-[#004d60] hhover:text-[#006978] ${
              activePath("/") ? "underline font-bold" : ""
            }`}
            onClick={()=>navigate("/")}
          >
            Home
          </Button>
          <Button
            variant="link"
            className="text-[#004d60] hover:text-[#006978]"
          >
            Contact Us
          </Button>
          <Button
            variant="link"
            className="text-[#004d60] hover:text-[#006978]"
          >
            About Us
          </Button>
        </div>

        {/* Right Side: Icons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="p-2">
            <Bell className="w-5 h-5 text-[#004d60] " />
          </Button>
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                className="p-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User className="w-5 h-5 text-gray-700" />
              </Button>
              <div
                className={`Profile-drop-down-menu dropdown-menu absolute right-0  bg-white mt-2 w-48 py-1 rounded-md shadow-lg z-20 ${
                  dropdownOpen ? "active" : "inactive"
                }`}
              >
                {dropdownOpen && <ProfileDropdown />}
              </div>
            </div>
          ) : (
            <StyledButton onClick={() => navigate("/auth/sign-in")}>Sign In</StyledButton>
          )}
        </div>
      </div>

      {/* Bottom Navigation for Small Screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md z-50" onClick={()=>navigate('/')}>
        <div className="flex justify-around py-2">
          <Button variant="ghost" className="flex flex-col items-center p-2">
            <Home className="w-5 h-5 text-gray-700" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-2">
            <Phone className="w-5 h-5 text-gray-700" />
            <span className="text-xs mt-1">Contact</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-2">
            <Info className="w-5 h-5 text-gray-700" />
            <span className="text-xs mt-1">About</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
