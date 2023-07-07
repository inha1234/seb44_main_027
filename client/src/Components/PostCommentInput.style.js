import { styled } from "styled-components";

export const InputContainer = styled.div`
  width: 530px;
  height: auto;
  min-height: 62px;
  max-height: 100px;
  padding: 15px 20px;
  display: flex;
  border-top: 1px solid #dbdbdb;

  > img {
    width: 32px;
    height: 32px;
    border-radius: 70%;
    object-fit: cover;
    aspect-ratio: 1/1;
  }

  > div {
    font-size: 14px;
    flex-grow: 1;
    margin: 0px 18px;

    > textarea {
      border: 0;
      outline: 0;
      resize: none;
      min-height: 32px;
      max-height: 64px;
      width: 100%;
      padding-top: 10px;
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: #ccc;
      }
    }
  }

  > button {
    font-size: 14px;
    border: 0;
    outline: 0;
    background-color: #fff;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      color: #737373;
    }
  }
`;
