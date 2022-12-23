import { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import requests from "../api/requests";
function Login() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputName, setInputName] = useState("");
  let navigate = useNavigate();
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const onClickLogin = () => {
    console.log("click login");
    console.log("ID : ", inputId);
    console.log("PW : ", inputPw);
    axios
      .post(requests.loginPath,null,{params: {
        userId:inputId,
        userPw:inputPw,
        userName:inputName
    }})
      .then((res) => {
        console.log(res);
        console.log("res.data.userId :: ", res.data.userId);
        console.log("res.data.userId :: ", res.data.userPw);
        console.log("res.data.userName :: ", res.data.userName);
        console.log(res.status)
        if (res.data.userId === undefined) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          console.log("======================", res.data.msg);
          alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
        } else if (res.data.userId === null) {
          // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          console.log(
            "======================",
            "아이디 혹은 비밀번호가 일치하지 않습니다."
          );
          alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
        } else if (res.data.userId === inputId) {
          // id, pw 모두 일치 userId = userId1, msg = undefined
          console.log("======================", "로그인 성공");
          sessionStorage.setItem("user_id", inputId); // sessionStorage에 id를 user_id라는 key 값으로 저장
          sessionStorage.setItem("name", res.data.userName); // sessionStorage에 id를 user_id라는 key 값으로 저장
        
        }
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/";
        // navigate("/") 네비게이트 쓰면 세션저장이 안됨
      })
      .catch((error) =>{
        console.log("에러코드 : "+error.response.status)
        if (error.response.status == 500) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
        }
      });
  };

  return (
    <div className="loginContainer">
      <form className="loginForm">
        <div className="loginText">로그인</div>
        <input
          type="email"
          // className="form-control"
          placeholder="아이디"
          name="input_id"
          value={inputId}
          onChange={handleInputId}
        />

        <input
          type="password"
          // className="form-control"
          placeholder="비밀번호"
          name="input_pw"
          value={inputPw}
          onChange={handleInputPw}
        />

        <button type="button" onClick={onClickLogin} className="loginButton">
          확인
        </button>
        <ul>
          <li><a onClick={()=>{navigate("/join")}}>회원이 아니신가요?</a></li>
          <li><a>비밀번호 찾기</a></li>
        </ul>
      </form>
    </div>
  );
}
export default Login;
