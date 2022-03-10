import classes from './signaturePreview.module.css'
import { useEffect, useState } from 'react';
import { API } from 'config';
import Button from 'Utils/Button/btn';
import request from 'Utils/Request/request';
import { useNotification } from 'Utils/Notifications/notifications';
import CopySignature from 'Desktop/components/CopySignature/CopySignature';
import Search from "Assets/icons/search.svg"
import CustomSelect from 'Utils/CustomSelect/customselect';
import Modal from 'Utils/Modals/modal';
import Btns from 'Utils/Btns/btns';
import parse from 'html-react-parser'

export default function SignaturePreview({ show, setShow, edit, setEdit }) {
    const [templates, setTemplates] = useState([])
    const [selectedTemplate, setSelectedTemplate] = useState()
    const [previewSignature, setPreviewSignature] = useState()
    const [event, setEvent] = useState("")
    const [multiEvents, setMultiEvents] = useState([])
    const [events, setEvents] = useState([])
    const [incomingEvents, setIncEvents] = useState([])
    const [choosePlaylist, setChoosePlaylist] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const type = show["@type"]?.toLowerCase()
    const notification = useNotification()

    //  PREVIEW EVENT
    useEffect(async () => {
        const events = await request.get('events');
        const toPush = events.data["hydra:member"].filter((data) => (new Date(data.startAt) < new Date()) && (new Date(data.endAt) > new Date())).sort(function (a, b) {
            if (a.startAt < b.startAt) { return -1; }
            if (a.startAt > b.startAt) { return 1; }
            return 0
        })
        toPush.unshift({name: 'Event', '@id': 'event'})
        setEvent(toPush[0] || { '@id': "playlist" })
        setEvents([...toPush, { name: 'Playlist', '@id': 'playlist', callback: setChoosePlaylist, listName: event['@id'] === "playlist" ? "Modifier la playlist" : "Playlist", style: { fontWeight: 'bold', color: `#FF7954` } }])

    }, [selectedTemplate])

    useEffect(async () => {
        const events = await request.get('events');

        setIncEvents(events.data["hydra:member"].filter((data) => (new Date(data.startAt) > new Date())).sort(function (a, b) {
            if (a.startAt < b.startAt) { return -1; }
            if (a.startAt > b.startAt) { return 1; }
            return 0
        }))
    }, [edit])

    useEffect(() => {
        setTemplates([])
    }, [edit])

    useEffect(() => {
        const sse = new EventSource(`https://hub.signally.io/.well-known/mercure?topic=https://api.beta.signally.io${show?.['@id']}`);
        sse.onmessage = e => getRealtimeData(JSON.parse(e.data));
        function getRealtimeData(data) {
            setShow(data)
        }
        return () => {
            sse.close();
        };
    }, [show])

    // PREVIEW SIGNATURE
    useEffect(() => {
        const refreshPreview = async () => {
            const entity = await request.get(`${type}s/${show.id}`)
            if (entity.data.compiledSignature)
                setPreviewSignature(entity.data.compiledSignature)
            else if (entity.data.signature?.['@id']) {
                await request.get(entity.data.signature['@id']).then((res) => setPreviewSignature(res.data.preview))
            }
            else if (entity.data.signature) {
                await request.get(entity.data.signature).then((res) => setPreviewSignature(res.data.preview))
            }
            else (setPreviewSignature())
        }

        let templatesAPI = [{id: 'signature', name: 'Signature'}]
        const listTemplates = async () => {
            await request.get('signatures').then((result) => {
                result.data["hydra:member"].map(async (template, index) => {
                    await request.get(template['@id']).then((res) => {
                        templatesAPI.push(res.data)
                        // if (index === 0) {
                            //     templatesAPI(res.data)
                            // }
                        })
                        setTemplates(templatesAPI)
                    })
                    console.log(templatesAPI)
            })

            // console.log(templatesAPI, templates)
        }

        refreshPreview()
        listTemplates()

        // await request.get(show?.signature?.['@id']).then((res) => {
        //     setSelectedTemplate(res.data)
        // })

    }, [show, edit])

    // Modal
    const [modal, setModal] = useState(false)
    const handleSubmit = ((e) => {
        setModal(true)
    })

    useEffect(() => {
        if (event === 'playlist' || events === 'playlist') {
            events.pop()
            setEvents([...events, { name: 'Playlist', '@id': 'playlist', callback: setChoosePlaylist, listName: event !== "playlist" ? "Playlist" : "Modifier la playlist", style: { fontWeight: 'bold', color: `#FF7954` } }])
        }
        if (event !== 'playlist' && events.length > 1) {
            events.pop()
            setEvents([...events, { name: 'Playlist', '@id': 'playlist', callback: setChoosePlaylist, listName: event !== "playlist" ? "Playlist" : "Modifier la playlist", style: { fontWeight: 'bold', color: `#FF7954` } }])
        }
    }, [event])

    // ASSIGNATION
    const handleProgram = () => {
        var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
        var tmp = []
        for (var checkbox of markedCheckbox) {
            tmp.push(JSON.parse(checkbox.value))
        }
        setMultiEvents(tmp)
        setChoosePlaylist(false)
    }

    const handleAssign = async (element) => {
        console.log(event)
        const req = {
            signature: selectedTemplate['@id'],
            events: event === 'playlist' || event['@id'] === 'playlist' ? multiEvents : [event?.['@id'] || event]
        }
        await request.patch(`${type}s/${element.id}`, req, {
            headers: { 'Content-Type': 'application/merge-patch+json' }
        }).then(
            (res) => {
                setPreviewSignature(res.data.signature.preview)
                notification({ content: <>Signature de <span className={classes.orangeTxt}>{type === "user" ? element.firstName + " " + element.lastName : element.name}</span> modifiée</>, status: "valid" })
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
                        let checked = false
                        if (event.name.toLowerCase().search(searchQuery?.toLowerCase()) >= 0) {
                            if (edit.events?.filter((a) => a.id === event.id)[0]?.id === event.id)
                                checked = true
                            else
                                checked = false
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
                                    <input defaultChecked={checked} type="checkbox" value={JSON.stringify(event)} />
                                    <span></span>
                                </label>
                            </li>
                        }
                    })}
                </ul>
            </div>
            <Btns onCancel={() => { setChoosePlaylist(false) }} confirmTxt="Enregistrer" onConfirm={() => handleProgram()} />
        </div>
        </div> : ""}
        {modal ? <Modal title={<>Vous allez mettre en ligne <br />la signature <span className={classes.orangeTxt}>{selectedTemplate?.name}</span> <br /><br />pour <span className={classes.orangeTxt}>{show.name || `${show.firstName} ${show.lastName}`}</span></>}
            cancel="Annuler"
            validate="Confirmer" onCancel={() => setModal(false)} onConfirm={() => { handleAssign(show); setModal(false) }} /> : ""}
        <div className={`${classes.flipper} ${edit ? classes.flip : ""}`}>
            <div className={classes.front}>
                <div className={classes.topLine}>
                    <h2>Signature active pour <span className={classes.orangeTxt}>{show.name || `${show.firstName} ${show.lastName}`}</span></h2>
                </div>
                <div>
                    {previewSignature ?
                        parse(previewSignature)
                        : ""}
                </div>
                {show?.group?.name &&
                    <span className={classes.groupName}>{show?.group?.name}</span>}
            </div>
            <div className={classes.back}>
                {edit === "copySign" ? <CopySignature signature={previewSignature} /> : <>
                    <div className={classes.topLine}>
                        <h2>Édition <span className={classes.orangeTxt}>{show.name || `${show.firstName} ${show.lastName}`}</span></h2>
                        {show['@type'] === 'Team' ? <Button color="brown" onClick={() => { setEdit('assign-team') }}>Collaborateurs</Button> :
                            show['@type'] === 'Workplace' ? <Button color="brown" onClick={() => { setEdit('assign-workplace') }}>Équipes</Button>
                                : ""}
                    </div>
                    <div className={classes.row}>
                        <div>
                            <label>Choisissez une signature</label>
                            {templates.length > 0 &&
                                <CustomSelect onChange={(e) => setSelectedTemplate(Object?.values(templates)?.find((obj) => { return obj.id == e }))} items={templates} display={"name"} getValue={"id"} />}
                            <div className={classes.signature}>
                                {selectedTemplate?.preview ?
                                    parse(selectedTemplate?.preview.replace('http://fakeimg.pl/380x126?font=noto&font_size=14', event?.imagePath ? `${API}/${event?.imagePath}` : Object?.values(events)?.find((obj) => { return obj['@id'] == event }) ? `${API}/${Object?.values(events)?.find((obj) => { return obj['@id'] == event })?.imagePath}` : 'http://fakeimg.pl/380x126?font=noto&font_size=14'))
                                    : ""}
                            </div>
                        </div>
                        <div>
                            {/* if event list events */}
                            {events.length > 1 ? <>
                                <label>Ajouter un event ou une playlist</label>
                                <CustomSelect onChange={(e) => {
                                    if (e === 'playlist') { setChoosePlaylist(true); setEvent(e) } else setEvent(e)
                                }}
                                    display="name" displayinlist="listName" getValue="@id" items={events} defaultValue={event['@id']} />
                            </> :
                                <>
                                    <label>Programmez vos events à venir</label>
                                    <Button onClick={() => { setChoosePlaylist(true); }}
                                        color="orange" style={{ borderRadius: '10px', margin: 0, marginTop: '1.285rem', height: '2.55rem', width: '100%' }}>
                                        Ajouter une playlist
                                    </Button>
                                </>}
                        </div>
                    </div>
                    <Btns style={{ left: '.5rem', bottom: '-5rem' }} onCancel={() => { setEdit() }} confirmTxt="Sauvegarder" onConfirm={() => handleSubmit()} />
                </>}
            </div>
        </div>
    </div>)
}