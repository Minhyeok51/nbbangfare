import { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  let [id, setId] = useState("");
  let [pw, setPw] = useState("");
  const realId = "asdc";
  const realPw = "asd123!!";
  let navigate = useNavigate();
  const [button, setButton] = useState(true);
  function changeButton() {
    pw.length >= 5 ? setButton(false) : setButton(true);
  }
  const goToMain = () => {
    navigate("/");
  };

  return (
    <div className="loginContainer">
      <form className="loginForm">
        <fieldset className="loginFormInner">
            <legend className="loginText">로그인</legend>
        <input
          placeholder="아이디"
          id="id"
          className="login"
          onChange={(e) => {
            setId(e.target.value);
          }}
          onKeyUp={changeButton}
        />
        <input
          type="password"
          placeholder="비밀번호"
          id="password"
          className="login"
          onChange={(e) => {
            setPw(e.target.value);
          }}
          onKeyUp={changeButton}
        />
        <button
          type="button"
          className="loginButton"
          disabled={button}
          onClick={(e) => {
            if (realId == id) {
              if (realPw == pw) {
                e.stopPropagation();
                goToMain();
              }
            } else {
              alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
            }
          }}
        >로그인</button>
        </fieldset>
      </form>
    </div>
  );
}
export default Login;
