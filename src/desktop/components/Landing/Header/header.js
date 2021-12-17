import Logo from 'Utils/Logo/logo'
import classes from './header.module.css'
import { Link } from 'react-router-dom'

// Unlogged header for landing page

function Header() {
    return (
        <header className={classes.header}>
            <Link to="/" title="Accueil"> 
               <Logo />
            </Link>
            <ul>
                <li><Link to="/dashboard">Connexion</Link></li>
                <li><Link to="/profile/informations">Inscription</Link></li>
            </ul>
        </header>
    )
}

export default Header