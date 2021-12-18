import ChevronRight from 'Assets/icons/chevron-right.svg'
import classes from './tiles.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MobileView } from 'react-device-detect'
import request from 'Utils/Request/request'

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

    useEffect(async () => {
        props.handleHeader(" ")
        await request.get(`whoami`).then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data))
            setLoading(true)
            // console.log(res)
        })
        await request.get(`events`).then((res) => {
            setEvents(res.data.data)
        })
        await request.get(`teams`).then((res) => {
            setTeamsList(res.data.data)
        })
        await request.get(`users`).then((res) => {
            setUsers(res.data.data)
        })
        await request.get(`signatures`).then((res) => {
            setTemplates(res.data.data)
        })
    
    }, [])

    useEffect(() => {
        setActiveEvents(events?.filter(isActive => isActive.active === true))
        setActiveTeams(teamsList?.filter(isActive => isActive.members_count > 0))
        setActiveUsers(users?.filter(isActive => isActive.is_deployed === true))
    }, [events, users, teamsList])

    useEffect(() => {
        users.map((user) => {
            if (user.signature_template_id)
                setSignatures([...signatures, [user.signature_template_id]])
        })
    }, [users])
    return (
        <div className={classes.container}>
            <MobileView><h1>Bonjour {JSON.parse(localStorage.getItem("user"))?.first_name}</h1></MobileView>
            <div className={classes.tilesList}>
                <Link to="/signatures" className={classes.tile}>
                    <div className={classes.row}>
                        <p>Signatures</p>
                        <img src={ChevronRight} alt="View" />
                    </div>
                    <div className={classes.row}>
                        <div>
                            <span className={classes.bigTxt}>{signatures?.length}</span>
                            <span> /{templates?.length}</span>
                        </div>
                        <span className={classes.activeSpan}>actives</span>
                    </div>
                </Link>
                <Link to="/events" className={classes.tile}>
                    <div className={classes.row}>
                        <p>Events</p>
                        <img src={ChevronRight} alt="View" />
                    </div>
                    <div className={classes.row}>
                        <div>
                            <span className={classes.bigTxt}>{activeEvents?.length}</span>
                            <span> /{events?.length}</span>
                        </div>
                        <span className={classes.activeSpan}>actifs</span>

                    </div>
                </Link>
                {!teamsList.length < 1 ? <>
                    <Link to="/teams" className={classes.tile}>
                        <div className={classes.row}>
                            <p>Teams</p>
                            <img src={ChevronRight} alt="View" className={classes.blackImg} />
                        </div>
                        <div className={classes.row}>
                            <div>
                                <span className={classes.bigTxt}>{activeTeams?.length}</span>
                                <span> /{teamsList?.length}</span>
                            </div>
                            <span className={classes.activeSpan}>actives</span>
                        </div>
                    </Link>
                </> : null}
                    <Link to="/team/allusers" className={classes.tile}>
                        <div className={classes.row}>
                            <p>Collaborateurs</p>
                            <img src={ChevronRight} alt="View" className={classes.blackImg} />
                        </div>
                        <div className={classes.row}>
                            <div>
                                <span className={classes.bigTxt}>{users?.length}</span>
                            </div>
                            <span className={classes.activeSpan}>actifs</span>
                        </div>
                    </Link>
                <Link to="/billing" className={`${classes.tile} ${classes.billingTile}`}>
                    <div className={classes.row}>
                        <p>Abonnement</p>
                        <img src={ChevronRight} alt="View" />
                    </div>
                    <div className={classes.row}>
                        <div>
                            {users?.length === 1 ?  <><span className={classes.bigTxt}> </span><span className={classes.free}>Gratuit</span></> : <>
                            <span className={classes.bigTxt}>{users?.length * 0.5 + activeEvents?.length * 10}€</span>
                            <span> /mois</span> </>}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Tiles