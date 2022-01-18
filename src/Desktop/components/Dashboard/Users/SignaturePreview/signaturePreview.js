import classes from './signaturePreview.module.css'
import { FiCheck, FiEdit } from "react-icons/fi";
import { useEffect, useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser'
import { API } from 'config';
import Button from 'Utils/Button/btn';
import { UseOrganizationInfos } from 'Utils/useOrganizationInfos/useOrganizationInfos';
import ReadOnlyPreview from '../../Signatures/create/Preview/readOnlyPreview';
import { AiOutlineEdit, AiOutlineUsergroupAdd } from 'react-icons/ai';
import Input from 'Utils/Input/input';
import UploadFile from 'Utils/Upload/uploadFile';
import request from 'Utils/Request/request';
import { useNotification } from 'Utils/Notifications/notifications';
import CopySignature from 'Desktop/components/CopySignature/CopySignature';
import { BsCardHeading } from 'react-icons/bs';
import Select from 'Utils/Select/select';
import CustomSelect from 'Utils/CustomSelect/customselect';
import Modal from 'Utils/Modals/modal';

export default function SignaturePreview({ show, edit, setEdit }) {
    const today = new Date()

    // console.log(show)
    const [templates, setTemplates] = useState([])
    const [selectedTemplate, setSelectedTemplate] = useState()
    const [assignedTemplate, setAssignedTemplate] = useState()
    const [signatureInfos, setSignatureInfos] = useState()
    const defaultUser = localStorage.getItem("user")
    const [user, setUser] = useState(JSON.parse(defaultUser))
    const [entity, setEntity] = useState()
    const [event, setEvent] = useState("")
    const [events, setEvents] = useState([])
    const type = show["@type"].toLowerCase()
    const notification = useNotification()

    //  PREVIEW EVENT
    useEffect(async () => {
        setEntity(await request.get(`${type}s/${show.id}`))
        // console.log(selectedTemplate)
        console.log(event)
        const isEvent = selectedTemplate?.html !== undefined ? selectedTemplate.html : "asd"
        if (isEvent.includes("PLACEHOLDER_EVENT_BANNER") === true) {
            const events = await request.get('events');
            setEvents(events.data["hydra:member"].filter((data) => (new Date(data.startAt) < new Date()) && (new Date(data.endAt) > new Date())).sort(function (a, b) {
                if (a.startAt < b.startAt) { return -1; }
                if (a.startAt > b.startAt) { return 1; }
                return 0
            }))
            setEvent(events.data["hydra:member"][0])
        }
        else {
            setEvents([])
        }
    }, [selectedTemplate])

    useEffect(() => {
        // console.log(show)
    }, [event])

    // PREVIEW SIGNATURE
    useEffect(async () => {
        // if (type === "user") {
        const entity = await request.get(`${type}s/${show.id}`)
        setAssignedTemplate(entity.data.compiledSignature)
        const templates = await request.get('signatures')
        console.log(templates)
        setSelectedTemplate(templates.data["hydra:member"][0])
        setTemplates(templates.data["hydra:member"])
        // }
        // if (!show.signature)
        //     setEdit(true)
    }, [show, edit])

    // Modal
    const [modal, setModal] = useState(false)
    const handleSubmit = ((e) => {
        setModal(true)
    })

    // ASSIGNATION
    const handleAssign = async (element) => {
        // console.log(selectedTemplate)
        console.log("EVENT", event)
        const req =
            event ? {
                signature: selectedTemplate["@id"],
                events: [event['@id']]
            } :
                {
                    signature: selectedTemplate["@id"]
                }
        console.log(req)
        await request.patch(`${type}s/${element.id}`, req, {
            headers: { 'Content-Type': 'application/merge-patch+json' }
        }).then(
            (res) => {
                console.log(element)
                notification({ content: <>Signature de {type === "user" ? element.firstName + " " + element.lastName : type} modifiée</>, status: "valid" })
                console.log(res); setEdit()
            }).catch(() => notification({ content: <>Impossible de modifier la signature</>, status: "invalid" }))
    }

    return (<div className={classes.flipcontainer}>
        {modal ? <Modal title={<>Vous allez mettre en ligne <br />la signature <span className={classes.orangeTxt}>{selectedTemplate.name}</span> <br />pour <span className={classes.orangeTxt}>{show.name || `${show.firstName} ${show.lastName}`}</span></>}
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
                        <Button color="brown" onClick={() => {setEdit('assign-team')}}>Modifier équipes</Button>
                        {/* {show.name ? <Select onChange={(e) => setEdit(e.target.value)} items={[{ name: "Modifier signature", '@id': "assign-signature" }, { name: "Modifier équipes", '@id': "assign-team" }]} /> : ""} */}
                    </div>
                    <div className={classes.row}>
                        <div>
                            <label>Choisissez votre signature</label>
                            {/* <CustomSelect onChange={(e) => setSelectedTemplate((e.target.value))} display="name" getValue="name" items={templates} defaultValue={templates[0]} /> */}
                            <form onChange={(e) => setSelectedTemplate(JSON.parse(e.target.value))}>
                                <select defaultValue={JSON.stringify(templates[0])}>
                                    {templates.map((template) => {
                                        return <option key={template.id} value={JSON.stringify(template)} template={template.html}>
                                            {template.name}
                                        </option>
                                    })}
                                </select>
                            </form>
                            <div className={classes.signature}>
                                {selectedTemplate ? <ReadOnlyPreview template={selectedTemplate?.html} infos={{ event: `${API}/${event?.imagePath}` }} /> : ""}
                            </div>
                        </div>
                        <div>
                            {/* if event list events */}
                            {events.length > 0 ? <>
                                <label>Choisissez votre event actuel</label>
                                <CustomSelect display="name" getValue="name" items={events} defaultValue={events[0]} />
                                {/* <div title='Cette fonctionnalité arrive très prochainement'>

                                    <div className="disabled" title='Cette fonctionnalité arrive très prochainement' alt='Cette fonctionnalité arrive très prochainement'>

                                        <Button style={{ height: '2.5rem', marginRight: '0', borderRadius: '100px' }} color="orange">Programmation<div className={classes.event}>
                                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="2.99625" y="2.99625" width="18.0075" height="18.0075" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M7.99833 6.99792H16.0017" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>{String(today.getDate()).padStart(2, '0')}</span>
                                        </div></Button>
                                    </div>
                                </div> */}
                                {/* <label>Programmation à venir</label>
                                
                                <CustomSelect items={events} multiple /> */}
                            </> : ""}
                            {/* {events.length > 0 ? <>
                                <label>Choisissez votre event</label>
                                <form onChange={(e) => setEvent(JSON.parse(e.target.value))}>
                                    <select defaultValue={event[0]}>
                                        {events.map((event) => {
                                            return <div key={event.id} value={JSON.stringify(event)}>
                                                {event.name}
                                            </div>
                                        })}
                                    </select>
                                </form> </> : ""} */}
                            {/* <form onChange={(e) => setSelectedTemplate(JSON.parse(e.target.value))}>
                        <select defaultValue={JSON.stringify(selectedTemplate)}>
                            {events.map((event) => {
                                return <option key={event.id} value={JSON.stringify(template)} template={template.signatureData}>
                                    {template.name}
                                </option>
                            })}
                        </select>
                    </form> */}


                        </div>
                    </div>
                    <Button onClick={() => handleSubmit()} color="orangeFill">Sauvegarder</Button>
                </>}
            </div>
        </div>
    </div>)
}