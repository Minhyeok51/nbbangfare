import "../css/Mypage.css"
import noImg from "../img/noimg.jpg"
import React, { useState,useEffect } from 'react';
import axios from 'axios';

function Mypage({session,setSession}) {
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
    return(
        <div>
            <div className="userBar">
                {sessionStorage.getItem("image") !== null ? 
                <img src={sessionStorage.getItem("image")} style={{width:'200px', height:'200px', margin:'10vh', borderRadius:'70%', overflow:'hidden'}}></img>
            :
            <img src={noImg} style={{width:'200px', height:'200px', margin:'10vh', borderRadius:'70%', overflow:'hidden'}}></img>
            }
                
                <div className="textplc">
                    <p>사용자 이름: {sessionStorage.getItem("name")}</p>
                    <p>가입일: </p>
                </div>

                <div className="followplc">
                    <p style={{cursor:'pointer'}} onClick={{
                        
                    }}>팔로워 보기</p>
                </div>
            </div>
            <div className="purchaseList">
                <h4 className="Retxt">찜한 상품</h4>
                <table className="presentTable">
                <thead>
                    <tr>
                        <th>상품명</th><th>찜한 날짜</th><th>수량</th><th>적립된/남은 금액</th><th>상품 가격</th><th>구매확정</th>
                    </tr>
                    </thead>
                    <tbody>
           
            {present.map((data,i) => {
                return (
                        <tr>  
                            <td>{data.productName}</td>
                            <td>{data.presentDate}</td>
                            <td>{data.presentCount}</td>
                            <td>0원/{data.productPrice}</td>
                            <td>{data.productPrice}</td>
                            <td style={{cursor:'pointer'}}>구매하기</td>
                        </tr>   
                )
            })}    
  
      </tbody>
    </table>   
            </div>
        </div>
    )
}
export default Mypage;