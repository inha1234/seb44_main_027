import { useEffect, useState } from 'react';
import Nav from '../Components/Nav';
import {
  DeleteAccountButton,
  PasswordChangeButton,
  ProfileImageChangeButton,
  ProfileImageContainer,
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
function Settings() {
  const memberId = sessionStorage.getItem(memberId);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/members/${memberId}`)
      .then((res) => {
        setUser(res.data);
        console.log(user);
      })
      .catch((error) => console.log(error));
  });

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
      <SettingsMainContainer>
        <SettingsMain>
          <SettingsTitle>프로필 편집</SettingsTitle>
          <UserProfileContainer>
            <ProfileImageChangeButton>
              <FontAwesomeIcon icon={faPen} />
            </ProfileImageChangeButton>
            <ProfileImageContainer>
              <img src={user.imageUrl} alt={'userProfileImage'} />
            </ProfileImageContainer>
            <UsernameSection>
              <UsernameContainer>{user.username}</UsernameContainer>
              <UsernameChangeButton>
                <FontAwesomeIcon icon={faPen} />
              </UsernameChangeButton>
            </UsernameSection>
          </UserProfileContainer>
          <PasswordChangeButton>비밀번호 변경</PasswordChangeButton>
          <DeleteAccountButton>회원 탈퇴</DeleteAccountButton>
        </SettingsMain>
      </SettingsMainContainer>
    </>
  );
}

export default Settings;
