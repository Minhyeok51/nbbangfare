import axios from 'axios';
import React, { useState,useEffect } from 'react';



function PayList() {
    const [funding, setFunding] = useState([]);
    const getUrl = `/mypage/paylist/${sessionStorage.getItem('user_id')}`;
    const getPreData = async() => {
        axios
          .get(getUrl)
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

     const refundConfirm = (fid, fprice) => {
      const postUrl =  `/mypage/paylist/${fid}`;
      if(window.confirm("정말로 취소하시겠습니까?")) {
        alert("확인")
        axios
      .post(postUrl,null,{params: {
          fundingid:fid,
          fundingPrice:fprice,
          userNo:sessionStorage.getItem("user_id")
      }})
      .then((response) => {
          console.log(response.data)
          console.log(response.status)
      })
      .catch((error) => {
          console.log(error.response);
          alert("요청실패")
          
      });
      window.location.reload()
     }else {
        alert("취소")
        window.location.reload()
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
                            <td>{data.fundingPrice}원</td>
                            {
                                data.fundingResult === 1
                                ? <td style={{backgroundColor:'white'}}><button onClick={()=>refundConfirm(`${data.fundingid}`, `${data.fundingPrice}`)}>결제취소하기</button></td>
                                : (
                                    data.fundingResult === 3
                                    ? <td style={{color:'blue', backgroundColor:'white'}}>결제완료</td>
                                    : <td style={{color:'red', backgroundColor:'white'}}>취소됨</td>
                                ) 
                                
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