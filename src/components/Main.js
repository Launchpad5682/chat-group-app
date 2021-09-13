import React from "react";
import Profile from "./Profile";
import { HiPlus } from "react-icons/hi";

function Main() {
  return (
    <div className="flex text-white bg-black h-screen">
      <div className="w-80 p-3">
        <div className="flex justify-between align-middle">
          <h2 className="text-xl">Channels</h2>
          <HiPlus className="text-2xl" />
        </div>
        <div>Group description help desk fall apart to the end</div>
        <h2>MEMEBERS</h2>
        <div>
          {/* {users
            ? users.map((user) => (
                <div className="flex-col">
                  <Svg src={user.svg} alt="avatar" className="inline" />
                  {user.name}
                </div>
              ))
            : null} */}
          {/* Groups name */}
        </div>
        <Profile />
      </div>
      <div className="bg-gray-900 w-full p-3">
        <div></div>
      </div>
    </div>
  );
}

export default Main;
