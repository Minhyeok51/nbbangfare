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
                            <th></th><th></th><th></th><th></th><th></th><th></th><th></th>
                        </tr>
                        </thead>
                        <tbody>
                    {props.user.map((data, i)=>{
                        return(
                            <tr>
                                <td>{data.userNo}</td>
                                <td>{data.userName}</td>
                                <td>{data.fundingPrice}원</td>
                            </tr>
                        )
                    })}
                    </tbody>
                    </table>
                </div>
                </Modal.Body>
                
                </Modal>
    )
}
export default FundingUserListModal;