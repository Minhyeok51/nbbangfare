import axios from "../api/axios";
import { useState } from "react";
import "../css/join.css";
import Post from "./Post";
import requests from "../api/requests";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Join() {
  let navigate = useNavigate();
  let today = moment().format("YYYY-MM-DD");
  const [popup, setPopup] = useState(false);
  // 초기값 세팅 - 아이디, 닉네임, 비밀번호, 비밀번호확인, 이메일, 전화번호, 생년월일, 주소
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState({ address: "" });
  const [detailAddress, setDetailAddress] = useState("");

  // 오류메세지 상태 저장
  const [emailMessage, setEmailMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isBirth, setIsBirth] = useState(false);

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value.trim();
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다!");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일 입니다.");
      setIsEmail(true);
    }
  };

  const onChangeName = (e) => {
    const currentName = e.target.value.trim();
    setName(currentName);

    if (currentName.length < 2 || currentName.length > 5) {
      setNameMessage("이름은 2글자 이상 5글자 이하로 입력해주세요!");
      setIsName(false);
    } else {
      setNameMessage("이름좋네");
      setIsName(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value.trim();
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value.trim();
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("떼잉~ 비밀번호가 똑같지 않아요!");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
      setIsPasswordConfirm(true);
    }
  };

  const onChangePhone = (getNumber) => {
    const currentPhone = getNumber.trim();
    setPhone(currentPhone);
    const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMessage("올바른 형식이 아닙니다!");
      setIsPhone(false);
    } else {
      setPhoneMessage("사용 가능한 번호입니다:-)");
      setIsPhone(true);
    }
  };

  const addHyphen = (e) => {
    const currentNumber = e.target.value;
    setPhone(currentNumber);
    if (currentNumber.length == 3 || currentNumber.length == 8) {
      setPhone(currentNumber + "-");
      onChangePhone(currentNumber + "-");
    } else {
      onChangePhone(currentNumber);
    }
  };

  const onChangeBirth = (e) => {
    const currentBirth = e.target.value;
    setBirth(currentBirth);
    setIsBirth(true);
  };

  const handleSubmit = async (e) => {
    if (isEmail == false) {
      alert("이메일 형식에 맞게 입력해주세요");
      e.preventDefault();
      return;
    } else if (isName == false) {
      alert("올바른 이름을 입력해주세요");
      e.preventDefault();
      return;
    } else if (isPassword == false) {
      alert("비밀번호를 형식에 맞게 입력해주세요");
      e.preventDefault();
      return;
    } else if (isPhone == false) {
      alert("전화번호 형식에 맞게 입력해주세요");
      e.preventDefault();
      return;
    } else if (isBirth == false) {
      alert("태어난 연도를 입력해주세요");
      e.preventDefault();
      return;
    } else if (address.address == "" || null || undefined || 0 || NaN) {
      alert("주소를 입력해주세요");
      e.preventDefault();
      return;
    }
    if (password !== passwordConfirm) {
      alert("비밀번호가 달라요");
      e.preventDefault();
      return;
    }

    e.preventDefault();


    await axios
      .post(requests.joinPath, null, {
        params: {
          userEmail: email,
          userName: name,
          userPassword: password,
          userPhone: phone,
          userBirth: birth,
          userAddress: `${address.address} ${detailAddress}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        if (response.data == "0") {
          alert("이미 가입된 아이디입니다");
        }
        if (response.data == "1") {
          alert("회원가입 성공");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error.response);
        alert("가입실패! 아마 서버에러?");
      });
  };
  const emailAuth = () => {
    axios
      .post(requests.emailConfirmPath, null, {
        params: {
          email: email,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //주소검색
  const datailAddressInput = (e) => {
    setDetailAddress(e.target.value);
  };

  const handleInput = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleComplete = (data) => {
    setPopup(!popup);
  };

  return (
    <>
      <h3>회원가입 페이지</h3>
      <form action="" method="post">
        <div className="form">
          <div className="form-el">
            <label htmlFor="email">Email</label> <br />
            <input
              id="email"
              name="name"
              value={email}
              onChange={onChangeEmail}
            />
            <p className="message">{emailMessage}</p>
            <button type="button" onClick={emailAuth}>
              이메일인증
            </button>
          </div>

          <div className="form-el">
            <label htmlFor="name">Name</label> <br />
            <input id="name" name="name" value={name} onChange={onChangeName} />
            <p className="message">{nameMessage}</p>
          </div>
          <div className="form-el">
            <label htmlFor="password">Password</label> <br />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
            <p className="message">{passwordMessage}</p>
          </div>
          <div className="form-el">
            <label htmlFor="passwordConfirm">Password Confirm</label> <br />
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
            />
            <p className="message">{passwordConfirmMessage}</p>
          </div>

          <div className="form-el">
            <label htmlFor="phone">Phone</label> <br />
            <input id="phone" name="phone" value={phone} onChange={addHyphen} />
            <p className="message">{phoneMessage}</p>
          </div>
          <div className="form-el">
            <label htmlFor="birth">Birth</label> <br />
            <input
              type="date"
              id="birth"
              name="birth"
              value={birth}
              max={today}
              onChange={onChangeBirth}
            />
            <p className="message">{birthMessage}</p>
          </div>
          <div className="form-el">
            <label htmlFor="birth">Address</label> <br />
            <input type="text" id="postcode" placeholder="우편번호" />
            <input
              type="button"
              onClick={handleComplete}
              onChange={handleInput}
              value="우편번호 찾기"
            />
            <br />
            <input type="text" id="address" placeholder="주소" />
            <br />
            <input
              type="text"
              id="detailAddress"
              onChange={datailAddressInput}
              placeholder="상세주소"
            />
            <input type="text" id="extraAddress" placeholder="참고항목" />
          </div>
          {popup && <Post company={address} setcompany={setAddress}></Post>}
          <br />
          <br />
          <button type="submit" onClick={handleSubmit}>
            가입하기
          </button>
        </div>
      </form>
    </>
  );
}
export default Join;
