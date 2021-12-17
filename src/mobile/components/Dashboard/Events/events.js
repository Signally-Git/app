import classes from './events.module.css'
import ChevronRight from 'Assets/icons/chevron-right.svg'
import ArrowRight from 'Assets/icons/arrow-right.svg'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API } from 'config'
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
                                   <span className={classes.duration}>
                                     {new Date(activeEvent.start_date).toLocaleString([], {day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute:'2-digit'})}
                                        <img src={ArrowRight} className={classes.arrow} alt="arrow" /> 
                                     {new Date(activeEvent.end_date).toLocaleString([], {day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute:'2-digit'})}</span>
              
                                </div>
                                <img src={ChevronRight} className={classes.chevron} alt="Click" />
                            </li>
                        )
                    }
                })
                }
            </ul>
            <ul>
                {activeEvents.length > 0 &&
                <li>
                    <Link to="past-events">
                        <div className={classes.eventText}>
                            <span className={classes.inactive}>Évènements passés</span>
                        </div>
                        <img src={ChevronRight} className={classes.chevron} alt="Click" />
                    </Link>
                </li>}
            </ul>
            {/* <CalendarEvents /> */}
        </div>)
}

export default Events