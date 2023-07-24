import { styled } from 'styled-components';

export const Main = styled.main`
  margin-left: 340px;
  margin-right: 30px;

  display: flex;
  justify-content: center;
  transition: all 1s ease-in-out;

  @media (max-width: 1200px) {
    margin-left: 244px;
  }
`;
