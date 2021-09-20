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
    const [templates, setTemplates] = useState([])
    const [signatures, setSignatures] = useState([])

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
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/signature-templates?access_token=${localStorage.getItem("token")}`).then((res) => {
            setTemplates(res.data.data)
        })
    
    }, [])

    useEffect(() => {
        setActiveEvents(events.filter(isActive => isActive.active === true))
        setActiveTeams(teamsList.filter(isActive => isActive.members_count > 0))
        setActiveUsers(users.filter(isActive => isActive.is_deployed === true))
    }, [events, users, teamsList])

    useEffect(() => {
        users.map((user) => {
            if (user.signature_template_id)
                setSignatures([...signatures, [user.signature_template_id]])
        })
    }, [users])
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
                            <span className={classes.bigTxt}>{signatures.length}</span>
                            <span> /{templates?.length}</span>
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
                    <Link to="/team/allusers" className={classes.tile}>
                        <div className={classes.row}>
                            <p>Utilisateurs</p>
                            <img src={ChevronRight} alt="View" className={classes.blackImg} />
                        </div>
                        <div className={classes.row}>
                            <div>
                                <span className={classes.bigTxt}>{users.length}</span>
                            </div>
                            <span className={classes.activeSpan}>actifs</span>
                        </div>
                    </Link>
                <Link to="/profile/billing" className={`${classes.tile} ${classes.billingTile}`}>
                    <div className={classes.row}>
                        <p>Abonnement</p>
                        <img src={ChevronRight} alt="View" />
                    </div>
                    <div className={classes.row}>
                        <div>
                            {users.length === 1 ?  <><span className={classes.bigTxt}> </span><span className={classes.free}>Gratuit</span></> : <>
                            <span className={classes.bigTxt}>{users.length * 0.5 + activeEvents.length * 10}€</span>
                            <span> /mois</span> </>}
                        </div>
                    </div>
                </Link>
            </div>
            {teamsList.length === 0 ? <SignaturePreview /> : null}
            {localStorage.mailClient &&
                <Link to="/synchronize" className={classes.syncContainer}>
                    <Sync />
                </Link>}
        </div>
    )
}

export default Tiles