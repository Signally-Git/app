import classes from './landing.module.css'
import LightBulb from '../../assets/icons/lightbulb.svg'
import ChevronRight from '../../assets/icons/chevron-right.svg'
import Integration from '../../assets/img/integrations.png'
import Personnalisation from '../../assets/img/personnalisation.svg'
import Installation from '../../assets/img/installation.svg'
import Administration from '../../assets/img/administration.svg'
import FirstScreen from '../../assets/img/first-screen.png'
import SecondScreen from '../../assets/img/second-screen.png'
import Logo from '../Logo/logo'
import { Link } from 'react-router-dom'

function Landing() {
    return (
        <div className={classes.container}>
            <div className={classes.orangeContainer}>
                <div className={classes.textDiv}>
                    <p className={classes.label}>
                        <img src={LightBulb} alt="lightbulb" /> Gratuit pour une signature
                    </p>
                    <h1>Gérez simplement<br /> les signatures d’e-mail <br />de votre société</h1>
                    <p>TPE, PME, Indépendants, Auto-entrepreneurs, Freelance, avec Signally votre signature d’email devient dynamique et renforce votre communication.</p>
                    <button className={classes.orangeCTA}>Commencer<img src={ChevronRight} alt="Begin" /></button>
                </div>
                <div>
                    <div className={classes.signaturePreview}>
                        <img src="https://dummyimage.com/25.png" alt="John Doe" />
                        <div>
                            <h4>John Doe</h4>
                            <p>CEO</p>
                            <h5>Signally</h5>
                            <p>44 Boulevard Hausmann 75009 Paris</p>
                            <p>T <span className={classes.orangeTxt}>0624927190</span> / M <span className={classes.orangeTxt}>0175298234</span></p>
                        </div>
                    </div>
                    <div className={classes.signaturePreview}>
                        <img src="https://dummyimage.com/25.png" alt="John Doe" />
                        <div>
                            <h4>John Doe</h4>
                            <p>CEO</p>
                            <h5>Signally</h5>
                            <p>44 Boulevard Hausmann 75009 Paris</p>
                            <p>T <span className={classes.orangeTxt}>0624927190</span> / M <span className={classes.orangeTxt}>0175298234</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.centeredDiv}>
                <h2>Gérez facilement vos utilisateurs grâce aux intégrations Signally</h2>
                <p>Que ce soit sur mobile ou ordinateur, Signally intègre les solutions emailing : <br />Gmail, Microsoft 365 avec Outlook et Apple Mail</p>
                <img src={Integration} alt="Integrations" />
            </div>
            <div className={classes.whiteContainer}>
                <h2>Comment ça marche ?</h2>
                <p>En trois mots : Personnalisez, installez et administrez !</p>
                <ul>
                    <li>
                        <img src={Personnalisation} alt="personnalisation" loading="lazy" />
                        <h3>Personnalisation</h3>
                        <p>Créez votre signature en quelques clics seulement grâce à nos templates et personnalisez-la à l’aide de nos outils de création.</p>
                    </li>
                    <li>
                        <img src={Installation} alt="installation" loading="lazy" />
                        <h3>Installation</h3>
                        <p>Les signatures d’email Signally s’installent automatiquement avec nos plug-in compatibles Office365, Gmail, et Apple Mail.</p>
                    </li>
                    <li>
                        <img src={Administration} alt="administration" loading="lazy" />
                        <h3>Administration</h3>
                        <p>Signally vous permet de gérer extrêmement simplement l’ensemble de vos signatures d’email de votre entreprise.</p>
                    </li>
                </ul>
            </div>
            <div className={classes.textOnRight}>
                <div className={classes.imgContainer}>
                    <img src={FirstScreen} alt="Screenshot 1" />
                </div>
                <div className={classes.txtContainer}>
                    <h3>Créez des équipes, attribuez vos signatures et planifiez le déploiement de vos bannières marketing</h3>
                    <p>Signally s’adapte à votre organisation. Créez des équipes et
                    déployez toutes vos signatures automatiquement à l’ensemble
                    de vos collaborateurs. Bénéficiez ainsi d’une communication
                    ultra-flexible et dynamique.</p>
                    <button className={classes.orangeCTA}>Commencer<img src={ChevronRight} alt="Begin" /></button>
                </div>
            </div>
            <div className={classes.textOnLeft}>
                <div className={classes.txtContainer}>
                    <h3>Donnez une image moderne et singulière de votre entreprise à chaque envoi de mails.</h3>
                    <p>Notre outil de création permet une ultra-personnalisation de vos emails. Performant et simple, il vous permettra de réaliser une signature à votre image.</p>
                    <button className={classes.orangeCTA}>Commencer<img src={ChevronRight} alt="Begin" /></button>
                </div>
                <div className={classes.imgContainer}>
                    <img src={SecondScreen} alt="Screenshot 2" />
                </div>
            </div>
            <div className={classes.prefooter}>
                <div>
                    <Logo />
                    <p>Enfin un outil simple* pour créer, installer et gérer les signature d'email de son entreprise.</p>
                </div>
                <ul className={classes.socials}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <footer>
                <p>*Avec Signally, aucune connaissance technique n’est requise</p>
                <ul>
                    <li><Link to="legals">Mentions Légales</Link></li>
                    <li><Link to="dashboard">Contact</Link></li>
                </ul>
            </footer>
        </div>
    )
}

export default Landing