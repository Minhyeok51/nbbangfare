import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFileWord, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "../css/header.css"
import {useNavigate} from "react-router-dom";
import requests from '../api/requests';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import mainLogo from '../img/mainLogo.png'

function Header({session,setSession}) {
    let navigate = useNavigate();

    const [word, setWord] = useState([])
    
    const onSubmit = async => {
      window.location.href = "/Search/"  + word
      
  }
    const logOutFunc = ()=>{
      axios.post(requests.kakaoLogoutPath     
    ).then(res=>{
      console.log(res.data)
    })
    .catch(error =>{
      console.log(error)
    })
    .then(
      console.log("카카오로그아웃")
    )
  }
  return (
      <div className='container'>
        <Container>
          <Row className="header">
            <Col>
              {/* <h1>
                <a onClick={()=>{navigate('/')}}>N빵빠레</a>
              </h1> */}
              <a onClick={()=>{navigate('/')}}><img className='mainLogo' src={mainLogo}/></a>
            </Col>
            <Col xs={5}>
              <form action="/" method="get">
                <fieldset>
                  <legend>
                    <input onChange={(e) => {setWord(e.target.value); console.log(word)}} type="text" placeholder="친구찾기" />
                    <button type="button" onClick={() => {onSubmit();}}>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                  </legend>
                </fieldset>
              </form>
            </Col>
            <Col>
            { session == false? (
              <ul style={{ listStyle: "none" }}>
              <li>
                <a onClick={()=>{navigate('/login')}}>마이페이지</a>
              </li>
              <li>
                <a onClick={()=>{navigate('/join')}}>회원가입</a>
              </li>
              <li>
                <a onClick={()=>{navigate("/login")}}>로그인</a>
              </li>
            </ul>
            ) : (
              <ul style={{ listStyle: "none" }}>
              <li>

              {sessionStorage.getItem("name")}님 환영합니다.
              </li>
              <li>
                <a onClick={()=>{navigate(`/mypage/wishproduct`)}}>마이페이지</a>
              </li>
              <li>
                <a onClick={()=>{
                  logOutFunc()
                  sessionStorage.clear()
                  setSession(false)
                  window.location.href="/"
              }}>로그아웃</a>
              </li>
            </ul>
            )
            }
              
            </Col>
          </Row>

          <Navbar bg="light" expand="lg">
          <Container fluid>
        {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" /> */}
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home </Nav.Link>
            <Nav.Link href="#action2">찜목록 </Nav.Link>
            <NavDropdown title="상품목록" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">전체보기</NavDropdown.Item>
              <NavDropdown.Item href="001">
                상의
              </NavDropdown.Item>
              <NavDropdown.Item href="002">
                아우터
              </NavDropdown.Item>
              <NavDropdown.Item href="003">
                하의
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#action6">N빵빠레란 </Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>


          </Navbar>
          {/* <div  className='row'
            style={{
              background: "rgb(30, 159, 243)",
              height: "50px",
              paddingTop: "10px",
              width: "100vw",
              zIndex:"100"
            }}
          > */}
            {/* <Row>
              <Col>
                <ul className='dropDownMenu'>
                  <li className='dropDown'>
                    <a href="/product-list">상품목록</a>
                    <ul className='dropDownMenu'>
                        <li><a href='hi'>무신사</a></li>
                        <li><a>선물하기</a></li>
                    </ul>
                  </li>
                  <li className='dropDown'>
                    <a href="/wishlist">찜목록</a>
                    <ul className='dropDownMenu'>
                        <li><a>무신사2</a></li>
                        <li><a>선물하기2</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="/nbbangfare">N빵빠레란?</a>
                  </li>
                </ul>
              </Col>
             
            </Row> */}
          {/* </div> */}
        </Container>
      </div>
  );
}
export default Header;