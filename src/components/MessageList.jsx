import { styled } from 'styled-components';
import { useColorContext } from '../color_context';

const StyledContainer = styled.div`
  flex: 2;
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const MessageBaseWrap = styled.div`
  flex-direction: column;
  display: flex;
  padding: 0.4rem;
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
  background-color: ${(props) => props.$primary};
  color: ${(props) => props.$textPrimary};
`;

const NonUserMessage = styled(MessageBase)`
  background-color: ${(props) => props.$secondary};
  color: ${(props) => props.$textSecondary};
`;

const MessageList = ({ message }) => {
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
    </StyledContainer>
  );
};

export default MessageList;
