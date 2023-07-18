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
  const [isTyping, setIsTyping] = useState({ value: false, name: '' });
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  const lastMessageRef = useRef(null);

  const scrollToLastMessage = () => {
    lastMessageRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const unreadText = message.filter(
    (text) => text.status === false && text.sender == 'nonuser'
  );

  //Scrolls to most recent message

  useEffect(() => {
    scrollToLastMessage();
  }, [message, isTyping]);

  //if the floating icon is clicked

  useEffect(() => {
    if (isWindowOpen) {
      setMessage(message.map((m) => ({ ...m, status: true })));
      markAllRead();
    }
  }, [isWindowOpen]);

  //establishes a socket connection for the first time

  useEffect(() => {
    const chatId = sessionStorage.getItem('chat-id');
    const newSocket = socketIoClient('http://127.0.0.1:8080', {
      query: {
        id: chatId,
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const markAllRead = () => {
    socket?.emit('MARK_READ');
  };

  useEffect(() => {
    socket?.on('ID_ASSIGNMENT', (newId) => {
      sessionStorage.setItem('chat-id', newId);
    });

    socket?.on('CHAT_EXISTS', (message) => {
      setMessage(message);
      const agentName = message.find((m) => m.name);
      setIsTyping({
        ...isTyping,
        name: agentName.name ? agentName.name : 'Agent',
      });
    });
    socket?.on('WELCOME', (newtext) => {
      setMessage(message.concat(newtext));
      setIsTyping({ ...isTyping, name: newtext.name });
    });

    socket?.on('MESSAGE_READ', () => {
      setMessage(
        message.map((m) => {
          if (m.status) {
            return { ...m, isRead: true };
          }
          return m;
        })
      );
    });

    socket?.on('TYPING', () => {
      setIsTyping({ ...isTyping, value: true });
    });

    socket?.on('NEW_MESSAGE', (newtext) => {
      setMessage(
        message.concat({
          ...newtext,
          status: isWindowOpen,
        })
      );
      setIsTyping({
        ...isTyping,
        value: false,
      });
      markAllRead();
    });
  }, [message, socket, isWindowOpen]);

  const insertNewMessage = (text) => {
    const newMessage = {
      status: true,
      sender: 'user',
      text,
      time: new Date(),
    };
    setMessage(message.concat(newMessage));
    socket?.emit('NEW_MESSAGE', newMessage);
  };
  return (
    <StyledContainer>
      {isWindowOpen && (
        <FloatingWindow>
          <MessageContent>
            <MessageList message={message} typing={isTyping} />
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
