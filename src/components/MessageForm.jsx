import { useState } from 'react';
import { useColorContext } from '../color_context';
import { styled } from 'styled-components';

const StyledForm = styled.div`
  padding: 3px;
  border-radius: 8px;
  display: flex;
  background-color: white;
  .message-input {
    flex: 1;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    font-size: 1.2rem;
    padding: 6px;
    border: 1px solid #797e8063;
  }

  .message-input:focus {
    outline: none;
  }
  .btn {
    border: none;
    color: white;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    font-size: 1.2rem;
    padding: 6px 15px;
  }
`;

const MessageForm = ({ onSumbit = () => {} }) => {
  const [newMessage, setNewMessage] = useState('');
  const { theme } = useColorContext();

  const submitForm = () => {
    if (newMessage === '') {
      return;
    }
    onSumbit(newMessage);
    setNewMessage('');
  };
  return (
    <StyledForm>
      <input
        type="text"
        className="message-input"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            submitForm();
          }
        }}
      />
      <button
        type="button"
        onClick={submitForm}
        className="btn"
        style={{ background: theme.primaryColor }}
      >
        Send
      </button>
    </StyledForm>
  );
};

export default MessageForm;
