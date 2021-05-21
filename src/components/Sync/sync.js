import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import classes from './syncpage.module.css'
import Apple from '../../assets/icons/appstore.svg'
import Outlook from '../../assets/icons/outlook.svg'
import Gmail from '../../assets/icons/gmail.svg'
import ChevronRight from '../../assets/icons/chevron-right.svg'
import SyncWith from './SyncWith'

function SyncPage() {
    return (
        <div>
                <Route exact path="/synchronize">
                    <div className={classes.container}>
                        <h1>Ajoutez votre signature à votre boite email</h1>
                        <ul className={classes.listServices}>
                            <li className={classes.service}>
                                <Link to="/synchronize/outlook">
                                    <img src={Outlook} alt="Outlook" />
                                    <span>Outlook</span>
                                    <img src={ChevronRight} alt="Synchronize with Outlook" className={classes.chevron} />
                                </Link>
                            </li>
                            <li className={classes.service}>
                                <Link to="/synchronize/gmail">
                                    <img src={Gmail} alt="Gmail" />
                                    <span>Gmail</span>
                                    <img src={ChevronRight} alt="Synchronize with Gmail" className={classes.chevron} />
                                </Link>
                            </li>
                            <li className={classes.service}>
                                <Link to="/synchronize/apple">
                                    <img src={Apple} alt="Apple Mail" />
                                    <span>Apple Mail</span>
                                    <img src={ChevronRight} alt="Synchronize with Apple Mail" className={classes.chevron} />
                                </Link>
                            </li>
                        </ul>
                        <Link to="dashboard" className={classes.later}>
                            Ajouter plus tard
                        </Link>
                    </div>
                </Route>
                <Route path="/synchronize/outlook">
                    <SyncWith service="outlook" />
                </Route>
                <Route path="/synchronize/gmail">
                    <SyncWith service="gmail" />
                </Route>
                <Route path="/synchronize/apple">
                    <SyncWith service="apple" />
                </Route>
        </div>)

}

export default SyncPage