import "../css/Mypage.css"
import noImg from "../img/noimg.jpg"
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import requests from '../api/requests'
import { useParams,useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {

  function onClickPayment() {
    const { IMP } = window;
    IMP.init('imp87335268');

    const data = {
      pg: 'kakaopay',        
      pay_method: 'kakaopay',               
      merchant_uid: `mid_${new Date().getTime()}`, 
      amount: '1000',                  
      name: `${props.id}`,
      buyer_name: `${props.site}`,                 
      buyer_tel: "01000000000",      
      buyer_email: `${props.id}`,    
      buyer_addr: '신사동 661-16',      
      buyer_postcode: '06018',                     
    };
    IMP.request_pay(data, callback);
  }
  function callback(response) {
    const url = `/follow/${props.site}`
    const {
      imp_uid,
      success,
      buyer_email,
      merchant_uid,
      paid_amount,
      buyer_name,
      error_msg,
    } = response;

    if (success) {
      alert(`결제 성공 ${imp_uid} ${merchant_uid} ${paid_amount} ${buyer_name} ${buyer_email}`);
      axios
      .post(url,null,{params: {
          fundingId:imp_uid,
          userId:sessionStorage.getItem("user_id"),
          presentId:buyer_email,
          followerId:buyer_name,
          fundingPrice:paid_amount,
          fundingResult:1
      }})
      .then((response) => {
          console.log(response.data)
          console.log(response.status)
          alert("서버 전송 성공")
      })
      .catch((error) => {
          console.log(error.response);
          alert("서버 전송 실패")
      });
      // window.location.reload();
    } else {
      alert(`결제 실패: ${error_msg}`);
      // window.location.reload();
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
          <p>{props.price}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={onClickPayment}>구매</Button>
        <Button variant="outline-primary" onClick={props.onHide}>취소</Button>
        
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;