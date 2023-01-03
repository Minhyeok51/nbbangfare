import React,{useEffect,useState} from 'react';
import axios from 'axios';
import requests from './api/requests';
import Header from './component/Header';
import Footer from './component/Footer';
import Login from './component/Login';
import ItemDetail from './component/ItemDetail';
import Mypage from './component/Mypage';
import { Routes, Route, useNavigate} from "react-router-dom";
import Join from './component/Join';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CategoryItem from './component/CategoryItem';
import Follower from './component/Follower';
import Search from './component/Search';
import KakaoLogin from './component/KakaoLogin';
import JoinWithKakao from'./component/JoinWithKakao'
import ForgotPassword from './component/ForgotPassword';

function App() {
  const [product, setProduct] = useState([])
  const [isLogin, setIsLogin] = useState(false); //로그인 관리
  let navigate = useNavigate();

    // useEffect(() => {
    //     axios.get(requests.restPath)
    //     .then(response => setProduct(response.data))
    //     .catch(error => console.log(error))
    // }, []);
    
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
    <>
       <Header session={isLogin} setSession={setIsLogin}/>
      <Routes>
        <Route
          path="/"
          element={
            <div>

               <div>
             

              {/* {product.map((data,i) => {
                return( */}               
               
                  <Row xs={1} md={4} className="g-4">
                  
                  {/* {Array.from({ length: 4 }).map((_, idx) => ( */}
                 
                  {product.map((data,i) => {
                 return(
                    
                    <Col>
                      <Card style = {{height: '33rem'}} onClick={()=>{navigate(`/ItemDetail/${data.productNo}`)}}>
                        <Card.Img style={{height:'360px'}} variant="top" src={data.productImage} />
                        <Card.Body>
                          <Card.Title>{data.productName}</Card.Title>
                          <Card.Text>
                          {data.productPrice}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                )})}
                </Row> 
            </div>
            </div>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/> 
        
        <Route path="/mypage" element={<Mypage session={isLogin} setSession={setIsLogin}/>}></Route>
        <Route path="follow/:name" element={<Follower/>}></Route>
        <Route path="/join" element={<Join/>}></Route>
        <Route path="/joinWithKakao" element={<JoinWithKakao/>}></Route>
        
        <Route path="ItemDetail/:id" element={<ItemDetail/>}> </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/:productKind" element={<CategoryItem/>} />
        <Route path='/oauth/kakao' element={<KakaoLogin/>}/>
         <Route path='/Search/:word' element={<Search/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
