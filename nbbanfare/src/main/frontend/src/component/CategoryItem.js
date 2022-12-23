import '../css/footer.css'
import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import CategoryItem from './component/CategoryItem';

function CategoryItem(){

    let {productKind} = useParams();
    const [product, setProduct] = useState([])

        const getData = async() => {
        const url = "http://localhost:8080/"+productKind;
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
      }, []) 

    
    return(
        <div>
            <Row xs={1} md={4} className="g-4">
                  
                  {/* {Array.from({ length: 4 }).map((_, idx) => ( */}
                  {product.map((data,i) => {
                 return(
                    
                    <Col>
                      <Card style = {{height: '33rem'}}>
                        <Card.Img style={{height:'360px'}} variant="top" src={data.productImage} />
                        <Card.Body>
                          <Card.Title>{data.productName}</Card.Title>
                          <Card.Text>
                          {data.productPrice}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                 
                
                  
      
                )})}
                </Row>
        </div>
    )
}
export default CategoryItem;