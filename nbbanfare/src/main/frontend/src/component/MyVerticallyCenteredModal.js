import "../css/Mypage.css"
import noImg from "../img/noimg.jpg"
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import requests from '../api/requests'
import { useParams,useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
  let [inputPrice, setInputPrice] = useState(0);
  function onClickPayment(e) {
    if(props.rstPrice < inputPrice) {
      alert("오류 발생 금액 많음")
      e.preventDefault();
      return
    }
    else {
    
    const { IMP } = window;
    IMP.init('imp87335268');

    const data = {
      pg: 'kakaopay',        
      pay_method: 'kakaopay',               
      merchant_uid: `mid_${new Date().getTime()}`, 
      amount: `${inputPrice}`,                  
      name: `${props.name}`,
      buyer_name: `${props.site}`,                 
      buyer_tel: "01000000000",      
      buyer_email: `${props.id}`,    
      buyer_addr: '신사동 661-16',      
      buyer_postcode: '06018',                     
    };
    IMP.request_pay(data, callback);
  }
  function callback(response) {
    
    const {
      imp_uid,
      success,
      buyer_email,
      merchant_uid,
      paid_amount,
      buyer_name,
      error_msg,
      status
    } = response;

    const url = `/follow/${imp_uid}`

    if (success) {
      alert(`결제 성공`);
      axios
        .post(url,null,{params: {
            fundingid:imp_uid,
            merchantUid:merchant_uid,
            userNo:sessionStorage.getItem("user_id"),
            presentId:buyer_email,
            followerId:buyer_name,
            fundingPrice:paid_amount,
            fundingResult:1,
            status: status
        }})
        .then((response) => {
              console.log(response.data.resultCode)
              console.log(response.data.resultStatus)
              console.log(response.data.resultMsg)
              alert("서버 전송 성공") 
              window.location.reload();

          }
        )
      .catch((error) => {
          console.log(error.response);
          alert("서버 전송 실패")
          window.location.reload();
      });
       
       } else {
      alert(`결제 실패: ${error_msg}`);
      window.location.reload();
    }
  }
} 
  return (
    <Modal id='modalID'
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          상품화면
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modalcls">
        <img src={props.image} style={{width:"250px", height:"250px"}}/>
          <p>{props.name}</p>
          <p>{props.rstPrice}원</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <input type='number' id='price' value={inputPrice} onChange={(e)=>{
          setInputPrice(e.target.value);
        }}/>
        <Button variant="outline-primary" onClick={onClickPayment}>펀딩</Button>
        <Button variant="outline-primary" onClick={props.onHide}>취소</Button>
        
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;