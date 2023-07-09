import { styled } from 'styled-components';

export const Item = {
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
