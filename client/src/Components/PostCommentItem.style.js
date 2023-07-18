import { styled } from 'styled-components';

export const Item = {
  Container: styled.li`
    width: 100%;
    display: flex;
    margin-bottom: 18px;
  `,
  Profile: styled.div`
    width: 32px;
    height: 32px;
  `,
  Img: styled.img`
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 70%;
    object-fit: cover;
    aspect-ratio: 1/1;
  `,
};
