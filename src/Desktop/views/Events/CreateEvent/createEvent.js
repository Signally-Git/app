import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css";
import classes from './createEvent.module.css';
import 'moment/locale/fr';
import Input from 'Utils/Input/input';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import UploadFile from 'Utils/Upload/uploadFile';
import { useNotification } from 'Utils/Notifications/notifications';
import request from 'Utils/Request/request';
import Btns from 'Utils/Btns/btns';
import { useHistory } from 'react-router-dom';

export default function CreateEvent({ setDone, event }) {
    const [startDate, setStartDate] = useState(event?.startAt ? new Date(event?.startAt) : new Date())
    const [endDate, setEndDate] = useState(event?.endAt ? new Date(event?.endAt) : new Date())
    const [banner, setBanner] = useState()
    const [eventName, setEventName] = useState(event?.name || "")
    const [eventLink, setEventLink] = useState(event?.link || "")

    const notification = useNotification()
    const eventNameRef = useRef(null)
    const history = useHistory()

    useEffect(() => {
        setEventName(event?.name)
        setEventLink(event?.link || "")
        setStartDate(new Date(event?.startAt ? new Date(event?.startAt) : new Date()))
        setEndDate(new Date(event?.endAt ? new Date(event?.endAt) : new Date(Date.now() + 24*60*60*1000)))
    }, [event])

    useEffect(() => {
        if (!event) {
            eventNameRef.current.focus()
        }
    }, [banner])

    const checkEventLink = (url) => {
        let isValid = url.startsWith("http://") ? 1 : 0;
        if (isValid == 0) isValid = url.startsWith("https://") ? 2 : 0;
        if (isValid == 0)
            notification({ content: <>Le lien de l'évènement doit être formatté avec un "https://liendelevenement"</>, status: "invalid" })
        return true
    }

    const saveEvent = async (e) => {
        e.preventDefault()
        if (!eventName) {
            notification({ content: <>Veuillez remplir le nom de l'event</>, status: "invalid" })
            return false;
        }
        const start = (moment(startDate))
        const end = (moment(endDate))
        const image = new FormData()
        image.append('file', banner)
        if (!event && banner) {
            await request.post(`import/file`, image).then(async (res) => {
                const req = {
                    imagePath: res.data.path,
                    name: eventName,
                    link: res.data.url,
                    startAt: start.utc(false),
                    endAt: end.utc(false),
                }
                await request.post(`events`, req).then((res) => {
                    notification({ content: <><span style={{ color: "#FF7954" }}>{eventName}</span> créé avec succès</>, status: "valid" })
                    setDone(false)
                    if (window.location.hash === "#onboarding")
                        history.goBack()
                }).catch(() => notification({ content: <>Erreur lors de l'ajout de <span style={{ color: "#FF7954" }}>{eventName}</span></>, status: "invalid" }))
            }).catch((err) => notification({ content: <>Erreur lors de l'import de l'image</>, status: "invalid" }))
            return false;

        }
        if (event) {
            const start = (moment(startDate).local(false))
            const end = (moment(endDate).local(false))
            const image = new FormData()

            if (banner) {
                image.append('file', banner)
                await request.post(`import/file`, image).then(async (res) => {
                    const req = {
                        name: eventName,
                        startAt: start.utc(false),
                        endAt: end.utc(false),
                        link: eventLink,
                        imagePath: res.data.path
                    }
                    await request.patch(`events/${event.id}`, req, {
                        headers: { 'Content-Type': 'application/merge-patch+json' }
                    }).then((res) => {
                        setDone(false)
                        notification({ content: <><span style={{ color: "#FF7954" }}>{eventName}</span> modifié avec succès</>, status: "valid" })
                    }).catch(() => notification({ content: <>Erreur lors de l'édition de <span style={{ color: "#FF7954" }}>{eventName}</span></>, status: "invalid" }))
                }).catch(() => notification({ content: <>Erreur lors de l'ajout de l'image</>, status: "invalid" }))
                return false;
            }
            else {

                const req = {
                    name: eventName,
                    link: eventLink,
                    startAt: start.utc(false),
                    endAt: end.utc(false),
                }
                await request.patch(`events/${event.id}`, req, {
                    headers: { 'Content-Type': 'application/merge-patch+json' }
                }).then(() => {
                    setDone(false)
                    notification({ content: <><span style={{ color: "#FF7954" }}>{eventName}</span> modifié avec succès</>, status: "valid" })
                }).catch(() => notification({ content: <>Erreur lors de l'édition de <span style={{ color: "#FF7954" }}>{eventName}</span></>, status: "invalid" }))
            }
        }
    }

    return (<div className={classes.container}>
        {event ? <>
            <h2>Modifier event <span>{eventName}</span></h2>
        </> : <>
            <h2>Créer un event</h2>
        </>}
        <div className={classes.datePick}>
            <div>
                <label>Date et heure de début</label>
                <Datetime locale="fr-FR" value={startDate} onChange={setStartDate} closeOnSelect={true} dateFormat="D MMM YYYY" timeFormat="HH mm" />
            </div>
            <div>
                <label>Date et heure de fin</label>
                <Datetime locale="fr-FR" value={endDate} onChange={setEndDate} closeOnSelect={true} dateFormat="D MMM YYYY" timeFormat="HH mm" />
            </div>
        </div>
        <div className={classes.row}>
            <Input required value={eventName} onChange={(e) => setEventName(e.target.value)} style={{ width: "48%" }} placeholder="Nom de l'évènement" type="text" ref={eventNameRef} />
            <Input required value={eventLink} onBlur={(e) => checkEventLink(e.target.value)} onChange={(e) => setEventLink(e.target.value)} style={{ width: "48%" }} placeholder="Lien" type="text" />
        </div>
        <div className={classes.currentEventPreview}>
            {banner ? <img src={URL.createObjectURL(banner)} /> : event ? <img src={event.imageUrl} title={event.banner?.name} /> : ""}
        </div>
        <div className={classes.uploadContainer}>

            <UploadFile
                accept="image/*"
                file={banner}
                placeholder={event ? "Importer une autre bannière" : "Importer une bannière"}
                setFile={setBanner}
            />
        </div>
        <form>
            <Btns style={{ left: '.5rem', bottom: '-3rem' }} confirmTxt="Sauvegarder" onCancel={(e) => { e.preventDefault(); setDone(false) }} onConfirm={(e) => saveEvent(e)} />
        </form>
    </div>)
}