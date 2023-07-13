import { AiOutlineMessage } from 'react-icons/ai';
import { styled } from 'styled-components';
import { useColorContext } from '../color_context';

const StyledButton = styled.button`
  text-align: center;
  position: absolute;
  right: 0;
  bottom: 0;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: white;
  color: ${(props) => props.$primaryColor};
  font-size: 1rem;
  cursor: pointer;
  border: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const StyledNotificaion = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  height: 12px;
  width: 12px;
  padding: 0.65rem;
  border-radius: 16px;
  background-color: #fa3e3e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const FloatingBlip = ({ unreadTextCount = 0, onClick = () => {} }) => {
  const { theme } = useColorContext();
  return (
    <StyledButton onClick={onClick} $primaryColor={theme.primaryColor}>
      <AiOutlineMessage size={40} />
      {unreadTextCount > 0 && (
        <StyledNotificaion>{unreadTextCount}</StyledNotificaion>
      )}
    </StyledButton>
  );
};

export default FloatingBlip;
