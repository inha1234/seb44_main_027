import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Grayscale, Color, Red } from '../color';

export const MyProfileContainer = styled.section`
  width: 100%;
  max-width: 300px;
  min-width: 260px;
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${Grayscale[20]};
  border-radius: 12px;
  margin-top: 36px;

  overflow: hidden;
`;

export const ProfileImageContainer = styled.section`
  width: 80px;
  height: 80px;
  border-radius: 70%;
  border: none;
  object-fit: cover;
  overflow: hidden;
  margin-bottom: 6px;
  margin-top: 40px;
`;

export const UsernameContainer = styled.section`
  font-size: 18px;
  font-weight: 800;
  color: ${Grayscale[80]};
  margin-top: 8px;
`;
export const UserEmailContainer = styled.section`
  font-size: 14px;
  font-weight: 400;
  color: ${Grayscale[60]};
  margin-top: 6px;
`;

export const UserStatsContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 46px;
  margin-bottom: 44px;
`;

export const UserStatsItem = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 74px;
  min-height: 47px;
  cursor: default;
`;

export const UserStatsTitle = styled.section`
  font-size: 10px;
  color: ${Grayscale[60]};
  margin-bottom: 6px;
`;

export const UserStatsNumber = styled.section`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
`;

export const MyPageButton = styled(Link)`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: ${Grayscale[60]};
  text-decoration: none;
  border-top: 1px solid ${Grayscale[20]};
  transition: color 0.1s ease-in, background-color 0.1s ease-in;

  &:hover {
    background-color: ${Color.Primary};
    color: ${Grayscale.White};
    font-weight: 800;
  }
`;
