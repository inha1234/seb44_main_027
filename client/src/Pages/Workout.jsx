import React from 'react';
import ShareBoard from '../Components/ShareBoard';
import { Main } from './Workout.style';
import Nav from '../Components/Nav';
import MyProfile from '../Components/MyProfile';

function Workout() {
  return (
    <>
      <Nav />
      <Main>
        <ShareBoard type={'workout'} />
        <MyProfile />
      </Main>
    </>
  );
}

export default Workout;
