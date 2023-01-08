import "../css/Mypage.css"
import noImg from "../img/noimg.jpg"
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import requests from "../api/requests";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
function Mypage() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(sessionStorage.getItem("user_id") == null){
      alert('로그인이 필요한 서비스입니다.')
      navigate('/login')
    }
  },[])

      const deleteUser = () =>{
        var q = prompt(`회원탈퇴 하시겠습니까?
        "${sessionStorage.getItem("user_id")}/탈퇴"
        를 입력해주세요` ,"")
        console.log(q)
        var a = q
        console.log(a)

        if(a === sessionStorage.getItem("user_id")+"/탈퇴"){
          // alert("탈퇴됨")
          axios.post(`${requests.deleteUserPath}/${sessionStorage.getItem('user_id')}`,null,{
            params : {
              a : a
            }
          })
          .then(res =>{
            console.log(res.data)
            if(res.data === true){
              sessionStorage.clear()
              alert("회원탈퇴가 정상적으로 처리되었습니다.")
            }
            document.location.href = "/"
          })
          .catch(e =>{
            console.log(e)
          })
        }else{
          alert("입력값이 올바르지 않습니다.")
        }
        console.log(a)
      }
      const fileInput = useRef()

      const handleButtonClick = e =>{
        fileInput.current.click()
      }

 
          //파일 미리볼 url을 저장해줄 state
    const [fileImage, setFileImage] = useState("");
    const [showfileImage, setShowFileImage] = useState("");
    // 파일 저장
    const saveFileImage = (e) => {
        setFileImage(e.target.files);
        console.log(e.target.files);
        setShowFileImage(URL.createObjectURL(e.target.files[0]));
    };

    function Send(){
      alert("한글파일명은 안됨")
      const fd = new FormData();
      // 파일 데이터 저장
      Object.values(fileImage).forEach((fileImage) => fd.append("fileOne", fileImage));
  
      axios.post(requests.imageUploadPath, fd, {
        headers: {
          "Content-Type": `multipart/form-data; `,
        },
        params:{
          userEmail : sessionStorage.getItem("user_id")
        }
      })
      .then((res) => {
        console.log(res.data)
        sessionStorage.setItem("image",res.data.userImage)
        window.location.reload()
      })
      .catch((error) => {
        // 예외 처리
        console.log(error)
      })
    
    }
    return (
      <>
        <div className="userBar">
          <div className="textplc">
            {sessionStorage.getItem("image") !== null ? (
              <img
                src={sessionStorage.getItem("image")}
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "10vh",
                  borderRadius: "70%",
                  overflow: "hidden",
                }}
              ></img>
            ) : (
              <img
                src={noImg}
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "10vh",
                  borderRadius: "70%",
                  overflow: "hidden",
                }}
              ></img>
            )}
            <button onClick={handleButtonClick} style={{background:"tansparent", border :0, outline:0}}><AddAPhotoIcon  type="button" style={{cursor:"pointer", border :0, outline:0}} >
              </AddAPhotoIcon></button>
            <form encType="multipart/form-data">
              <input type="file" id="imgUpload" accept="image/*" ref={fileInput}  onChange={saveFileImage} hidden/>
                <button type = "button" onClick={Send}> 업로드</button>
                </form>
              <h3>업로드 한 사진 미리보기</h3>
              <img src={showfileImage} alt="이미지"></img>
              
          <p>사용자 이름: {sessionStorage.getItem("name")}</p>
          <p>가입일: </p>
          </div>
          <div className="followplc">
            <ul>
                <li className="mypageList">팔로워보기</li>
                <li className="mypageList">
                
                <Link to="/modify">
                회원정보 수정하기</Link></li>
                {sessionStorage.getItem("kakaoUser") === "true" ? null 
                :<li className="mypageList" onClick={deleteUser}>회원 탈퇴</li> }

            </ul>
          </div>
        </div>
        <div className="purchaseList">
          <Breadcrumb className="Retxt">
            <Breadcrumb.Item href="/mypage/wishproduct">찜한상품</Breadcrumb.Item>
            <Breadcrumb.Item href="/mypage/paylist">펀딩목록</Breadcrumb.Item>
            <Breadcrumb.Item href="/mypage/purlist">구매목록</Breadcrumb.Item>
          </Breadcrumb>
          <Outlet/>
        </div>
      </>
    );
}
export default Mypage;