import "../css/header.css";
import { NavLink, useNavigate } from "react-router-dom";
import mainLogo from "../img/mainLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function ResponsiveAppBar() {
  let navigate = useNavigate();
  const [search, setSearch] = useState(false);
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
                <NavLink to="/mypage" className="active">선물함</NavLink>
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
              <li>{sessionStorage.getItem("name")}님</li>
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
