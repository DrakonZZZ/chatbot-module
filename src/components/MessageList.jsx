import { styled } from 'styled-components';
import { useColorContext } from '../color_context';

const StyledContainer = styled.div`
  flex: 2;
  text-align: left;
  display: flex;
  flex-direction: column;
  .type-style {
    transition: all 200ms ease-in-out;
    color: #7f7f7fbc;
    margin-left: 8px;
  }
`;

const MessageBaseWrap = styled.div`
  flex-direction: column;
  display: flex;
  padding: 0.4rem;
`;

const UserMassageWrap = styled(MessageBaseWrap)`
  align-items: flex-end;
  .read {
    color: #7f7f7fbc;
    font-size: 0.7rem;
    margin-right: 8px;
    margin-top: 5px;
  }
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
  background-color: ${(props) => props.$primary};
  color: ${(props) => props.$textPrimary};
`;

const NonUserMessage = styled(MessageBase)`
  background-color: ${(props) => props.$secondary};
  color: ${(props) => props.$textSecondary};
`;

const MessageList = ({ message, typing }) => {
  const { theme } = useColorContext();
  return (
    <StyledContainer>
      {message.map((m) => {
        if (m.sender === 'user') {
          return (
            <UserMassageWrap key={m.id}>
              <UserMessage
                $primary={theme.primaryColor}
                $textPrimary={theme.textPrimaryColor}
              >
                {m.text}
              </UserMessage>
              {m.isRead ? <div className="read">Seen</div> : null}
            </UserMassageWrap>
          );
        }
        return (
          <NonUserMassageWrap key={m.id}>
            <NonUserMessage
              $secondary={theme.secondaryColor}
              $textSecondary={theme.textSecondaryColor}
            >
              {m.text}
            </NonUserMessage>
          </NonUserMassageWrap>
        );
      })}
      {typing.value && (
        <div className="type-style">{typing.name} is typing...</div>
      )}
    </StyledContainer>
  );
};

export default MessageList;
