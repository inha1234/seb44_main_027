import { styled } from 'styled-components';

export const AuthorityBtn = {
  Container: styled.div`
    margin-right: 20px;
  `,
  Edit: styled.button`
    border: 0;
    background-color: #fff;
    font-size: 14px;
    color: #555;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
      color: #555;
      font-weight: bold;
    }
  `,
  Delete: styled.button`
    border: 0;
    background-color: #fff;
    font-size: 14px;
    color: #f21f1f;
    cursor: pointer;

    &:hover {
      font-weight: bold;
    }
  `,
};
