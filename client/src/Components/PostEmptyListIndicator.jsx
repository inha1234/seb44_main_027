import { faFaceMeh } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'styled-components';

const Indicator = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #c5c5c5;
  margin-top: 50px;
`;

const EmojiContainer = styled(FontAwesomeIcon)`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
`;

const MessageHeading = styled.section`
  font-size: 30px;
  margin-bottom: 5px;
`;

const MessageDetail = styled.section`
  font-size: 16px;
`;

export default function PostEmptyListIndicator() {
  return (
    <Indicator>
      <EmojiContainer icon={faFaceMeh} />
      <MessageHeading>아무것도 없네요...</MessageHeading>
      <MessageDetail>아직 작성된 게시글이 없는 것 같아요.</MessageDetail>
    </Indicator>
  );
}
