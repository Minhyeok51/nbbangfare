import axios from "axios";
import React, { useState, useEffect } from "react";
import FundingUserListModal from "./FundingUserListModal";
import Pagination from "react-js-pagination";
import { PaginationBox } from "./Product";

function Purlist() {
  const [purchase, setPurchase] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [presentId, setPresentId] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(4);
  const handlePageChange = (page) => {
    setPage(page);
  };
  const url = `/mypage/purlist/${sessionStorage.getItem("user_id")}`;
  const getPreData = async () => {
    axios
      .get(url, {
        params: {
          reqCnt: 1,
        },
      })
      .then((response) => {
        setPurchase(response.data);
        console.log(purchase);
        console.log("성공");
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  useEffect(() => {
    getPreData();
  }, []);
  return (
    <div>
      <div className="wishList-container">
        <div className="wishList-title">
          <div className="wshList">{sessionStorage.getItem("name")}님의</div>
          <span className="wishList_line">구매 목록</span>
        </div>
        {purchase
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
                    <div>구매상품번호: {data.purchaseNo}</div>
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
                      상품가격: {data.productPrice}원
                    </div>
                    <div>구매날짜: {data.purchaseDate}</div>
                    <FundingUserListModal
                      show={modalShow}
                      id={presentId}
                      user={users}
                      onHide={() => setModalShow(false)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        {purchase.length === 0 ? null : (
          <PaginationBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={items}
              totalItemsCount={purchase.length - 1}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            ></Pagination>
          </PaginationBox>
        )}
      </div>
    </div>
  );
}

export default Purlist;
