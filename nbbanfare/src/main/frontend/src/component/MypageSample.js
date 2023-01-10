import "../css/Mypage.css";
import noImg from "../img/noimg.jpg";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import requests from "../api/requests";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import styled from "styled-components";
import { CategoryButton } from "./Product";
const MypageSample = () => {
  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState("");
  const [showfileImage, setShowFileImage] = useState("");

  const [showImageUploadBtn, setShowImageUploadBtn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("user_id") == null) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  }, []);

  const deleteUser = () => {
    var q = prompt(
      `회원탈퇴 하시겠습니까?
          "${sessionStorage.getItem("user_id")}/탈퇴"
          를 입력해주세요`,
      ""
    );
    console.log(q);
    var a = q;
    console.log(a);

    if (a === sessionStorage.getItem("user_id") + "/탈퇴") {
      // alert("탈퇴됨")
      axios
        .post(
          `${requests.deleteUserPath}/${sessionStorage.getItem("user_id")}`,
          null,
          {
            params: {
              a: a,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data === true) {
            sessionStorage.clear();
            alert("회원탈퇴가 정상적으로 처리되었습니다.");
          }
          document.location.href = "/";
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("입력값이 올바르지 않습니다.");
    }
    console.log(a);
  };
  const fileInput = useRef();
  const handleButtonClick = (e) => {
    fileInput.current.click();
  };

  // 파일 저장
  const saveFileImage = (e) => {
    setFileImage(e.target.files);
    console.log(e.target.files);
    setShowFileImage(URL.createObjectURL(e.target.files[0]));
    setShowImageUploadBtn(true)
  };

  function send() {
    const fd = new FormData();
    // 파일 데이터 저장
    Object.values(fileImage).forEach((fileImage) =>
      fd.append("fileOne", fileImage)
    );

    axios
      .post(requests.imageUploadPath, fd, {
        headers: {
          "Content-Type": `multipart/form-data; `,
        },
        params: {
          userEmail: sessionStorage.getItem("user_id"),
        },
      })
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("image", res.data.userImage);
        window.location.reload();
      })
      .catch((error) => {
        // 예외 처리
        console.log(error);
      });
  }
  const cancleUpload =()=>{
    setShowFileImage("")
    setShowImageUploadBtn(false)
  }
  return (
    <div className="sample-mypage-container">
      <div className="sample-mypage-nav">
        <div className="sample-mypage-info">
          {sessionStorage.getItem("image") !== "null" ? (
            <img
              src={sessionStorage.getItem("image")}
              style={{
                width: "100px",
                height: "100px",
                // margin: "10vh",
                borderRadius: "45px",
                overflow: "hidden",
              }}
            ></img>
          ) : (
            <img
              src={noImg}
              style={{
                width: "100px",
                height: "100px",
                // margin: "10vh",
                borderRadius: "45px",
                overflow: "hidden",
              }}
            ></img>
          )}
          <button onClick={handleButtonClick} className="uploadIcon">
            <AddAPhotoIcon
              type="button"
              style={{ cursor: "pointer", border: 0, outline: 0 }}
            ></AddAPhotoIcon>
          </button>
          <form encType="multipart/form-data">
            <input
              type="file"
              id="imgUpload"
              accept="image/*"
              ref={fileInput}
              onChange={saveFileImage}
              hidden
            />
          </form>
          <span style={{ fontSize: "1.7rem", fontWeight: "600" }}>
            {sessionStorage.getItem("name")}
          </span>
        </div>
        {showImageUploadBtn ? 
        <div className="sample-mypage-imageSetting">
          <img src={showfileImage} style={{borderRadius:"45px"}} width="100px" height="90px"></img>
          <CategoryButton type="button" onClick={send}>
            저장
          </CategoryButton>
          <CategoryButton onClick={cancleUpload}>취소</CategoryButton>
        </div> : null}
        <div className="sample-mypage-list">
          <h4>마이페이지</h4>
          <ul>
            <li><a href="/mypage/wishproduct">찜한상품</a></li>
            <li><a href="/mypage/paylist">펀딩목록</a></li>
            <li><a href="/mypage/purlist">구매목록</a></li>
            <li>팔로워보기</li>
            <li><Link to="/mypage/modify">회원정보 수정하기</Link></li>
            {sessionStorage.getItem("kakaoUser") === "true" ? null 
                :<li className="mypageList" onClick={deleteUser}>회원 탈퇴</li> }
          </ul>
        </div>
      </div>
      <div className="sample-mypage-content">
          <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MypageSample;
