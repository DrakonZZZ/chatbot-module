import { styled } from 'styled-components';

const StyledContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const MessageBaseWrap = styled.div`
  flex-direction: column;
  display: flex;
  padding: 0.8rem;
`;

const UserMassageWrap = styled(MessageBaseWrap)`
  align-items: flex-end;
`;

const NonUserMassageWrap = styled(MessageBaseWrap)`
  align-items: flex-start;
`;

const MessageBase = styled.span`
  padding: 0.8rem;
  border-radius: 8px;
  max-width: 80%;
`;

const UserMessage = styled(MessageBase)`
  background-color: #41555c;
  color: white;
`;

const NonUserMessage = styled(MessageBase)`
  background-color: #699db0;
  color: white;
`;

const MessageList = ({ message }) => {
  console.log(message);
  return (
    <StyledContainer>
      {message.map((m) => {
        if (m.sender === 'user') {
          return (
            <UserMassageWrap key={m.id}>
              <UserMessage>{m.text}</UserMessage>
            </UserMassageWrap>
          );
        }
        return (
          <NonUserMassageWrap key={m.id}>
            <NonUserMessage>{m.text}</NonUserMessage>
          </NonUserMassageWrap>
        );
      })}
    </StyledContainer>
  );
};

export default MessageList;
