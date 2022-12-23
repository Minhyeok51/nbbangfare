import Header from "./Header"
import Footer from "./Footer"
import "../css/Mypage.css"
import noImg from "../img/noimg.jpg"

function Mypage() {
    return(
        <div>
            <Header/>
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
                <p className="Retxt">찜한 상품</p>
            </div>



            <Footer/>
        </div>
    )
}
export default Mypage;