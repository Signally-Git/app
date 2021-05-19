import classes from './events.module.css'
import ChevronRight from '../../../assets/icons/chevron-right.svg'
import ArrowRight from '../../../assets/icons/arrow-right.svg'
import { useState } from 'react'

function Events() {
    const [isOpen, setIsOpen] = useState(false)
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
            <span>3 évènements passés</span>
            <ul>
                <li>
                    <div className={classes.eventText}>
                        <span className={classes.inactive}>Nom évènement 2</span>
                        <span className={classes.duration}>22/03/21 <img src={ArrowRight} className={classes.arrow} alt="arrow" /> 22/04/21</span>
                    </div>
                    <img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
                <li>
                    <div className={classes.eventText}>
                        <span className={classes.inactive}>Nom évènement 3</span>
                        <span className={classes.duration}>22/03/21 <img src={ArrowRight} className={classes.arrow} alt="arrow" /> 22/04/21</span>
                    </div>
                    <img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
                <li>
                    <div className={classes.eventText}>
                        <span className={classes.inactive}>Nom évènement 4</span>
                        <span className={classes.duration}>22/03/21 <img src={ArrowRight} className={classes.arrow} alt="arrow" /> 22/04/21</span>
                    </div>
                    <img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
                <li>
                    <div className={classes.eventText}>
                        <span className={classes.inactive}>Nom évènement 5</span>
                        <span className={classes.duration}>22/03/21 <img src={ArrowRight} className={classes.arrow} alt="arrow" /> 22/04/21</span>
                    </div>
                    <img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
                <li>
                    <div className={classes.eventText}>
                        <span className={classes.inactive}>Nom évènement 2</span>
                        <span className={classes.duration}>22/03/21 <img src={ArrowRight} className={classes.arrow} alt="arrow" /> 22/04/21</span>
                    </div>
                    <img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
                <li>
                    <div className={classes.eventText}>
                        <span className={classes.inactive}>Nom évènement 3</span>
                        <span className={classes.duration}>22/03/21 <img src={ArrowRight} className={classes.arrow} alt="arrow" /> 22/04/21</span>
                    </div>
                    <img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
                <li>
                    <div className={classes.eventText}>
                        <span className={classes.inactive}>Nom évènement 4</span>
                        <span className={classes.duration}>22/03/21 <img src={ArrowRight} className={classes.arrow} alt="arrow" /> 22/04/21</span>
                    </div>
                    <img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
                <li>
                    <div className={classes.eventText}>
                        <span className={classes.inactive}>Nom évènement 5</span>
                        <span className={classes.duration}>22/03/21 <img src={ArrowRight} className={classes.arrow} alt="arrow" /> 22/04/21</span>
                    </div>
                    <img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
            </ul>
            {/* <CalendarEvents /> */}
        </div>)
}

export default Events