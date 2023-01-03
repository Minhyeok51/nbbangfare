import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requests from '../api/requests';
import '../css/forgotPassword.css'
import mainLogo from '../img/mainLogo.png'
function ForgotPassword(){
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotName, setForgotName] = useState("");
  const navigate = useNavigate()
    const onChangeEmail = (e) => {
        const currentEmail = e.target.value.trim();
        setForgotEmail(currentEmail);
      };
    
      const onChangeName = (e) => {
        const currentName = e.target.value.trim();
        setForgotName(currentName);
      };
      const find = async(e) =>{
        e.preventDefault();
        await axios
        .post(requests.findPwPath, null, {
          params: {
            userEmail: forgotEmail,
            userName: forgotName
          }
        })
        .then((response) => {
          if(response.data.userEmail == forgotEmail){
            alert("입력하신 이메일로 임시 비밀번호를 보냈습니다.")
            navigate("/login")
            }else{
              var result = window.confirm("계정이 없습니다. 회원가입 페이지로 이동하시겠습니까?");
              if(result){
                navigate("/join")
              }else{
                navigate("/forgotPassword")
              }
            }
        })
        .catch((error) => {
          console.log(error.response);
          alert("가입실패! 아마 서버에러?");
        });
    };
      
    return (
      
        <div className='find-pw-container'>
          <form className="find-pw-form">
            <a href='/'><img className='logo' src={mainLogo}/></a>
            <input type="email" className='find-inputs' onChange={onChangeEmail} value={forgotEmail} placeholder="이메일을 입력해주세요" />
            <input type="text" className='find-inputs' onChange={onChangeName} value={forgotName} placeholder="이름을 입력해주세요" />
            <button type="submit" className="findButton" onClick={find}>비밀번호 찾기</button>
          </form>
        </div>
      
    );
}
export default ForgotPassword;