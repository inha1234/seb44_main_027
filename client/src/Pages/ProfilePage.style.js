import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const ProfilePageBody = styled.section`
  display: flex;
`;

export const MainContainer = styled.section`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

export const ProfilePageMain = styled.main`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
  margin-left: 340px;
  width: 1024px;
`;
export const UserProfileContainer = styled.section`
  display: flex;
  width: 100%;
  height: 250px;
  justify-content: center;
  align-items: center;
`;

export const ProfilePictureContainer = styled.section`
  border-radius: 70%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  overflow: hidden;
  margin-left: 84px;
`;

export const UserInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 700px;
  margin-left: 60px;
`;

export const UsernameSection = styled.section`
  display: flex;
  align-items: center;
  color: black;
  margin-bottom: 50px;
`;

export const UsernameContainer = styled.section`
  font-size: 20px;
  font-weight: bold;
  margin-right: 5px;
`;

export const UserStatsContainer = styled.section`
  display: flex;
  justify-content: space-between;
  width: 300px;
  font-size: 20px;
`;

export const UserStatsItem = styled.section`
  display: flex;
  margin-right: 30px;
  cursor: default;
`;

export const UserStatTitle = styled.section`
  margin-right: 6px;
  width: 60px;
`;

export const UserStatNumber = styled.section`
  font-weight: bold;
  width: 45px;
`;

export const LinksContainer = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`;

export const LinkItem = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 45px;
  color: #a8a8a8;
  text-decoration: none;
  font-size: 20px;
  &.active {
    font-weight: bold;
    pointer-events: none;
    color: black;
    border-bottom: 2px solid black;
  }
`;
