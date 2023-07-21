import { styled } from 'styled-components';

export const Edit = {
  Container: styled.div`
    margin-left: 12px;
    width: 100%;
  `,
  Textarea: styled.textarea`
    border: 1px solid #000;
    outline: 0;
    resize: none;
    min-height: 32px;
    max-height: 64px;
    width: 100%;
    padding-top: 10px;
    padding-left: 10px;
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background: #ccc;
    }
  `,
};

export const Btn = {
  Container: styled.div`
    display: flex;
    justify-content: end;
  `,
  Edit: styled.button`
    border: 0;
    background-color: #fff;
    font-size: 14px;
    color: blue;
    cursor: pointer;
    margin-right: 4px;

    &:hover {
      font-weight: bold;
    }
  `,
  Cancel: styled.button`
    border: 0;
    background-color: #fff;
    font-size: 14px;
    color: #555;
    cursor: pointer;

    &:hover {
      font-weight: bold;
    }
  `,
};
