import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import store from "./redux/store";
import Main from "./Pages/Main";
import Login from "./Pages/Login";

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
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
