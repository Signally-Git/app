import { useState } from 'react'
import classes from './informations.module.css'

function Informations() {
    const [tab, setTab] = useState(true)

    return (
        <div className={classes.container}>
            <label className={classes.switch}>
                <div className={classes.tabTitles}>
                    <span>Société</span>
                    <span>Personnelles</span>
                </div>
                <input type="checkbox" onChange={() => setTab(!tab)} />
                <div className={classes.slider}></div>
            </label>
            {tab ? <>
                <div className={classes.inputsContainer}>
                    <div className={classes.inputContainer}>
                        <label>Nom société</label>
                        <input type="text" />
                    </div>
                    <div className={classes.inputContainer}>
                        <label>Adresse</label>
                        <input type="text" />
                    </div>
                    <div className={classes.inputContainer}>
                        <label>Site web</label>
                        <input type="text" />
                    </div>
                </div>
                <button className={classes.btn}>Sauvegarder</button>
            </> : <>
                <div className={classes.inputsContainer}>
                    <div>
                        <div className={classes.inputContainer}>
                            <label>Prénom</label>
                            <input type="text" />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>Nom</label>
                            <input type="text" />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>Poste / Fonction</label>
                            <input type="text" />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>Email</label>
                            <input type="mail" />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>Téléphone mobile</label>
                            <input type="tel" />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>Téléphone fixe</label>
                            <input type="tel" />
                        </div>
                    </div>
                </div>
                <button className={classes.btn}>Sauvegarder</button>
                </>
            }
        </div>
    )
}

export default Informations