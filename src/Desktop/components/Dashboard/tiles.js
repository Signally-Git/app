import ChevronRight from 'Assets/icons/chevron-right.svg'
import classes from './tiles.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import request from 'Utils/Request/request'
import Modal from 'Utils/Modals/modal'
import { BsBroadcastPin } from 'react-icons/bs'
import { useNotification } from 'Utils/Notifications/notifications'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function Tiles(props) {
    const [events, setEvents] = useState([])
    const [activeEvent, setActiveEvent] = useState()
    const [teamsList, setTeamsList] = useState([])
    const [activeTeams, setActiveTeams] = useState(0)
    const [activeWorkplaces, setActiveWorkplaces] = useState(0)
    const [users, setUsers] = useState([])
    const [wps, setWPs] = useState([])
    const [modal, setModal] = useState(false)
    const [templates, setTemplates] = useState([])
    const [signatures, setSignatures] = useState([])
    const [activeSignatures, setActiveSignatures] = useState(0)

    const [sendMailBtn, setSendMailBtn] = useState(<span>Envoyer le mail</span>)

    const notification = useNotification()

    useEffect(async () => {
        props.setLoading(false)
        props.handleHeader(" ")
        await request.get(`whoami`).then(async (res) => {
            localStorage.setItem("user", JSON.stringify(res.data))
        })

        await request.get(`events`).then((res) => {
            let count = 0;
            res.data["hydra:member"].map((event) => {
                if ((event.users.length > 0 || event.teams.length > 0 || event.workplaces.length > 0))
                    count++;
            })
            setActiveEvent(count)
            setEvents(res.data["hydra:member"])
        }).catch(() => { })
        await request.get(`teams`).then((res) => {
            let count = 0;
            res.data["hydra:member"].map((team) => {
                if (team.users.length > 0)
                    count++;
            })
            setActiveTeams(count)
            setTeamsList(res.data["hydra:member"])
        }).catch(() => { })
        await request.get(`workplaces`).then((res) => {
            let count = 0;
            res.data["hydra:member"].map((wp) => {
                if (wp.teams.length > 0)
                    count++;
            })
            setActiveWorkplaces(count)
            setWPs(res.data["hydra:member"])
        }).catch(() => { })
        await request.get(`users`).then((res) => {
            setUsers(res.data["hydra:member"])
        }).catch(() => { })
        await request.get(`signatures`).then((res) => {
            let count = 0;
            res.data["hydra:member"].map((signature) => {
                if (signature.users.length > 0 || signature.teams.length > 0 || signature.workplaces.length > 0)
                    count++;
            })
            setActiveSignatures(count)
            setTemplates(res.data["hydra:member"])
            props.setLoading(true)
        }).catch(() => { })
    }, [])

    useEffect(() => {
        users.map((user) => {
            if (user.signature_template_id)
                setSignatures([...signatures, [user.signature_template_id]])
        })
    }, [users, props.loading])

    return (
        <div className={classes.container}>
            {modal ? <Modal style={{ left: 0, padding: '1rem 2rem' }} title={<span className={classes.orangeTxt}>Envoyer le lien par mail<br /> à tous les collaborateurs</span>}
                content={`Le déploiement permet à vos collaborateurs de copier directement leur signature dans leur client mail (mobile ou desktop)`}
                cancel="Annuler" validate={sendMailBtn}
                onCancel={() => setModal(false)} onConfirm={() => {
                    setSendMailBtn(<><span style={{opacity: 0}}>Envoyer le mail</span><AiOutlineLoading3Quarters className={classes.loadingBtn} /></>)
                    request.get('user/send-token')
                        .then(() => { notification({ content: <>{users.length} collaborateur(s) notifiés</>, status: "valid" }); setSendMailBtn(<>Envoyer le mail</>);  setModal(false) })
                        .catch(() => { notification({ content: <>Une erreur est survenue. Veuillez réessayer</>, status: "invalid" }); setSendMailBtn(<>Envoyer le mail</>);  setModal(false) })
                }} /> : ""}
            <div className={classes.tilesList}>
                {!templates.length < 1 ? <>
                    <Link to="/signatures" className={classes.tile}>
                        <div className={classes.row}>
                            <p>Signatures</p>
                            <img src={ChevronRight} alt="View" />
                        </div>
                        <div className={classes.row}>
                            <div>
                                <span className={classes.bigTxt}>{activeSignatures}</span>
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
                                <span className={classes.bigTxt}>{activeEvent}</span>
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
                                <span className={classes.bigTxt}>{activeWorkplaces}</span>
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
                                <span className={classes.bigTxt}>{activeTeams}</span>
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
                <div className={`${classes.tile} ${classes.deploy}`} onClick={() => setModal(true)}>
                    <div className={`${classes.row} ${classes.onUnHover}`}>
                        <p style={{ width: '5rem'}}>Déploiement</p>
                        <BsBroadcastPin fontSize={'1.75rem'} style={{ margin: 'auto 0 1rem 0' }} />
                    </div>
                    <div className={`${classes.row} ${classes.onHover}`}>
                        <p style={{ width: '5rem'}}>Déployer</p>
                        <BsBroadcastPin fontSize={'1.75rem'} style={{ margin: 'auto 0 1rem 0' }} />
                    </div>
                    <div className={classes.row}>
                        <div>
                            <span className={classes.bigTxt}>{users.length}</span>
                        </div>
                        <span className={classes.activeSpan}>actifs</span>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tiles