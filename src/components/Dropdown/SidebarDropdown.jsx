import React, {useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";

const SideBarDropdown = ({title, children}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      {/* Dropdown Header */}
      <div
        className="flex justify-between items-center p-4 bg-gray-800 text-white cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="font-medium">{title}</span>
        <ChevronDown
          className={`transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown Content */}
      <div
        className={`bg-gray-700 text-white overflow-hidden transition-[max-height] duration-300 border-b ${
          isExpanded ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="p-4 " >{children}</div>
      </div>
    </div>
  );
};

export default SideBarDropdown;
