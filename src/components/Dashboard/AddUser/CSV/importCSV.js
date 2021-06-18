import classes from './import.module.css'
import Import from '../../../../assets/img/import.svg'
import Infos from '../../../../assets/icons/infos.svg'
import Users from '../../../../assets/icons/users.svg'
import Success from '../../../../assets/img/success.svg'
import Search from "../../../../assets/icons/search.svg"
import Rocket from '../../../../assets/img/rocket.png'
import ChevronRight from '../../../../assets/icons/chevron-right.svg'
import Checkbox from '../../../../assets/icons/checkbox.svg'
import Menu from '../../Menu/Menu'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {API} from '../../../../config'

const usersAPI = ["Antoine David", "Yanne Alessandri", "David Carez", "Marie Luciani"]

function ImportCSV() {
    const [file, setFile] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [resultCount, setResultCount] = useState(0)
    const [state, setState] = useState([])
    const [step, setStep] = useState(0)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("req:", file)
        await axios.post(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/users/import?access_token=${localStorage.getItem("token")}`, file)
            .then(async (res) => {
              console.log(res)
              setStep(2)
            }
            ).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        setState([])
        usersAPI.map((item) => {
            if (item.toLowerCase().search(searchQuery?.toLowerCase()) >= 0) {
                setState((prevState) => prevState.concat(item))
            }
        })
    }, [searchQuery])

    useEffect(() => {
        setResultCount(state.length)
    }, [state])

    if (step === 0)
        return (
            <div className={classes.container}>
                <h2>Import .CSV</h2>
                <div className={classes.imgContainer}>
                    <img src={Import} alt="Utilisateurs" />
                    <div className={classes.whiteBackground}></div>
                </div>
                <p className={classes.center}>Importez vos utilisateurs via un fichier .csv. Vous pouvez les organiser par équipe si vous le souhaitez.</p>
                <button className={`${classes.btn} ${classes.orangeBtn}`} onClick={() => setStep(1)}>Suivant</button>
                <Menu />
            </div>
        )
    else if (step === 1) {
        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    <h2>Organiser le fichier</h2>
                </div>
                <div className={classes.soon}>
                    <img src={Infos} alt="infos" />
                    <span>Pour que vos utilisateurs soient correctement importés veuillez suivre la démarche ci-dessous.</span>
                </div>
                <span className={classes.subtitle}>Démarche à suivre</span>
                <div className={classes.stepsContainer}>
                    <div className={classes.step}>
                        <div className={classes.stepNumber}>
                            <span>1</span>
                        </div>
                        <p>Entrez une seule donnée par colonne.</p>
                    </div>
                    <div className={classes.step}>
                        <div className={classes.stepNumber}>
                            <span>2</span>
                        </div>
                        <p>L’ordre des colonnes n’est pas importante.</p>
                    </div>
                    <div className={classes.step}>
                        <div className={classes.stepNumber}>
                            <span>3</span>
                        </div>
                        <p>Vous pouvez ajouter les données suivantes : Prénom, nom, poste/fonction, email, téléphone.</p>
                    </div>
                </div>
                <input type="file" value={file} onChange={(e) => setFile(e.target.files)} />
                <button className={`${classes.btn} ${classes.orangeBtn}`} onClick={(e) => handleSubmit(e)}>Importer le fichier</button>
                <Menu />
            </div>
        )
    }
    else if (step === 2) {
        return (<div className={`${classes.container} ${classes.spaceBe}`}>
            <h2>Import réussi</h2>
            <img src={Success} alt="success" />
            <p className={classes.center}>Les 120 utilisateurs contenus dans votre fichier ont bien été importés.</p>
            <div className={classes.tile}>
                <img src={Users} alt="users" />
                <span>Voir les 120 nouveaux utilisateurs</span>
                <img src={ChevronRight} className={classes.chevron} alt="view" />
            </div>
            <button className={`${classes.btn} ${classes.orangeBtn}`} onClick={() => setStep(3)}>Suivant</button>
            <Menu />
        </div>)
    }
    else if (step === 3) {
        return (<div className={classes.container}>
            <div className={classes.searchContainer}>
                <img src={Search} alt="search" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={classes.searchInput} placeholder="Rechercher un utilisateur" />
            </div>
            <span className={classes.userCount}>
                {resultCount > 1 ? <> {resultCount} utilisateurs disponibles </> :
                    <> {resultCount} utilisateur disponible </>}
            </span>
            <form className={classes.userSelection} onSubmit={(e) => e.preventDefault()}>
                <ul className={classes.userList}>
                    {state?.map((item, key) => {
                        return (
                            <li key={key}>
                                <label htmlFor={key}>
                                    {item}
                                </label>
                            </li>)
                    })}
                </ul>
                <div className={classes.btnDiv}>
                    <button className={`${classes.btn} ${classes.blackBtn}`} onClick={() => setStep(1)}>Réimporter le CSV</button>
                    <button className={`${classes.btn} ${classes.orangeBtn}`} onClick={() => setStep(4)}>Valider</button>
                </div>
            </form>
            <Menu page="teams" />
        </div>)
    }
    else {
        return (
            <div className={classes.container}>
                <h2>Signally Pro</h2>
                <div className={classes.greyContainer}>
                    <div className={classes.whiteContainer}>
                        <div className={classes.textContainer}>
                            <h3>Votre abonnement</h3>
                            <h4>120 utilisateurs</h4>
                            <span>0,5 € / mois / utilisateur</span>
                        </div>
                        <img src={Rocket} alt="rocket" />
                        <div className={classes.priceContainer}>
                            <span className={classes.price}>60 €</span>
                            <span className={classes.perMonth}>/ mois</span>
                        </div>
                    </div>
                    <ul className={classes.listAdvantages}>
                        <li><img src={Checkbox} alt="checkbox" className={classes.listStyle} />Adipiscing sed diam nisi.</li>
                        <li><img src={Checkbox} alt="checkbox" className={classes.listStyle} />Adipiscing sed diam nisi.</li>
                        <li><img src={Checkbox} alt="checkbox" className={classes.listStyle} />Adipiscing sed diam nisi.</li>
                        <li><img src={Checkbox} alt="checkbox" className={classes.listStyle} />Adipiscing sed diam nisi.</li>
                    </ul>
                </div>
                <Link to="/payment">
                    <button className={`${classes.btn} ${classes.orangeBtn}`} onClick={() => setStep(4)}>Continuer vers le paiement</button>
                </Link>
                <Menu />
            </div>
        )
    }
}

export default ImportCSV