import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import {
  ButtonContainer,
  CreateButton,
  CreateButtonName,
  LogoutButton,
  NavContainer,
  NavLogoContainer,
  NavMenuIcon,
  NavMenuItem,
  NavMenuList,
  NavMenuName,
} from './Nav.style';
import useLogout from '../utils/hooks/useLogout';

function Nav() {
  const location = useLocation();
  const logout = useLogout();

  return (
    <NavContainer>
      <NavLogoContainer>Here goes the logo</NavLogoContainer>
      <NavMenuList>
        <NavMenuItem to="/" isActive={location.pathname === '/'}>
          <NavMenuIcon isActive={location.pathname === '/'}>
            <FontAwesomeIcon icon={faHouse} />
          </NavMenuIcon>
          <NavMenuName>홈</NavMenuName>
        </NavMenuItem>
        <NavMenuItem to="/workout" isActive={location.pathname === '/workout'}>
          <NavMenuIcon isActive={location.pathname === '/workout'}>
            <FontAwesomeIcon icon={faPersonRunning} />
          </NavMenuIcon>
          <NavMenuName>운동</NavMenuName>
        </NavMenuItem>
        <NavMenuItem to="/diet" isActive={location.pathname === '/diet'}>
          <NavMenuIcon isActive={location.pathname === '/diet'}>
            <FontAwesomeIcon icon={faUtensils} />
          </NavMenuIcon>
          <NavMenuName>식단</NavMenuName>
        </NavMenuItem>
        <NavMenuItem to="/crewing" isActive={location.pathname === '/crewing'}>
          <NavMenuIcon isActive={location.pathname === '/crewing'}>
            <FontAwesomeIcon icon={faPeopleGroup} />
          </NavMenuIcon>
          <NavMenuName>크루잉</NavMenuName>
        </NavMenuItem>
      </NavMenuList>
      <ButtonContainer>
        <CreateButton to="/create">
          <FontAwesomeIcon icon={faSquarePlus} size="2x" />
          <CreateButtonName>만들기</CreateButtonName>
        </CreateButton>
        <LogoutButton onClick={logout}>로그아웃</LogoutButton>
      </ButtonContainer>
    </NavContainer>
  );
}

export default Nav;
