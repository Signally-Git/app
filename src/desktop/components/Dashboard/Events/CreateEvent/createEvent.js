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

export default function CreateEvent({ setDone, event }) {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [banner, setBanner] = useState()
    const [eventName, setEventName] = useState("")
    const [eventNameDefault, setEventNameDefault] = useState()

    const notification = useNotification()
    const eventNameRef = useRef(null)

    useEffect(() => {
        setStartDate(event?.start_date)
        setEndDate(event?.end_date)
    }, [])

    useEffect(() => {
        setEventNameDefault(event?.name)
    })

    useEffect(() => {
        if (!event) {
            eventNameRef.current.focus()
        }
    }, [banner])

    const saveEvent = async (e) => {
        e.preventDefault()
        const start = (moment(startDate).subtract({hour: 1})).format('D-MM-YYYYHH:mm:ss') 
        const end = (moment(endDate).subtract({hour: 1})).format('D-MM-YYYYHH:mm:ss')
        const img = new FormData()
        img.append('file', banner)
        if (!event && banner) {
            await request.post(`import/images`, img).then(async (res) => {
                const req = {
                    imagePath: res.data.url,
                    name: eventName,
                    startAt: start,
                    endAt: end,
                }
                await request.post(`events`, req).then((res) => {
                    notification({ content: <><span style={{color: "#FF7954"}}>{eventName}</span> créé avec succès</>, status: "valid"})
                    setDone(false)
                })
            })
            return false;
        }
        if (event) {
            const start = (moment(startDate).subtract({hour: 1})).format('D-MM-YYYYHH:mm:ss') 
            const end = (moment(endDate).subtract({hour: 1})).format('D-MM-YYYYHH:mm:ss')
            const img = new FormData()

            if (banner) {
                img.append('file', banner)
                await request.post(`import/images`, img).then(async (res) => {
                    const req = {
                        name: eventName,
                        startAt: start,
                        endAt: end,
                        imagePath: res.data.url
                    }
                    await request.patch(`events/${event.id}`, req, {
                        headers: { 'Content-Type': 'application/merge-patch+json' }
                    }).then((res) => {
                        setDone(false)
                        notification({ content: <><span style={{color: "#FF7954"}}>{eventName}</span> créé avec succès</>, status: "valid"})
                    })
                })
                return false;
            }
            else {
                const req = {
                    name: eventName,
                    startAt: start,
                    endAt: end,
                }
                await request.patch(`events/${event.id}`, req, {
                    headers: { 'Content-Type': 'application/merge-patch+json' }
                }).then((res) => {
                    setDone(false)
                    notification({ content: <><span style={{color: "#FF7954"}}>{eventName}</span> créé avec succès</>, status: "valid"})
                })
            }
        }
    }

    return (<div className={classes.container}>
        {event ? <>
            <h2>Modifier event <span>{eventNameDefault}</span><FiEdit onClick={() => setDone(false)} /></h2>
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
        <Input required defaultValue={eventNameDefault} onChange={(e) => setEventName(e.target.value)} style={{ width: "100%" }} placeholder="Nom de l'évènement" type="text" ref={eventNameRef}  />
        <div className={classes.currentEventPreview}>
            {banner ? <img src={URL.createObjectURL(banner)} /> : event ? <img src={event.banner?.path} title={event.banner?.name} /> : ""}
        </div>
        <UploadFile
            accept="image/*"
            file={banner}
            placeholder="Importer une autre bannière"
            setFile={setBanner}
        />
        <form>
            <div className={classes.eventName}>
                <Button type="submit" color="orange" onClick={eventName.length > 0 ? (e) => saveEvent(e) : () => { return; }}>Sauvegarder</Button>
            </div>
        </form>
    </div>)
}