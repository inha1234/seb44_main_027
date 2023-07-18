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
import Crewing from './Pages/Crewing';
import CrewingDetail from './Pages/CrewingDetail';
import Settings from './Pages/Settings';
import PrivateRoute from './utils/PrivateRoute';
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
            <Route
              path="/login"
              element={
                <PrivateRoute path="/login">
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PrivateRoute path="/signup">
                  <SignUp />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute path="/">
                  <Main />
                </PrivateRoute>
              }
            />
            <Route
              path="/create"
              element={
                <PrivateRoute path="/create">
                  <Make />
                </PrivateRoute>
              }
            />
            <Route
              path="/create/workout"
              element={
                <PrivateRoute path="/create/workout">
                  <CreateWorkoutPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/create/diet"
              element={
                <PrivateRoute path="/create/diet">
                  <CreateDietPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/create/crewing"
              element={
                <PrivateRoute path="/create/crewing">
                  <CreateCrewingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/workout"
              element={
                <PrivateRoute path="/workout">
                  <Workout />
                </PrivateRoute>
              }
            />
            <Route
              path="/diet"
              element={
                <PrivateRoute path="/diet">
                  <Diet />
                </PrivateRoute>
              }
            />
            <Route
              path="/posts/:postId"
              element={
                <PrivateRoute path="/posts/:postId">
                  <PostDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/mypage/*"
              element={
                <PrivateRoute path="/mypage/*">
                  <MyPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/:memberId/*"
              element={
                <PrivateRoute path="/profile/:memberId/*">
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/crewing"
              element={
                <PrivateRoute path="/crewing">
                  <Crewing />
                </PrivateRoute>
              }
            />
            <Route
              path="/crewing/:postId"
              element={
                <PrivateRoute path="/crewing/:postId">
                  <CrewingDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute path="/settings">
                  <Settings />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
