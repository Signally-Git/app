import classes from './events.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from 'config'
import { HiOutlineSearch } from 'react-icons/hi'
import Button from 'Utils/Button/btn'
import CreateEvent from './CreateEvent/createEvent'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { useNotification } from 'Utils/Notifications/notifications'

function Events() {
    const [active, setActive] = useState("present")
    const [search, setSearch] = useState("")
    const [create, setCreate] = useState(false)
    const [preview, setPreview] = useState()
    const [edit, setEdit] = useState(false)
    const [activeEvents, setActiveEvents] = useState([])
    const [modal, setModal] = useState()
    const [modalContent, setModalContent] = useState()

    const notification = useNotification()
    const [drag, setDrag] = useState()

    const getData = async () => {
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/campaigns?access_token=${localStorage.getItem("token")}`).then((res) => {
            setActiveEvents(res.data.data)
        })
    }

    useEffect(() => {
        getData()
        handleEvents()
    }, [create, edit, preview])

    const handleDelete = (id) => {
        axios.delete(`${API}campaign/${id}?access_token=${localStorage.getItem("token")}`).then(
            () => { getData() }
        )
        setModal()
        setPreview()
        notification({ content: <>Event supprimé avec succès</>, status: "invalid"})
    }

    useEffect(() => {
        const handleModal = (toDelete) => {
            return (<div className={classes.modal}>
                <h4>Vous allez supprimer
                    <br /><span className={classes.orangeTxt}>{toDelete?.name}</span></h4>
                <div>
                    <Button color="orangeFill" onClick={() => setModal({ name: "", id: "" })}>Annuler</Button>
                    <Button color="orange" onClick={() => handleDelete(toDelete?.id)}>Supprimer</Button>
                </div>
            </div>)
        }
        setModalContent(handleModal(modal))
    }, [modal, preview])


    const handleEvents = (status) => {
        const events = activeEvents.map((activeEvent, index) => {
            if (activeEvent?.name.toLowerCase().search(search.toLowerCase()) !== -1)
                if ((status === "past" && new Date(activeEvent.end_date) < new Date()) || (status === "present" && activeEvent.active) || (status === "future" && new Date(activeEvent.start_date) > new Date())) {
                    return (
                        <li key={index} className={`${status === "past" ? classes.pastEvent : ""}`} onClick={() => { setPreview({ activeEvent, past: status === "past", index }); setCreate(false); setEdit(false) }} tabIndex={index}>
                            <img className={classes.bannerPreview} src={activeEvent.banner?.path} />
                            <div className={classes.eventText}>
                                <span className={classes.active}>{activeEvent.name}</span>
                                <span className={classes.duration}>
                                    <div className={`${classes.col} ${classes.bold}`}>
                                        <span>{`du ${new Date(activeEvent?.start_date).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric' })}`}</span>
                                        <span>{`au ${new Date(activeEvent?.end_date).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric' })}`}</span>
                                    </div>
                                    <div className={classes.col}>
                                        <span>{`${new Date(activeEvent?.start_date).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`}</span>
                                        <span>{`${new Date(activeEvent?.end_date).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`}</span>
                                    </div>
                                </span>
                                <div className={classes.actionsContainer}>
                                    <FiTrash onClick={() => setModal({ name: activeEvent.name, id: activeEvent.id })} />
                                </div>
                            </div>
                            {/* <img src={ChevronRight} className={classes.chevron} alt="Click" /> */}
                        </li>
                    )
                }
        })
        return (events.filter((event) => event !== undefined))
    }
    return (
        <div onDragEnter={() => setDrag(true)}
            
        >
            {modal ? modalContent : ""}
            <div className={classes.container}>
                <h1>Events</h1>
                <div className={classes.eventsContainer}>
                    <ul className={classes.menu}>
                        <li onClick={() => setActive("past")} className={active === "past" ? classes.active : ""}>Passés</li>
                        <li onClick={() => setActive("present")} className={active === "present" ? classes.active : ""}>En cours</li>
                        <li onClick={() => setActive("incoming")} className={active === "incoming" ? classes.active : ""}>À venir</li>
                    </ul>
                    {active === "past" ?
                        <div>
                            <div className={classes.searchInput}>
                                <HiOutlineSearch />
                                <input onChange={(e) => setSearch(e.target.value)} className={classes.search} type="text" placeholder="Rechercher un event" />
                            </div>
                            <span> {handleEvents('past').length} event{handleEvents('past').length > 1 ? 's' : ""}</span>
                            <ul className={classes.itemsList}>
                                {handleEvents('past')}
                            </ul>
                        </div>
                        : active === "present" ?
                            <div>
                                <Button color="orange" arrow={true} onClick={() => { setPreview(); setCreate(true); }}>Ajouter un event</Button>
                                <div className={classes.searchInput}>
                                    <HiOutlineSearch />
                                    <input onChange={(e) => setSearch(e.target.value)} className={classes.search} type="text" placeholder="Rechercher un event" />
                                </div>
                                <span>{handleEvents('present').length} event{handleEvents('present').length > 1 ? 's' : ""}</span>
                                <ul className={classes.itemsList}>
                                    {handleEvents('present')}
                                </ul>
                            </div> :
                            <div>
                                <Button color="orange" arrow={true} onClick={() => { setPreview(); setCreate(true); }}>Ajouter un event</Button>
                                <div className={classes.searchInput}>
                                    <HiOutlineSearch />
                                    <input onChange={(e) => setSearch(e.target.value)} className={classes.search} type="text" placeholder="Rechercher un event" />
                                </div>
                                <span>{handleEvents('future').length} event{handleEvents('future').length > 1 ? 's' : ""}</span>
                                <ul className={classes.itemsList}>
                                    {handleEvents('future')}
                                </ul>
                            </div>}
                </div>
                {create ? <div className={classes.createEventContainer}>
                    <CreateEvent setDone={setCreate} drag={drag} />
                </div> : ""}
                {preview ?
                    <div className={classes.flipcontainer}>
                        <div className={`${classes.flipper} ${edit ? classes.flip : ""}`}>
                            <div className={classes.front}>
                                <div className={`${classes.eventPreview} ${activeEvents[preview?.index].past ? classes.pastEvent : ""}`}>
                                    {/* <h3>Signature active</h3> */}
                                    <h2><span className={classes.orangeTxt}>{activeEvents[preview?.index].name}</span><FiEdit onClick={() => setEdit(!edit)} /></h2>
                                    <img src={activeEvents[preview?.index]?.banner?.path} />
                                </div>
                            </div>
                            <div className={classes.back}>
                                <div className={classes.createEventContainer}>
                                    <CreateEvent setDone={setEdit} event={activeEvents[preview?.index]} drag={drag} />
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""}
            </div>
        </div>)
}

export default Events