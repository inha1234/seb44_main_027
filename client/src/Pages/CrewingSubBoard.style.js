import styled from 'styled-components';

export const TabList = styled.section`
  display: flex;
  width: 100%;
`;

export const Tab = styled.section`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  color: ${({ isActive }) => (isActive ? 'black' : '#a8a8a8')};
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  border-bottom: ${({ isActive }) => (isActive ? '2px solid black' : 'none')};
`;
