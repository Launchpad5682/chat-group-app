import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useFireStore } from "../hooks/useFirestore";

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

  useEffect(() => {
    getUsers(group);
  });

  function submitHandler(e) {
    e.preventDefault();
    sendMessage(group, message.current.value);
    message.current.value = null;
  }

  return (
    <div className="flex text-white bg-black h-screen">
      <div className="w-80">
        <h2 className="">{group.toUpperCase()}</h2>
        <div>Group description help desk fall apart to the end</div>
        <h2>MEMEBERS</h2>
        <div>{users ? users.map((user) => <div>{user}</div>) : null}</div>
      </div>
      <div className="bg-gray-900 w-full">
        <div>
          <h1 className="text-xl">{group.toUpperCase()}</h1>
          <div>
            {messages
              ? messages.map((message) => (
                  <div>
                    <div>{message.name}</div>
                    <div>{message.body}</div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <form className="absolute bottom-3" onSubmit={submitHandler}>
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
