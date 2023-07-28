// eslint-disable-next-line no-unused-vars
import React from 'react';
import MakeStyle from './Create.style';
import { Link } from 'react-router-dom';
import CreateWorkoutPage from './CreateWorkoutPage.jsx';
import CreateDietPage from './CreateDietPage.jsx';
import CreateCrewingPage from './CreateCrewingPage.jsx';

import image01 from '/images/sports.jpg';
import image02 from '/images/eat.jpg';
import image03 from '/images/join.jpg';

export default function Create() {
  return (
    <>
      <MakeStyle.Container>
        <MakeStyle.Make>
          <h4>어떤 유형의 게시물을 작성할까요?</h4>
          <MakeStyle.Link>
            <Link to="/create/workout" element={<CreateWorkoutPage />}>
              <img src={image01} alt="img_workout" />
              <p>운동</p>
            </Link>
            <Link to="/create/diet" element={<CreateDietPage />}>
              <img src={image02} alt="img_diet" />
              <p>식단</p>
            </Link>
            <Link to="/create/crewing" element={<CreateCrewingPage />}>
              <img src={image03} alt="img_crewing" />
              <p>크루잉</p>
            </Link>
          </MakeStyle.Link>
        </MakeStyle.Make>
      </MakeStyle.Container>
    </>
  );
}
