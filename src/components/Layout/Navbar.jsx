import React from "react";
import {Button} from "@/components/ui/button";
import {Bell, User, Home, Phone, Info} from "lucide-react";

const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        {/* Left Side: Heading */}
        <div className="text-xl font-bold text-gray-800">Health Care</div>

        {/* Center: Navigation Links (hidden on small screens) */}
        <div className="hidden md:flex space-x-6">
          <Button variant="link" className="text-gray-700 hover:text-gray-900">
            Home
          </Button>
          <Button variant="link" className="text-gray-700 hover:text-gray-900">
            Contact Us
          </Button>
          <Button variant="link" className="text-gray-700 hover:text-gray-900">
            About Us
          </Button>
        </div>

        {/* Right Side: Icons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="p-2">
            <Bell className="w-5 h-5 text-gray-700" />
          </Button>
          <Button variant="ghost" className="p-2">
            <User className="w-5 h-5 text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Bottom Navigation for Small Screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md">
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
