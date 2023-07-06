import { styled } from "styled-components";

export const Container = styled.div`
  width: auto;
  max-width: 1364px;
  height: auto;
  border-radius: 6px;
  background-color: #fff;
  display: flex;
`;

export const PostImg = styled.div`
  width: 60%;
  min-width: 530px;
  > img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 1/1;
  }
`;

export const PostBody = styled.div`
  width: 530px;
  height: auto;
`;
