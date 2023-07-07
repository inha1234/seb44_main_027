import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import React from 'react';
function Main() {
  return (
    <>
      main
      <Link to="login">toLogin</Link>
      <Link to="make">만들기</Link>
      <Link to="makeeats">식단</Link>
      <Link to="makesports">운동</Link>
    </>
  );
}

export default Main;
