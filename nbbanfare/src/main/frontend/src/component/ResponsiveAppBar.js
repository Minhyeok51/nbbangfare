import "../css/header.css";
import { NavLink, useNavigate } from "react-router-dom";
import mainLogo from "../img/mainLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import requests from '../api/requests';
import axios from 'axios';
function ResponsiveAppBar({session,setSession}) {
  let navigate = useNavigate();
  const settings = ['로그아웃'];
  const [search, setSearch] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState();
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
              <li className="home">
                {/* <a href="/">홈</a> */}
                <NavLink to="/" className="active">홈</NavLink>
              </li>
              <li>
                <a>랭킹</a>
              </li>
              <li>
                <a>브랜드</a>
              </li>
              <li className="mypage">
                {/* <a href="/mypage">선물함</a> */}
                <NavLink to="/mypage/wishproduct" className="active">선물함</NavLink>
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
                <li style={{cursor:"pointer"}} onClick={handleOpenUserMenu}>{sessionStorage.getItem("name")}님</li>
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
                  <Typography textAlign="center"onClick={()=>{
                  logOutFunc()
                  sessionStorage.clear()
                  setSession(false)
                  window.location.href="/"
              }}>{setting}</Typography>
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
            <form>
              <input type="search" placeholder="친구이름을 검색주세요 " />
              <button type="submit" onClick={()=>{
                navigate("/login")
              }}>
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
export default ResponsiveAppBar;

