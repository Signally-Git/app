import classes from './events.module.css'
import { useSwipeable } from "react-swipeable"
import Cross from '../../../assets/icons/cross.svg'
import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../../../config"

export default function SingleEvent(props) {
    useEffect(() => {
        props.create("/create-signature")
        props.handleHeader("Signatures")
    }, [props.data])

    const [editing, setEditing] = useState(false)
    const handlers = useSwipeable({
        onSwipedLeft: () => setEditing(true), onSwipedRight: () => setEditing(false),
    });
    const deleteEvent = (id) => {
        axios.delete(`${API}campaign/${id}?access_token=${localStorage.getItem("token")}`).then((res) => {
            setEditing(false)
            props.deleted(true)
        })
    }
    return (<li key={index} {...handlers}>
        <div className={classes.eventText}>
            <span className={classes.active}>{props.activeEvent.name}</span>
           <span className={classes.duration}>
             {new Date(activeEvent.start_date).toLocaleString([], {day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute:'2-digit'})}
                <img src={ArrowRight} className={classes.arrow} alt="arrow" /> 
             {new Date(activeEvent.end_date).toLocaleString([], {day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute:'2-digit'})}</span>

        </div>
        {/* <img src={ChevronRight} className={classes.chevron} alt="Click" /> */}
        <div className={classes.onSwipe}>
            <img className={classes.chevron} src={Cross} alt="delete" onClick={() => deleteEvent(props.template.id)} />
        </div>
    </li>)
}