import React from "react"
import ShareBoard from "../Components/ShareBoard";
import { Main, Profile } from "./Workout.style";
import Nav from "../Components/nav";


function Workout(){

  return (
    <>
      <Nav>nav</Nav>
      <Main>
        <ShareBoard type={'workout'}/>
        <Profile></Profile>
      </Main>
    </>
  )
}

export default Workout;