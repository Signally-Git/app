import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css";
import classes from './createEvent.module.css';
import 'moment/locale/fr';
import Input from 'Utils/Input/input';
import Button from 'Utils/Button/btn';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import UploadFile from 'Utils/Upload/uploadFile';
import { FiEdit } from 'react-icons/fi';
import { useNotification } from 'Utils/Notifications/notifications';
import request from 'Utils/Request/request';
import { API } from 'config';

export default function CreateEvent({ setDone, event }) {
    const [startDate, setStartDate] = useState(event?.startAt ? new Date(event?.startAt) : new Date())
    const [endDate, setEndDate] = useState(event?.endAt ? new Date(event?.endAt) : new Date())
    const [banner, setBanner] = useState()
    const [eventName, setEventName] = useState(event?.name || "")
    const [eventNameDefault, setEventNameDefault] = useState()

    const notification = useNotification()
    const eventNameRef = useRef(null)

    useEffect(() => {
        console.log(event)
        setStartDate(event?.startAt)
        setEndDate(event?.endAt)
    }, [])

    useEffect(() => {
        if (!event) {
            eventNameRef.current.focus()
        }
    }, [banner])

    const saveEvent = async (e) => {
        e.preventDefault()
        if (!eventName) {
            notification({ content: <>Veuillez remplir le nom de l'event.</>, status: "invalid"})
            return false;
        }
        const start = (moment(startDate).subtract({hour: 1})).format('D-MM-YYYYHH:mm:ss') 
        const end = (moment(endDate).subtract({hour: 1})).format('D-MM-YYYYHH:mm:ss')
        const image = new FormData()
        image.append('image', banner)
        if (!event && banner) {
            await request.post(`import/image`, image).then(async (res) => {
                const req = {
                    imagePath: res.data.path,
                    name: eventName,
                    startAt: start,
                    endAt: end,
                }
                await request.post(`events`, req).then((res) => {
                    notification({ content: <><span style={{color: "#FF7954"}}>{eventName}</span> créé avec succès</>, status: "valid"})
                    setDone(false)
                }).catch(() => notification({ content: <>Erreur lors de l'ajout de l'event.</>, status: "invalid" }))
            }).catch((err) => notification({ content: <>Erreur lors de l'import de l'image.</>, status: "invalid" }))
            return false;
        }
        if (event) {
            const start = (moment(startDate).subtract({hour: 1})).format('D-MM-YYYYHH:mm:ss') 
            const end = (moment(endDate).subtract({hour: 1})).format('D-MM-YYYYHH:mm:ss')
            const image = new FormData()

            if (banner) {
                image.append('image', banner)
                await request.post(`import/image`, image ).then(async (res) => {
                    const req = {
                        name: eventName,
                        startAt: start,
                        endAt: end,
                        imagePath: res.data.path
                    }
                    await request.patch(`events/${event.id}`, req, {
                        headers: { 'Content-Type': 'application/merge-patch+json' }
                    }).then((res) => {
                        setDone(false)
                        notification({ content: <><span style={{color: "#FF7954"}}>{eventName}</span> modifié avec succès</>, status: "valid"})
                    }).catch(() => notification({ content: <>Erreur lors de l'édition de l'event.</>, status: "invalid" }))
                }).catch(() => notification({ content: <>Erreur lors de l'ajout de l'image.</>, status: "invalid" }))
                return false;
            }
            else {
                const req = {
                    name: eventName ,
                    startAt: start,
                    endAt: end,
                }
                await request.patch(`events/${event.id}`, req, {
                    headers: { 'Content-Type': 'application/merge-patch+json' }
                }).then((res) => {
                    setDone(false)
                    notification({ content: <><span style={{color: "#FF7954"}}>{eventName}</span> modifié avec succès</>, status: "valid"})
                }).catch(() => notification({ content: <>Erreur lors de l'édition de l'event.</>, status: "invalid" }))
            }
        }
    }

    return (<div className={classes.container}>
        {event ? <>
            <h2>Modifier event <span>{eventName}</span><FiEdit onClick={() => setDone(false)} /></h2>
        </> : <>
            <h2>Créer un event</h2>
        </>}
        <div className={classes.datePick}>
            <div>
                <label>Date et heure de début</label>
                <Datetime locale="fr-fr" value={startDate} onChange={setStartDate} closeOnSelect={true} dateFormat="D MMM YYYY" />
            </div>
            <div>
                <label>Date et heure de fin</label>
                <Datetime locale="fr-fr" value={endDate} onChange={setEndDate} closeOnSelect={true} dateFormat="D MMM YYYY" />
            </div>
        </div>
        <Input required defaultValue={eventName} onChange={(e) => setEventName(e.target.value)} style={{ width: "100%" }} placeholder="Nom de l'évènement" type="text" ref={eventNameRef}  />
        <div className={classes.currentEventPreview}>
            {banner ? <img src={URL.createObjectURL(banner)} /> : event ? <img src={API + event.imagePath} title={event.banner?.name} /> : ""}
        </div>
        <UploadFile
            accept="image/*"
            file={banner}
            placeholder={event ? "Importer une autre bannière" : "Importer une bannière"}
            setFile={setBanner}
        />
        <form>
            <div className={classes.eventName}>
                <Button type="submit" color="orange" onClick={(e) => saveEvent(e)}>Sauvegarder</Button>
            </div>
        </form>
    </div>)
}