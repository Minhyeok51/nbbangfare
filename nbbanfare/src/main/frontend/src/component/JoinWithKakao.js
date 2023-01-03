import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import requests from "../api/requests";
import Post from "./Post";

function JoinWithKakao(){

    // useEffect(() =>{
    //     sessionStorage.getItem("basicEmail")
    //     sessionStorage.getItem("basicImage")
    //     sessionStorage.getItem("basicName")
    // },[])

  let navigate = useNavigate();
  let today = moment().format("YYYY-MM-DD");
  const [popup, setPopup] = useState(false);
  // 초기값 세팅 - 아이디, 닉네임, 비밀번호, 비밀번호확인, 이메일, 전화번호, 생년월일, 주소
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState({ address: "" });
  const [detailAddress, setDetailAddress] = useState("");


  // 오류메세지 상태 저장
  const [phoneMessage, setPhoneMessage] = useState("");

  // 유효성 검사
  const [isPhone, setIsPhone] = useState(false);
  const [isBirth, setIsBirth] = useState(false);

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
    if (isPhone == false) {
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
    e.preventDefault();

    await axios
      .post(requests.joinPath, null, {
        params: {
          userEmail: sessionStorage.getItem("basicEmail"),
          userName: sessionStorage.getItem("basicName"),
          userPhone: phone,
          userBirth: birth,
          userAddress: `${address.address} ${detailAddress}`,
          userImage: sessionStorage.getItem("basicImage")
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
        <h3>추가정보 입력</h3>
        <form action="" method="post">
          <div className="form">
            <div className="form-el">
              <input
                id="email"
                className="inputs"
                name="name"
                value={sessionStorage.getItem("basicEmail")}
                readOnly
              />
            </div>

            <div className="form-el">
              <input
                id="name"
                className="inputs"
                name="name"
                value={sessionStorage.getItem("basicName")}
                readOnly
              />
            </div>
            <div className="form-el">
              <input
                id="phone"
                className="inputs"
                name="phone"
                value={phone}
                onChange={addHyphen}
                placeholder="핸드폰번호를 입력해주세요(번호만 입력)"
              />
              <p className="message">{phoneMessage}</p>
            </div>
            <div className="form-el">
              <label htmlFor="birth">생년월일</label> <br />
              <input
                type="date"
                id="birth"
                className="inputs"
                name="birth"
                value={birth}
                max={today}
                onChange={onChangeBirth}
              />
            </div>
            <div className="form-el">
              <input
                type="text"
                id="postcode"
                className="inputs"
                placeholder="주소를 입력해주세요"
              />
              <input
                type="button"
                onClick={handleComplete}
                onChange={handleInput}
                value="우편번호 찾기"
              />
              <br />
              <input
                type="text"
                id="address"
                placeholder="주소"
                className="inputs"
              />
              <br />
              <input
                type="text"
                id="detailAddress"
                className="inputs"
                onChange={datailAddressInput}
                placeholder="상세 주소를 입력해주세요"
              />
              <input
                type="text"
                id="extraAddress"
                className="inputs"
                placeholder="참고항목"
              />
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

export default JoinWithKakao;