import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { PaginationBox } from "./Product";

function PayList() {
  const [funding, setFunding] = useState([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(4);
  const handlePageChange = (page) => {
    setPage(page);
  };
  const getUrl = `/mypage/paylist/${sessionStorage.getItem("user_id")}`;
  const getPreData = async () => {
    axios
      .get(getUrl)
      .then((response) => {
        setFunding(response.data);
        console.log(funding);
        console.log("성공");
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  useEffect(() => {
    getPreData();
  }, []);

  const refundConfirm = (fid, fprice) => {
    const postUrl = `/mypage/paylist/${fid}`;
    if (window.confirm("정말로 취소하시겠습니까?")) {
      alert("확인");
      axios
        .post(postUrl, null, {
          params: {
            fundingid: fid,
            fundingPrice: fprice,
            userNo: sessionStorage.getItem("user_id"),
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
      window.location.reload();
    } else {
      alert("취소");
      window.location.reload();
    }
  };

  return (
    <div className="wishList-container">
      <div className="wishList-title">
        <div className="wshList">{sessionStorage.getItem("name")}님의</div>
        <span className="wishList_line">펀딩 목록</span>
      </div>
      {funding
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
                  <div>주문 번호: {data.merchantUid}</div>
                  <div>팔로워이메일: {data.followerId}</div>
                  <div>팔로워이름: {data.userName}</div>
                  <div>펀딩금액: {data.fundingPrice}원</div>
                  {data.fundingResult === 1 ? (
                    <div>
                      <p
                        onClick={() =>
                          refundConfirm(
                            `${data.fundingid}`,
                            `${data.fundingPrice}`
                          )
                        }
                      >
                        결제취소하기
                      </p>
                    </div>
                  ) : data.fundingResult === 3 ? (
                    <div style={{ color: "blue", backgroundColor: "white" }}>
                      결제완료
                    </div>
                  ) : (
                    <div style={{ color: "red", backgroundColor: "white" }}>
                      취소됨
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      {funding.length === 0 ? null : (
        <PaginationBox>
          <Pagination
            activePage={page}
            itemsCountPerPage={items}
            totalItemsCount={funding.length - 1}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          ></Pagination>
        </PaginationBox>
      )}
    </div>
  );
}
export default PayList;
