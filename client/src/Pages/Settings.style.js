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
`;

export const SettingsTitle = styled.section`
  font-size: 24px;
  width: 100%;
`;

export const UserProfileContainer = styled.section`
  width: 100%;
  height: 290px;
  border-bottom: 1px solid #d7d7d7;
`;

export const ProfileImageContainer = styled.section`
  border-radius: 70%;
  width: 150px;
  height: 150px;
  overflow: hidden;
`;

export const ProfileImageChangeButton = styled.button`
  border: none;
  border-radius: 70%;
  background-color: black;
  color: white;
  cursor: pointer;
`;

export const UsernameSection = styled.section``;

export const UsernameContainer = styled.section`
  font-size: 20px;
  font-weight: bold;
`;

export const UsernameChangeButton = styled.button`
  background: none;
  border: none;
  color: black;
  cursor: pointer;
`;

export const PasswordChangeButton = styled.button`
  background: none;
  border: none;
  color: #797979;
  cursor: pointer;
`;

export const DeleteAccountButton = styled.button`
  background: none;
  border: none;
  color: #ff5050;
  cursor: pointer;
`;
