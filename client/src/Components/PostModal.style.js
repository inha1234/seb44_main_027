import { styled } from "styled-components";

export const Modal = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const PostDetail = styled.div`
  width: auto;
  height: 75%;
  border-radius: 6px;
  background-color: #fff;
`;

export const PostImg = styled.div`
  width: 60%;
  > img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 1/1;
  }
`;
