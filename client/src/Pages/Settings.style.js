import { styled } from 'styled-components';

export const SettingsMainContainer = styled.section`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

export const SettingsMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1024px;
  margin-top: 100px;
`;

export const SettingsTitle = styled.section`
  font-size: 24px;
  width: 100%;
`;

export const UserProfileContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 290px;
  border-bottom: 1px solid #d7d7d7;
  margin-top: 160px;
  width: 100%;
  margin-bottom: 30px;
`;

export const ProfileImageContainer = styled.section`
  border-radius: 70%;
  width: 150px;
  height: 150px;
  overflow: hidden;
  object-fit: cover;
`;

export const ProfileImageWrapper = styled.section`
  position: relative;
  margin-bottom: 30px;
`;

export const ProfileImageChangeButton = styled.button`
  position: absolute;
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 70%;
  background-color: black;
  color: white;
  cursor: pointer;
  bottom: 10px;
  right: 10px;
`;

export const UsernameSection = styled.section`
  display: flex;
  align-items: center;
`;

export const UsernameContainer = styled.section`
  font-size: 20px;
  font-weight: bold;
  margin-right: 5px;
`;

export const UsernameChangeButton = styled.button`
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  margin-bottom: 3px;
`;

export const PasswordChangeButton = styled.button`
  background: none;
  width: 110px;
  border: none;
  border-radius: 6px;
  color: #797979;
  cursor: pointer;
  padding: 15px;
  &:hover {
    background-color: #f6f6f6;
  }
`;

export const DeleteAccountButton = styled.button`
  width: 110px;
  background: none;
  border: none;
  border-radius: 6px;
  color: #ff5050;
  cursor: pointer;
  padding: 15px;
  &:hover {
    background-color: #f6f6f6;
  }
`;
