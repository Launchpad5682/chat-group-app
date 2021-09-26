import React, { useEffect } from "react";
import Profile from "./Profile";
import { HiPlus } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import AddGroupDialog from "./AddGroupDialog";
import { useModalOverlayContext } from "../context/ModalOverlayContext";
import { useHistory } from "react-router-dom";

function Main() {
  const { groups, getGroups, setGroup, getUsers, user, addUser2Group, users } =
    useAuth();
  const { modalOverlay, setModalOverlay } = useModalOverlayContext();
  const history = useHistory();

  useEffect(() => {
    getGroups();
  }, []);

  function addGroupHandler() {
    console.log("add group clicked");
  }

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
      <div className="flex text-white bg-black h-screen">
        <div className="w-80 p-3">
          <div className="flex justify-between align-middle">
            <h2 className="text-xl">Channels</h2>
            <HiPlus
              className="text-2xl"
              onClick={() => setModalOverlay(true)}
            />
          </div>
          <form>
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-800 h-10 outline-none px-3 rounded-md mt-2"
            ></input>
          </form>
          <div className="mt-5">
            {groups
              ? groups.map((group) => (
                  <div
                    key={group}
                    className="flex rounded-md mt-3 hover:bg-green-600"
                    onClick={(event) => selectGroup(event, group)}
                  >
                    <div className="text-lg bg-gray-600 mr-2 rounded-md w-10 h-10 flex items-center justify-center">
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
        </div>
        <div className="bg-gray-900 w-full p-3">
          <div></div>
        </div>
      </div>
      {modalOverlay && <AddGroupDialog />}
    </>
  );
}

export default Main;
