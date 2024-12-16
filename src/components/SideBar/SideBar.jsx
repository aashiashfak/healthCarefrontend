import React, {useState} from "react";
import {Menu, X} from "lucide-react";

const Sidebar = ({title ,children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-900 z-50 fixed">
      {/* Toggle button for small screens */}
      {!isOpen && (
        <button
          className="lg:hidden text-black  fixed top-16 p-3 rounded-full bg-black bg-opacity-50 left-4 z-50"
          onClick={toggleSidebar}
        >
          {<Menu />}
        </button>
      )}

      {/* Sidebar for all screens */}
      <div
        className={`fixed min-h-screen lg:relative lg:w-64 w-full h-full bg-black text-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block`}
      >
        {/* Sidebar content */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div className="text-lg font-semibold">{title}</div>
          <button className="lg:hidden text-white" onClick={toggleSidebar}>
            <X />
          </button>
        </div>
        <div className=" ">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
