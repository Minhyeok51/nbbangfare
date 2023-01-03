import axios from "axios";
import { useEffect, useState } from "react";
import CardImg from "react-bootstrap/esm/CardImg";
import {useParams} from "react-router";
import Table from 'react-bootstrap/Table';
import FollowModal from "./FollowModal";


function Search() {
    const [searchUser, setSearchUser] = useState([]);
    let {word} = useParams();
    const [show, setShow] = useState(false);



    const getData = async() => {
        const url = "http://localhost:8080/Search/"+ word;
        axios
          .get(url)
          .then((response) => {
            setSearchUser(response.data);
            console.log("성공");
          })
          .catch((Error) => {
            console.log(Error);
          });
  
      };
      useEffect(() => {
        getData();
      }, []) 

      return(
        <div>
        {/* {searchUser.map((data,i) => { */}
           
              <Table striped>
              <thead>
                <tr>
                  <th>      #</th>
                  <th>      사용자 이름</th>
                  <th>      이메일</th>
                </tr>
              </thead>
              <tbody>
              {searchUser.map((data,i) => {
                return(
                
                <tr>
                  <td>{i+1}</td>
                  <td>{data.userName}</td>
                  <td>{data.userEmail}</td>
                
                  <FollowModal word = {word} name = {data.userName} email = {data.userEmail} show={show} onHide={() => setShow(false)}/>
                </tr>
                
                
             )})}
             </tbody>
            </Table>
            
        
        </div>

      )
}

export default Search;