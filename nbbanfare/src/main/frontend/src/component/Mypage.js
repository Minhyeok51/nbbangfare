import "../css/Mypage.css"
import noImg from "../img/noimg.jpg"
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Outlet } from "react-router-dom";
import {useNavigate } from "react-router-dom";

function Mypage() {
    let navigate = useNavigate();

    return(
        <div>
            <div className="userBar">

                <img src={noImg} style={{width:'200px', height:'200px', margin:'10vh', borderRadius:'70%', overflow:'hidden'}}></img>
                <div className="textplc">
                    <p>사용자 이름: </p>
                    <p>가입일: </p>
                </div>

                <div className="followplc">
                    <p style={{cursor:'pointer'}} onClick={{
                        
                    }}>팔로워 보기</p>
                </div>
            </div>
            <div className="purchaseList">
                <Breadcrumb className="Retxt">
                    <Breadcrumb.Item href="/mypage/wishproduct">찜한상품</Breadcrumb.Item>
                    <Breadcrumb.Item href="/mypage/paylist">펀딩목록</Breadcrumb.Item>
                    <Breadcrumb.Item href="/mypage/purlist">구매목록</Breadcrumb.Item>
                </Breadcrumb>
                <Outlet/>
            </div>
        </div>
    )
}
export default Mypage;