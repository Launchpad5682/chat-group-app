import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import Svg from "react-inlinesvg";
import { useAuth } from "../../context/AuthContext";

const GroupInfo = ({ goBack }) => {
  const { group, users } = useAuth();
  return (
    <>
      <h2 className="">
        <HiArrowLeft className="inline mr-4" onClick={goBack} />
        {group.toUpperCase()}
      </h2>
      <div>Group description help desk fall apart to the end</div>
      <h2>MEMEBERS</h2>
      <div>
        {users
          ? users.map((user) => (
              <div className="flex">
                <div className="w-12 pr-12 h-12 m-1 bg-gray-600 rounded-lg">
                  <Svg src={user.svg} alt="avatar" className="inline" />
                </div>
                {user.name}
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default GroupInfo;
