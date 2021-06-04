import classes from './pastEvents.module.css'
import ChevronRight from '../../../../assets/icons/chevron-right.svg'
import ArrowRight from '../../../../assets/icons/arrow-right.svg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../../../../config'

let count = 0

function PastEvents(props) {
    const [pastEvents, setPastEvents] = useState([])

    useEffect(() => {
        props.handleHeader("Évènements passés")
        axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/campaigns?access_token=${localStorage.getItem("token")}`).then((res) => {
            setPastEvents(res.data.data)
        })
        count = 0;
    }, [])

    const formattedDate = (d = new Date) => {
        if (d.typeOf === "date"){
        return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
            .map(n => n < 10 ? `0${n}` : `${n}`).join('/');}
    }

    return (
        <div className={classes.container}>
            <span>{count > 1 ? count+" évènements passés" : count+" évènement passé"}</span>
            <ul>
            {pastEvents.map((pastEvent, index) => {
                console.log(pastEvent)
                    if (pastEvent.active === false) {
                        count++
                        return (
                            <li key={index}>
                                <div className={classes.eventText}>
                                    <span className={classes.inactive}>{pastEvent.name}</span>
                                    <span className={classes.duration}>{Date(pastEvent.start_date)} <img src={ArrowRight} className={classes.arrow} alt="arrow" /> {pastEvent.end_date}</span>
                                </div>
                                <img src={ChevronRight} className={classes.chevron} alt="Click" />
                            </li>
                        )
                    }
                })
                }
            </ul>
            {/* <CalendarEvents /> */}
        </div>)
}

export default PastEvents