import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MyProfileContainer = styled.section`
  width: 320px;
  height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  margin-top: 24px;
`;

export const ProfileImageContainer = styled.section`
  width: 80px;
  height: 80px;
  border-radius: 70%;
  border: none;
  object-fit: cover;
  overflow: hidden;
  margin-bottom: 10px;
`;

export const UsernameContainer = styled.section`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 50px;
`;

export const UserStatsContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
`;

export const UserStatsItem = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 72px;
  margin: 8px;
  cursor: default;
`;

export const UserStatsTitle = styled.section`
  font-size: 14px;
  color: #999999;
  margin-bottom: 6px;
`;

export const UserStatsNumber = styled.section`
  font-size: 20px;
  font-weight: bold;
`;

export const MyPageButton = styled(Link)`
  width: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  color: white;
  text-decoration: none;
  padding: 16px;
`;
