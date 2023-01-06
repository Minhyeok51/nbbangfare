import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import requests from "../api/requests";
import Post from "./Post";
import "../css/modify.css";

function Modify() {
  const navigate = useNavigate();
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
  const [isActive, setIsActive] = useState(false);
  const [image, setImage] = useState("");
  const [kakaoUser, setKakaoUser] = useState("")  

  // const [resPw , setResPw] = useState("") //카카오 유저는 비밀번호 설정 못하게

  // 오류메세지 상태 저장
  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");

  // 유효성 검사
  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

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

  const handleSubmit = async (e) => {
    if (isName == false) {
      alert("올바른 이름을 입력해주세요");
      e.preventDefault();
      return;
    }
    // else if (isPassword == false) {
    //   alert("비밀번호를 형식에 맞게 입력해주세요");
    //   e.preventDefault();
    //   return;
    // }
    else if (isPhone == false) {
      alert("전화번호 형식에 맞게 입력해주세요");
      e.preventDefault();
      return;
    }
    // else if (address.address == "" || null || undefined || 0 || NaN) {
    //   alert("주소를 입력해주세요");
    //   e.preventDefault();
    //   return;
    // }
    if (password !== passwordConfirm) {
      alert("비밀번호가 달라요");
      e.preventDefault();
      return;
    }
    e.preventDefault();
    await axios
      .post(
        `${requests.updateUserInfoPath}/${sessionStorage.getItem("user_id")}`,
        null,
        {
          params: {
            userEmail: email,
            userName: name,
            userPassword: password,
            userPhone: phone,
            userBirth: birth,
            userAddress: `${address.address} ${detailAddress}`,
            active: isActive,
            userImage: image,
            kakaoUser : kakaoUser
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        console.log(res.status);
        sessionStorage.setItem("name", name);
        alert("회원정보가 수정되었습니다")
        document.location.href = "/mypage"
      })
      .catch((error) => {
        console.log(error.response);
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
  const getUserData = () => {
    const url = `/updateUserInfo/${sessionStorage.getItem("user_id")}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setPassword(res.data.userPassword);
        setPasswordConfirm(res.data.userPassword);
        setEmail(res.data.userEmail);
        setName(res.data.userName);
        setPhone(res.data.userPhone);
        setAddress({ address: res.data.userAddress });
        setBirth(res.data.userBirth);
        setIsActive(res.data.active);
        setImage(res.data.userImage);
        setKakaoUser(res.data.kakaoUser)
        
        // sessionStorage.setItem("user_address", res.data.userAddress)
        let arr = res.data.userAddress.split(" ");
        let posetcode = (document.getElementById("postcode").value = arr[0]);
        let restArr = "";
        for (let i = 1; i < arr.length; i++) {
          restArr += arr[i] + " ";
        }
        let resAddr = (document.getElementById("address").value = restArr);

        setAddress({ address: posetcode + resAddr });
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  useEffect(() => {
    getUserData();
    // window.location.reload()

    setIsName(true);
    setIsPassword(true);
    setIsPasswordConfirm(true);
    setIsPhone(true);
  }, []);

  return (
     <div className="modify-container">
      {/* <div className="modify-user"></div> */}
        <h3>정보 수정하기</h3>
        <form className="modifyform">
          <div className="form-el">
            <input
              id="email"
              className="inputs"
              name="name"
              value={email}
              readOnly
            />
          </div>
          {password !== null ? (
            <>
              <div className="form-el">
                <input
                  id="name"
                  className="inputs"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                />
                <p className="message">{nameMessage}</p>
              </div>

              <div className="form-el">
                <input
                  type="password"
                  id="password"
                  className="inputs"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  placeholder="비밀번호를 입력해주세요"
                />
                <p className="message">{passwordMessage}</p>
              </div>
              <div className="form-el">
                <input
                  type="password"
                  id="passwordConfirm"
                  className="inputs"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  onChange={onChangePasswordConfirm}
                  placeholder="비밀번호 확인"
                />
                <p className="message">{passwordConfirmMessage}</p>
              </div>
            </>
          ) : null}
          <div className="form-el">
            <input
              id="phone"
              className="inputs"
              name="phone"
              value={phone}
              onChange={addHyphen}
            />
            <p className="message">{phoneMessage}</p>
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
            수정하기
          </button>
        </form>
      </div>
  );
}
export default Modify;
