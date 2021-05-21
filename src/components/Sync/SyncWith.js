import { Link } from 'react-router-dom'
import Infos from '../../assets/icons/infos.svg'
import Outlook from '../../assets/icons/outlook.svg'
import Gmail from '../../assets/icons/gmail.svg'
import Apple from '../../assets/icons/appstore.svg'
import classes from './syncwith.module.css'

function SyncWith(props) {
    if (props.service === "outlook")
        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    <img src={Outlook} alt="Outlook" />
                    <h1>Ajouter à Outlook</h1>
                </div>
                <div className={classes.soon}>
                    <img src={Infos} alt="infos" />
                    <span>La synchronisation automatique pour Outlook arrive bientôt !</span>
                </div>
                <span className={classes.subtitle}>Démarche à suivre</span>
                <div className={classes.stepsContainer}>
                    <div className={classes.step}>
                        <div className={classes.stepNumber}>
                            <span>1</span>
                        </div>
                        <p>Connectez-vous à Outlook, puis cliquez sur la roue dentée figurant dans l'angle supérieur droit.</p>
                    </div>
                    <div className={classes.step}>
                        <div className={classes.stepNumber}>
                            <span>2</span>
                        </div>
                        <p>Sélectionnez Paramètres dans le menu déroulant.</p>
                    </div>
                    <div className={classes.step}>
                        <div className={classes.stepNumber}>
                            <span>3</span>
                        </div>
                        <p>Faites défiler la page jusqu'à l'éditeur de signature d'e-mail, et collez la vôtre dans le champ correspondant.</p>
                    </div>
                    <div className={classes.step}>
                        <div className={classes.stepNumber}>
                            <span>4</span>
                        </div>
                        <p>Faites défiler la page jusqu'en bas, puis cliquez sur Enregistrer les modifications.</p>
                    </div>
                </div>
                <Link to="/synchronize">
                    <button className={classes.CTA}>Terminer</button>
                </Link>
            </div>
        )
    else if (props.service === "gmail")
        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    <img src={Gmail} alt="Gmail" />
                    <h1>Ajouter à Gmail</h1>
                </div>
                <div className={classes.soon}>
                    <img src={Infos} alt="infos" />
                    <span>La synchronisation automatique pour Gmail arrive bientôt !</span>
                </div>
                <span className={classes.subtitle}>Démarche à suivre</span>
                <div className={classes.stepsContainer}>
                    <div className={classes.step}>
                        <div className={classes.stepNumber}>
                            <span>1</span>
                        </div>
                        <p>Connectez-vous à Gmail, puis cliquez sur la roue dentée figurant dans l'angle supérieur droit.</p>
                    </div>
                    <div className={classes.step}>
                        <div className={classes.stepNumber}>
                            <span>2</span>
                        </div>
                        <p>Sélectionnez Paramètres dans le menu déroulant.</p>
                    </div>
                    <div className={classes.step}>
                        <div className={classes.stepNumber}>
                            <span>3</span>
                        </div>
                        <p>Faites défiler la page jusqu'à l'éditeur de signature d'e-mail, et collez la vôtre dans le champ correspondant.</p>
                    </div>
                    <div className={classes.step}>
                        <div className={classes.stepNumber}>
                            <span>4</span>
                        </div>
                        <p>Faites défiler la page jusqu'en bas, puis cliquez sur Enregistrer les modifications.</p>
                    </div>
                </div>
                <Link to="/synchronize">
                    <button className={classes.CTA}>Terminer</button>
                </Link>
            </div>)
    else if (props.service === "apple")
        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    <img src={Apple} alt="Apple" />
                    <h1>Ajouter à Apple mail</h1>
                </div>
                <span className={classes.subtitle}>Démarche à suivre</span>
                <div className={classes.stepsContainer}>
                    <div className={classes.step}>
                        <div className={classes.stepNumber}>
                            <span>1</span>
                        </div>
                        <p>Connectez-vous à Apple mail, puis cliquez sur la roue dentée figurant dans l'angle supérieur droit.</p>
                    </div>
                    <div className={classes.step}>
                        <div className={classes.stepNumber}>
                            <span>2</span>
                        </div>
                        <p>Sélectionnez Paramètres dans le menu déroulant.</p>
                    </div>
                    <div className={classes.step}>
                        <div className={classes.stepNumber}>
                            <span>3</span>
                        </div>
                        <p>Faites défiler la page jusqu'à l'éditeur de signature d'e-mail, et collez la vôtre dans le champ correspondant.</p>
                    </div>
                    <div className={classes.step}>
                        <div className={classes.stepNumber}>
                            <span>4</span>
                        </div>
                        <p>Faites défiler la page jusqu'en bas, puis cliquez sur Enregistrer les modifications.</p>
                    </div>
                </div>
                <Link to="/synchronize">
                    <button className={classes.CTA}>Terminer</button>
                </Link>
            </div>)
}

export default SyncWith