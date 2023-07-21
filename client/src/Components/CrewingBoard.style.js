import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BoardBox = styled.main`
  box-sizing: border-box;
  width: 704px;
  height: auto;
  background-color: #fff;
  padding: 24px 18px;
`;

export const Title = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 84px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 24px;

  > h1 {
    font-size: 20px;
    color: #000;
  }
`;

export const CardList = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Btn = styled(Link)`
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  background-color: #1a1a1a;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
`;
