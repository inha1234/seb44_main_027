import ProfileLink from '../utils/ProfileLink';
import {
  EmptyListHeading,
  EmptyListIndicator,
  EmptyListSubHeading,
  ListItemContainer,
  ListItemProfileImage,
  ListItemUsername,
  ModalContainer,
  ModalList,
} from './FollowList.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear } from '@fortawesome/free-regular-svg-icons';

function FollowList({ list }) {
  const isEmptyList = list && list.length === 0;

  return (
    <ModalContainer>
      {isEmptyList ? (
        <EmptyListIndicator>
          <FontAwesomeIcon icon={faFaceSadTear} size="2x" />
          <EmptyListHeading>텅~</EmptyListHeading>
          <EmptyListSubHeading>비었어요...</EmptyListSubHeading>
        </EmptyListIndicator>
      ) : (
        <ModalList>
          {list.map((item) => (
            <ListItemContainer key={item.memberId}>
              <ProfileLink
                profileUserId={item.memberId}
                element={
                  <ListItemProfileImage>
                    <img
                      style={{ width: '100%' }}
                      src={item.imageUrl}
                      alt={item.memberId}
                    />
                  </ListItemProfileImage>
                }
              />
              <ProfileLink
                profileUserId={item.memberId}
                element={<ListItemUsername>{item.userName}</ListItemUsername>}
              />
            </ListItemContainer>
          ))}
        </ModalList>
      )}
    </ModalContainer>
  );
}

export default FollowList;
