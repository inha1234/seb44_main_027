import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const PostContainer = styled.section`
  width: 100%;
  height: 45%;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

export const Author = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;

  > .createdAt {
    font-size: 16px;
    font-weight: normal;
    color: #737373;
    margin-left: 10px;
  }
`;

export const Profile = styled(Link)`
  cursor: pointer;
  > img {
    width: 32px;
    border-radius: 70%;
    object-fit: cover;
    aspect-ratio: 1/1;
  }
`;

export const AuthorName = styled(Link)`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-left: 12px;
  text-decoration: none;
  cursor: pointer;
`;

export const Title = styled.div`
  font-size: 18px;
  color: #000;
  font-weight: 600;
  margin-bottom: 16px;
  margin-top: 34px;
`;

export const Text = styled.div`
  font-size: 14px;
  color: #000;
  font-weight: normal;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
