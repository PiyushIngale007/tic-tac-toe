import React, { useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import { io } from 'socket.io-client';
import user from '../../assets/user.png';
import 'react-chat-widget/lib/styles.css';
import './chatComponent.css';

let socket = io('https://tic--tac--toe--server.herokuapp.com/');
let userResponse = '';
const ChatComponent = (props) => {
  useEffect(() => {
    if (props.mvalue !== userResponse) {
      userResponse = props.mvalue;
      addResponseMessage(props.mvalue);
    }
  });

  const handleNewUserMessage = (newMessage) => {
    socket.emit(
      'testvalue',
      newMessage,
      props.RoomId !== '' ? props.RoomId : props.joinValue
    );
    userResponse = newMessage;
  };
  return (
    <div className='App'>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={user}
        title='Chat'
      />
    </div>
  );
};

export default ChatComponent;
