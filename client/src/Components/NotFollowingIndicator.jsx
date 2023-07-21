import {
  Container,
  MessageEmoji,
  MessageHeading,
  MessageSubHeading,
  MessageDetails,
} from './NotFollowingIndicator.style';
import { faFaceMeh } from '@fortawesome/free-regular-svg-icons';

function NotFollowingIndicator() {
  return (
    <Container>
      <MessageEmoji icon={faFaceMeh} />
      <MessageHeading>음...</MessageHeading>
      <MessageSubHeading>게시글이 하나도 없어요.</MessageSubHeading>
      <MessageDetails>
        팔로우하는 사람이 없거나, 아직 아무도 글을 안올렸나봐요.
      </MessageDetails>
      <MessageDetails>새 친구를 찾아볼까요?</MessageDetails>
    </Container>
  );
}

export default NotFollowingIndicator;
