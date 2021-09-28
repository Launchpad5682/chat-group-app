import React from "react";
import { HiPlus } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import Profile from "../Profile";
import { useHistory } from "react-router";
import { useModalOverlayContext } from "../../context/ModalOverlayContext";

function GroupSideBar() {
  const { groups, getUsers, users, user, addUser2Group, setGroup } = useAuth();
  const { setModalOverlay } = useModalOverlayContext();
  const history = useHistory();

  const selectGroup = (event, group) => {
    getUsers(group);
    const group_users = users;
    const present = group_users.indexOf(user) !== -1;

    if (present === false) {
      addUser2Group(group);
    }

    const link = "/" + group + "/";
    setGroup(group);
    history.push(link);
  };
  return (
    <>
      <div className="flex justify-between align-middle">
        <h2 className="text-xl">Channels</h2>
        <HiPlus className="text-2xl" onClick={() => setModalOverlay(true)} />
      </div>
      <form>
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-800 h-10 outline-none px-3 rounded-md mt-2"
        ></input>
      </form>
      <div className="mt-5 h-5/6 scroll-div">
        {groups
          ? groups.map((group) => (
              <div
                key={group}
                className="flex rounded-md mt-3 h-11 hover:bg-green-600 cursor-pointer"
                onClick={(event) => selectGroup(event, group)}
              >
                <div className="text-lg bg-gray-600 mr-2 rounded-md w-11 h-max flex items-center justify-center">
                  <text>{group[0].toUpperCase()}</text>
                </div>
                <div className="w-full flex items-center">
                  {group[0].toUpperCase() + group.substring(1)}
                </div>
              </div>
            ))
          : null}
      </div>
      <Profile />
    </>
  );
}

export default GroupSideBar;
