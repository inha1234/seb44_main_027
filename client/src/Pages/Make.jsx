// eslint-disable-next-line no-unused-vars
import React from "react";
import MakeStyle from "../Pages/Make.style";
import { Link } from "react-router-dom";
import Makesports from "./Makesports.jsx";
import Makeeats from "./Makeeats.jsx";
import Makecrews from "./Makecrews.jsx";

export default function MakePage() {
  return (
    <>
      <MakeStyle.Container>
        <MakeStyle.Make>
          <h4>어떤 유형의 게시물을 작성할까요?</h4>
          <MakeStyle.Link>
            <Link to="/makesports" element={Makesports}>
              <img src="../../public/images/sports.jpg" alt="" />
              <p>운동게시물</p>
            </Link>
            <Link to="/makeeats" element={Makeeats}>
              <img src="../../public/images/eat.jpg" alt="" />
              <p>식단 게시물</p>
            </Link>
            <Link to="/makecrews" element={Makecrews}>
              <img src="../../public/images/join.jpg" alt="" />
              <p>크루원 모집</p>
            </Link>
          </MakeStyle.Link>
        </MakeStyle.Make>
      </MakeStyle.Container>
    </>
  );
}
