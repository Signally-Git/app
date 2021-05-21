import classes from './teams.module.css'
import ChevronRight from '../../../assets/icons/chevron-right.svg'
import { Link } from 'react-router-dom'

function Teams(props) {
    props.handleHeader("Équipes")
    props.create("create-team")
    return (
        <div className={classes.container}>
            <span>5 équipes</span>
            <ul>
                <li className={classes.active}>
                    <Link to={"/team/Tous%20les%20utilisateurs"}>
                        Tous les utilisateurs (21)<img src={ChevronRight} className={classes.chevron} alt="Click" />
                    </Link>
                </li>
                <li className={classes.inactive}>
                    <Link to={"/team/Marketing"}>
                        Marketing (4)<img src={ChevronRight} className={classes.chevron} alt="Click" />
                    </Link>
                </li>
                <li className={classes.active}>
                    <Link to={"/team/Vente"}>
                        Vente (9)<img src={ChevronRight} className={classes.chevron} alt="Click" />
                    </Link>
                </li>
                <li className={classes.active}>
                    <Link to={"/team/Design"}>
                        Design (5)<img src={ChevronRight} className={classes.chevron} alt="Click" />
                    </Link>
                </li>
                <li className={classes.active}>
                    <Link to={"/team/Tech"}>
                        Tech (8)<img src={ChevronRight} className={classes.chevron} alt="Click" />
                    </Link>
                </li>
            </ul>
        </div>)
}

export default Teams