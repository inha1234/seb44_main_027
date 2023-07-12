import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import store from './redux/store';
import Main from './Pages/Main';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Make from './Pages/Create.jsx';
import CreateWorkoutPage from './Pages/CreateWorkoutPage.jsx';
import CreateDietPage from './Pages/CreateDietPage.jsx';
import CreateCrewingPage from './Pages/CreateCrewingPage.jsx';
import Workout from './Pages/Workout';
import Diet from './Pages/Diet';
import PostDetail from './Pages/PostDetail';
import MyPage from './Pages/MyPage';
import UserProfile from './Pages/UserProfile';
const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
`;
function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <GlobalStyle />
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create" element={<Make />} />
            <Route path="/create/workout" element={<CreateWorkoutPage />} />
            <Route path="/create/diet" element={<CreateDietPage />} />
            <Route path="/create/crewing" element={<CreateCrewingPage />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/mypage/*" element={<MyPage />} />
            <Route path="/profile/:memberId/*" element={<UserProfile />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
