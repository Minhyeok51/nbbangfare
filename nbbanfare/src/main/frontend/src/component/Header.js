import "../css/header.css";
import { NavLink, useNavigate } from "react-router-dom";
import mainLogo from "../img/mainLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import requests from '../api/requests';
import axios from 'axios';

function Header({session,setSession}) {
  let navigate = useNavigate();
  const settings = ['로그아웃'];
  const [search, setSearch] = useState(false); 
  const [anchorElUser, setAnchorElUser] = useState(); //이름드롭다운
  const [word, setWord] = useState([]) //검색어 세팅
    
  const onSubmit = async => {
    // console.log("clicked")
      window.location.href = "/Search/"  + word
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
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
    <>
    <div className="test-container">
        <div className="test-header">
          <a
            onClick={() => {
              navigate("/");
            }}
          >
            <img className="mainLogo" src={mainLogo} />
          </a>

          <div className="header-nav">
            <ul className="nav-list">
              <li>
                <NavLink to="/" activeClassName="active">홈</NavLink>
              </li>
              <li>
                <NavLink to="/mypage/wishproduct" activeClassName="active">마이페이지</NavLink>
              </li>
              <li>
                <NavLink to="/nbbangfare" activeClassName="active">N빵빠레란?</NavLink>
              </li>
            </ul>
          </div>
          <div className="header-utils">
            <ul>
              <li>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSearch(!search);
                  }}
                />
              </li>
              {
                sessionStorage.getItem("name") !==null ? 
                <li style={{cursor:"pointer"}} onClick={handleOpenUserMenu}>{sessionStorage.getItem("name")}님<FontAwesomeIcon icon={faCaretDown} style={{paddingLeft:"5px"}}/></li>
                :
                <li><a href="/login">로그인</a></li>
              }
              <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={()=>{
                  logOutFunc()
                  sessionStorage.clear()
                  setSession(false)
                  window.location.href="/"
              }}>{setting}
                </Typography>
              </MenuItem>
              ))}
            </Menu>
            </ul>
          </div>
        </div>
      </div>
      {search ? (
        <>
        <div className="search-box">
          <div className="test-search">
            <form action="/" method="get">
              <input type="text"  onChange={(e) => {setWord(e.target.value); console.log(word)}} placeholder="친구이름을 검색주세요 " />
              <button type="button" onClick={onSubmit}>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ cursor: "pointer" }}/>
              </button>
            </form>
          </div>
        </div>
        <div className="test-line"></div>
        </>
      ) : null}
    </>
  );
}
export default Header;