import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const SignUpInputContainer = styled.section`
  width: 345px;
`;

export const SignUpHeading = styled.section`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 70px;
`;

export const InputWithTitle = styled.section`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  width: 345px;
  height: 90px;
  margin-bottom: 33px;
`;

export const InputHeading = styled.section`
  margin-bottom: 16px;
`;

export const InputWithButtonContainer = styled.section`
  display: flex;
  width: 345px;
  align-items: center;
`;

export const InputAreaDefault = styled.input`
  font-size: 20px;
  width: 345px;
  height: 60px;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid black;
`;

export const InputAreaShort = styled.input`
  font-size: 20px;
  width: 253px;
  height: 60px;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid black;
`;

export const CheckDuplicateButton = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100px;
  height: 65px;
  border-radius: 4px;
  margin-left: 10px;
  border: 1px solid black;
  cursor: pointer;
  &:disabled {
    background-color: darkgray;
    border: 1px solid darkgray;
    cursor: not-allowed;
  }
`;

export const InvalidInputIndicator = styled.section`
  margin: 4px;
  color: crimson;
  height: 17px;
  width: 450px;
`;

export const ActivityAreaSelect = styled.select`
  font-size: 20px;
  line-height: 20px;
  height: 60px;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid black;
  -webkit-appearance: none;
  appearance: none;
`;

export const SignUpButton = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 345px;
  height: 60px;
  margin-top: 70px;
  margin-bottom: 30px;
  border-radius: 4px;
  border: 1px solid black;
  cursor: pointer;
  &:disabled {
    background-color: darkgray;
    border: 1px solid darkgray;
    cursor: not-allowed;
  }
`;

export const LoginLinkContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginLinkMessage = styled.section`
  margin-right: 15px;
`;

export const LoginLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: black;
`;
