import "../css/ItemDetail.css"
import "./Header"
import "./Footer"
import requests from '../api/requests';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
function ItemDetail(){
    const [product, setProduct] = useState({})
    let {id} = useParams();
    let navigate = useNavigate();
    const getData = async() => {
        const url = `/ItemDetail/${id}`;
        axios
          .get(`${requests.ItemDetailPath}/${id}`)
          .then((response) => {
            setProduct(response.data);
            console.log(product)
            console.log("성공");
          })
          .catch((Error) => {
            console.log(Error);
          });
  
      };
      useEffect(() => {
        getData();
      }, [])  

      const ResItem = async (e) => {
        if(sessionStorage.getItem('user_id') === null) {
          alert("로그인 페이지로 이동합니다.")
          navigate('/login')
        } else {
        const url = `/ItemDetail/${id}`;
        await axios
      .post(url,null,{params: {
        'productNo':product.productNo,
        'userNo':sessionStorage.getItem('user_id'),
        'productPrice':product.productPrice
      }})
      .then((response) => {
          console.log(response.data)
          console.log(response.status)
          if(response.status == 200){
            alert("성공")
            navigate("/")
          }
      })
      .catch((error) => {
          console.log(error);
          alert("등록실패")
      });
      }}


    return(
        <div className="ItemDetail-contianer">
            <div className="ItemDetail">
                <div className="imgcls">
                    <img src={product.productImage} style={{width:'400px', height:'400px'}}></img>
                </div>
                <div className="textStyle">
                    <h3>{product.productName}</h3>
                    <h3>{product.productPrice}</h3>
                    <a href={product.productContent} target="_black">상세설명은 여기로</a>    
                    <HeartButton type="submit" onClick={ResItem} 
                    ><FontAwesomeIcon icon={faHeart} style={{width:"200px",height:"30px"}}/></HeartButton>
                </div> 
            </div>      
        </div>
        
    )
}
export default ItemDetail;

const HeartButton = styled.button`
border:none;
background:transparent; 
color:red;
&:hover {
  opacity: 0.6;
}
`

