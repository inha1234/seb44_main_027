import { styled } from "styled-components";

export const ItemList = styled.li`
  width: 100%;
  display: flex;
  margin-bottom: 18px;

  > img {
    width: 32px;
    height: 32px;
    border-radius: 70%;
    object-fit: cover;
    aspect-ratio: 1/1;
  }
`;

export const ItemContent = styled.div`
  margin-left: 12px;

  > div > .name {
    font-size: 14px;
    font-weight: 700;
  }

  > div > .content {
    margin-left: 6px;
    font-size: 14px;
    font-weight: 400;
  }

  > .createAt {
    font-size: 12px;
    color: #737373;
    font-weight: 400;
    margin-top: 4px;
  }
`;
