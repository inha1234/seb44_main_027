import styled from 'styled-components';

export const ModalContainer = styled.section`
  width: 13rem;
  max-height: 10rem;
  overflow-y: auto;
  background-color: white;
  padding: 0.5rem 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;
export const EmptyListIndicator = styled.section`
  color: #b0b0b0;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EmptyListHeading = styled.section`
  margin: 0.2rem;
  font-size: 2rem;
`;
export const EmptyListSubHeading = styled.section`
  font-size: 1rem;
`;

export const ModalList = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ListItemContainer = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  /* border-bottom: 1px dotted #ededed;
  &:last-child {
    border-bottom: none;
  } */
  &:hover {
    background-color: #f8f8f8;
    cursor: pointer;
  }
`;

export const ListItemProfileImage = styled.section`
  border-radius: 70%;
  width: 2rem;
  height: 2rem;
  overflow: hidden;
  object-fit: cover;
  margin-right: 1rem;
`;

export const ListItemUsername = styled.section`
  font-weight: bold;
`;
