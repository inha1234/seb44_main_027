import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
`;

export const MessageEmoji = styled(FontAwesomeIcon)`
  width: 100px;
  height: 100px;
  margin-bottom: 30px;
  color: #c5c5c5;
`;

export const MessageHeading = styled.section`
  font-size: 52px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #c5c5c5;
`;

export const MessageSubHeading = styled.section`
  font-size: 25px;
  margin-bottom: 15px;
  color: #c5c5c5;
`;

export const MessageDetails = styled.section`
  color: #c5c5c5;
  margin-bottom: 5px;
`;
