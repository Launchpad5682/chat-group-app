import React, { useState } from "react";
import Svg from "react-inlinesvg";
import { useAuth } from "../context/AuthContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { NavLink } from "react-router-dom";

function Profile() {
  const { user, getAvatar } = useAuth();
  //drop down
  const [dropDownState, setDropDownState] = useState(false);

  const avatar = getAvatar(user);

  //drop drop

  const DropDown = () => {
    return (
      <div className="h-10 w-28 relative bg-gray-800 bottom-20 right-2 float-right rounded-lg flex justify-center items-center">
        <NavLink to="/signout">
          <div className="hover:bg-gray-600 flex justify-center items-center p-1 rounded-lg">
            <AiOutlineLogout className="text-red-500 text-lg" />
            <span className="pl-2">Sign Out</span>
          </div>
        </NavLink>
      </div>
    );
  };

  return (
    <>
      <div className="bg-gray-900 h-12 flex items-center rounded-lg">
        <div className="bg-gray-400 rounded-lg">
          <Svg src={avatar} alt="avatar" className="inline" />
        </div>
        <div className="flex justify-between w-full text-xl px-2">
          <span className="capitalize">{user}</span>
          <span>
            <MdKeyboardArrowDown
              className="inline"
              onClick={() => setDropDownState(!dropDownState)}
            />
          </span>
        </div>
      </div>
      {dropDownState && <DropDown />}
    </>
  );
}

export default Profile;
