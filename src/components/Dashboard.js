import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFireStore } from "../hooks/useFirestore";
import axios from "axios";
import Svg from "react-inlinesvg";

function Dashboard() {
  const {
    currentUser,
    addUser2Group,
    getGroupID,
    addGroup,
    getGroups,
    getUsers,
    groups,
    users,
    sendMessage,
    group,
  } = useAuth();

  const { messages } = useFireStore(group);
  const message = useRef(null);
  const messageEndRef = useRef(null);

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

  function getAvatar() {
    axios
      .get("https://avatars.dicebear.com/api/miniavs/:saurabh.svg")
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  }

  return (
    <div className="flex text-white bg-black h-screen">
      <div className="w-80">
        <h2 className="">{group.toUpperCase()}</h2>
        <div>Group description help desk fall apart to the end</div>
        <h2>MEMEBERS</h2>
        <div>
          {users
            ? users.map((user) => (
                <div className="flex-col">
                  <Svg src={user.svg} alt="avatar" className="inline" />
                  {user.name}
                </div>
              ))
            : null}
        </div>
      </div>
      <div className="bg-gray-900 w-full">
        <div>
          <h1 className="text-xl">{group.toUpperCase()}</h1>
          <div className="scroll-div flex-col-reverse">
            {messages
              ? messages.map((message) => (
                  <div>
                    {/* {avatar ? <div>avatar</div> : null} */}
                    {/* {users.find((user) => user.name === message.name).svg
                      ? users.find((user) => user.name === message.name)["svg"]
                      : null} */}
                    <div>{message.name}</div>
                    <div>{message.body}</div>
                  </div>
                ))
              : null}
            <div ref={messageEndRef} />
          </div>
        </div>
        <form className="" onSubmit={submitHandler}>
          <input
            id="message"
            type="text"
            ref={message}
            placeholder="Enter your message"
            required
            className="bg-gray-600 focus:outline-none border-none focus:border-solid border-2 h-8 rounded-lg px-3 py-4 focus:border-green-500"
          ></input>
          <button className="bg-green-700" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
