import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, Link} from "react-router-dom";
import '../css/FollowerList.css';
import { Navigation } from '@mui/icons-material';

function FollowerList(props) {
    const [friend, setFriend] = useState([]);
    const [fname, setFname] = useState("");
    const url = `/mypage/${sessionStorage.getItem("user_id")}`
    let navigate = useNavigate();
    const getData = async() => {
        axios
        .get(url, { params: {
        userId:sessionStorage.getItem("user_id"),
        reqCnt:3
        }})
        .then((response) => {
            setFriend(response.data);
            console.log(friend)
            console.log("성공");
        })
        .catch((Error) => {
            console.log(Error);
        });
    }
        useEffect(() => {
            getData();
        }, [])  
    return(
        <div>
                <Modal id='modalID'
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    친구 목록
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className='friendList'>
                        <table>
                        <thead>
                        <tr>
                            <th></th><th></th><th></th><th></th><th></th>
                        </tr>
                        </thead>
                        <tbody>
                    {friend.map((data, i)=>{
                        return(
                            <tr>
                                <td>{data.followerId}</td>
                                <td>{data.userName}</td>
                                <td>{data.followerRegdate}</td>
                                <td></td>
                                <td> <button onClick={()=>{
                                    navigate(`/follow`, {state:`${data.followerId}`})
                                }}>마이페이지</button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                    </table>
                </div>
                </Modal.Body>
                
                </Modal>
        </div>
    )
}
export default FollowerList;