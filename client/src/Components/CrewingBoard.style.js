import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Grayscale, Red, Color } from '../color';

export const BoardBox = styled.main`
  box-sizing: border-box;
  max-width: 704px;
  height: auto;
  background-color: #fff;
  padding: 0px 30px 24px;
`;

export const Title = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 106px;
  padding: 0 4px 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid ${Grayscale[20]};
  margin-bottom: 56px;

  > h1 {
    font-size: 18px;
    font-weight: 400;
    color: ${Grayscale[80]};
  }
`;

export const CardList = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Btn = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.Primary};
  text-decoration: none;
  cursor: pointer;
  margin-bottom: 4px;
  margin-right: 18px;
  transition: all 0.3s ease-in-out;

  &:hover {
    margin-bottom: 6px;
    font-weight: 800;
  }
`;
