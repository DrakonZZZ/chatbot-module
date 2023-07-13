import FloatingBlip from './FloatingBlip';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { messages } from '../messages';
import { styled } from 'styled-components';
import { useState } from 'react';

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
  const [message, setMessage] = useState(messages);
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  const unreadText = message.filter((text) => text.status === 'unread');
  return (
    <StyledContainer>
      {isWindowOpen && (
        <FloatingWindow>
          <MessageContent>
            <MessageList message={message} />
          </MessageContent>
          <MessageForm />
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
