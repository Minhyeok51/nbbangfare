import './App.css';
import React,{useEffect, useState} from 'react';
import axios from 'axios';
import requests from './api/requests';

function App() {
	let [hello, setHello] = useState('')

    useEffect(() => {
        axios.get(requests.restPath)
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);
  return (
    <div>
      백에서 가져온 데이터 : {hello}
    </div>
  );
}

export default App;
