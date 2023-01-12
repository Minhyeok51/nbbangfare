import axios from "axios";
import React, { useState, useEffect } from "react";
import FundingUserListModal from "./FundingUserListModal";
import "../css/wishProduct.css";
import { PaginationBox } from "./Product";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Pagination from "react-js-pagination";

function WishProduct() {
  const [modalShow, setModalShow] = useState(false);
  const [presentId, setPresentId] = useState("");
  const [present, setPresent] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(4);
  const handlePageChange = (page) => {
    setPage(page);
  };

  const url = `/mypage/wishproduct/${sessionStorage.getItem("user_id")}`;
  const getPreData = async () => {
    axios
      .get(url, {
        params: {
          reqCnt: 1,
        },
      })
      .then((response) => {
        setPresent(response.data);
        console.log(present);
        console.log("성공");
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  useEffect(() => {
    getPreData();
  }, []);

  const cancelButton = (presentNo, productNo) => {
    if (window.confirm("정말로 취소하시겠습니까?")) {
      alert("확인");
      window.location.reload();
      axios
        .put(url, null, {
          params: {
            userNo: sessionStorage.getItem("user_id"),
            presentNo: presentNo,
          },
        })
        .then((response) => {
          console.log(response.data);
          console.log(response.status);
        })
        .catch((error) => {
          console.log(error.response);
          alert("요청실패");
        });
    } else {
      alert("취소");
      window.location.reload();
    }
  };

  const purchaseButton = (predata, purdata) => {
    if (
      window.confirm(
        "구매를 확정하게 되면 환불이 불가합니다. 확정하시겠습니까?"
      )
    ) {
      alert("구매완료 구매해주셔서 감사합니다.");
      window.location.reload();
      axios
        .post(url, null, {
          params: {
            userId: sessionStorage.getItem("user_id"),
            presentNo: predata,
            productNo: purdata,
          },
        })
        .then((response) => {
          console.log(response.data);
          console.log(response.status);
        })
        .catch((error) => {
          console.log(error.response);
          alert("요청실패");
        });
    } else {
      alert("취소");
      window.location.reload();
    }
  };

  return (
    <div className="wishList-container">
      <div className="wishList-title">
        <div className="wshList">{sessionStorage.getItem("name")}님의</div>
        <span className="wishList_line">찜한 목록</span>
      </div>
      <FundingUserListModal
        show={modalShow}
        id={presentId}
        user={users}
        onHide={() => setModalShow(false)}
      />

      {present
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
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      axios
                        .get(url, {
                          params: {
                            presentNo: data.presentNo,
                            reqCnt: 2,
                          },
                        })
                        .then((response) => {
                          setUsers(response.data);
                          console.log(users);
                          console.log("성공");
                        })
                        .catch((Error) => {
                          console.log(Error);
                        });

                      return setModalShow(true), setPresentId(data.presentNo);
                    }}
                  >
                    펀딩 금액: {data.fundingPrice}원/{data.productPrice}원
                  </div>
                  <div>상품 가격: {data.calculate}원</div>
                  {data.calculate === 0 ? (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        purchaseButton(`${data.presentNo}`, `${data.productNo}`)
                      }
                    >
                      구매가능
                    </div>
                  ) : (
                    <div style={{ color: "red", backgroundColor: "white" }}>
                      구매불가
                    </div>
                  )}
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      cancelButton(`${data.presentNo}`, `${data.productNo}`)
                    }
                  >
                    취소
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {present.length === 0 ? null : (
        <PaginationBox>
          <Pagination
            activePage={page}
            itemsCountPerPage={items}
            totalItemsCount={present.length - 1}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          ></Pagination>
        </PaginationBox>
      )}
    </div>
  );
}
export default WishProduct;
