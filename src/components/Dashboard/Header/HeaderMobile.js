import Logo from "../../Logo/logo"
import Contact from "../../../assets/icons/contactus.svg"
import { IoPower } from 'react-icons/io5'
import classes from "./header.module.css"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"

function Header(props) {
    const [modal, setModal] = useState(false)
    let history = useHistory()
    if (props.page === "home")
        return (            
            <div className={classes.dashboardContainer}>
                <Logo />
                {/* <img src={Contact} alt="Contact us" /> */}
                <IoPower color={"#FF7954"} size={"1.2rem"} stroke={"#FF7954"} strokeWidth={"15px"} onClick={() => { localStorage.clear(); history.push("/") }} />
            </div>
        )
    else if (props.page === "profile") {
        return (
            <div className={classes.container}>
                <h2>{props.title}</h2>
                <IoPower color={"#FF7954"} size={"1.2rem"} stroke={"#FF7954"} strokeWidth={"15px"} onClick={() => { localStorage.clear(); history.push("/") }} />
            </div>)
    }
    else if (typeof props.create === "string")
        return (
            <div className={classes.container}>
                <h2>{props.title}</h2>
                {props.create?.length > 0 && <Link to={props.create}>
                    <div className={classes.add}>+</div>
                </Link>}
            </div>
        )
    else if (typeof props.create === "object") {
        return (
            <div className={classes.container}>
                <h2>{props.title}</h2>
                {props.create?.length > 0 && <div className={classes.add} onClick={() => setModal(!modal)}>+</div>}
                {modal &&
                    <ul className={classes.options}>
                        {props.create?.map((option) => {
                            return <li key={option[0]}><Link to={option[1]}>{option[0]}</Link></li>
                        })}
                    </ul>}
            </div>
        )
    }
}

export default Header