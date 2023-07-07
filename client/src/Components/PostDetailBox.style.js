import { styled } from "styled-components";

export const Container = styled.div`
  width: auto;
  max-width: 1364px;
  height: auto;
  border-radius: 6px;
  background-color: #fff;
  display: flex;
  overflow: hidden;
`;

export const PostImg = styled.div`
  width: 100%;
  min-width: 530px;
  flex-grow: 1;
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
  flex-shrink: 0;
  width: 530px;
  display: flex;
  flex-direction: column;
`;
