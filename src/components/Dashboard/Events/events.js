import classes from './events.module.css'
import ChevronRight from '../../../assets/icons/chevron-right.svg'
import ArrowRight from '../../../assets/icons/arrow-right.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Events(props) {
    props.handleHeader("Évènements")
    props.create("/create-event")
    return (
        <div className={classes.container}>
            <span>1 évènement en cours</span>
            <ul>
                <li>
                    <div className={classes.eventText}>
                        <span className={classes.active}>Nom évènement 1</span>
                        <span className={classes.duration}>22/03/21 <img src={ArrowRight} className={classes.arrow} alt="arrow" /> 22/04/21</span>
                    </div>
                    <img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
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