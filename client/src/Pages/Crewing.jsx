import React from 'react';
import CrewingBoard from '../Components/CrewingBoard';
import { Main } from './Crewing.style';
import Nav from '../Components/Nav';
import MyProfile from '../Components/MyProfile';

function Crewing() {
  return (
    <>
      <Nav />
      <Main>
        <CrewingBoard />
        <MyProfile />
      </Main>
    </>
  );
}

export default Crewing;
