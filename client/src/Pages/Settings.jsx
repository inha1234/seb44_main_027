import { useEffect, useState } from 'react';
import Nav from '../Components/Nav';
import {
  DeleteAccountButton,
  PasswordChangeButton,
  ProfileImageChangeButton,
  ProfileImageContainer,
  ProfileImageWrapper,
  SettingsMain,
  SettingsMainContainer,
  SettingsTitle,
  UserProfileContainer,
  UsernameChangeButton,
  UsernameContainer,
  UsernameSection,
} from './Settings.style';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import UsernameModal from '../Components/UsernameModal';
import DeleteModal from '../Components/DeleteModal';
import PasswordModal from '../Components/PasswordModal';
import ProfileModal from '../Components/ProfileModal';

function Settings() {
  const memberId = localStorage.getItem('memberId');
  const [user, setUser] = useState({
    imageUrl: '/images/defaultprofile.png',
    username: 'default',
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/members/${memberId}`)
      .then((res) => {
        setUser(res.data);
        console.log(user);
      })
      .catch((error) => console.log(error));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState({
    profile: false,
    username: false,
    password: false,
    delete: false,
  });

  const toggleModal = (type) => {
    setIsModalOpen({ ...isModalOpen, [type]: !isModalOpen[type] });
  };

  return (
    <>
      <Nav />
      {isModalOpen.profile && (
        <ProfileModal
          isModalOpen={isModalOpen.profile}
          handleModalToggle={() => toggleModal('profile')}
          memberId={memberId}
        />
      )}
      {isModalOpen.username && (
        <UsernameModal
          isModalOpen={isModalOpen.username}
          handleModalToggle={() => toggleModal('username')}
          memberId={memberId}
        />
      )}
      {isModalOpen.password && (
        <PasswordModal
          isModalOpen={isModalOpen.password}
          handleModalToggle={() => toggleModal('password')}
          memberId={memberId}
        />
      )}
      {isModalOpen.delete && (
        <DeleteModal
          isModalOpen={isModalOpen.delete}
          handleModalToggle={() => toggleModal('delete')}
          memberId={memberId}
        />
      )}
      <SettingsMainContainer>
        <SettingsMain>
          <SettingsTitle>프로필 편집</SettingsTitle>
          <UserProfileContainer>
            <ProfileImageWrapper>
              <ProfileImageChangeButton onClick={() => toggleModal('profile')}>
                <FontAwesomeIcon icon={faPen} />
              </ProfileImageChangeButton>
              <ProfileImageContainer>
                <img
                  style={{ width: '100%' }}
                  src={user.imageUrl}
                  alt={'userProfileImage'}
                />
              </ProfileImageContainer>
            </ProfileImageWrapper>

            <UsernameSection>
              <UsernameContainer>{user.userName}</UsernameContainer>
              <UsernameChangeButton onClick={() => toggleModal('username')}>
                <FontAwesomeIcon icon={faPen} />
              </UsernameChangeButton>
            </UsernameSection>
          </UserProfileContainer>
          <PasswordChangeButton onClick={() => toggleModal('password')}>
            비밀번호 변경
          </PasswordChangeButton>
          <DeleteAccountButton onClick={() => toggleModal('delete')}>
            회원 탈퇴
          </DeleteAccountButton>
        </SettingsMain>
      </SettingsMainContainer>
    </>
  );
}

export default Settings;
