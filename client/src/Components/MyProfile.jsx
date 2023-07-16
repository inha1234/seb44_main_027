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
} from './MyProfile.style';

function MyProfile() {
  const memberId = sessionStorage.getItem('memberId') || 3;
  const [user, setUser] = useState({
    imageUrl: '/images/defaultprofile.png',
    userName: 'Username',
    totalPostsCount: 0,
  });
  const [userFollowInfo, setUserFollowInfo] = useState({});
  const [userFollowerList, setUserFollowerList] = useState(
    new Array(5).fill({})
  ); // Mockup data
  const [userFollowingList, setUserFollowingList] = useState(
    new Array(3).fill({})
  ); // Mockup data
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/members/${memberId}`)
      .then((res) => {
        setUser(res.data);
        console.log(user);
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
        console.log(userFollowInfo);
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
        console.log(userFollowerList);
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
        console.log(userFollowingList);
      })
      .catch((error) => console.log(error));
  }, [memberId]);

  return (
    <MyProfileContainer>
      <ProfileImageContainer>
        <img
          style={{ width: '100%' }}
          src={user.imageUrl}
          alt={user.userName}
        />
      </ProfileImageContainer>
      <UsernameContainer>{user.userName}</UsernameContainer>
      <UserStatsContainer>
        <UserStatsItem>
          <UserStatsTitle>Posts</UserStatsTitle>
          <UserStatsNumber>{user.totalPostsCount}</UserStatsNumber>
        </UserStatsItem>
        <UserStatsItem>
          <UserStatsTitle>Followers</UserStatsTitle>
          <UserStatsNumber>{userFollowerList.length}</UserStatsNumber>
        </UserStatsItem>
        <UserStatsItem>
          <UserStatsTitle>Followings</UserStatsTitle>
          <UserStatsNumber>{userFollowingList.length}</UserStatsNumber>
        </UserStatsItem>
      </UserStatsContainer>
      <MyPageButton to="/mypage">내 프로필</MyPageButton>
    </MyProfileContainer>
  );
}

export default MyProfile;
