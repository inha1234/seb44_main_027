import { Link } from 'react-router-dom';

function ProfileLink({ profileUserId, element }) {
  const loggedInUserId = Number(sessionStorage.getItem('memberId'));

  const path =
    loggedInUserId === profileUserId ? '/mypage' : `/profile/${profileUserId}`;

  return (
    <Link style={{ textDecoration: 'none', color: 'black' }} to={path}>
      {element}
    </Link>
  );
}

export default ProfileLink;
