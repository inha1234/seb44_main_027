import { styled } from 'styled-components';

export const Card = {
  Container: styled.div`
    width: 100%;
    padding-bottom: 24px;
    border-bottom: 1px solid #dbdbdb;
  `,
  Author: styled.div`
    margin-top: 40px;
    margin-bottom: 16px;
    display: flex;
    > img {
      width: 32px;
      height: 32px;
      object-fit: cover;
      aspect-ratio: 1/1;
      border-radius: 70%;
    }
  `,

  UserInfo: styled.div`
    display: flex;
    align-items: center;

    > p {
      font-size: 16px;
      font-weight: 700;
      margin-left: 12px;
    }

    > span {
      font-size: 16px;
      font-weight: 500;
      color: #737373;
      margin-left: 10px;
    }
  `,

  Img: styled.div`
    > img {
      display: block;
      width: 100%;
      object-fit: cover;
      aspect-ratio: 1/1;
      border-radius: 6px;
    }
  `,

  Title: styled.div`
    font-size: 18px;
    font-weight: 700;
    margin-top: 30px;
  `,

  Content: styled.div`
    font-size: 16px;
    margin-top: 16px;
    height: auto;
    max-height: 40px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  `,

  Add: styled.div`
    margin-top: 6px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #737373;
    font-weight: 500;

    > button {
      cursor: pointer;
      background: none;
      border: 0;
    }
  `,
};

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
    display: flex;
    align-items: center;
  `,
  LinkContainer: styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Profile: styled.section`
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
  AuthorName: styled.section`
    font-size: 16px;
    font-weight: bold;
    color: #000;
    margin-left: 12px;
    text-decoration: none;
    cursor: pointer;
  `,
};
