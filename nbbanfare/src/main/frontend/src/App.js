import React,{useEffect,useState} from 'react';
import axios from 'axios';
import requests from './api/requests';
import Header from './component/Header';
import Footer from './component/Footer';
import Login from './component/Login';
import ItemDetail from './component/ItemDetail';
import { Routes, Route} from "react-router-dom";
import Join from './component/Join';
function App() {
  const [product, setProduct] = useState([])
  const [isLogin, setIsLogin] = useState(false); //로그인 관리

    useEffect(() => {
      if (sessionStorage.getItem("name") === null) {
        // sessionStorage 에 name 라는 key 값으로 저장된 값이 없다면
        console.log("isLogin ?? :: ", isLogin);
      } else {
        // sessionStorage 에 name 라는 key 값으로 저장된 값이 있다면
        // 로그인 상태 변경
        setIsLogin(true);
        console.log("isLogin ?? :: ", isLogin);
      }
    });
  

    const getData = async() => {
      const url = "http://localhost:8080";
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

    
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header session={isLogin} setSession={setIsLogin}/>
              {product.map((data,i) => {
                return(
                <div>백에서 가져온 데이터 : {data.productName},{data.productKind},{data.productName},{data.productPrice} </div>
                
                )
              })}
              
              
             
              <Footer />
            </div>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/mypage"></Route>
        <Route path="/Join" element={<Join/>}></Route>
        <Route path="/ItemDetail" element={<ItemDetail/>}></Route> 
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
