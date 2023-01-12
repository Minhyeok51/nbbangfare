import React from "react";
import mainLogo from "../img/mainLogo.png";
import "../css/nbbangfare.css";
const Nbbangfare = () => {
  return (
    <div className="nbbangfare-container">
      <div className="nbbangfare-header">
        <div class="box">
          <div class="wave -one"></div>
          <div class="wave -two"></div>
          <div class="wave -three"></div>
          <div class="title">What is Nbbangfare</div>
        </div>
      </div>
      <br/>
        <div className="nbbanfare-text">
        팔로워들이 펀딩하여 이용자가 원하는 선물을 받을 수 있도록 하는 웹사이트입니다. 생일 선물, 졸업   선물 등을 줘야할 때 유용하게 <br/>이용될 수 있습니다.  

        </div>
    </div>
  );
};

export default Nbbangfare;
