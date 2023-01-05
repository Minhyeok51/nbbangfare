import "../css/Mypage.css"
import noImg from "../img/noimg.jpg"
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Outlet } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import requests from "../api/requests";

function Mypage() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(sessionStorage.getItem("user_id") == null){
      alert('로그인이 필요한 서비스입니다.')
      navigate('/login')
    }
  },[])
    const [present, setPresent] = useState([]);
    
    const getData = async() => {
        const url = `/mypage/${sessionStorage.getItem('user_id')}`;
        axios
          .get(url)
          .then((response) => {
            setPresent(response.data);
            console.log(present)
            console.log("성공");
          })
          .catch((Error) => {
            console.log(Error);
          });
  
      };
      useEffect(() => {
        getData();
      }, [])  

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
          <p>사용자 이름: {sessionStorage.getItem("name")}</p>
          <p>가입일: </p>
          </div>

          <div className="followplc">
            <ul>
                <li className="mypageList">팔로워보기</li>
                <li className="mypageList" onClick={()=>{
                    navigate('/modify')
                }}>회원정보 수정하기</li>
                <li className="mypageList" onClick={deleteUser}>회원 탈퇴</li>
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