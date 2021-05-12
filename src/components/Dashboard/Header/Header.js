import Logo from "../../Logo/logo"
import Contact from "../../../assets/icons/contactus.svg"
import classes from "./header.module.css"

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
                <h2>{props.page}</h2>
                <div className={classes.add}>+</div>
            </div>
        )
}

export default Header