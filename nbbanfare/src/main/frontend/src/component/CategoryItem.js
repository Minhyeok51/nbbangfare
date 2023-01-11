import "../css/footer.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import CategoryItem from './component/CategoryItem';
import Pagination from "react-js-pagination";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PaginationBox } from "./Product";
import { ButtonGroup } from "./Product";
import { ButtonSet } from "./Product";
import { CategoryButton } from "./Product";
import { Banner } from "../App";
import { BannerBox } from "../App";
import { BannerText } from "../App";
import { Image } from "../App";
function CategoryItem() {
  let { productKind } = useParams();
  let navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(16);
  const handlePageChange = (page) => {
    setPage(page);
  };
  const getData = async () => {
    const url = "http://localhost:8080/" + productKind;
    axios
      .get(url)
      .then((response) => {
        setProduct(response.data);
        console.log("성공");
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
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
      <ButtonGroup>
        <ButtonSet>
          <CategoryButton
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
          >
            전체보기
          </CategoryButton>
          <CategoryButton
            onClick={() => {
              navigate("/002");
              window.location.reload();
            }}
          >
            아우터
          </CategoryButton>
          <CategoryButton
            onClick={() => {
              navigate("/001");
              window.location.reload();
            }}
          >
            상의
          </CategoryButton>
          <CategoryButton
            onClick={() => {
              navigate("/003");
              window.location.reload();
            }}
          >
            하의
          </CategoryButton>
        </ButtonSet>
      </ButtonGroup>
      <Row xs={1} md={4} className="g-4">
        {/* {Array.from({ length: 4 }).map((_, idx) => ( */}
        {product
          .slice(items * (page - 1), items * (page - 1) + items)
          .map((data, i) => {
            return (
              <Col>
                <Card style={{ height: "33rem" }}
                  onClick={() => {
                    navigate(`/ItemDetail/${data.productNo}`);
                  }}>
                  <Card.Img
                    style={{ height: "360px" }}
                    variant="top"
                    src={data.productImage}
                  />
                  <Card.Body>
                    <Card.Title>{data.productName}</Card.Title>
                    <Card.Text>{data.productPrice}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
      {product.length === 0 ? null : (
        <PaginationBox>
          <Pagination
            activePage={page}
            itemsCountPerPage={items}
            totalItemsCount={product.length - 1}
            pageRangeDisplayed={20}
            onChange={handlePageChange}
          ></Pagination>
        </PaginationBox>
      )}
    </>
  );
}

export default CategoryItem;
