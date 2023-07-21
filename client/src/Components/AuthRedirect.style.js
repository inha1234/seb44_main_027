import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const MessageContainer = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MessageEmoji = styled(FontAwesomeIcon)`
  width: 100px;
  height: 100px;
  margin-bottom: 30px;
`;

export const MessageHeading = styled.section`
  font-size: 52px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const MessageSubHeading = styled.section`
  font-size: 25px;
  margin-bottom: 15px;
`;

export const MessageDetails = styled.section`
  color: #c5c5c5;
`;
