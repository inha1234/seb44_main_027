import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Modal = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const PostDetail = styled.div`
  margin: 0 100px;
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

export const CloseBtn = styled(FontAwesomeIcon)`
  font-size: 28px;
  color: #fff;
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;
`;
