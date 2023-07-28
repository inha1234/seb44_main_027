import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import WorkoutSubBoard from './WorkoutSubBoard';
import DietSubBoard from './DietSubBoard';
import CrewingSubBoard from './CrewingSubBoard';
import Nav from '../Components/Nav';

import PortalModal from '../utils/PortalModal';
import FollowList from '../Components/FollowList';
import usePortalModal from '../utils/hooks/usePortalModal';

function MyPage() {
  const memberId = localStorage.getItem('memberId');
  const [user, setUser] = useState({
    imageUrl: '/images/defaultprofile.png',
    username: '_',
    totalPostCount: 0,
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
    crewing: CrewingSubBoard,
  };

  const SelectedTabComponent = TabComponent[selectedTab];

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
    <>
      <Nav />
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
          <SelectedTabComponent memberId={memberId} />
        </ProfilePageMain>
      </MainContainer>
    </>
  );
}

export default MyPage;
