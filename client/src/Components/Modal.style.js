import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ModalBackdrop = styled.section`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const ProfileModalContainer = styled.section`
  position: relative;
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
  position: relative;
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
  position: relative;
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
  position: relative;
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
  border: 1px solid black;
  color: white;
  background-color: black;
  border-radius: 6px;
  font-size: 16px;
  margin: 40px;
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
  border-radius: 4px;
  font-size: 14px;
  padding: 20px;
  margin: 9px;
`;

export const InvalidInputIndicator = styled.section`
  width: 476px;
  height: 16px;
  color: crimson;
  padding-left: 10px;
`;

export const ModalHeadingContainer = styled.section`
  margin-bottom: 30px;
  margin-top: 20px;
`;

export const ModalHeading = styled.section`
  font-size: 18px;
  font-weight: 600;
  max-width: 473px;
  min-width: 334px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.5;
`;

export const ModalSubHeading = styled.section`
  font-size: 14px;
  max-width: 473px;
  min-width: 334px;
  color: #8c8c8c;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  text-align: center;
`;

export const ModalCloseButton = styled(FontAwesomeIcon)`
  position: absolute;
  font-size: 20px;
  color: black;
  top: ${({ top }) => top || '20px'};
  right: ${({ right }) => right || '20px'};
  cursor: pointer;
`;

export const ButtonContainer = styled.section`
  display: flex;
  position: absolute;
  bottom: 10%;
  z-index: 10;
  bottom: 0;
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin: 5px;
  padding: 8px;
  border-radius: 50%;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: limegreen;
    color: white;
  }
`;

export const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: white;
  color: black;
  padding: 8px;
  border-radius: 50%;
  margin: 5px;
  border: none;
  &:hover {
    background-color: red;
    color: white;
  }
`;

export const ProfileModalImageTemplate = styled.section`
  border: 2px dashed #c1c1c1;
  border-radius: 70%;
  width: 250px;
  height: 250px;
  display: inline-block;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  overflow: hidden;
`;

export const ProfileModalCroppedImage = styled.section`
  border: none;
  border-radius: 70%;
  width: 250px;
  height: 250px;
  display: inline-block;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  overflow: hidden;
`;

export const UploadArea = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ModalInputContainer = styled.section`
  display: flex;
  align-items: center;
`;
