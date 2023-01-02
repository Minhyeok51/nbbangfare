import axios from 'axios';
import React, { useState,useEffect } from 'react';

function WishProduct() {
    const [present, setPresent] = useState([]);
    const getPreData = async() => {
        const url = `/mypage/wishproduct/${sessionStorage.getItem('user_id')}`;
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
        getPreData();
      }, [])
    return(
        <div>
            <table className="presentTable">
                <thead>
                    <tr>
                        <th>상품명</th><th>찜한 날짜</th><th>수량</th><th>적립된/상품 가격</th><th>남은 금액</th><th>구매확정</th>
                    </tr>
                    </thead>
                    <tbody>
           
            {present.map((data,i) => {
                return (
                        <tr>  
                            <td>{data.productName}</td>
                            <td>{data.presentDate}</td>
                            <td>{data.presentCount}</td>
                            <td>{data.fundingPrice}원/{data.productPrice}</td>
                            <td>{data.calculate}원</td>
                            {
                                data.calculate === 0
                                ? <td style={{cursor:'pointer'}}>구매가능</td>
                                : <td style={{color:'red', backgroundColor:'white'}}>구매불가</td>
                            }
                        </tr>   
 

                )
            })}    
  
      </tbody>
    </table>
    </div>
    )
}
export default WishProduct;