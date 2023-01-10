import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Pagination from "react-js-pagination";
import styled from "styled-components";

const Product = () => {
  const [product, setProduct] = useState([]);
  let navigate = useNavigate();
  const getData = async () => {
    const url = "http://localhost:8080";
    axios
      .get(url)
      .then((response) => {
        setProduct(response.data);
        console.log(product);
        console.log("성공");
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(16);
  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <>
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
        {product
          .slice(items * (page - 1), items * (page - 1) + items)
          .map((data, i) => {
            return (
              <Col>
                <Card
                  style={{ height: "33rem" }}
                  onClick={() => {
                    navigate(`/ItemDetail/${data.productNo}`);
                  }}
                >
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

      <PaginationBox>
        <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={product.length - 1}
          pageRangeDisplayed={20}
          onChange={handlePageChange}
        ></Pagination>
      </PaginationBox>
    </>
  );
};
const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  border-top: 2px solid #eaedf2;
  border-bottom: 2px solid #eaedf2;
`;
const ButtonSet = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 60%;
`;
const CategoryButton = styled.button`
  border: 1px solid #999;
  border-radius: 20px;
  background-color: white;
  color: #999;
  width: 100px;
  height: 40px;
  font-size: 20px;
  font-weight: 600;
  &:hover {
    opacity: 0.6;
  }
`;
export default Product;
