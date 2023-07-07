import { styled } from "styled-components";

// 임시네비영역
export const Nav = styled.nav`
  width: 340px;
  height: 100%;
  position: fixed;
  top: 0;
  border: 1px solid #ddd;
`;

export const Main = styled.main`
  margin-left: 340px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 1100px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #dbdbdb;
`;
