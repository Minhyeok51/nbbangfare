import "../css/ItemDetail.css"
import "./Header"
import "./Footer"
import requests from '../api/requests';
import { useNavigate } from "react-router-dom";
import noimg from "../img/noimg.jpg";
import Header from "./Header";
import Footer from "./Footer";
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";

function ItemDetail(){
    const [product, setProduct] = useState({})
    let {id} = useParams();
    let navigate = useNavigate();
    const getData = async() => {
        const url = `/ItemDetail/${id}`;
        axios
          .get(url)
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
      }


    return(
        <div>
                <div className="ItemDetail">
                    <div className="imgcls">
                        <img src={product.productImage}></img>
                    </div>
                    <div className="textStyle">
                        <h3>상품명: {product.productName}</h3>
                        <h3>상품가격: {product.productPrice}</h3>    
                    </div> 
                </div>

            <div className="btncss">
                <button type="submit" onClick={ResItem}>찜하기</button>
            </div>
            
            
        </div>
        
    )
}
export default ItemDetail;