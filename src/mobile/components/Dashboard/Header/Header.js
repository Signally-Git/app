import Logo from "../../../../Utils/Logo/logo"
import { IoPower } from 'react-icons/io5'
import classes from "./header.module.css"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"

// Desktop header 
// containing font logo
// studio / store buttons
// profile & log out btn

function Header(props) {
    const [notif, setNotif] = useState(true)
    let history = useHistory()

    return (
        <div className={classes.dashboardContainer}>
            <div onClick={() => setNotif(!notif)}>
                <Logo />
            </div>
            <div className={classes.btnsContainer}>
                {props.page !== "studio" ? <Link className={classes.studio} to="/studio">STUDIO</Link> : <Link className={classes.studio} to="/dashboard">QUITTER LE STUDIO</Link>}
                {props.page !== "store" ? <Link className={`${classes.store} ${notif ? classes.notif : ""}`} to="/store">STORE</Link> : <Link className={classes.store} to="/dashboard">QUITTER LE STORE</Link>}
            </div>
            <div className={classes.name}>
                <Link to="/profile">
                    {props.user?.first_name} {props.user?.last_name}
                </Link>
                <IoPower color={"#66433e"} size={"1.2rem"} stroke={"#66433e"} strokeWidth={"15px"} onClick={() => { localStorage.clear(); history.push("/") }} />
            </div>
        </div>
    )
}

export default Header