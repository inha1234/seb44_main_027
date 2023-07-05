import React from "react"
import ShareBoard from "../Components/ShareBoard";
import { Nav, Main, Profile } from "./Diet.style";


function Diet(){

  return (
    <>
      <Nav>nav</Nav>
      <Main>
        <ShareBoard type={'diet'}/>
        <Profile></Profile>
      </Main>
    </>
  )
}

export default Diet;