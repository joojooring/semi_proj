import useToggle from "../hooks/useToggle";

function CustomHook () {

    const [isPopup,togglePopup] = useToggle(false)
    return(
        <>
        <i className="fa-solid fa-bars" onClick={togglePopup}></i>
        {isPopup && <ul>
            <li>
                Sign up
            </li>
            <li>
                How to
            </li>
            </ul>}
        {/* <button onClick={togglePopup}>토글</button> */}
        </>
    )
}

export default CustomHook;