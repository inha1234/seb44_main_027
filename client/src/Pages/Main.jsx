import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import React from 'react';
function Main() {
  return (
    <>
      main
      <Link to="login">toLogin</Link>
      <Link to="create">만들기</Link>
      <Link to="workout">식단</Link>
      <Link to="diet">운동</Link>
      <Link to="profile/1234">유저프로필</Link>
    </>
  );
}

export default Main;
