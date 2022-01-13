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

export default function SignaturePreview({ show, edit, setEdit }) {
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
            setEvents(events.data["hydra:member"])
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
            }).catch(() => notification({ content: <>Impossible de modifier la signature.</>, status: "invalid" }))
    }

    return (<div className={classes.flipcontainer}>
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
                        {show.name ? <Select onChange={(e) => setEdit(e.target.value)} items={[{ name: "Modifier signature", '@id': "assign-signature" }, { name: "Modifier équipes", '@id': "assign-team" }]} /> : ""}
                    </div>
                    <div className={classes.row}>

                        <div>
                            <label>Choisissez votre signature</label>
                            <form onChange={(e) => setSelectedTemplate(JSON.parse(e.target.value))}>
                                <select defaultValue={JSON.stringify(templates[0])}>
                                    {templates.map((template) => {
                                        return <option key={template.id} value={JSON.stringify(template)} template={template.html}>
                                            {template.name}
                                        </option>
                                    })}
                                </select>
                            </form>
                        </div>
                        <div>
                            {/* if event list events */}
                            {events.length > 0 ? <>
                                <label>Choisissez votre event</label>
                                <CustomSelect items={events} multiple />
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
                    <div className={classes.signature}>
                        {selectedTemplate ? <ReadOnlyPreview template={selectedTemplate?.html} infos={{ event: `${API}/${event?.imagePath}` }} /> : ""}
                    </div>
                    <Button onClick={() => handleAssign(show)} color="orangeFill">Sauvegarder</Button>
                </>}
            </div>
        </div>
    </div>)
}