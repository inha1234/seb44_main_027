import React from 'react';
import ShareBoard from '../Components/ShareBoard';
import { Main, Profile } from './Workout.style';
import Nav from '../Components/Nav';

function Workout() {
  return (
    <>
      <Nav />
      <Main>
        <ShareBoard type={'workout'} />
        <Profile></Profile>
      </Main>
    </>
  );
}

export default Workout;
