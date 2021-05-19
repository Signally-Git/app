import classes from './calendar.module.css'
import Cross from '../../../../assets/icons/cross.svg'
import { useState } from 'react'

function CalendarEvents() {
    const [isClosed, setIsClosed] = useState(false);

    if (!isClosed)
    return (
    <div className={classes.container}>
        <img className={classes.cross} src={Cross} alt="Close" onClick={() => setIsClosed(true)} />
    </div>)
    return (<div></div>)
}

export default CalendarEvents