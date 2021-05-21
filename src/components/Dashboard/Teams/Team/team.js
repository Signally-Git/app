import classes from './team.module.css'
import ChevronRight from '../../../../assets/icons/chevron-right.svg'
import { useParams } from 'react-router-dom'
import Header from '../../Header/Header'

function Team() {
    let { teamName } = useParams()
    return (
        <div>
            <Header title={teamName}/>
            <div className={classes.container}>
            <span>5 utilisateurs</span>
            <ul>
                <li className={classes.active}>
                    Benjamin Morgaine<img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
                <li className={classes.inactive}>
                    Sylvain Morgaine<img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
                <li className={classes.active}>
                    Yann Dupont<img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
                <li className={classes.active}>
                    Elon Musk<img src={ChevronRight} className={classes.chevron} alt="Click" />
                </li>
            </ul>
            </div>
        </div>)
}

export default Team