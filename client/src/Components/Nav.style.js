import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Grayscale, Color, Red } from '../color';

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 340px;
  height: 100vh;
  position: fixed;
  padding: 36px 24px 0px 24px;
  border-right: 1px solid ${Grayscale[20]};
  transition: all 1s ease-in-out;

  @media (max-width: 1200px) {
    width: 244px;
  }
`;

export const NavLogoContainer = styled.section`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
`;

export const NavMenuList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;

export const NavMenuIcon = styled.div`
  color: ${Grayscale[40]};
  width: 30px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  transition: font-size 0.2s ease-in-out;
`;

export const NavMenuName = styled.section`
  font-size: 14px;
  font-weight: 600;
  margin-left: 18px;
  margin-top: 2px;
`;

export const NavMenuItem = styled(NavLink)`
  color: ${Grayscale[80]};
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding-left: 18px;

  margin: 4px 0;
  text-decoration: none;
  &:hover {
    background-color: ${Grayscale[20]};
    ${NavMenuIcon} {
      font-size: 26px;
    }
  }

  // NavLink 컴포넌트는 to prop과 현재 페이지의 경로인 location.pathname을 비교하여 자동으로 활성화 상태를 감지하고 active 클래스를 설정해줍니다.
  &.active {
    pointer-events: none;
    background-color: ${Grayscale[20]};
    ${NavMenuIcon} {
      color: ${Grayscale[80]};
    }
    ${NavMenuName} {
      font-weight: 800;
    }
  }
`;

export const ButtonContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: auto;
`;

export const CreateButtonIcon = styled.div`
  color: ${Grayscale.White};
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  transition: font-size 0.2s ease-in-out;
`;

export const CreateButton = styled(NavLink)`
  background-color: ${Color.Primary};
  font-weight: 600;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding-left: 18px;

  margin: 4px 0px 20px;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${Color.Primary2};
    ${CreateButtonIcon} {
      font-size: 34px;
    }
  }
`;

export const CreateButtonName = styled.section`
  color: ${Grayscale.White};
  font-size: 14px;
  font-weight: 600;
  margin-left: 18px;
  margin-top: 2px;
`;

export const LogoutButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  width: 100px;
  height: 56px;
  background-color: ${Grayscale.White};
  color: ${Grayscale[40]};
  margin-top: auto;
  margin-bottom: 16px;
  border-radius: 6px;
  padding: 16px;
  cursor: pointer;
  &:hover {
    color: ${Red[10]};
  }
`;
