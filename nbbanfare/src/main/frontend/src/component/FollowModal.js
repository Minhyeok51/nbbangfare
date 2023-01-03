import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function FollowModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const url = `/Search/${props.word}`;

    const handleShow = () => {
      setShow(true);
      axios
      .post(url,null,{params: {
          followerId:props.email,
          userId:sessionStorage.getItem("user_id"),
      }})
      .then((response) => {
          console.log(response.data)
          console.log(response.status)
          alert("서버 전송 성공")
      })
      .catch((error) => {
          console.log(error.response);
          alert("서버 전송 실패")
      });
      // window.location.reload();
    } 
    
  return (
   <>
      <Button variant="primary" onClick={handleShow}>
        팔로우 하기
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>팔로우 되었습니다.</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>{props.name}님의 마이페이지로 이동하겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  }
export default FollowModal;

