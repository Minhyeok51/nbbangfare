import "../css/ItemDetail.css"
import "./Header"
import "./Footer"
import noimg from "../img/noimg.jpg";
import Header from "./Header";
import Footer from "./Footer";
function ItemDetail(){

    return(
        <div>
            <Header/>
            <div className="ItemDetail">
                <img src={noimg} style={{width:'500px', height:'500px'}}></img>
                <div className="textStyle">
                    <h3>상품명: </h3>
                    <h3>상품가격: </h3>    
                </div> 
                
            </div>
            <div className="btncss">
                <button>버튼</button>
            </div>
            <Footer/>
            
            
        </div>
        
    )
}
export default ItemDetail;