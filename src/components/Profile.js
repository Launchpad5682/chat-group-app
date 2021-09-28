import React from "react";
import Svg from "react-inlinesvg";
import { useAuth } from "../context/AuthContext";
import { MdKeyboardArrowDown } from "react-icons/md";

function Profile() {
  const { user, getAvatar } = useAuth();

  const avatar = getAvatar(user);
  return (
    <div className="bg-gray-900 h-12 flex items-center rounded-lg">
      <div className="bg-gray-400 rounded-lg">
        <Svg src={avatar} alt="avatar" className="inline" />
      </div>
      <div className="flex justify-between w-full text-xl px-2">
        <span className="capitalize">{user}</span>
        <MdKeyboardArrowDown className="inline" />
      </div>
    </div>
  );
}

export default Profile;
