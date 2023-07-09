import { styled } from 'styled-components';

export const Item = {
  Container: styled.li`
    width: 100%;
    display: flex;
    margin-bottom: 18px;
  `,
  Profile: styled.img`
    width: 32px;
    height: 32px;
    border-radius: 70%;
    object-fit: cover;
    aspect-ratio: 1/1;
  `,
  Content: styled.div`
    margin-left: 12px;
  `,
};

export const Content = {
  Info: styled.div`
    width: 100%;
  `,
  CreateAt: styled.div`
    font-size: 12px;
    color: #737373;
    font-weight: 400;
    margin-top: 4px;
  `,
};

export const Info = {
  Name: styled.span`
    font-size: 14px;
    font-weight: 700;
  `,
  Content: styled.span`
    margin-left: 6px;
    font-size: 14px;
    font-weight: 400;
  `,
};
