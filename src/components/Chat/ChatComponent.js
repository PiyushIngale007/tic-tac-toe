import React, { useEffect } from "react";
import { Chat, addResponseMessage } from "react-chat-popup";
import { io } from "socket.io-client";
import user from "../../assets/user.png";

let socket = io("http://localhost:5000");
let userResponse = "";
const ChatComponent = (props) => {
  useEffect(() => {
    if (props.mvalue !== userResponse) {
      userResponse = props.mvalue;
      addResponseMessage(props.mvalue);
    }
  });

  const handleNewUserMessage = (newMessage) => {
    socket.emit(
      "testvalue",
      newMessage,
      props.RoomId !== "" ? props.RoomId : props.joinValue
    );
    userResponse = newMessage;
  };
  return (
    <div>
      <Chat
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={user}
        title="Chat"
      />
    </div>
  );
};

export default ChatComponent;
