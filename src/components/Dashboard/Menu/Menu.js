import classes from './Menu.module.css'
import Home from '../../../assets/icons/home.svg'
import Signatures from '../../../assets/icons/signatures.svg'
import Teams from '../../../assets/icons/teams.svg'
import Events from '../../../assets/icons/events.svg'
import Profile from '../../../assets/icons/profile.svg'
import { Link } from 'react-router-dom'


function Menu(props) {
    return (
        <ul className={classes.tabMenu}>
            <li className={props.page === "home" && classes.active}>
                <Link to="/dashboard">
                    <img src={Home} alt="Home" />
                </Link>
            </li>
            <li className={props.page === "signatures" && classes.active}>
                <Link to="/signatures">
                    <img src={Signatures} alt="Signatures" />
                </Link>
            </li>
            <li className={props.page === "teams" && classes.active}>
                <Link to="/teams">
                    <img src={Teams} alt="Teams" />
                </Link>
            </li>
            <li className={props.page === "events" && classes.active}>
                <Link to="/events">
                    <img src={Events} alt="Events" />
                </Link>
            </li>
            <li className={props.page === "profile" && classes.active}>
                <Link to="/profile">
                    <img src={Profile} alt="Profile" />
                </Link>
            </li>
        </ul>
    )
}

export default Menu