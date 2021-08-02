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
  useEffect(() => {
    const openBtn = document.getElementsByClassName('rcw-launcher')[0];
    openBtn.addEventListener('click', (event) => {
      document.getElementsByClassName('rcw-widget-container')[0].style.zIndex =
        '201';
      setTimeout(() => {
        const closeBtn = document.getElementsByClassName('rcw-close-button')[0];
        if (closeBtn !== undefined) {
          closeBtn.addEventListener('click', () => {
            document.getElementsByClassName(
              'rcw-widget-container'
            )[0].style.zIndex = '100';
          });
        }
      }, 500);
    });

    return () => {
      openBtn.removeEventListener('click');
    };
  }, []);

  const handleNewUserMessage = (newMessage) => {
    socket.emit(
      'testvalue',
      newMessage,
      props.RoomId !== '' ? props.RoomId : props.joinValue
    );
    userResponse = newMessage;
  };
  return (
    <div>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={user}
        title='Chat'
      />
    </div>
  );
};

export default ChatComponent;
