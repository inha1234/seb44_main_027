import { styled } from 'styled-components';
import { Grayscale, Color, Red } from '../color';

export const Container = styled.div`
  padding: 20px 0px 0px;
  margin-right: 20px;
`;

export const CrewingInfo = {
  Container: styled.div``,

  ActivityDate: styled.div`
    display: flex;
    margin-bottom: 10px;
  `,

  DeadLine: styled.div`
    display: flex;

    margin-bottom: 10px;
  `,

  PersonnelStatus: styled.div`
    display: flex;
  `,
};

export const Label = styled.div`
  font-size: 14px;
  color: ${Grayscale[60]};
  font-weight: 400;
  margin-bottom: 6px;
`;

export const Content = styled.div`
  margin-left: 14px;
  font-size: 14px;
  font-weight: 600;
  color: ${Grayscale[80]};
`;
export const CrewingParticipation = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  justify-content: start;
`;

export const CrewingParticipationBtn = styled.button`
  border: 0;
  width: 100%;
  height: 48px;

  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-end;

  &.apply {
    background-color: ${Color.Primary};
    color: ${Grayscale.White};

    &:hover {
      background-color: ${Color.Primary2};
    }
  }

  &.cancel {
    background-color: ${Grayscale.White};
    border: 1px solid ${Red[10]};
    color: ${Red[10]};

    &:hover {
      background-color: ${Grayscale[20]};
    }
  }

  &.close {
    background-color: ${Grayscale[40]};
    color: ${Grayscale.White};
    cursor: not-allowed;
  }
`;
