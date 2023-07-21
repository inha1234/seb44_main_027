// eslint-disable-next-line no-unused-vars
import React from 'react';
import MainBoard from '../Components/MainBoard';
import { MainContainer } from './Main.style';
import Nav from '../Components/Nav';
import MyProfile from '../Components/MyProfile';
function Main() {
  return (
    <>
      <Nav />
      <MainContainer>
        <MainBoard />
        <MyProfile />
      </MainContainer>
    </>
  );
}

export default Main;
