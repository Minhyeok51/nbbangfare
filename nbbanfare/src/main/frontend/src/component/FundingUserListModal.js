import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState,useEffect } from 'react';
import axios from 'axios';

function FundingUserListModal(props) {


    return(
            <Modal id='modalID'
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    펀딩하신분들 목록
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <table>
                        <thead>
                        <tr>
                            <th>상품명</th><th>찜한 날짜</th><th>수량</th><th>적립된/상품 가격</th><th>남은 금액</th><th>구매확정</th><th>취소하기</th>
                        </tr>
                        </thead>
                        <tbody>
                    {props.user.map((data, i)=>{
                        return(
                            <tr>
                                <td>{data.userNo}</td>
                                <td>{data.userName}</td>
                                <td>{data.fundingPrice}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                    </table>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary"  onClick={props.onHide}>닫기</Button>
                </Modal.Footer>
                </Modal>
    )
}
export default FundingUserListModal;