import axios from "../api/axios"; 
import requests from "../api/requests";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KakaoLogin(){
 // 인가코드 받아오기
 const code = new URL(window.location.href).searchParams.get("code");
 console.log(code)

 // 로그인 성공시 MyPage로 이동시키기위해 useNavigate 사용
 useEffect(() => {
    axios.get(requests.kakaoLoginPath,{
        params:{code}
    })
    .then((res) => {
    console.log(res.data)
    console.log(res.data.email)
    console.log(res.data.nickname)

    
      console.log(res.data.newKakaoUser)
    if(res.data.newKakaoUser === "iAmNew" ){
      sessionStorage.setItem("basicEmail", res.data.basicInfo.userEmail)
      sessionStorage.setItem("basicImage", res.data.basicInfo.userImage)
      sessionStorage.setItem("basicName", res.data.basicInfo.userName)
      alert("추가 정보를 입력해주세요~")
      window.location.href="/joinWithKakao"
    }else{
    sessionStorage.setItem("email", res.data.email)
    sessionStorage.setItem("image", res.data.image)
    sessionStorage.setItem("name", res.data.nickname)
    sessionStorage.setItem("id", res.data.id)
    window.location.href="/"
  }
  // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
})
}, [])

 return (
   <div>
       {/* 카카오 이메일 : {sessionStorage.getItem("name")}
       카카오 닉네임 : {sessionStorage.getItem("nickname")}
       프로필 사진 : <img src={sessionStorage.getItem("image")}></img> */}
   </div>
 );
};
export default KakaoLogin