import React from 'react';
import ShareBoard from '../Components/ShareBoard';
import { Main } from './Diet.style';
import Nav from '../Components/Nav';
import MyProfile from '../Components/MyProfile';

function Diet() {
  return (
    <>
      <Nav>nav</Nav>
      <Main>
        <ShareBoard type={'diet'} />
        <MyProfile />
      </Main>
    </>
  );
}

export default Diet;
