import "../css/Mypage.css"
import noImg from "../img/noimg.jpg"
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';




function Follower() {
    const [friendPresent, setFriendPresent] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    let [productName, setProductName] = useState("");
    let [productPrice, setProductPrice] = useState("");
    let [productImage, setProductImage] = useState("");
    let [presentId, setPresentId] = useState("");
    let [resultPrice, setResultPrice] = useState(0);
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
                        <th>상품명</th><th>찜한 날짜</th><th>수량</th><th>적립된 금액/상품 가격</th><th>남은 가격</th><th>펀딩</th>
                    </tr>
                    </thead>
                    <tbody>
           
            {friendPresent.map((data,i) => {
                return (
                        <tr>  
                            <td>{data.productName}</td>
                            <td>{data.presentDate}</td>
                            <td>{data.presentCount}</td>
                            <td>{data.fundingPrice}원/{data.productPrice}</td>
                            <td>{data.calculate}원</td>  
                            {
                              data.calculate === 0 
                              ? <td style={{color:'blue', backgroundColor:'white'}}>펀딩완료</td>
                              :
                             
                            <td style={{cursor:'pointer'}} onClick={() => {
                              return(
                                setModalShow(true),
                                setProductName(data.productName),
                                setProductPrice(data.productPrice),
                                setResultPrice(data.calculate),
                                setProductImage(data.productImage),
                                setPresentId(data.presentNo)
                              )
                            }}>펀딩하기</td>
                          }
                            </tr>   
                )
            })}    
      </tbody>
    </table>   
    <MyVerticallyCenteredModal
    show={modalShow}
    name={productName}
    price={productPrice}
    rstPrice={resultPrice}
    image={productImage}
    id={presentId}
    site={name}
    onHide={() => setModalShow(false)}
    />
            </div>
        </div>
    )
}
export default Follower;