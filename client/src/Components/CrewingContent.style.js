import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding-right: 20px;
  justify-content: space-between;
`;

export const CrewingInfo = {
  Container: styled.div`
    margin-top: 20px;
  `,

  ActivityDate: styled.div`
    margin-bottom: 24px;
  `,

  DeadLine: styled.div`
    margin-bottom: 24px;
  `,

  PersonnelStatus: styled.div``,
};

export const Label = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
`;

export const Content = styled.div`
  font-size: 14px;
  color: #000;
`;

export const CrewingParticipationBtn = styled.button`
  border: 0;
  width: 138px;
  height: 48px;
  background-color: #222;
  color: #fff;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  top: 20px;
  left: 0;
  align-self: flex-end;

  &.closed {
    background-color: #bbb;
    cursor: not-allowed;
  }
`;
