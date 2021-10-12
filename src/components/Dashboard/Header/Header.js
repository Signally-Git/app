import Logo from "../../Logo/logo"
import Contact from "../../../assets/icons/contactus.svg"
import { IoPower } from 'react-icons/io5'
import { HiOutlineSearch } from 'react-icons/hi'
import classes from "./header.module.css"
import { Link, useHistory } from "react-router-dom"
import Profile from '../../../assets/icons/profile.svg'
import { useState } from "react"

function Header(props) {
    console.log(props)
    const [modal, setModal] = useState(false)
    let history = useHistory()
    // if (props.page === "home")
    return (
        <div className={classes.dashboardContainer}>
            <Logo />
            {/* <div className={classes.searchContainer}>
                    <HiOutlineSearch color={"#666666"} size={"1.5rem"} />
                    <input type="text" placeholder="Search" />
                </div> */}
            {/* <span className={classes.headerSpan}>Bonjour <Link to="/profile">{props.user?.first_name}</Link></span> */}
            <div className={classes.name}>
                <Link to="/profile">
                {props.user?.first_name} {props.user?.last_name}
                </Link>
                <IoPower color={"#66433e"} size={"1.2rem"} stroke={"#66433e"} strokeWidth={"15px"} onClick={() => { localStorage.clear(); history.push("/") }} />
            </div>
        </div>
    )
    // else if (props.page === "profile") {
    //     return (
    //         <div className={classes.container}>
    //             <h2>{props.title}</h2>
    //             <IoPower color={"#FF7954"} size={"1.2rem"} stroke={"#FF7954"} strokeWidth={"15px"} onClick={() => { localStorage.clear(); history.push("/") }} />
    //         </div>)
    // }
    // else if (typeof props.create === "string")
    //     return (
    //         <div className={classes.container}>
    //             <h2>{props.title}</h2>
    //             {props.create?.length > 0 && <Link to={props.create}>
    //                 <div className={classes.add}>+</div>
    //             </Link>}
    //         </div>
    //     )
    // else if (typeof props.create === "object") {
    //     return (
    //         <div className={classes.container}>
    //             <h2>{props.title}</h2>
    //             {props.create?.length > 0 && <div className={classes.add} onClick={() => setModal(!modal)}>+</div>}
    //             {modal &&
    //                 <ul className={classes.options}>
    //                     {props.create?.map((option) => {
    //                         return <li key={option[0]}><Link to={option[1]}>{option[0]}</Link></li>
    //                     })}
    //                 </ul>}
    //         </div>
    //     )
    // }
}

export default Header