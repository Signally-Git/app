import ChevronRight from 'Assets/icons/chevron-right.svg'
import classes from './tiles.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MobileView } from 'react-device-detect'
import request from 'Utils/Request/request'
import Button from 'Utils/Button/btn'
import Modal from 'Utils/Modals/modal'
import { AiOutlineNotification } from 'react-icons/ai'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { BsBroadcastPin } from 'react-icons/bs'

function Tiles(props) {
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([])
    const [activeEvents, setActiveEvents] = useState([])
    const [teamsList, setTeamsList] = useState([])
    const [activeTeams, setActiveTeams] = useState([])
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [wps, setWPs] = useState([])
    const [modal, setModal] = useState(false)
    const [organisation, setOrganisation] = useState({})
    const [activeUsers, setActiveUsers] = useState([])
    const [templates, setTemplates] = useState([])
    const [signatures, setSignatures] = useState([])

    useEffect(async () => {
        setLoading(true)
        props.handleHeader(" ")
        await request.get(`whoami`).then(async (res) => {
            localStorage.setItem("user", JSON.stringify(res.data))
            setUser(res.data)
            await request.get(res.data.organisation).then((res) =>
                setOrganisation(res.data))
            // console.log(res)
        })

        await request.get(`events`).then((res) => {
            setEvents(res.data["hydra:member"])
        }).catch(() => { })
        await request.get(`teams`).then((res) => {
            setTeamsList(res.data["hydra:member"])
        }).catch(() => { })
        await request.get(`workplaces`).then((res) => {
            setWPs(res.data["hydra:member"])
        }).catch(() => { })
        await request.get(`users`).then((res) => {
            setUsers(res.data["hydra:member"])
        }).catch(() => { })
        await request.get(`signatures`).then((res) => {
            setTemplates(res.data["hydra:member"])
            setLoading(false)
        }).catch(() => { })
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
    }, [users, loading])
    
    if (loading)
        return <div className={classes.container}>Chargement...</div>
    return (
        <div className={classes.container}>
            {modal ? <Modal style={{ left: 0 }} title="Êtes-vous sûr de vouloir déployer la signature ?"
                content={`Vous allez envoyer un mail de déploiement à ${users.length} utilisateurs`}
                cancel="Annuler" validate="Déployer"
                onCancel={() => setModal(false)} onConfirm={() => setModal(false)} /> : ""}
            <MobileView><h1>Bonjour {JSON.parse(localStorage.getItem("user"))?.first_name}</h1></MobileView>
            <div className={classes.tilesList}>
                {!templates.length < 1 ? <>
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
                </> : null}
                {!events.length < 1 ? <>
                    <Link to="/events" className={classes.tile}>
                        <div className={classes.row}>
                            <p>Events</p>
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
                </> : null}
                {!wps.length < 1 ? <>
                    <Link to="/teams/workplaces" className={classes.tile}>
                        <div className={classes.row}>
                            <p>Groupes</p>
                            <img src={ChevronRight} alt="View" />
                        </div>
                        <div className={classes.row}>
                            <div>
                                <span className={classes.bigTxt}>{activeTeams.length}</span>
                                <span> /{wps.length}</span>
                            </div>
                            <span className={classes.activeSpan}>actifs</span>
                        </div>
                    </Link>
                </> : null}
                {!teamsList.length < 1 ? <>
                    <Link to="/teams/teams" className={classes.tile}>
                        <div className={classes.row}>
                            <p>Équipes</p>
                            <img src={ChevronRight} alt="View" />
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
                <Link to="/teams/users" className={classes.tile}>
                    <div className={classes.row}>
                        <p>Collaborateurs</p>
                        <img src={ChevronRight} alt="View" />
                    </div>
                    <div className={classes.row}>
                        <div>
                            <span className={classes.bigTxt}>{users.length}</span>
                        </div>
                        <span className={classes.activeSpan}>actifs</span>
                    </div>
                </Link>
                <div className={`${classes.tile} ${classes.deploy}`}>
                    <div className={classes.row}>
                        <p>Déploiement</p>
                        <BsBroadcastPin fontSize={'1.75rem'} style={{ margin: 'auto 0 1rem 0' }} />
                        {/* <img src={ChevronRight} alt="View" /> */}
                    </div>
                    <div className={classes.row}>
                        {/* <div> */}
                        {/* <Button color={"brownFill"} style={{padding: '.5rem'}} onClick={() => setModal(true)}>Déployer pour {organisation?.name}</Button> */}
                        <div>
                            <span className={classes.bigTxt}>{users.length}</span>
                        </div>
                        <span className={classes.activeSpan}>actifs</span>
                        {/* </div> */}
                    </div>
                </div>
                <div to="#" className={`${classes.tile} ${classes.billingTile}`}>
                    <div className={classes.row}>
                        <p>Abonnement</p>
                        <img src={ChevronRight} alt="View" />
                    </div>
                    <div className={classes.row}>
                        <div>
                            <span className={classes.free}>Gratuit</span>
                            {/* {users.length === 1 ?  <><span className={classes.bigTxt}> </span><span className={classes.free}>Gratuit</span></> : <>
                            <span className={classes.bigTxt}>{users.length * 0.5 + activeEvents.length * 10}€</span> */}
                            {/* <span> /mois</span> </>} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tiles