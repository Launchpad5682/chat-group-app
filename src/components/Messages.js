import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFireStore } from "../hooks/useFirestore";
import Svg from "react-inlinesvg";
import { HiArrowLeft, HiMenu } from "react-icons/hi";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useHistory } from "react-router-dom";

function Messages() {
  const { getUsers, users, sendMessage, group, width } = useAuth();

  const { messages } = useFireStore(group);
  const message = useRef(null);
  const messageEndRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    getUsers(group);
  });

  // scroll to bottom https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        <div></div>
      ) : (
        <div className="w-80 p-3">
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
        </div>
      )}
      <div className="bg-gray-900 w-full p-3 flex-col h-screen">
        <h1 className="text-xl mb-4">
          {width > 500 ? null : <HiMenu className="inline mr-4" />}
          {group.toUpperCase()}
        </h1>
        <div className="scroll-div flex-col-reverse h-5/6 mb-6">
          {messages
            ? messages.map((message) => (
                <div className="my-2 border-2 border-gray-600 bg-gray-800 flex rounded-lg py-1">
                  {/* {avatar ? <div>avatar</div> : null} */}
                  <div className="w-12 pr-12 h-12 m-1 bg-gray-600 rounded-lg">
                    {users.find((user) => user.name === message.name) !==
                    undefined ? (
                      <Svg
                        src={
                          users.find((user) => user.name === message.name).svg
                        }
                        alt="avatar"
                        className="inline"
                      />
                    ) : null}
                  </div>
                  <div>
                    <div className="capitalize font-sans text-lg">
                      {message.name}
                    </div>
                    <div>
                      {message.createdAt.toDate().toDateString("en-US")}
                    </div>
                    <div>{message.body}</div>
                  </div>
                </div>
              ))
            : null}
          <div ref={messageEndRef} />
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
/* RiSendPlane2Fill */
