import { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import requests from "../api/requests";

import KakaoLogin from "./KakaoLogin";
import { KAKAO_AUTH_URL } from "./OAuth";
function Login() {
  // 카카오 개발자 앱 키 선언
  const KAKAO_AUTH_URI = KAKAO_AUTH_URL
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputName, setInputName] = useState("");
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  let navigate = useNavigate();
  const handleInputId = (e) => {
    setInputId(e.target.value);
    setIsId(true)
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
    setIsPassword(true)
  };

  const onClickLogin = async(e) => {
    if(isId == false){
      alert("아이디 입력해주세요")
      e.preventDefault();
      return
    }else if(isPassword == false){
      alert("비밀번호 입력해주세요")
      e.preventDefault();
      return
    }
    e.preventDefault();
    await axios
      .post(requests.loginPath,null,{params: {
        userEmail:inputId,
        userPassword:inputPw,
        userName:inputName
    }})
      .then((res) => {
        if (res.data.userEmail === undefined || null) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          console.log(res.data.userEmail)
          alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
          // window.location.reload()
         } else
         if (res.data.userPassword === undefined || null) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          console.log(res.data.userEmail)
          alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
          // window.location.reload()
         } else
         if(res.data.userPassword !== inputPw ) {
          // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
         } else
         if(res.data.userEmail === inputId && res.data.userPassword === inputPw) {
          // id, pw 모두 일치 userId = userId1, msg = undefined
          alert("로그인성공")
          sessionStorage.setItem("user_id", inputId); // sessionStorage에 id를 user_id라는 key 값으로 저장
          sessionStorage.setItem("name", res.data.userName); // sessionStorage에 id를 user_id라는 key 값으로 저장
          sessionStorage.setItem("kakaoUser",res.data.kakaoUser)
          sessionStorage.setItem("image",res.data.userImage)
          window.location.reload()
          document.location.href = "/";
        }
        // 작업 완료 되면 페이지 이동(새로고침)
        // navigate("/") 네비게이트 쓰면 세션저장이 안됨
      })
      .catch((error) =>{
        console.log("에러코드 : "+error.response.status)
        if (error.response.status == 500) {
          // 아이디 일치하지 않으면 백에서 불러오는 데이터 없어서 에러
          alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
        }
      });
  };

  return (
    <div className="loginContainer">
      <form className="loginForm">
        <div className="loginText">로그인</div>
        <input
          type="text"
          placeholder="아이디"
          name="input_id"
          value={inputId}
          onChange={handleInputId}
          autoFocus
        />

        <input
          type="password"
          placeholder="비밀번호"
          id="input_pw"
          name="input_pw"
          value={inputPw}
          onChange={handleInputPw}
          // autoComplete
        />

        <button type="submit" onClick={onClickLogin} className="loginButton">
          확인
        </button>
      </form>
        <ul>
          <li><a onClick={()=>{navigate("/join")}}>회원이 아니신가요?</a></li>
          <li><a onClick={()=>{navigate("/forgotPassword")}}>비밀번호 찾기</a></li>
        </ul>
        <a href={KAKAO_AUTH_URI}><img className="kakaoBtn" src="https://asp.pointpark.com/PlusPointMember/resources/images/mobileHomePage/btn_kakao.png"/></a>
    </div>
  );
}
export default Login;