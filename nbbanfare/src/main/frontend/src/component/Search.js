import axios from "axios";
import { useEffect, useState, navigate } from "react";
import CardImg from "react-bootstrap/esm/CardImg";
import {useParams} from "react-router";
import Table from 'react-bootstrap/Table';
import FollowModal from "./Switchstate";
import Switchstate from "./Switchstate";
import Button from 'react-bootstrap/Button';
import "../css/Search.css";


function Search() {
    const [searchUser, setSearchUser] = useState([]);
    let {word} = useParams();
    let user = sessionStorage.getItem("user_id");
    const [show, setShow] = useState(false);
    let userList;
    const [followList, setFollowList] = useState([]);
    const [isCheck, setCheck] = useState(false);
    const arr = []
    const url = "http://localhost:8080/Search/"+ word;

    
    const getData = async() => {
        
        axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          // setSearchUser(response.data); //검색한 사람 전체 리스트 
          
          userList = response.data.filter((userR) => userR.userEmail !== user)
          setSearchUser(userList);
          console.log(searchUser);
          console.log("성공");
        })
        .catch((Error) => {
          console.log(Error);
        });


          axios
          .get(url + "/" +user)  //로그인한 사용자의 친구목록 리스트
          .then((response) => {
            console.log(response.data); //여기서는 값이 뜸
            setFollowList(response.data);
            console.log(followList); //여기서는 값이 안뜸
            console.log("성공");
        })
          .catch((Error) => {
            console.log(Error);
          });
  
      };
      useEffect(() => {
        getData();  
      }, []) 


const follow = (i,email) =>{

  let btn  = document.getElementById(i+"button");
  
  console.log(btn.innerText)
  let userId = sessionStorage.getItem("user_id")
  if(userId == null) {
    window.location.replace("/login")
  } else {
  if(btn.innerHTML==="팔로우하기") {
  //여기서 db에 넣기
  axios
      .post(url,null,{params: {
        'followerId':email,
        'userId':sessionStorage.getItem('user_id'),
      }})
      .then((response) => {
          console.log(response.data)
          console.log(response.status)
          if(response.status == 200){
            alert("하기성공")
            
          }
          btn.innerHTML="팔로우끊기"
      })
      .catch((error) => {
          console.log(error);
          alert("등록실패")
      });
  
}else{
  //여기서 db에 빼기
  axios
  .put(url,null,{params: {

    'followerId':email,
    'userId':sessionStorage.getItem('user_id')}
  })
  .then((response) => {
      console.log(response.data)
      console.log(response.status)
      if(response.status == 200){
        alert("끊기성공")
        
      }
      btn.innerHTML="팔로우하기"
  })
  .catch((error) => {
      console.log(error);
      alert("등록실패")
  });
}}


  console.log(btn);
  setCheck(!isCheck)

}
      return(
        <div className="search_box">

        {/* {searchUser.map((data,i) => { */}
           

              {searchUser.map((data,i) => {
                arr.push(i)
                return(
                  <>
                <div className="search-listbox">
                <div className="search-card" key={i} >
                  {/* <td>{i+1}</td> */}
                  <div ><img className="search_img" src={data.userImage} width="120px" height="120px"/></div>
                  <div>{data.userName}</div>
                  <div>{data.userEmail}</div>
                  
                  <div key={i}>
                  {/* {isCheck ? <button id={i+"button"} key={i} onClick={()=>{follow(i)}}>팔로우하기</button> : <button id={i+"button"} onClick={()=>{follow(i)}}>팔로우끊기</button>} */}
                  {/* {<button id={i+"button"} key={i} onClick={()=>{}}>팔로우하기</button>} */}
                  <Button variant="outline-warning" id={i+"button"} email = {data.userEmail} key = {i} onClick={()=>{follow(i,`${data.userEmail}`)}}>
                    {
                      data.userEmail == (followList.find((follower, i)=> {
                        return (follower == data.userEmail);
                      })) ? '팔로우끊기' : '팔로우하기'
                      // followList === null ? null :
                          // if(data.userEmail === follower) {
                          //   // btn.innerText="팔로우끊기" 
                          // } else {
                          //   // btn.innerText="팔로우하기"
                          // }
                        
                          // followList.map((follower,j) => {
                          //   return(
                          //     email === follower ? "팔로우끊기"  :
                          //       "팔로우하기"
                          //   )
                          // }
                          // )
                   }
                  </Button>
                  </div>
                </div>
                </div>
                </>
             )})}
             
            
        
        </div>

      )
}

export default Search;