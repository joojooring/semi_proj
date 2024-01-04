import "../styles/homebody2.css"
import { Link } from 'react-router-dom';

export default function Homebody2() {

    return(
        <>
            <div className="bodyoutside2">

            <div className="img-container2">
            <img src="./nice_smile.jpg" width="100%" height="80%"/>
            </div>

            {/* <img src="./nice_smile.jpg" width="1500px" height="1000px" /> */}
            <h3 className="divbody2">Get nice Smile!</h3>

            <Link to="/about"><button id="btn-home12">Teeth Whitening</button></Link>
            <Link to="/dental"><button id="btn-home22">go to</button></Link>

            </div>


            <div className="bodyoutside3">

            <div className="img-container22">
            <img src="./homebleaching2.jpg" width="100%" height="80%" />
            </div>
            <h3 className="divbody22">Try at home !</h3>

            </div>
        </>
    )
}