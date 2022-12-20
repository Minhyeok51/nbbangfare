import axios from "../api/axios";
import {useState} from "react";
import '../css/join.css'
import Post from './Post';
function Join(){
const [popup, setPopup] = useState(false);
// 초기값 세팅 - 아이디, 닉네임, 비밀번호, 비밀번호확인, 이메일, 전화번호, 생년월일, 주소
const [id, setId] = useState("");
const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [passwordConfirm, setPasswordConfirm] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [birth, setBirth] = useState("");
const [enroll_company, setEnroll_company] = useState({address:'',});
// 오류메세지 상태 저장
const [idMessage, setIdMessage] = useState("");
const [nameMessage, setNameMessage] = useState("");
const [passwordMessage, setPasswordMessage] = useState("");
const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
const [emailMessage, setEmailMessage] = useState("");
const [phoneMessage, setPhoneMessage] = useState("");
const [birthMessage, setBirthMessage] = useState("");

// 유효성 검사
const [isId, setIsId] = useState(false);
const [isname, setIsName] = useState(false);
const [isPassword, setIsPassword] = useState(false);
const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
const [isEmail, setIsEmail] = useState(false);
const [isPhone, setIsPhone] = useState(false);
const [isBirth, setIsBirth] = useState(false);

const onChangeId = (e) => {
  const currentId = e.target.value;
  setId(currentId);
  const idRegExp = /^[a-zA-z0-9]{4,12}$/;

  if (!idRegExp.test(currentId)) {
    setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
    setIsId(false);
  } else {
    setIdMessage("사용가능한 아이디 입니다.");
    setIsId(true);
  }
};

const onChangeName = (e) => {
  const currentName = e.target.value;
  setName(currentName);

  if (currentName.length < 2 || currentName.length > 5) {
    setNameMessage("이름은 2글자 이상 5글자 이하로 입력해주세요!");
    setIsName(false);
  } else {
    // setNameMessage("사용가능한 닉네임 입니다.");
    setIsName(true);
  }
};

const onChangePassword = (e) => {
  const currentPassword = e.target.value;
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
  const currentPasswordConfirm = e.target.value;
  setPasswordConfirm(currentPasswordConfirm);
  if (password !== currentPasswordConfirm) {
    setPasswordConfirmMessage("떼잉~ 비밀번호가 똑같지 않아요!");
    setIsPasswordConfirm(false);
  } else {
    setPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
    setIsPasswordConfirm(true);
  }
};
const onChangeEmail = (e) => {
  const currentEmail = e.target.value;
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
const onChangePhone = (getNumber) => {
  const currentPhone = getNumber;
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
};

const handleSubmit = async (e) => {
  e.preventDefault();

  await axios
      .post("/join",null,{params: {
          userId:id,
          userPw:password,
          userName:name,
          userBirth:birth,
          userPhoneNo:phone,
          userEmail:email,
          userAdress:enroll_company
      }})
      .then((response) => {
          console.log(response.data)
      })
      .catch((error) => {
          console.log(error);
      });
}

//주소검색




const handleInput = (e) => {
	setEnroll_company({
    	...enroll_company,
        [e.target.name]:e.target.value,
    })
}

const handleComplete = (data) => {
    setPopup(!popup);
}
    return (
      <>
      <h3>Sign Up</h3>
      <form action="" method="post">
      <div className="form">
        <div className="form-el">
          <label htmlFor="id">Id</label> <br />
          <input id="id" name="id" value={id} onChange={onChangeId} />
          <p className="message"> {idMessage} </p>
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
          <label htmlFor="email">Email</label> <br />
          <input
            id="email"
            name="name"
            value={email}
            onChange={onChangeEmail}
          />
          <p className="message">{emailMessage}</p>
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
            onChange={onChangeBirth}
          />
          <p className="message">{birthMessage}</p>
        </div>
        <div>배송지</div>
                  <input
                    type="text"
                    id="postcode"
                    placeholder="우편번호"
                    onChange={handleInput}
                  />
                  <input
                    type="button"
                    onClick={handleComplete}
                    value="우편번호 찾기"
                  />
                  <br />
                  <input type="text" id="address" placeholder="주소" />
                  <br />
                  <input
                    type="text"
                    id="detailAddress"
                    placeholder="상세주소"
                  />
                  <input
                    type="text"
                    id="extraAddress"
                    placeholder="참고항목"
                  />
                  {popup && (<Post company={enroll_company} setcompany={setEnroll_company}></Post>)}
        <br />
        <br />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
        </form>
    </>
  );
 };
export default Join;