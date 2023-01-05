import axios from "axios";
import { useEffect, useState, navigate } from "react";
import CardImg from "react-bootstrap/esm/CardImg";
import {useParams} from "react-router";
import Table from 'react-bootstrap/Table';
import FollowModal from "./Switchstate";
import Switchstate from "./Switchstate";


function Search() {
    const [searchUser, setSearchUser] = useState([]);
    let {word} = useParams();
    let user = sessionStorage.getItem("user_id")
    const [show, setShow] = useState(false);
    const [followList, setFollowList] = useState([]);
    const [isCheck, setCheck] = useState(false);
    const arr = []
    const url = "http://localhost:8080/Search/"+ word;
    const getData = async() => {
        
        axios
        .get(url)
          .then((response) => {
            console.log(response.data);
            setSearchUser(response.data);
            console.log(searchUser);
            console.log("성공");
          })
          .catch((Error) => {
            console.log(Error);
          });


          axios
          .get(url + "/" +user)
            .then((response) => {
              console.log(response.data);
              setFollowList(response.data);
              console.log(followList);
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
  if(btn.innerHTML==="팔로우하기"){
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
            alert("성공")
            
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
        alert("성공")
        
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
        <div>
        {/* {searchUser.map((data,i) => { */}
           
              <Table striped>
              <thead>
                <tr>
                  <th>      #</th>
                  <th>      사용자 이름</th>
                  <th>      이메일</th>
                </tr>
              </thead>
              <tbody>
              {searchUser.map((data,i) => {
                return(
                  <>
                {arr.push(i)}  
                <tr key={i} >
                  <td>{i+1}</td>
                  <td>{data.userName}</td>
                  <td>{data.userEmail}</td>
                  <td key={i}>
                  {/* {isCheck ? <button id={i+"button"} key={i} onClick={()=>{follow(i)}}>팔로우하기</button> : <button id={i+"button"} onClick={()=>{follow(i)}}>팔로우끊기</button>} */}
                  {/* {<button id={i+"button"} key={i} onClick={()=>{}}>팔로우하기</button>} */}
                  {<button id={i+"button"} email = {data.userEmail} key = {i} onClick={()=>{follow(i,`${data.userEmail}`)}}>팔로우하기</button>}
                  </td>
                </tr>
                
                </>
             )})}
             </tbody>
            </Table>
            
        
        </div>

      )
}

export default Search;