import { useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {
  TabContainer,
  TabItem,
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
  MainContainer,
} from './ProfilePage.style';
import axios from 'axios';
import WorkoutSubBoard from './WorkoutSubBoard';
import DietSubBoard from './DietSubBoard';
import CrewingSubBoard from './CrewingSubBoard';
import Nav from '../Components/Nav';
import FollowButton from '../Components/FollowButton';
import useNotFoundPage from '../utils/hooks/useNotFoundPage';

import PortalModal from '../utils/PortalModal';
import FollowList from '../Components/FollowList';
import usePortalModal from '../utils/hooks/usePortalModal';
import CrewingTabContent from '../Components/CrewingTabContent';

function UserProfile() {
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem('memberId');
  const { memberId: profileMemberId } = useParams();
  const [user, setUser] = useState({
    imageUrl: '/images/defaultprofile.png',
    username: '_',
    totalPostsCount: 0,
  });
  const [userFollowInfo, setUserFollowInfo] = useState({});
  const [userFollowerList, setUserFollowerList] = useState([]);
  const [userFollowingList, setUserFollowingList] = useState([]);

  const followerModal = usePortalModal();
  const followingModal = usePortalModal();

  const [selectedTab, setSelectedTab] = useState('workout');
  const selectTab = (tab) => {
    setSelectedTab(tab);
  };

  const TabComponent = {
    workout: WorkoutSubBoard,
    diet: DietSubBoard,
    crewing: (props) => <CrewingTabContent {...props} category="crewing" />,
  };

  const SelectedTabComponent = TabComponent[selectedTab];

  const { notFound, NotFoundPage, handleNotFoundErrors } = useNotFoundPage();

  const fetchUser = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/members/${profileMemberId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
        handleNotFoundErrors(error);
      });
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
        console.log(userFollowerList);
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

  if (notFound) {
    return <NotFoundPage />;
  }

  return (
    <>
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
                <UserStatsItem onClick={followerModal.openModal}>
                  <UserStatTitle>팔로워</UserStatTitle>
                  <UserStatNumber>{userFollowerList.length}</UserStatNumber>
                </UserStatsItem>
                <UserStatsItem onClick={followingModal.openModal}>
                  <UserStatTitle>팔로잉</UserStatTitle>
                  <UserStatNumber>{userFollowingList.length}</UserStatNumber>
                </UserStatsItem>
              </UserStatsContainer>
            </UserInfoContainer>
          </UserProfileContainer>
          <TabContainer>
            <TabItem
              onClick={() => selectTab('workout')}
              isActive={selectedTab === 'workout'}
            >
              운동
            </TabItem>
            <TabItem
              onClick={() => selectTab('diet')}
              isActive={selectedTab === 'diet'}
            >
              식단
            </TabItem>
            <TabItem
              onClick={() => selectTab('crewing')}
              isActive={selectedTab === 'crewing'}
            >
              크루잉
            </TabItem>
          </TabContainer>
          <SelectedTabComponent memberId={profileMemberId} />
        </ProfilePageMain>
      </MainContainer>
    </>
  );
}

export default UserProfile;
