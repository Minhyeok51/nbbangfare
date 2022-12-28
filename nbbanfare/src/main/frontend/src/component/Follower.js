import "../css/Mypage.css"
import noImg from "../img/noimg.jpg"
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



function Follower() {
    const [friendPresent, setFriendPresent] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    
    let [productName, setProductName] = useState("");
    let [productPrice, setProductPrice] = useState("");
    let [productImage, setProductImage] = useState("");
    let {name} = useParams();
    const getData = async() => {
        const url = `/follow/${name}`;
        axios
          .get(url)
          .then((response) => {
            setFriendPresent(response.data);
            console.log(friendPresent)
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

                <img src={noImg} style={{width:'200px', height:'200px', margin:'10vh', borderRadius:'70%', overflow:'hidden'}}></img>
                <div className="textplc">
                    <p>팔로워 이름: </p>
                    <p>팔로우일: </p>
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
                        <th>상품명</th><th>찜한 날짜</th><th>수량</th><th>적립된/남은 금액</th><th>상품 가격</th><th>펀딩</th>
                    </tr>
                    </thead>
                    <tbody>
           
            {friendPresent.map((data,i) => {
                return (
                        <tr>  
                            <td>{data.productName}</td>
                            <td>{data.presentDate}</td>
                            <td>{data.presentCount}</td>
                            <td>0원/{data.productPrice}</td>
                            <td>{data.productPrice}</td>    
                            <td style={{cursor:'pointer'}} onClick={() => {
                              return(
                                setModalShow(true),
                                setProductName(data.productName),
                                setProductPrice(data.productPrice),
                                setProductImage(data.productImage)
                              )
                            }}>펀딩하기</td>
                            </tr>   
                )
            })}    
      </tbody>
    </table>   
    <MyVerticallyCenteredModal
    show={modalShow}
    name={productName}
    price={productPrice}
    image={productImage}
    onHide={() => setModalShow(false)}
    />
            </div>
        </div>
    )
}

function MyVerticallyCenteredModal(props) {
  
  function onClickPayment() {
    const { IMP } = window;
    IMP.init('imp87335268');

    const data = {
      pg: 'kakaopay',        
      pay_method: 'kakaopay',               
      merchant_uid: `mid_${new Date().getTime()}`, 
      amount: '1000',                  
      name: '아임포트 결제 데이터 분석',      
      buyer_name: '홍길동',                 
      buyer_tel: '01012341234',      
      buyer_email: 'example@example',    
      buyer_addr: '신사동 661-16',      
      buyer_postcode: '06018',                     
    };
    IMP.request_pay(data, callback);
  }
  function callback(response) {
    
    const {
      success,
      merchant_uid,
      amount,
      buyer_name,
      error_msg,
    } = response;

    if (success) {
      alert(`결제 성공 ${response.amount}`);
      window.location.reload();
    } else {
      alert(`결제 실패: ${error_msg}`);
      window.location.reload();
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
export default Follower;