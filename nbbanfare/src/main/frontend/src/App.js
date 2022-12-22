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

    useEffect(() => {
        axios.get(requests.restPath)
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
              <div>백에서 가져온 데이터 : {hello}</div>
             
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
