import classes from './signaturePreview.module.css'
import { FiCheck, FiEdit } from "react-icons/fi";
import { useEffect, useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser'
import { API } from 'config';
import Button from 'Utils/Button/btn';
import { UseOrganizationInfos } from 'Utils/useOrganizationInfos/useOrganizationInfos';
import ReadOnlyPreview from '../../Signatures/create/Preview/readOnlyPreview';
import { AiOutlineEdit } from 'react-icons/ai';
import Input from 'Utils/Input/input';
import UploadFile from 'Utils/Upload/uploadFile';
import request from 'Utils/Request/request';

export default function SignaturePreview({ show }) {
    // console.log(show)
    const [edit, setEdit] = useState(false)
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

    // const getData = async () => {
    //     if (show["@type"] === "group")
    //         setEntity(show)
    //     else
    //         setEntity(await UseOrganizationInfos(localStorage.getItem('organisation_id')))
    // }

    // const attributeGroup = async (structure) => {
    //     await axios.get(`${API}organisation/${localStorage.getItem('organisation_id')}/groups?access_token=${localStorage.getItem('token')}`)
    //         .then(async (resultGroup) =>
    //             resultGroup.data.data.map(async (group) => await axios.get(`${API}group/${group.id}/teams?access_token=${localStorage.getItem('token')}`)
    //                 .then((resultat) =>
    //                     resultat.data.data.map((teamToAdd) => {
    //                         if (teamToAdd.id === structure.team.id && group.logo.path) {
    //                             setEntity(group)
    //                         }
    //                     })
    //                 )))
    // }

    // // console.log(show)
    // const handleData = async () => {
    //     switch (show["@type"]) {
    //         case 'group':
    //             await axios.get(`${API}group/${show.id}?access_token=${localStorage.getItem('token')}`)
    //                 .then(async (res) => {
    //                     await axios.get(`${API}template/${res.data.signature_template?.id}?access_token=${localStorage.getItem('token')}`).then((result) => {
    //                         setSelectedTemplate(result.data)
    //                     })
    //                     setUser(JSON.parse(defaultUser))
    //                     setEntity(res.data)
    //                 })
    //             break;
    //         case 'team':
    //             setEntity(show.group)
    //             await axios.get(`${API}team/${show.id}?access_token=${localStorage.getItem('token')}`)
    //                 .then(async (res) => {
    //                     setUser(JSON.parse(defaultUser))
    //                     await axios.get(`${API}template/${res.data.signature_template?.id}?access_token=${localStorage.getItem('token')}`).then((result) => {
    //                         setSelectedTemplate(result.data)
    //                     })
    //                 })
    //             break;
    //         case 'user':
    //             await axios.get(`${API}user/${show.id}?access_token=${localStorage.getItem('token')}`)
    //                 .then(async (res) => {
    //                     setUser(res.data)
    //                     // await axios.get(`${API}team/${res.data.team.id}?access_token=${localStorage.getItem('token')}`)
    //                     //     .then((team) => console.log())
    //                     await axios.get(`${API}template/${res.data.signature_template?.id}?access_token=${localStorage.getItem('token')}`).then((result) => {
    //                         setSelectedTemplate(result.data)
    //                     })
    //                     if (show.team)
    //                         attributeGroup(show)
    //                 })
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // const getTemplate = async (id) => {
    //     // console.log(id)
    //     await axios.get(`${API}template/${id}?access_token=${localStorage.getItem('token')}`)
    //         .then((res) => { setSelectedTemplate(res.data) })
    // }

    // useEffect(async () => {
    //     await axios.get(`${API}organisation/${localStorage.getItem("organisation_id")}/signature-templates?access_token=${localStorage.getItem("token")}`)
    //         .then((res) => {
    //             setTemplates(res.data.data)
    //         })
    // }, [])

    // useEffect(() => {
    //     const getEvent = async () => {
    //         await axios.get(`${API}campaign/${JSON.parse(selectedTemplate?.tags)?.selected?.id}?access_token=${localStorage.getItem("token")}`).then((res) => {
    //             if (res.data.active === true) {
    //                 console.log(JSON.parse(selectedTemplate?.tags))
    //                 const banner = JSON.parse(selectedTemplate.tags);
    //                 setEvent(banner.display)
    //             }
    //         })
    //     }
    //     getEvent()
    // }, [selectedTemplate])

    // useEffect(() => {
    //     if (show["@type"] === "user")
    //         getData()
    //     setEdit(false)
    // }, [show])

    // useEffect(() => {
    //     // console.log(show?.signature_template_id, show?.signature_template?.id, selectedTemplate?.id)
    //     if (show.signature_template_id !== undefined)
    //         getTemplate(show.signature_template_id)
    //     handleData()
    // }, [show, edit])
    // useEffect(() => {
    //     setSignatureInfos({
    //         logo: entity?.logo.path,
    //         firstName: user?.firstName,
    //         lastName: user?.lastName,
    //         jobName: user?.position,
    //         entity: entity?.name,
    //         address: entity?.address,
    //         mobile: user?.phone_number,
    //         phone: entity?.phone_number,
    //         event: event
    //     })
    // }, [user, entity, edit])


    //  PREVIEW EVENT
    useEffect(async () => {
        setEntity(await request.get(`${type}s/${show.id}`))
        // console.log(selectedTemplate)
        const isEvent = selectedTemplate?.html !== undefined ? selectedTemplate.html : "asd"
        if (isEvent.includes("PLACEHOLDER_EVENT_BANNER") === true) {
            const events = await request.get('events');
            setEvents(events.data["hydra:member"])
            setEvent(events.data["hydra:member"][0])
        }
        else
            setEvents([])
    }, [selectedTemplate])

    useEffect(() => {
        // console.log(show)
    }, [event])

    // PREVIEW SIGNATURE
    useEffect(async () => {
        if (type === "user") {
            const entity = await request.get(`${type}s/${show.id}`)
            setAssignedTemplate(entity.data.compiledSignature)
            const templates = await request.get('signatures')
            setSelectedTemplate(templates.data["hydra:member"][0])
            setTemplates(templates.data["hydra:member"])
        }
    }, [show, edit])

    // ASSIGNATION
    const handleAssign = async (id) => {
        // console.log(selectedTemplate)

        const req = event ? { signature: selectedTemplate["@id"], events: [event['@id']] } : { signature: selectedTemplate["@id"] }
        await request.patch(`${type}s/${id}`, req, {
            headers: { 'Content-Type': 'application/merge-patch+json' }
        }).then(
            (res) => {
                console.log(res); setEdit(false)
            })
    }

    return (<div className={classes.flipcontainer}>
        <div className={`${classes.flipper} ${edit ? classes.flip : ""}`}>
            <div className={classes.front}>
                <div className={classes.topLine}>
                    <h2>Signature active pour <span className={classes.orangeTxt}>{show.name || `${show.firstName} ${show.lastName}`}</span></h2>
                    <AiOutlineEdit onClick={() => setEdit(!edit)} />
                </div>
                <div>
                    {assignedTemplate ?
                        <ReadOnlyPreview template={assignedTemplate} infos={signatureInfos} /> : ""}
                </div>
                {show?.group?.name &&
                    <span className={classes.groupName}>{show?.group?.name}</span>}
            </div>
            <div className={classes.back}>
                <div className={classes.topLine}>
                    <h2>Édition {show.name}</h2>
                    <FiCheck onClick={() => setEdit(!edit)} />
                </div>
                <div className={classes.signatureContainer}>
                    <form onChange={(e) => setSelectedTemplate(JSON.parse(e.target.value))}>
                        <select defaultValue={JSON.stringify(templates[0])}>
                            {templates.map((template) => {
                                return <option key={template.id} value={JSON.stringify(template)} template={template.html}>
                                    {template.name}
                                </option>
                            })}
                        </select>
                    </form>
                    {/* if event list events */}
                    {events.length > 0 ?
                        <form onChange={(e) => setEvent(JSON.parse(e.target.value))}>
                            <select defaultValue={event[0]}>
                                {events.map((event) => {
                                    return <option key={event.id} value={JSON.stringify(event)}>
                                        {event.name}
                                    </option>
                                })}
                            </select>
                        </form> : ""}
                    {/* <form onChange={(e) => setSelectedTemplate(JSON.parse(e.target.value))}>
                        <select defaultValue={JSON.stringify(selectedTemplate)}>
                            {events.map((event) => {
                                return <option key={event.id} value={JSON.stringify(template)} template={template.signatureData}>
                                    {template.name}
                                </option>
                            })}
                        </select>
                    </form> */}
                    {selectedTemplate ? <ReadOnlyPreview template={selectedTemplate?.html} infos={{ event: `${API}/${event?.imagePath}` }} /> : ""}
                    <Button onClick={() => handleAssign(show.id)} color="orangeFill">Changer de signature</Button>
                </div>
            </div>
        </div>
    </div>)
}