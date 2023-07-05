import React from "react"
import ShareBoard from "../Components/ShareBoard";
import { Nav, Main, Profile } from "./Workout.style";


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