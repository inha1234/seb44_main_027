import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const LoginInputContainer = styled.section`
  width: 345px;
  height: 500px;
`;

export const LoginHeading = styled.section`
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

export const InputArea = styled.input`
  font-size: 20px;
  width: 303px;
  height: 60px;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid black;
`;

export const InvalidInputIndicator = styled.section`
  margin: 4px;
  color: crimson;
  height: 17px;
  width: 265px;
`;

export const LoginButton = styled.button`
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
`;

export const SignUpLinkContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SignUpLinkMessage = styled.section`
  margin-right: 15px;
`;

export const SignUpLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: black;
`;
