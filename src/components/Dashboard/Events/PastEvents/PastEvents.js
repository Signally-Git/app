import classes from './pastEvents.module.css'
import ChevronRight from '../../../../assets/icons/chevron-right.svg'
import ArrowRight from '../../../../assets/icons/arrow-right.svg'
import { useState } from 'react'

function PastEvents(props) {
    props.handleHeader("Évènements passés")
    return (
        <div className={classes.container}>
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

export default PastEvents