
import React, { useEffect, useState } from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Login from "./component/Login";
import ItemDetail from "./component/ItemDetail";
import Mypage from "./component/Mypage";
import { Routes, Route, useNavigate} from "react-router-dom";
import Join from "./component/Join";
import CategoryItem from "./component/CategoryItem";
import Follower from "./component/Follower";
import Search from "./component/Search";
import KakaoLogin from "./component/KakaoLogin";
import JoinWithKakao from "./component/JoinWithKakao";
import ForgotPassword from "./component/ForgotPassword";
import Modify from "./component/Modify";
import PayList from "./component/PayList";
import WishProduct from "./component/WishProduct";
import Purlist from "./component/Purlist";
import styled from "styled-components";
import Product from "./component/Product";
import Nbbangfare from "./component/Nbbangfare";

function App() {
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

  return (
    <Container>
      <Header session={isLogin} setSession={setIsLogin}/>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner>
                <BannerBox>
                  <BannerText>
                    <strong>{sessionStorage.getItem("name")}</strong>
                    <br />
                    누구를 위한 선물인가요?
                  </BannerText>
                </BannerBox>
                <Image src="/images/giftbox.png" />
              </Banner>
              <Product />
            </>
          }
        ></Route>
        <Route path="/nbbangfare" element={<Nbbangfare />} />
        <Route path="/:productKind" element={<CategoryItem />} />

        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        <Route path="/mypage" element={<Mypage />}>
          <Route path="/mypage/wishproduct" element={<WishProduct />}></Route>
          <Route path="/mypage/paylist" element={<PayList />}></Route>
          <Route path="/mypage/purlist" element={<Purlist />}></Route>
          <Route path="/mypage/modify" element={<Modify />}></Route>
        </Route>

        <Route path="/follow" element={<Follower/>}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/joinWithKakao" element={<JoinWithKakao />}></Route>

        <Route path="/ItemDetail/:id" element={<ItemDetail />}>
          {" "}
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />

        <Route path="/oauth/kakao" element={<KakaoLogin />} />
        <Route path="/Search/:word" element={<Search />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;

const Container = styled.div`
  // background-color : black;
  marign: 0;
  padding: 0;
`;

export const Banner = styled.div`
  height: 300px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  width: 100%;
  // border-bottom:1px solid #999;
  // justify-content: center;
`;

export const BannerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
`;
export const BannerText = styled.div`
  height: 100px;
  width: 80%;
  font-size: 2rem;
`;
export const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
