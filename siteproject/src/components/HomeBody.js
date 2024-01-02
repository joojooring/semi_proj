import "../styles/homebody.css"
import { Link } from 'react-router-dom';

export default function Homebody() {

    return(
        <>
            <div className="bodyoutside">
            <div className="img-container">

            <img src="./nice_smile.jpg" width="100%" height="80%" />
            </div>

            {/* <img src="./nice_smile.jpg" width="1500px" height="1000px" /> */}
            <h3 className="divbody">Get nice Smile!</h3>

            <Link to="/about"><button id="btn-home1">Teeth Whitening</button></Link>
            <Link to="/dental"><button id="btn-home2">go to</button></Link>

            </div>
            <div className="img-container2">
            <img src="./homebleaching2.jpg" width="100%" height="80%" />
            </div>
            <h3 className="divbody2">Try at home !</h3>


        </>
    )
}