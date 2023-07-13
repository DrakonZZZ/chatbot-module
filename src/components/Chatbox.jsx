import FloatingBlip from './FloatingBlip';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import socketIoClient from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';

const StyledContainer = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
`;

const FloatingWindow = styled.div`
  width: 350px;
  height: 500px;
  position: absolute;
  right: 10px;
  bottom: 60px;
  background-color: white;
  color: black;
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
  padding: 0.2rem;
`;

const MessageContent = styled.div`
  overflow: auto;
  padding: 8px;
`;

const Chatbox = () => {
  const [message, setMessage] = useState([]);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  const lastMessageRef = useRef(null);

  const scrollToLastMessage = () => {
    lastMessageRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const unreadText = message.filter((text) => text.status === 'unread');

  //Displays the recent message

  useEffect(() => {
    scrollToLastMessage();
  }, [message]);

  //if the floating icon is clicked

  useEffect(() => {
    if (isWindowOpen) {
      setMessage(message.map((m) => ({ ...m, status: 'read' })));
    }
  }, [isWindowOpen]);

  //establishes a socket connection for the first time

  useEffect(() => {
    const newSocket = socketIoClient('http://127.0.0.1:8080');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket?.on('WELCOME', (newtext) => {
      setMessage(message.concat(newtext));
    });

    socket?.on('USER_MESSAGE', (newtext) => {
      setMessage(message.concat(newtext));
    });
  }, [message, socket]);

  const insertNewMessage = (text) => {
    const newMessage = {
      id: message.length,
      status: 'read',
      sender: 'user',
      text,
      time: new Date(),
    };
    setMessage(message.concat(newMessage));
    socket?.emit('USER_MESSAGE', newMessage);
  };
  return (
    <StyledContainer>
      {isWindowOpen && (
        <FloatingWindow>
          <MessageContent>
            <MessageList message={message} />
            <div ref={lastMessageRef}></div>
          </MessageContent>
          <MessageForm onSumbit={insertNewMessage} />
        </FloatingWindow>
      )}
      <FloatingBlip
        onClick={() => setIsWindowOpen(!isWindowOpen)}
        unreadTextCount={unreadText.length}
      />
    </StyledContainer>
  );
};

export default Chatbox;
