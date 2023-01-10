import axios from 'axios';
import React, { useState,useEffect } from 'react';

function Purlist() {
    const [purchase, setPurchase] = useState([]);
    const url = `/mypage/purlist/${sessionStorage.getItem('user_id')}`;
    const getPreData = async() => {
        axios
          .get(url)
          .then((response) => {
            setPurchase(response.data);
            console.log(purchase)
            console.log("성공");
          })
          .catch((Error) => {
            console.log(Error);
          });
  
      };
      useEffect(() => {
        getPreData();
      }, [])
    return (
        <div>
                       <table className="presentTable">
                <thead>
                    <tr>
                        <th>상품명</th><th>구매번호</th><th>수량</th><th>상품 가격</th><th>구매 날짜</th><th>상태</th>
                    </tr>
                    </thead>
                    <tbody>
           
            {purchase.map((data,i) => {
                return (
                        <tr>  
                            <td>{data.productName}</td>
                            <td>{data.purchaseNo}</td>
                            <td>{data.presentCount}</td>
                            <td>{data.productPrice}원</td>
                            <td>{data.purchaseDate}</td>
                            <td>구매완료</td>   
                        </tr>   
                )
              })}    
      </tbody>
    </table>
        </div>
    )
}
export default Purlist;