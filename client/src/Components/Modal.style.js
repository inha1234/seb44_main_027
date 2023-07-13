import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ModalBackdrop = styled.section`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const ProfileModalContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 440px;
  height: 600px;
  border-radius: 6px;
  z-index: 2;
`;

export const UsernameModalContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 630px;
  height: 360px;
  border-radius: 6px;
  z-index: 2;
`;

export const PasswordModalContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 630px;
  height: 550px;
  border-radius: 6px;
  z-index: 2;
`;

export const DeleteModalContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 630px;
  height: 440px;
  border-radius: 6px;
  z-index: 2;
`;

export const ModalButton = styled.button`
  width: 140px;
  height: 50px;
  border: none;
  color: white;
  background-color: black;
  font-size: 16px;
  cursor: pointer;
  &:disabled {
    background-color: darkgray;
    border: 1px solid darkgray;
    cursor: not-allowed;
  }
`;

export const ModalInput = styled.input`
  width: 476px;
  height: 60px;
  border: 1px solid #7a7a7a;
  font-size: 14px;
  padding: 20px;
`;

export const ModalHeading = styled.section`
  font-size: 18px;
  font-weight: 600;
  max-width: 473px;
  min-width: 334px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalSubHeading = styled.section`
  font-size: 14px;
  max-width: 473px;
  min-width: 334px;
  color: #8c8c8c;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalCloseButton = styled(FontAwesomeIcon)`
  font-size: 15px;
  color: black;
  position: absolute;
  top: ${({ top }) => top || '40px'};
  right: ${({ right }) => right || '40px'};
  cursor: pointer;
`;
