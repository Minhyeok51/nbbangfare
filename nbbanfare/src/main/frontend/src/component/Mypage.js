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
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null);

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
        var a = q
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

      const handleChange = e => {
        console.log(e.target);
        console.log(e.target.files);
        console.log(e.target.files[0]);
        console.log(e.target.files[0].name);
      };

      const handleChangeFile = (event) => {
        console.log(event.target.files);
        setImgFile(event.target.files);
        setImgBase64([]);
        for(let i=0 ; i<event.target.files.length ; i++) {
            if(event.target.files[i]) {
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]);
                reader.onloadend = () => {
                    const base64 = reader.result; // 비트맵 데이터 리턴, 이 데이터를 통해 파일 미리보기가 가능함
                    console.log(base64)
                    if(base64) {
                        let base64Sub = base64.toString()
                        setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                    }
                }
            }
        }
      }

        const WriteBoard = async () => {
          const fd = new FormData();
          for(let i=0 ; i<imgFile.length ; i++) {
              fd.append("file", imgFile[i]);
          }
          // 안돌아감.
          // Object.values(imgFile).forEach((file) => {
          //     fd.append("file", file as Blob)
          // });
  
          fd.append(
              "comment",
              "hello world"
          );
  
          await axios.post(requests.imageUploadPath, null,{
            params:{
              image : fd
            }
          })
          .then((response) => {
              if(response.data) {
                  console.log(response.data)
                  // readImages();
                  setImgFile(null);
                  setImgBase64([]);
                  alert("업로드 완료!");
              }
          })
          .catch((error) => {
              console.log(error)
              alert("실패!");
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
              <input type="file" id="imgUpload" accept="image/*" ref={fileInput}  onChange={handleChangeFile} hidden/>

              <h3>업로드 한 사진 미리보기</h3>
            {imgBase64.map((item) => {
                return (
                    <img
                        key={item}
                        src={item}
                        alt={"First slide"}
                        style={{width:"200px", height:"150px"}}
                    />
                )
            })}
          <p>사용자 이름: {sessionStorage.getItem("name")}</p>
          <p>가입일: </p>
          </div>
                  {/* onClick={()=>{
                     navigate('/modify')
                 }} */}
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