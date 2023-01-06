import '../css/footer.css'
import mainLogo from '../img/mainLogo.png'
function Footer(){
    
    return(
        <div className='footerContainer'>
        <div className='footerStyle'>
            <div className='footer-left'>
                <img className='footerLogo' src={mainLogo}></img>
            </div>
            <div className = 'footerList'>
                <div>깃허브 : <a href="https://github.com/Minhyeok51/nbbangfare">https://github.com/Minhyeok51/nbbangfare </a></div>
                <div>노션 : <a href='https://www.notion.so/1-1-N-b6f24f27a86f4bc5b23ce5af2e5ad361'>https://www.notion.so/1-1-N-b6f24f27a86f4bc5b23ce5af2e5ad361</a></div>
            </div>
        </div>
        </div>
    )
}
export default Footer;