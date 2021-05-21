import Logo from "../../Logo/logo"
import Contact from "../../../assets/icons/contactus.svg"
import classes from "./header.module.css"
import { Link } from "react-router-dom"

function Header(props) {
    if (props.page === "home")
        return (
            <div className={classes.dashboardContainer}>
                <Logo />
                <img src={Contact} alt="Contact us" />
            </div>
        ) 
    else
        return (
            <div className={classes.container}>
                <h2>{props.title}</h2>
                {props.create?.length > 0 && <Link to={props.create}>
                <div className={classes.add}>+</div>
                </Link>}
            </div>
        )
}

export default Header