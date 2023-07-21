import { styled } from 'styled-components';

export const Btn = {
  Container: styled.div`
    display: inline-block;
    margin-left: 10px;
  `,
  Edit: styled.button`
    border: 0;
    background-color: #fff;
    font-size: 12px;
    color: #555;
    cursor: pointer;
    margin-right: 4px;

    &:hover {
      color: #555;
      font-weight: bold;
    }
  `,
  Delete: styled.button`
    border: 0;
    background-color: #fff;
    font-size: 12px;
    color: #f21f1f;
    cursor: pointer;

    &:hover {
      font-weight: bold;
    }
  `,
};
