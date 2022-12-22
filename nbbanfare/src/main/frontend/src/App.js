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
	const [hello, setHello] = useState('')
  const [product, setProduct] = useState([])

    // useEffect(() => {
    //     axios.get(requests.restPath)
    //     .then(response => setProduct(response.data))
    //     .catch(error => console.log(error))
    // }, []);

    

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
              <Header />
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
