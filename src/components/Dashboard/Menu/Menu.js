import classes from './Menu.module.css'
import Home from '../../../assets/icons/home.svg'
import Signatures from '../../../assets/icons/signatures.svg'
import Teams from '../../../assets/icons/teams.svg'
import Events from '../../../assets/icons/event.svg'
import Profile from '../../../assets/icons/profile.svg'
import { Link } from 'react-router-dom'
import { MobileView } from 'react-device-detect'


function Menu(props) {
    const today = new Date();

    return (
        <ul className={classes.tabMenu}>
            <li className={`${props.page === "home" ? classes.active : ""}`}>
                <Link to="/dashboard">
                    <img src={Home} alt="Home" />
                    <label>Dashboard</label>
                </Link>
            </li>
            <li className={`${props.page.search("signature") !== -1 ? classes.active : ""}`}>
                <Link to="/signatures" key={Date.now()}>
                    <img src={Signatures} alt="Signatures" />
                    <label>Signatures</label>
                </Link>
            </li>
            <li className={`${props.page.search("team") !== -1 ? classes.active : ""}`}>
                <Link to="/teams">
                    <img src={Teams} alt="Teams" />
                    <label>Teams</label>
                </Link>
            </li>
            <li className={`${props.page.search("event") !== -1 ? classes.active : ""}`}>
                <Link to="/events">
                    <div className={classes.event}>
                        <img src={Events} alt="Events" />
                        <span>{String(today.getDate()).padStart(2, '0')}</span>
                    </div>
                    <label>Events</label>
                </Link>
            </li>
            <MobileView>
                <li className={props.page.search("profile") !== -1 && classes.active}>
                    <Link to="/profile">
                        <img src={Profile} alt="Profile" />
                    </Link>
                </li>
            </MobileView>
        </ul>
    )
}

export default Menu