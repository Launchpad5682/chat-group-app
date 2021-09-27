import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { HiMenu } from "react-icons/hi";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import GroupInfo from "./Messages/GroupInfo";
import ChatSection from "./Messages/ChatSection";

function Messages() {
  const { getUsers, sendMessage, group, width } = useAuth();
  const message = useRef(null);
  const history = useHistory();

  // local state for side drawer
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    getUsers(group);
  });

  function submitHandler(e) {
    e.preventDefault();
    sendMessage(group, message.current.value);
    message.current.value = null;
    // getAvatar();
    // console.log(avatar);
    // console.log(users.find((user) => user.name === "hello"));
    // console.log(users);
  }

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="flex text-white bg-black h-screen">
      {width < 500 ? (
        drawer === true ? (
          <div className="fixed inset-0 bg-transparent flex">
            <div className="w-11/12 bg-black h-full">
              <GroupInfo goBack={goBack} />
            </div>
            <div className="w-full" onClick={() => setDrawer(false)}></div>
          </div>
        ) : null
      ) : (
        <div className="w-80 p-3">
          <GroupInfo goBack={goBack} />
        </div>
      )}
      <div className="bg-gray-900 w-full p-3 flex-col h-screen">
        <h1 className="text-xl mb-4">
          {width > 500 ? null : (
            <HiMenu className="inline mr-4" onClick={() => setDrawer(true)} />
          )}
          {group.toUpperCase()}
        </h1>
        <div className="scroll-div flex-col-reverse h-5/6 mb-6">
          <ChatSection />
        </div>
        <form
          className="flex w-full h-10 items-center my-auto"
          onSubmit={submitHandler}
        >
          <input
            id="message"
            type="text"
            ref={message}
            placeholder="Enter your message"
            required
            className="bg-gray-600 focus:outline-none border-none w-11/12 focus:border-solid border-2 h-full rounded-lg px-3 py-4 focus:border-green-500 mr-2"
          ></input>
          <button
            className="bg-green-700 w-20 h-full rounded-lg px-8"
            type="submit"
          >
            <RiSendPlane2Fill />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messages;
