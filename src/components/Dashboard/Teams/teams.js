import classes from './teams.module.css'
import ChevronRight from '../../../assets/icons/chevron-right.svg'

function Teams() {
    return (
        <div className={classes.container}>
            <span>5 équipes</span>
            <ul>
                <li className={classes.active}>
                    Tous les utilisateurs (21)<img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
                <li className={classes.inactive}>
                    Marketing (4)<img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
                <li className={classes.active}>
                    Vente (9)<img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
                <li className={classes.active}>
                    Design (5)<img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
                <li className={classes.active}>
                    Tech (8)<img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
            </ul>
        </div>)
}

export default Teams