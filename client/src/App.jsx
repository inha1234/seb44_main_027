// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import store from "./redux/store";
import Main from "./Pages/Main.jsx";
import Login from "./Pages/Login.jsx";
import Make from "./Pages/Make.jsx";
import Makesports from "./Pages/Makesports.jsx";
import Makeeats from "./Pages/Makeeats.jsx";
import Makecrews from "./Pages/Makecrews.jsx";

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
            <Route path="/make" element={<Make />} />
            <Route path="/makesports" element={<Makesports />} />
            <Route path="/makeeats" element={<Makeeats />} />
            <Route path="/makecrews" element={<Makecrews />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
