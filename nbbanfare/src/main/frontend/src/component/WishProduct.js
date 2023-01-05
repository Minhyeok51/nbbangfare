import axios from 'axios';
import React, { useState,useEffect } from 'react';
import FundingUserListModal from './FundingUserListModal';

function WishProduct() {
    const [modalShow, setModalShow] = useState(false);
    const [presentId, setPresentId] = useState("");
    const [present, setPresent] = useState([]);
    const [users, setUsers] = useState([]);
    const url = `/mypage/wishproduct/${sessionStorage.getItem('user_id')}`;
    const getPreData = async() => {
        axios
          .get(url, {params : {
            reqCnt:1,
          }})
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

      const cancelButton = (presentNo, productNo) => {
        if(window.confirm("정말로 취소하시겠습니까?")) {
          alert("확인")
          axios
        .put(url,null,{params: {
          userNo:sessionStorage.getItem('user_id'),
          presentNo:presentNo
        }})
        .then((response) => {
            console.log(response.data)
            console.log(response.status)
            // window.location.reload()
        })
        .catch((error) => {
            console.log(error.response);
            alert("요청실패")
        });
       }else {
          alert("취소")
       }
      }
  

      const purchaseButton = (predata, purdata) => {
        if(window.confirm("구매를 확정하게 되면 환불이 불가합니다. 확정하시겠습니까?")) {
          alert("구매완료 구매해주셔서 감사합니다.")
          axios
        .post(url,null,{params: {
          userid:sessionStorage.getItem('user_id'),
          presentNo:predata,
          productNo:purdata
        }})
        .then((response) => {
            console.log(response.data)
            console.log(response.status)
            // window.location.reload()
        })
        .catch((error) => {
            console.log(error.response);
            alert("요청실패")
        });
       }else {
          alert("취소")
       }
      }

    

    return(
        <div>
            <table className="presentTable">
                <thead>
                    <tr>
                        <th>상품명</th><th>찜한 날짜</th><th>수량</th><th>적립된/상품 가격</th><th>남은 금액</th><th>구매확정</th><th>취소하기</th>
                    </tr>
                    </thead>
                    <tbody>
           
            {present.map((data,i) => {
                return (
                        <tr>  
                            <td>{data.productName}</td>
                            <td>{data.presentDate}</td>
                            <td>{data.presentCount}</td>
                            <td style={{cursor:'pointer'}} onClick={()=>{

                                  axios
                                  .get(url, { params: {
                                      presentNo:data.presentNo,
                                      reqCnt:2
                                  }})
                                  .then((response) => {
                                      setUsers(response.data);
                                      console.log(users)
                                      console.log("성공");
                                  })
                                  .catch((Error) => {
                                      console.log(Error);
                                  });
                              

                              return(
                                setModalShow(true),
                                setPresentId(data.presentNo)
                              )
                            }}>{data.fundingPrice}원/{data.productPrice}</td>
                            <td>{data.calculate}원</td>
                            {
                                data.calculate === 0
                                ? <td style={{cursor:'pointer'}} onClick={()=>purchaseButton(`${data.presentNo}`,`${data.productNo}`)}>구매가능</td>
                                : <td style={{color:'red', backgroundColor:'white'}}>구매불가</td>
                            } 
                            <td style={{cursor:'pointer'}} onClick={()=>cancelButton(`${data.presentNo}`, `${data.productNo}`)}>취소</td>   
                        </tr>   
                )
              })}    
      </tbody>
    </table>
    
    <FundingUserListModal
          show={modalShow}
          id={presentId}
          user={users}
          onHide={() => setModalShow(false)}
          />
    </div>
    )
}
export default WishProduct;