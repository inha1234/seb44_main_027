import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 340px;
  height: 100vh;
  position: fixed;
  border-right: 1px solid #dbdbdb;
`;

export const NavLogoContainer = styled.section`
  min-width: 290px;
  min-height: 70px;
  display: flex;
  align-items: center;
`;

export const NavMenuList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const NavMenuIcon = styled.div`
  color: ${({ isActive }) => (isActive ? 'black' : '#b0b0b0')};
  margin-right: 16px;
`;

export const NavMenuItem = styled(NavLink)`
  color: black;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 40px;
  margin: 4px 0;
  text-decoration: none;
  &:hover {
    background-color: #dbdbdb;
  }
  &.active {
    font-weight: bold;
    pointer-events: none;
    ${NavMenuIcon} {
      color: black;
    }
  }
`;

export const NavMenuName = styled.section`
  margin-left: 16px;
`;

export const ButtonContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: auto;
  margin-bottom: 16px;
`;

export const CreateButton = styled(NavLink)`
  display: flex;
  align-items: center;
  width: 290px;
  height: 55px;
  background-color: black;
  color: white;
  margin-bottom: 16px;
  border-radius: 6px;
  padding: 16px;
  text-decoration: none;
`;

export const CreateButtonName = styled.section`
  font-size: 16px;
  margin-left: 16px;
  margin-top: 4px;
`;

export const LogoutButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: 290px;
  height: 55px;
  background-color: white;
  color: black;
  margin-top: auto;
  margin-bottom: 24px;
  border-radius: 6px;
  padding: 16px;
  cursor: pointer;
  &:hover {
    background-color: #f6f6f6;
  }
`;
