import "../styles/homebody.css"
import { Link } from 'react-router-dom';

export default function Homebody() {

    return(
        <>
            <div className="bodyoutside">
            <img src="./nice_smile.jpg" width="100%" />

            {/* <img src="./nice_smile.jpg" width="1500px" height="1000px" /> */}
            <h3 className="divbody">Get nice Smile!</h3>

            <Link to="/about"><button id="btn-home1">Teeth Whitening</button></Link>
            <Link to="/dental"><button id="btn-home2">go to</button></Link>

            </div>

        </>
    )
}