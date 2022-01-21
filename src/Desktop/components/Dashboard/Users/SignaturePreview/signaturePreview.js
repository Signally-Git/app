import classes from './signaturePreview.module.css'
import { useEffect, useState } from 'react';
import { API } from 'config';
import Button from 'Utils/Button/btn';
import ReadOnlyPreview from '../../Signatures/create/Preview/readOnlyPreview';
import request from 'Utils/Request/request';
import { useNotification } from 'Utils/Notifications/notifications';
import CopySignature from 'Desktop/components/CopySignature/CopySignature';
import Search from "Assets/icons/search.svg"
import CustomSelect from 'Utils/CustomSelect/customselect';
import Modal from 'Utils/Modals/modal';

export default function SignaturePreview({ show, edit, setEdit }) {
    const today = new Date()

    const [templates, setTemplates] = useState([])
    const [selectedTemplate, setSelectedTemplate] = useState()
    const [assignedTemplate, setAssignedTemplate] = useState()
    const [signatureInfos, setSignatureInfos] = useState()
    const defaultUser = localStorage.getItem("user")
    const [entity, setEntity] = useState()
    const [event, setEvent] = useState("")
    const [events, setEvents] = useState([])
    const [incomingEvents, setIncEvents] = useState([])
    const [choosePlaylist, setChoosePlaylist] = useState(false)
    const [playlist, setPlaylist] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const type = show["@type"].toLowerCase()
    const notification = useNotification()

    //  PREVIEW EVENT
    useEffect(async () => {
        setEntity(await request.get(`${type}s/${show.id}`))
        const isEvent = selectedTemplate?.html || ""
        const events = await request.get('events');
        const toPush = events.data["hydra:member"].filter((data) => (new Date(data.startAt) < new Date()) && (new Date(data.endAt) > new Date())).sort(function (a, b) {
            if (a.startAt < b.startAt) { return -1; }
            if (a.startAt > b.startAt) { return 1; }
            return 0
        })
        setIncEvents(events.data["hydra:member"].filter((data) => (new Date(data.startAt) > new Date())).sort(function (a, b) {
            if (a.startAt < b.startAt) { return -1; }
            if (a.startAt > b.startAt) { return 1; }
            return 0
        }))
        setEvent(events.data["hydra:member"][0] || { '@id': "playlist" })
        console.log(event)
        setEvents([...toPush, { name: 'Playlist', '@id': 'playlist', callback: setChoosePlaylist, listName: event['@id'] === "playlist" ? "Modifier la playlist" : "Playlist", style: { fontWeight: 'bold', color: `#FF7954` } }])
    }, [selectedTemplate])

    useEffect(() => {
        const tmp = templates;
        setTemplates([])
        //    setTemplates(tmp)
    }, [edit])

    // PREVIEW SIGNATURE
    useEffect(async () => {
        const entity = await request.get(`${type}s/${show.id}`)
        setAssignedTemplate(entity.data.compiledSignature)
        const templates = await request.get('signatures')
        setSelectedTemplate(templates.data["hydra:member"][0].html)
        setTemplates(templates.data["hydra:member"])
    }, [show, edit])

    // Modal
    const [modal, setModal] = useState(false)
    const handleSubmit = ((e) => {
        setModal(true)
    })

    useEffect(() => {
        if (event['@id'] === 'playlist' || events['@id'] === 'playlist') {
            events.pop()
            setEvents([...events, { name: 'Playlist', '@id': 'playlist', callback: setChoosePlaylist, listName: event !== "playlist" ? "Playlist" : "Modifier la playlist", style: { fontWeight: 'bold', color: `#FF7954` } }])
        }
    }, [event])

    // ASSIGNATION
    const handleAssign = async (element) => {
        const req =
            event ? {
                signature: selectedTemplate["@id"],
                events: [event['@id']]
            } :
                {
                    signature: selectedTemplate["@id"]
                }
        await request.patch(`${type}s/${element.id}`, req, {
            headers: { 'Content-Type': 'application/merge-patch+json' }
        }).then(
            () => {
                notification({ content: <>Signature de {type === "user" ? element.firstName + " " + element.lastName : type} modifiée</>, status: "valid" })
                setEdit()
            }).catch(() => notification({ content: <>Impossible de modifier la signature</>, status: "invalid" }))
    }

    return (<div className={classes.flipcontainer}>
        {choosePlaylist ? <div className={classes.modalContainer}> <div className={classes.playlistmodal}>
            <div>
                <h3>Programmer la diffusion de plusieurs events</h3>
                <div className={classes.searchContainer}>
                    <img src={Search} alt="search" />
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={classes.searchInput} placeholder="Rechercher un event" />
                </div>
                <ul>
                    {incomingEvents.map((event) => {
                        if (event.name.toLowerCase().search(searchQuery?.toLowerCase()) >= 0)
                            return <li key={event['@id']}>

                                <img className={classes.bannerPreview} src={`${API}${event.imagePath}`} />
                                <div className={classes.eventText}>
                                    <span className={classes.active}>{event.name}</span>
                                    <span className={classes.duration}>
                                        <div className={`${classes.col} ${classes.bold}`}>
                                            <span>{`du ${new Date(event?.startAt).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric' })}`}</span>
                                            <span>{`au ${new Date(event?.endAt).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric' })}`}</span>
                                        </div>
                                        <div className={classes.col}>
                                            <span>{`${new Date(event?.startAt).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`}</span>
                                            <span>{`${new Date(event?.endAt).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`}</span>
                                        </div>
                                    </span>
                                </div>
                                <label>
                                    <input type="checkbox" value={event['@id']} />
                                    <span></span>
                                </label>
                            </li>
                    })}
                </ul>
            </div>
            <div className={classes.btnsContainer}>
                <Button color="orange" width={'40%'} onClick={() => setChoosePlaylist(false)}>Annuler</Button>
                <Button color="orangeFill" width={'40%'} onClick={() => setChoosePlaylist(false)}>Enregistrer</Button>
            </div>
        </div>
        </div> : ""}
        {modal ? <Modal title={<>Vous allez mettre en ligne <br />la signature <span className={classes.orangeTxt}>{Object?.values(templates)?.find((obj) => { return obj.html == selectedTemplate })?.name}</span> <br /><br />pour <span className={classes.orangeTxt}>{show.name || `${show.firstName} ${show.lastName}`}</span></>}
            cancel="Annuler"
            validate="Confirmer" onCancel={() => setModal(false)} onConfirm={() => { handleAssign(show); setModal(false) }} /> : ""}
        <div className={`${classes.flipper} ${edit ? classes.flip : ""}`}>
            <div className={classes.front}>
                <div className={classes.topLine}>
                    <h2>Signature active pour <span className={classes.orangeTxt}>{show.name || `${show.firstName} ${show.lastName}`}</span></h2>
                </div>
                <div>
                    {assignedTemplate ?
                        <ReadOnlyPreview template={assignedTemplate} infos={signatureInfos} />
                        : ""}
                </div>
                {show?.group?.name &&
                    <span className={classes.groupName}>{show?.group?.name}</span>}
            </div>
            <div className={classes.back}>
                {edit === "copySign" ? <CopySignature signature={assignedTemplate} /> : <>
                    <div className={classes.topLine}>
                        <h2>Édition <span className={classes.orangeTxt}>{show.name || `${show.firstName} ${show.lastName}`}</span></h2>
                        {show.name ? <Button color="brown" onClick={() => { setEdit('assign-team') }}>Modifier équipes</Button> : ""}

                    </div>
                    <div className={classes.row}>
                        <div>
                            <label>Choisissez une signature</label>
                            {templates.length > 0 &&
                                <CustomSelect onChange={(e) => { setSelectedTemplate(e) }} callback="callback" display="name" getValue="html" items={templates} />}
                            <div className={classes.signature}>
                                {selectedTemplate ? <ReadOnlyPreview template={selectedTemplate} infos={{ event: `${API}/${event?.imagePath}` }} /> : ""}
                            </div>
                        </div>
                        <div>
                            {/* if event list events */}
                            {events.length > 1 ? <>
                                <label>Ajouter un event ou une playlist</label>
                                <CustomSelect onChange={(e) => {
                                    if (e === 'playlist') { setChoosePlaylist(true); setEvent(e) } else setEvent(e)
                                }}
                                    display="name" displayInList="listName" getValue="@id" items={events} defaultValue={event} />
                            </> :
                                <>
                                    <label>Programmez vos events à venir</label>
                                    <Button onClick={(e) => { setChoosePlaylist(true); }}
                                        color="orange" style={{borderRadius: '10px', margin: 0, marginTop: '1.285rem', height: '2.55rem', width: '100%'}} display="name" displayInList="listName" getValue="@id" items={events} defaultValue={event}>
                                        Ajouter une playlist
                                    </Button>
                                </>}
                        </div>
                    </div>
                    <div className={classes.btnsContainer}>
                        <Button onClick={() => setEdit()} color="orange">Annuler</Button>
                        <Button onClick={() => handleSubmit()} color="orangeFill">Sauvegarder</Button>
                    </div>
                </>}
            </div>
        </div>
    </div>)
}