import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Switchstate() {
    const [isCheck, setCheck] = useState(false);
    
   
      
    setCheck(!isCheck)
  return (
    
    <div>
    
      
    
    {isCheck ?  console.log("팔로우O") : console.log("팔로우X")}
     
    </div>
   
   
 
  );
}
  
export default Switchstate;

