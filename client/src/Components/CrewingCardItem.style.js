import { styled } from 'styled-components';

export const Card = {
  Container: styled.div`
    width: 100%;
    height: 210px;
    padding: 34px 16px;
    border-bottom: 1px solid #dbdbdb;
    display: flex;
    cursor: pointer;
  `,

  Img: styled.div`
    width: 138px;
    > img {
      display: block;
      width: 100%;
      object-fit: cover;
      aspect-ratio: 1/1;
      border-radius: 6px;
    }
  `,

  Info: styled.div`
    margin-left: 36px;
    flex-grow: 1;
  `,

  Author: styled.div`
    height: 32px;
    display: flex;
    align-items: center;
  `,

  AuthorProfile: styled.img`
    border-radius: 70%;
    display: block;
    width: 32px;
    object-fit: cover;
    aspect-ratio: 1/1;
  `,

  AuthorName: styled.div`
    margin-left: 12px;
    font-size: 16px;
    font-weight: 700;
    color: #000;
  `,

  AuthorCreateAt: styled.div`
    margin-left: 10px;
    font-size: 16px;
    font-weight: 400;
    color: #737373;
  `,

  Title: styled.div`
    margin-top: 14px;
    font-size: 18px;
    font-weight: 600;
    color: #000;
  `,
};
