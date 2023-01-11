import "../css/Mypage.css";
import noImg from "../img/noimg.jpg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import Pagination from "react-js-pagination";
import { PaginationBox } from "./Product";

function Follower() {
  const [friendPresent, setFriendPresent] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  let [productName, setProductName] = useState("");
  let [productPrice, setProductPrice] = useState("");
  let [productImage, setProductImage] = useState("");
  let [presentId, setPresentId] = useState("");
  let [friendName, setFriendName] = useState([]);
  let [resultPrice, setResultPrice] = useState(0);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(4);
  const handlePageChange = (page) => {
    setPage(page);
  };

  const { state } = useLocation();
  const getData = async () => {
    const url = `/follow/${state}`;
    console.log(state);
    axios
      .get(url, {
        params: {
          reqCnt: 1,
        },
      })
      .then((response) => {
        setFriendPresent(response.data);
        console.log(response.data);
        console.log("성공");
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const getFData = async () => {
    const url = `/follow/${state}`;
    console.log(state);
    axios
      .get(url, {
        params: {
          reqCnt: 2,
          userNo: sessionStorage.getItem("user_id"),
        },
      })
      .then((response) => {
        setFriendName(response.data[0]);
        console.log(response.data);
        console.log("성공");
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  useEffect(() => {
    getFData();
  }, []);
  return (
    <div className="sample-mypage-container">
      <div className="sample-mypage-nav">
        <div className="sample-mypage-info">
          {friendName.userImage !== null ? (
            <img
              src={friendName.userImage}
              style={{
                width: "100px",
                height: "100px",
                // margin: "10vh",
                borderRadius: "45px",
                overflow: "hidden",
              }}
            ></img>
          ) : (
            <img
              src={noImg}
              style={{
                width: "100px",
                height: "100px",
                // margin: "10vh",
                borderRadius: "45px",
                overflow: "hidden",
              }}
            ></img>
          )}
          <span style={{ fontSize: "1.7rem", fontWeight: "600" }}>
            {friendName.userName}
          </span>
        </div>
      </div>
      <div className="sample-mypage-content">
        <div className="wishList-container">
          <div className="wishList-title">
            <div className="wshList">{friendName.userName}님의</div>
            <span className="wishList_line">찜한 목록</span>
          </div>

          {friendPresent
            .slice(items * (page - 1), items * (page - 1) + items)
            .map((data, i) => {
              return (
                <div className="listbox">
                  <div className="wishlist-item-card">
                    <div className="wishlist-image">
                      <img src={data.productImage} width="120px" />
                    </div>
                    <div className="wishlist-item-info">
                      <div>{data.productName}</div>
                      <div>찜한 날짜: {data.presentDate}</div>
                      <div>수량: {data.presentCount}</div>
                      <div>
                        {data.fundingPrice}원/{data.productPrice}원
                      </div>
                      <div>{data.calculate}원</div>
                      {data.calculate === 0 ? (
                        <td style={{ color: "blue", backgroundColor: "white" }}>
                          펀딩완료
                        </td>
                      ) : (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            return (
                              setModalShow(true),
                              setProductName(data.productName),
                              setProductPrice(data.productPrice),
                              setResultPrice(data.calculate),
                              setProductImage(data.productImage),
                              setPresentId(data.presentNo)
                            );
                          }}
                        >
                          펀딩하기
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          <MyVerticallyCenteredModal
            show={modalShow}
            name={productName}
            price={productPrice}
            rstPrice={resultPrice}
            image={productImage}
            id={presentId}
            site={state}
            onHide={() => setModalShow(false)}
          />
          {friendPresent.length === 0 ? null : (
            <PaginationBox>
              <Pagination
                activePage={page}
                itemsCountPerPage={items}
                totalItemsCount={friendPresent.length - 1}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
              ></Pagination>
            </PaginationBox>
          )}
        </div>
      </div>
    </div>
  );
}
export default Follower;
