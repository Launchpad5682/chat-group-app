import React, { useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import Svg from "react-inlinesvg";
import { useFireStore } from "../../hooks/useFirestore";

function ChatSection() {
  const { users, group } = useAuth();
  const { messages } = useFireStore(group);
  const messageEndRef = useRef(null);

  // scroll to bottom https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {messages
        ? messages.map((message) => (
            <div className="my-2 border-2 border-gray-600 bg-gray-800 flex rounded-lg py-1">
              {/* {avatar ? <div>avatar</div> : null} */}
              <div className="w-12 pr-12 h-12 m-1 bg-gray-600 rounded-lg">
                {users.find((user) => user.name === message.name) !==
                undefined ? (
                  <Svg
                    src={users.find((user) => user.name === message.name).svg}
                    alt="avatar"
                    className="inline"
                  />
                ) : null}
              </div>
              <div>
                <div className="capitalize font-sans text-lg">
                  {message.name}
                </div>
                <div>{message.createdAt.toDate().toDateString("en-US")}</div>
                <div>{message.body}</div>
              </div>
            </div>
          ))
        : null}
      <div ref={messageEndRef} />
    </>
  );
}

export default ChatSection;
