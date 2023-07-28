import { styled } from 'styled-components';
import { Grayscale, Red, Color } from '../color';

export const Card = {
  Container: styled.div`
    width: 100%;
    padding-bottom: 24px;
    border-bottom: 1px solid ${Grayscale[20]};
    margin-bottom: 40px;
  `,
  Author: styled.div`
    margin-bottom: 16px;
    display: flex;
    /* > img {
      width: 32px;
      height: 32px;
      object-fit: cover;
      aspect-ratio: 1/1;
      border-radius: 70%;
    } */
  `,

  // UserInfo: styled.div`
  //   display: flex;
  //   align-items: center;

  //   > p {
  //     font-size: 16px;
  //     font-weight: 700;
  //     margin-left: 12px;
  //   }

  //   > span {
  //     font-size: 16px;
  //     font-weight: 500;
  //     color: #737373;
  //     margin-left: 10px;
  //   }
  // `,

  Img: styled.div`
    > img {
      display: block;
      width: 100%;
      object-fit: cover;
      aspect-ratio: 1/1;
      border-radius: 12px;
      border: 1px solid ${Grayscale[20]};
    }
  `,

  Title: styled.div`
    font-size: 16px;
    font-weight: 600;
    margin-top: 30px;
  `,

  Content: styled.div`
    font-size: 14px;
    font-weight: 400;
    margin-top: 16px;
    height: auto;
    max-height: 40px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    line-height: 1.4;
  `,

  Add: styled.div`
    margin-top: 6px;
    display: flex;

    > div {
      font-size: 14px;
      font-weight: 400;
      color: ${Grayscale[60]};
    }

    > button {
      cursor: pointer;
      background: none;
      color: ${Grayscale[60]};
      border: 0;
      font-size: 14px;
      font-weight: 400;
      margin-left: 6px;
    }
  `,
};

export const AuthorInfo = {
  Container: styled.div`
    display: flex;
    align-items: center;
  `,
  CreateAt: styled.div`
    font-size: 14px;
    font-weight: 400;
    color: ${Grayscale[60]};
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
    font-weight: 600;
    color: ${Grayscale[80]};
    margin-left: 12px;
    text-decoration: none;
    cursor: pointer;
  `,
};
