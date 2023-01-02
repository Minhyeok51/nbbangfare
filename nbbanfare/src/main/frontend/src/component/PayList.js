import axios from 'axios';
import React, { useState,useEffect } from 'react';


function PayList() {
    const [funding, setFunding] = useState([]);
    const getPreData = async() => {
        const url = `/mypage/paylist/${sessionStorage.getItem('user_id')}`;
        axios
          .get(url)
          .then((response) => {
            setFunding(response.data);
            console.log(funding)
            console.log("성공");
          })
          .catch((Error) => {
            console.log(Error);
          });
  
      };
      useEffect(() => {
        getPreData();
      }, [])

      const payConfirm = () => {
       if(window.confirm("예 아니오")) {
        alert("예");
       } else {
        alert("아니요");
       }
      }
     
    return(
        <div>
            <table className="presentTable">
                <thead>
                    <tr>
                        <th>주문번호</th><th>상품명</th><th>팔로워ID</th><th>팔로워 이름</th><th>결제금액</th><th>환불요청</th>
                    </tr>
                    </thead>
                    <tbody>
           
            {funding.map((data,i) => {
                return (
                        <tr>  
                            <td>{data.merchantUid}</td>
                            <td>{data.productName}</td>
                            <td>{data.followerId}</td>
                            <td>{data.userName}</td>
                            <td>{data.fundingPrice}</td>
                            {
                                data.fundingResult === 1
                                ? <td style={{backgroundColor:'white'}}><button onclick={payConfirm}>환불하기</button></td>
                                : <td style={{color:'red', backgroundColor:'white'}}>환불요청됨</td>
                            }
                        </tr>   
                )
            })}    
      </tbody>
    </table>
    </div>
    )
}
export default PayList;