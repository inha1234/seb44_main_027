import React from 'react';
import ShareBoard from '../Components/ShareBoard';
import { Main, Profile } from './Diet.style';
import Nav from '../Components/Nav';

function Diet() {
  return (
    <>
      <Nav>nav</Nav>
      <Main>
        <ShareBoard type={'diet'} />
        <Profile></Profile>
      </Main>
    </>
  );
}

export default Diet;
