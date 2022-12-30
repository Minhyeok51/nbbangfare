import axios from "axios";
import { useEffect, useState } from "react";
import CardImg from "react-bootstrap/esm/CardImg";
import {useParams} from "react-router";

function Search() {
    const [searchUser, setSearchUser] = useState([]);
    let {word} = useParams();

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
        {searchUser.map((data,i) => {
            return(
                data.userName
                // <h1>asd</h1>
            )
        })}
        </div>

      )




   
}

export default Search;