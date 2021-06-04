import classes from './events.module.css'
import ChevronRight from '../../../assets/icons/chevron-right.svg'
import ArrowRight from '../../../assets/icons/arrow-right.svg'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API } from '../../../config'
import { format } from 'date-fns'

let count = 0

function Events(props) {
    const [activeEvents, setActiveEvents] = useState([])

    useEffect(async () => {
        props.handleHeader("Évènements")
        props.create("/create-event")
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/campaigns?access_token=${localStorage.getItem("token")}`).then((res) => {
            setActiveEvents(res.data.data)
        })
        count = 0;
    }, [])

    console.log(activeEvents)
    return (
        <div className={classes.container}>
            <span>{count > 1 ? count+" évènements" : count+" évènement"}  en cours</span>
            <ul>
                {activeEvents.map((activeEvent, index) => {
                    if (activeEvent.active) {
                        count++
                        return (
                            <li key={index}>
                                <div className={classes.eventText}>
                                    <span className={classes.active}>{activeEvent.name}</span>
                                    <span className={classes.duration}>{new Date(activeEvent.start_date).toString() !== "Invalid Date" && format(new Date(activeEvent.start_date), 'dd/mm/yy')} 
                                    <img src={ArrowRight} className={classes.arrow} alt="arrow" /> 
                                    {new Date(activeEvent.end_date).toString() !== "Invalid Date" && format(new Date(activeEvent.end_date), 'dd/mm/yy')}</span>
                                </div>
                                <img src={ChevronRight} className={classes.chevron} alt="Click" />
                            </li>
                        )
                    }
                })
                }
            </ul>
            <ul>
                <li>
                    <Link to="past-events">
                        <div className={classes.eventText}>
                            <span className={classes.inactive}>Évènements passés</span>
                        </div>
                        <img src={ChevronRight} className={classes.chevron} alt="Click" />
                    </Link>
                </li>
            </ul>
            {/* <CalendarEvents /> */}
        </div>)
}

export default Events