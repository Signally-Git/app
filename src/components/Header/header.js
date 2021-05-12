import Logo from '../Logo/logo'
import classes from './header.module.css'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className={classes.header}>
            <Link to="/" title="Accueil"> 
               <Logo />
            </Link>
            <ul>
                <li><Link to="dashboard">Connexion</Link></li>
                <li><Link to="sign-up">Inscription</Link></li>
            </ul>
        </header>
    )
}

export default Header