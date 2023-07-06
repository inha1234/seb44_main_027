import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import store from "./redux/store";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import Workout from "./Pages/Workout";
import Diet from "./Pages/Diet"
import PostDetail from "./Pages/PostDetail";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
`;
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store}>
        <Router>
          <GlobalStyle />
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
