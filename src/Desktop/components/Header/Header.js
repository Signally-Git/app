import Logo from "Utils/Logo/logo"
import { IoPower } from 'react-icons/io5'
import classes from "./header.module.css"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"
import { FaUser } from 'react-icons/fa';

const soon = "Cette fonctionnalité arrive très prochainement !"

// DATA ATTRIBUTES

// Desktop header 
// containing font logo
// studio / store buttons
// profile & log out btn

function Header(props) {
    let history = useHistory()

    return (
        <div className={`${classes.dashboardContainer} ${props.landing ? classes.landing : ""}`}>
            <div className={classes.logoContainer}>
                <Logo />
                {!props.landing ? <Link to="/report" className={classes.reportContainer}>
                    <div>
                        <span title="Signaler un bug" className={classes.beta}>
                            Beta privée
                        </span>
                        {props.landing !== true && <button>Signaler un problème</button>}
                    </div>
                </Link> : ""}
            </div>
            {props.landing !== true ? <>
                <div className={classes.rightSide}>
                    <div className={classes.name}>
                    <div className={classes.nameSize}>{props.user?.firstName} {props.user?.lastName || "profil"}</div>
                        <ul>
                            <li className={classes.UserName}>
                                <Link to="/profile/informations/user">
                                    <span>{props.user?.firstName} {props.user?.lastName || "profil"}</span>
                                    <FaUser />
                                </Link>
                            </li>
                        </ul>
                        <IoPower title="Déconnexion" color={"#66433e"} size={"1.2rem"} stroke={"#66433e"} strokeWidth={"15px"} onClick={() => { localStorage.clear(); history.push("/") }} />
                    </div>
                </div>
            </> : <>
                <ul className={`${classes.nonLogged}`}>
                    <li><Link to="/dashboard">Connexion</Link></li>
                    <li><Link to="/sign-up">Inscription</Link></li>
                </ul></>}
        </div>
    )
}

export default Header