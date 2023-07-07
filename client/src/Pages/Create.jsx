// eslint-disable-next-line no-unused-vars
import React from 'react';
import MakeStyle from './Create.style';
import { Link } from 'react-router-dom';
import CreateWorkoutPage from './CreateWorkoutPage.jsx';
import CreateDietPage from './CreateDietPage.jsx';
import CreateCrewingPage from './CreateCrewingPage.jsx';

export default function Create() {
  return (
    <>
      <MakeStyle.Container>
        <MakeStyle.Make>
          <h4>어떤 유형의 게시물을 작성할까요?</h4>
          <MakeStyle.Link>
            <Link to="/create/workout" element={<CreateWorkoutPage />}>
              <img src="../../public/images/sports.jpg" alt="" />
              <p>운동게시물</p>
            </Link>
            <Link to="/create/diet" element={<CreateDietPage />}>
              <img src="../../public/images/eat.jpg" alt="" />
              <p>식단 게시물</p>
            </Link>
            <Link to="/create/crewing" element={<CreateCrewingPage />}>
              <img src="../../public/images/join.jpg" alt="" />
              <p>크루원 모집</p>
            </Link>
          </MakeStyle.Link>
        </MakeStyle.Make>
      </MakeStyle.Container>
    </>
  );
}
