import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  MyPageButton,
  MyProfileContainer,
  ProfileImageContainer,
  UserStatsContainer,
  UserStatsItem,
  UserStatsNumber,
  UserStatsTitle,
  UsernameContainer,
  UserEmailContainer,
} from './MyProfile.style';

import PortalModal from '../utils/PortalModal';
import FollowList from './FollowList';
import usePortalModal from '../utils/hooks/usePortalModal';

function MyProfile() {
  const memberId = localStorage.getItem('memberId') || 3;
  const [user, setUser] = useState({
    imageUrl: '/images/defaultprofile.png',
    userName: '_',
    totalPostCount: 0,
  });
  const [userFollowInfo, setUserFollowInfo] = useState({});
  const [userFollowerList, setUserFollowerList] = useState([]);
  const [userFollowingList, setUserFollowingList] = useState([]);

  const followerModal = usePortalModal();
  const followingModal = usePortalModal();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/members/${memberId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${import.meta.env.VITE_API_URL}/follows/counts`, {
        params: {
          memberId: memberId,
        },
      })
      .then((res) => {
        setUserFollowInfo(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${import.meta.env.VITE_API_URL}/follows/followers`, {
        params: {
          memberId: memberId,
        },
      })
      .then((res) => {
        setUserFollowerList(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${import.meta.env.VITE_API_URL}/follows/followings`, {
        params: {
          memberId: memberId,
        },
      })
      .then((res) => {
        setUserFollowingList(res.data);
      })
      .catch((error) => console.log(error));
  }, [memberId]);

  return (
    <MyProfileContainer>
      {followerModal.showModal && (
        <PortalModal
          position={followerModal.modalPosition}
          onOutsideClick={followerModal.closeModal}
        >
          <FollowList list={userFollowerList} />
        </PortalModal>
      )}
      {followingModal.showModal && (
        <PortalModal
          position={followingModal.modalPosition}
          onOutsideClick={followingModal.closeModal}
        >
          <FollowList list={userFollowingList} />
        </PortalModal>
      )}
      <ProfileImageContainer>
        <img
          style={{ width: '100%' }}
          src={user.imageUrl}
          alt={user.userName}
        />
      </ProfileImageContainer>
      <UsernameContainer>{user.userName}</UsernameContainer>
      <UserEmailContainer>{user.email}</UserEmailContainer>
      <UserStatsContainer>
        <UserStatsItem>
          <UserStatsTitle>게시글</UserStatsTitle>
          <UserStatsNumber>{user.totalPostCount}</UserStatsNumber>
        </UserStatsItem>
        <UserStatsItem onClick={followerModal.openModal}>
          <UserStatsTitle>팔로워</UserStatsTitle>
          <UserStatsNumber>{userFollowerList.length}</UserStatsNumber>
        </UserStatsItem>
        <UserStatsItem onClick={followingModal.openModal}>
          <UserStatsTitle>팔로잉</UserStatsTitle>
          <UserStatsNumber>{userFollowingList.length}</UserStatsNumber>
        </UserStatsItem>
      </UserStatsContainer>
      <MyPageButton to="/mypage">내 프로필</MyPageButton>
    </MyProfileContainer>
  );
}

export default MyProfile;
