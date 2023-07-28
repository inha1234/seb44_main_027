import { styled } from 'styled-components';

export const Main = styled.main`
  margin-left: 340px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
    margin-left: 224px;
  }
`;

export const Container = styled.div`
  width: 1100px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #dbdbdb;
`;
