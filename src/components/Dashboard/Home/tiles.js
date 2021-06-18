import ChevronRight from '../../../assets/icons/chevron-right.svg'
import Sync from '../../Modals/Sync/sync'
import classes from './tiles.module.css'
import SignaturePreview from '../Home/signaturePreview'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { VscSync } from 'react-icons/vsc'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { API } from '../../../config'

function Tiles(props) {
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([])
    const [activeEvents, setActiveEvents] = useState([])
    const [teamsList, setTeamsList] = useState([])
    const [activeTeams, setActiveTeams] = useState([])
    const [users, setUsers] = useState([])
    const [activeUsers, setActiveUsers] = useState([])
    const [flip, setFlip] = useState(false)

    const [syncing, setSyncing] = useState(false)
    const [synchronized, setSynchronized] = useState(false)

    const handleSync = () => {
        setSyncing(true)
        setTimeout(() => {
            setSynchronized(true)
        }, 2500)
    }


    useEffect(async () => {
        props.handleHeader(" ")
        await axios.get(`${API}user/${localStorage.getItem("user_id")}?access_token=${localStorage.getItem("token")}`).then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data))
            setLoading(true)
            // console.log(res)
        })
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/campaigns?access_token=${localStorage.getItem("token")}`).then((res) => {
            setEvents(res.data.data)
        })
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/teams?access_token=${localStorage.getItem("token")}`).then((res) => {
            setTeamsList(res.data.data)
        })
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/users?access_token=${localStorage.getItem("token")}`).then((res) => {
            setUsers(res.data.data)
        })
        setActiveEvents(events.filter(isActive => isActive.active === true))
        setActiveTeams(teamsList.filter(isActive => isActive.signature_template_deploy_count > 0))
        setActiveUsers(users.filter(isActive => isActive.is_deployed === true))
    }, [localStorage])

    return (
        <div className={classes.container}>
            <h1>Bonjour {JSON.parse(localStorage.getItem("user"))?.first_name}</h1>
            <div className={classes.tilesList}>
                <Link to="/signatures" className={classes.tile}>
                    <div className={classes.row}>
                        <p>Signatures</p>
                        <img src={ChevronRight} alt="View" />
                    </div>
                    <div className={classes.row}>
                        <div>
                            <span className={classes.bigTxt}>2</span>
                            <span> /38</span>
                        </div>
                        <span className={classes.activeSpan}>actives</span>

                    </div>
                </Link>
                <Link to="/events" className={classes.tile}>
                    <div className={classes.row}>
                        <p>Évènements</p>
                        <img src={ChevronRight} alt="View" />
                    </div>
                    <div className={classes.row}>
                        <div>
                            <span className={classes.bigTxt}>{activeEvents.length}</span>
                            <span> /{events.length}</span>
                        </div>
                        <span className={classes.activeSpan}>actifs</span>

                    </div>
                </Link>
                {!teamsList.length < 1 ? <>
                    <Link to="/teams" className={classes.tile}>
                        <div className={classes.row}>
                            <p>Équipes</p>
                            <img src={ChevronRight} alt="View" className={classes.blackImg} />
                        </div>
                        <div className={classes.row}>
                            <div>
                                <span className={classes.bigTxt}>{activeTeams.length}</span>
                                <span> /{teamsList.length}</span>
                            </div>
                            <span className={classes.activeSpan}>actives</span>
                        </div>
                    </Link>
                </> : null}
                {users.length > 1 ? <>
                    <Link to="/teams" className={classes.tile}>
                        <div className={classes.row}>
                            <p>Utilisateurs</p>
                            <img src={ChevronRight} alt="View" className={classes.blackImg} />
                        </div>
                        <div className={classes.row}>
                            <div>
                                <span className={classes.bigTxt}>{activeUsers.length}</span>
                                <span> /{users.length}</span>
                            </div>
                            <span className={classes.activeSpan}>actifs</span>
                        </div>
                    </Link>
                </> : null}
                {!localStorage.mailClient &&

                    <div className={`${classes.syncTileInner} ${flip ? classes.fliping : ""} ${classes.tile} ${classes.syncTile}`}>
                        <div className={classes.syncFront}>
                            <div className={classes.row}>
                                <p>Synchronisation</p>
                                <img src={ChevronRight} alt="View" onClick={() => setFlip(!flip)} />
                            </div>
                            <div className={classes.row}>
                                <img src='https://dummyimage.com/350x50.png' alt=''/>
                                {/* <div>
                                    <h4>Microsoft Office 365</h4>
                                </div>
                                <div className={classes.syncContainer}>
                                    {synchronized ?
                                        <AiOutlineCheckCircle className={classes.syncBtn} size="2rem" /> :
                                        <VscSync className={`${classes.syncBtn} ${syncing && classes.rotating}`} size="2rem" onClick={() => handleSync()} />
                                    }
                                </div> */}
                            </div>
                        </div>
                        <div className={classes.syncBack} onClick={() => setFlip(!flip)}>
                            <p>Lorem Ipsum</p>
                        </div>
                    </div>}
                <Link to="/payment" className={`${classes.tile} ${classes.billingTile}`}>
                    <div className={classes.row}>
                        <p>Facturation en cours</p>
                        <img src={ChevronRight} alt="View" />
                    </div>
                    <div className={classes.row}>
                        <div>
                            <span className={classes.bigTxt}>10€</span>
                            <span> /mois</span>
                        </div>
                    </div>
                </Link>
            </div>
            {teamsList.length === 0 ? <SignaturePreview /> : null}
            {/* <div className={classes.watermark}>
                <h3>Signally</h3>
            </div> */}
            {localStorage.mailClient &&
                <Link to="/synchronize" className={classes.syncContainer}>
                    <Sync />
                </Link>}
        </div>
    )
}

export default Tiles