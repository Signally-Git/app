import Logo from "Utils/Logo/logo"
import { IoPower } from 'react-icons/io5'
import classes from "./header.module.css"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"

const soon = "Cette fonctionnalité arrive très prochainement !"

// Desktop header 
// containing font logo
// studio / store buttons
// profile & log out btn

function Header(props) {
    const [notif, setNotif] = useState(false)
    const [hover, setHover] = useState(false)
    let history = useHistory()

    return (
        <div className={classes.dashboardContainer}>
            <div onClick={() => setNotif(!notif)} className={classes.logoContainer}>
                <Logo />
                <Link to="/report" className={classes.reportContainer}>
                    <div>
                        <span title="Signaler un bug" className={classes.beta}>
                            Bêta privée
                        </span>
                        {props.landing !== true && <button>Signaler un problème</button>}
                    </div>
                </Link>
            </div>
            {props.landing !== true ? <>
                <div className={classes.rightSide}>
                    <div className={classes.btnsContainer} title={soon}>
                        {props.page !== "/studio" ? <Link className={`${classes.studio} disabled`}>STUDIO</Link> : <Link className={classes.studio} onClick={() => history.goBack()}>QUITTER LE STUDIO</Link>}
                        {props.page !== "/store" ? <Link className={`${classes.store} ${notif ? classes.notif : ""} disabled`} to="/store">STORE</Link> : <Link className={classes.store} onClick={() => history.goBack()}>QUITTER LE STORE</Link>}
                    </div>
                    <div className={classes.name}>
                        <ul
                            className={hover ? classes.animateMenu : ""}
                            onMouseOver={() => setHover(true)}
                            onMouseLeave={() => setTimeout(() => { setHover(false) }, 300)}>
                            <li className={classes.UserName}>
                                <span>{props.user?.firstName} {props.user?.lastName || "profil"}</span>
                            </li>
                            <li><Link to="/profile/informations">Compte</Link></li>
                            <li title={soon}><Link to="/billing" className="disabled">Abonnement</Link></li>

                        </ul>
                        <IoPower color={"#66433e"} size={"1.2rem"} stroke={"#66433e"} strokeWidth={"15px"} onClick={() => { localStorage.clear(); history.push("/") }} />
                    </div>
                </div>
            </> : <>
                <ul className={classes.nonLogged}>
                    <li><Link to="/dashboard">Connexion</Link></li>
                    <li><Link to="/sign-up">Inscription</Link></li>
                </ul></>}
        </div>
    )
}

export default Header