import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const PostContainer = styled.section`
  width: 530px;
  max-height: 300px;
  padding: 30px 10px 30px 30px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dbdbdb;
`;

export const Author = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AuthorInfo = {
  Container: styled.div`
    display: flex;
    align-items: center;
  `,
  CreateAt: styled.div`
    font-size: 16px;
    font-weight: normal;
    color: #737373;
    margin-left: 10px;
  `,
  Profile: styled(Link)`
    cursor: pointer;
    display: flex;
    align-items: center;

    > img {
      width: 32px;
      border-radius: 70%;
      object-fit: cover;
      aspect-ratio: 1/1;
    }
  `,
  AuthorName: styled(Link)`
    font-size: 16px;
    font-weight: bold;
    color: #000;
    margin-left: 12px;
    text-decoration: none;
    cursor: pointer;
  `,
};

export const Title = styled.div`
  font-size: 18px;
  color: #000;
  font-weight: 600;
  margin-bottom: 16px;
  margin-top: 34px;
`;

export const Text = styled.div`
  padding-right: 20px;
  font-size: 14px;
  color: #000;
  line-height: 1.4;
  font-weight: normal;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;
