import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceMeh } from '@fortawesome/free-regular-svg-icons';

const Indicator = styled.section`
  display: flex;
  width: 100%;
  height: 150px;
  color: #c5c5c5;
  margin: 10px 0;
  align-items: center;
`;

const EmojiContainer = styled(FontAwesomeIcon)`
  width: 80px;
  height: 80px;
`;

const MessageContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-left: 20px;
`;

const MessageHeading = styled.section`
  font-size: 25px;
  margin-bottom: 5px;
`;

const MessageDetail = styled.section`
  font-size: 16px;
`;

export default function CrewingEmptyListIndicator() {
  return (
    <Indicator>
      <EmojiContainer icon={faFaceMeh} />
      <MessageContainer>
        <MessageHeading>아무것도 없네요...</MessageHeading>
        <MessageDetail>아직 작성된 게시글이 없는 것 같아요.</MessageDetail>
      </MessageContainer>
    </Indicator>
  );
}
