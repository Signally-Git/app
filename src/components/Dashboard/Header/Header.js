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
    else if (props.page === "create-event")
    {
        return (<div></div>)
    }
    else
        return (
            <div className={classes.container}>
                <h2>{props.page}</h2>
                {props.page === "events" && <Link to="create-event">
                <div className={classes.add}>+</div>
                </Link>}
            </div>
        )
}

export default Header