// eslint-disable-next-line no-unused-vars
import React from "react";
import styled from "styled-components";

export const BoardBox = styled.main`
  box-sizing: border-box;
  width: 704px;
  height: auto;
  background-color: #fff;
  padding: 24px 18px;
`;

export const Title = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 84px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 42px;

  > h1 {
    font-size: 20px;
    color: #000;
  }
`;

export const CardList = styled.section`
  width: 100%;
  display: grid;
  height: auto;
  grid-template-columns: 1fr 1fr 1fr;
  align-content: start;
  gap: 8px;

  > div {
    background-color: #ddd;
  }
`;

export const Btn = styled.button`
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  background-color: #1a1a1a;
  cursor: pointer;
`;
