import classes from './adduser.module.css'
import {ReactComponent as Import} from 'Assets/img/import.svg'
import Menu from '../Menu/Menu'
import { Link } from 'react-router-dom'

function AddUser() {
    return (
        <div className={classes.container}>
            <h2>Ajoutez des utilisateurs</h2>
            <div className={classes.imgContainer}>
                <Import alt="Utilisateurs" />
                <div className={classes.whiteBackground}></div>
            </div>
            <div className={classes.btnsContainer}>
                <Link to="/import/manual">
                    <button className={`${classes.btn} ${classes.blackBtn}`}>Manuellement</button>
                </Link>
                <Link to="/import/csv">
                    <button className={`${classes.btn} ${classes.orangeBtn}`}>À partir d’un fichier .CSV</button>
                </Link>
                <Link to="/dashboard">
                    <button className={classes.skipCTA}>Passer cette étape</button>
                </Link>
            </div>
            <Menu page={"team"} />
        </div>
    )
}

export default AddUser