import { styled } from 'styled-components';
import { Grayscale, Color } from '../color';

export const Container = styled.div`
  width: auto;
  max-width: 1364px;
  min-height: 800px;
  border-radius: 6px;
  background-color: #fff;
  display: flex;
  overflow: hidden;
`;

export const PostImg = styled.div`
  width: 100%;
  min-width: 530px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  background-color: ${Grayscale[80]};

  > img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 1/1;
  }
`;

export const PostBody = styled.div`
  /* width: 530px; */
  /* flex-shrink: 0; */
  min-width: 420px;
  display: flex;
  flex-direction: column;
`;
