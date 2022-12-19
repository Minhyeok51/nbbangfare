import {useState} from "react";
import '../css/join.css'
import Post from './Post';
function Join(){

    let userId = document.querySelector('#userId');
	let passwordForm = document.querySelector('#userPW');
	let re_passwordForm = document.querySelector('#re_password');
	

	const [inputs, setInputs] = useState({
   		userId: '',
		userPW: '',
		re_password: ''
    	});


        const [enroll_company, setEnroll_company] = useState({
            address:'',
        });
        
        const [popup, setPopup] = useState(false);
        const handleInput = (e) => {
            setEnroll_company({
                ...enroll_company,
                [e.target.name]:e.target.value,
            })
        }

        const handleComplete = (data) => {
            setPopup(!popup);
        }

  const onChange = (e) => {//input에 name을 가진 요소의 value에 이벤트를 걸었다
    const { name, value } = e.target   // 변수를 만들어 이벤트가 발생했을때의 value를 넣어줬다
    const nextInputs = { ...inputs,  [name]: value,}//스프레드 문법으로 기존의 객체를 복사한다.
    setInputs(nextInputs);       //만든 변수를 seInput으로 변경해준다.
  }


    function CheckPass(str){ //비밀번호 정규식
        let reg1 =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
        return(reg1.test(str));
    };
   
	
	function letsJoin() { //로그인 유효성 검사
        if(inputs.userId===""){
            alert("아이디를 입력해주세요!");
            userId.focus();
            return;
        }else if(inputs.userPW===""){
            alert("비밀번호를 입력해주세요!");
            passwordForm.focus();
            return;
        }
        else if(inputs.re_password===""){
            alert("비밀번호 중복 확인을 입력해주세요!");
            re_passwordForm.focus();
            return;
        }
        else if(CheckPass(inputs.userPW) === false){
            alert("비밀번호는 영문+숫자 6자를 조합하여 입력해주세요 !");
            passwordForm.focus();
            return;
        }else if(inputs.re_password !==inputs.userPW){
            alert("비밀번호가 동일하지 않습니다!");
            re_passwordForm.focus();
            return;
        }else{
            fetch("/register", { //원하는 주소 입력
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body : JSON.stringify({
                    userId : inputs.userId,
                    userPW : inputs.userPW,
                })
            }).then(res => res.json())
                .then(resonse => {
                    if(resonse===true){
                        window.location.replace("/원하는 주소");
                    }else{
                        alert("다시 시도해주세요");
                    }
               });
          }
	  }
    return (
      <div className="userJoinOuter">
        <div
          className="form-box login-register-form-element"
          id="userJoinInner"
        >
          <h2 className="form-box-title">회원가입</h2>
          <form className="form" id="registerFrm" name="register-page">
            <div className="form-row">
              <div className="form-item">
                <div className="form-input">
                  <label htmlFor="userId">
                    <div>아이디</div>
                    <input
                      type="text"
                      id="userId"
                      name="userId"
                      onChange={onChange}
                      placeholder="아이디"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-item">
                <div className="form-input">
                  <label htmlFor="userPW">
                    <div>비밀번호</div>
                    <input
                      type="password"
                      id="userPW"
                      name="userPW"
                      onChange={onChange}
                      placeholder="비밀번호"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-item">
                <div className="form-input">
                  <input
                    type="password"
                    id="re_password"
                    name="re_password"
                    onChange={onChange}
                    placeholder="비밀번호 확인"
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-item">
                <div className="form-input">
                  <label htmlFor="user_name">
                    <div>이름</div>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      onChange={onChange}
                      placeholder="이름"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-item">
                <div className="form-input">
                  <label htmlFor="birth">
                    <div>생년월일</div>
                    <input
                      type="date"
                      id="birth"
                      name="birth"
                      onChange={onChange}
                      placeholder="생년월일"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-item">
                <div className="form-input">
                  <label htmlFor="phoneNumber">
                    <div>휴대전화</div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      onChange={onChange}
                      placeholder="123-4567-8910"
                      pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-item">
                <div className="form-input">
                  <label htmlFor="email">
                    <div>이메일</div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={onChange}
                      placeholder="이메일"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-item">
                <div className="form-input">
                  <div>배송지</div>
                  <input
                    type="text"
                    id="postcode"
                    placeholder="우편번호"
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
                  {/* <button onClick={handleComplete}>우편번호 찾기</button> */}
                  {popup && (
                    <Post
                    //   company={enroll_company}
                    //   setcompany={setEnroll_company}
                    ></Post>
                  )}
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <input
                  type="button"
                  className="button medium primary"
                  onClick={letsJoin}
                  id="joinBtn"
                  value="가입하기"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}
export default Join;