import { useEffect, useState } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import {
  LinksContainer,
  LinkItem,
  ProfilePictureContainer,
  UserInfoContainer,
  UserProfileContainer,
  UserStatsItem,
  UserStatTitle,
  UserStatNumber,
  UserStatsContainer,
  UsernameContainer,
  UsernameSection,
  ProfilePageMain,
  ProfilePageBody,
  MainContainer,
} from './ProfilePage.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import WorkoutSubBoard from './WorkoutSubBoard';
import DietSubBoard from './DietSubBoard';
import CrewingSubBoard from './CrewingSubBoard';
import Nav from '../Components/Nav';

function MyPage() {
  const memberId = sessionStorage.getItem('memberId');
  const [user, setUser] = useState({
    imageUrl: '/images/defaultprofile.png',
    username: 'Username',
    totalPostCount: 0,
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
    <ProfilePageBody>
      <Nav />
      <MainContainer>
        <ProfilePageMain>
          <UserProfileContainer>
            <ProfilePictureContainer>
              <img
                style={{ width: '100%' }}
                src={user.imageUrl}
                alt={user.username}
              />
            </ProfilePictureContainer>
            <UserInfoContainer>
              <UsernameSection>
                <UsernameContainer>{user.userName}</UsernameContainer>
                <Link to="/settings" style={{ color: 'black' }}>
                  <FontAwesomeIcon icon={faGear} />
                </Link>
              </UsernameSection>
              <UserStatsContainer>
                <UserStatsItem>
                  <UserStatTitle>게시글</UserStatTitle>
                  <UserStatNumber>{user.totalPostCount}</UserStatNumber>
                </UserStatsItem>
                <UserStatsItem>
                  <UserStatTitle>팔로워</UserStatTitle>
                  <UserStatNumber>{userFollowerList.length}</UserStatNumber>
                </UserStatsItem>
                <UserStatsItem>
                  <UserStatTitle>팔로잉</UserStatTitle>
                  <UserStatNumber>{userFollowingList.length}</UserStatNumber>
                </UserStatsItem>
              </UserStatsContainer>
            </UserInfoContainer>
          </UserProfileContainer>
          <LinksContainer>
            <LinkItem to="/mypage/workout">운동</LinkItem>
            <LinkItem to="/mypage/diet">식단</LinkItem>
            <LinkItem to="/mypage/crewing">크루잉</LinkItem>
          </LinksContainer>
          <Routes>
            <Route
              path="workout"
              element={<WorkoutSubBoard memberId={memberId} />}
            />
            <Route path="diet" element={<DietSubBoard memberId={memberId} />} />
            <Route
              path="crewing"
              element={<CrewingSubBoard memberId={memberId} />}
            />
            <Route path="/" element={<Navigate to="workout" replace />} />
          </Routes>
        </ProfilePageMain>
      </MainContainer>
    </ProfilePageBody>
  );
}

export default MyPage;
