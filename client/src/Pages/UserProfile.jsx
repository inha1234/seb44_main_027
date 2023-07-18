import { useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
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
import axios from 'axios';
import WorkoutSubBoard from './WorkoutSubBoard';
import DietSubBoard from './DietSubBoard';
import CrewingSubBoard from './CrewingSubBoard';
import Nav from '../Components/Nav';
import FollowButton from '../Components/FollowButton';

function UserProfile() {
  const navigate = useNavigate();
  const loggedInUserId = sessionStorage.getItem('memberId');
  const { memberId: profileMemberId } = useParams();
  const [user, setUser] = useState({
    imageUrl: '/images/defaultprofile.png',
    username: 'Username',
    totalPostsCount: 10,
  }); // Mockup data
  const [userFollowInfo, setUserFollowInfo] = useState({});
  const [userFollowerList, setUserFollowerList] = useState(
    new Array(5).fill({})
  ); // Mockup data
  const [userFollowingList, setUserFollowingList] = useState(
    new Array(3).fill({})
  ); // Mockup data

  const fetchUser = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/members/${profileMemberId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchFollowInfo = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/follows/counts`, {
        params: {
          memberId: profileMemberId,
        },
      })
      .then((res) => {
        setUserFollowInfo(res.data);
      })
      .catch((error) => console.log(error));
  };

  const updateFollowerList = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/follows/followers`, {
        params: {
          memberId: profileMemberId,
        },
      })
      .then((res) => {
        setUserFollowerList(res.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchFollowingList = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/follows/followings`, {
        params: {
          memberId: profileMemberId,
        },
      })
      .then((res) => {
        setUserFollowingList(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (loggedInUserId === profileMemberId) {
      navigate('/mypage');
    }
    fetchUser();
    fetchFollowInfo();
    updateFollowerList();
    fetchFollowingList();
  }, [profileMemberId]);

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
                alt={user.userName}
              />
            </ProfilePictureContainer>
            <UserInfoContainer>
              <UsernameSection>
                <UsernameContainer>{user.userName}</UsernameContainer>
                <FollowButton
                  profileUserId={profileMemberId}
                  updateFollowerList={updateFollowerList}
                />
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
            <LinkItem to="workout">운동</LinkItem>
            <LinkItem to="diet">식단</LinkItem>
            <LinkItem to="crewing">크루잉</LinkItem>
          </LinksContainer>
          <Routes>
            <Route
              path="workout"
              element={<WorkoutSubBoard memberId={profileMemberId} />}
            />
            <Route
              path="diet"
              element={<DietSubBoard memberId={profileMemberId} />}
            />
            <Route
              path="crewing"
              element={<CrewingSubBoard memberId={profileMemberId} />}
            />
            <Route path="/" element={<Navigate to="workout" replace />} />
          </Routes>
        </ProfilePageMain>
      </MainContainer>
    </ProfilePageBody>
  );
}

export default UserProfile;
