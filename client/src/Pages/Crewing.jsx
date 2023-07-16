import React from 'react';
import CrewingBoard from '../Components/CrewingBoard';
import { Main, Profile } from './Crewing.style';
import Nav from '../Components/Nav';

function Crewing() {
  return (
    <>
      <Nav />
      <Main>
        <CrewingBoard />
        <Profile></Profile>
      </Main>
    </>
  );
}

export default Crewing;
