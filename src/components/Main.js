import React, { useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import AddGroupDialog from "./AddGroupDialog";
import { useModalOverlayContext } from "../context/ModalOverlayContext";
import { useState } from "react";
import GroupSideBar from "./Groups/GroupSideBar";

function Main() {
  const { getGroups, width } = useAuth();
  const { modalOverlay } = useModalOverlayContext();
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    getGroups();

    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="flex text-white bg-black h-screen">
        {width < 500 ? (
          drawer === true ? (
            <div className="fixed inset-0 bg-transparent flex">
              <div className="bg-black w-11/12">
                <GroupSideBar />
              </div>
              <div className="w-full" onClick={() => setDrawer(false)}></div>
            </div>
          ) : null
        ) : (
          <div className="w-80 mx-4 mt-4">
            <GroupSideBar />
          </div>
        )}
        <div className="bg-gray-900 w-full p-3">
          {width < 500 ? <HiMenu onClick={() => setDrawer(true)} /> : null}
          <div></div>
        </div>
      </div>
      {modalOverlay && <AddGroupDialog />}
    </>
  );
}

export default Main;
