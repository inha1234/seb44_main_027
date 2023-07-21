import { styled } from 'styled-components';

export const CommentContainer = styled.div`
  width: 100%;
  height: 1px;
  padding: 0px 10px 0px 20px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;

export const CommentList = styled.div`
  height: 100%;

  > ul {
    padding-right: 20px;
    height: 100%;
    list-style-type: none;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background: #ccc;
    }

    > li:first-child {
      margin-top: 20px;
    }

    > li:last-child {
      margin-bottom: 20px;
    }
  }
`;
