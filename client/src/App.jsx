import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"
import Main from "./Pages/Main"
import Login from "./Pages/Login"
function App() {

  return (
    <>
    <Provider store={store}>
      <Router>
        <Routes>
        <Route exact path="/" element={<Main/>} />
        <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </Provider>
    </>
  )
}

export default App;
