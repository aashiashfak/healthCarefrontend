import React from "react";
import DropDownMenu from "./DropDownMenu";
import {User, LogOut} from "lucide-react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { logout } from "@/redux/Slices/AuthSlice";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="text-sm text-black ">
      <div className="px-5 py-3 cursor-pointer">
        <DropDownMenu icon={<User className="w-5 h-5" />} title="My Profile" />
      </div>
      <hr className="w-[170px] mx-auto bg-gray-400 h-px border-none" />
      <div className="px-5 py-3 cursor-pointer" onClick={handleLogout}>
        <DropDownMenu icon={<LogOut className="w-4 h-4" />} title="Logout" />
      </div>
    </div>
  );
};

export default ProfileDropdown;
