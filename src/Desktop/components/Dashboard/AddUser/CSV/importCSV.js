import classes from './import.module.css'
import Import from 'Assets/img/import.svg'
import Infos from 'Assets/icons/infos.svg'
import Users from 'Assets/icons/users.svg'
import Success from 'Assets/img/success.svg'
import Search from "Assets/icons/search.svg"
import Rocket from 'Assets/img/rocket.png'
import ChevronRight from 'Assets/icons/chevron-right.svg'
import Checkbox from 'Assets/icons/checkbox.svg'
import Menu from '../../../Menu/Menu'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API } from 'config'
import request from 'Utils/Request/request'

function ImportCSV() {
    const [searchQuery, setSearchQuery] = useState("")
    const [resultCount, setResultCount] = useState(0)
    const [state, setState] = useState([])
    const [step, setStep] = useState(0)
    const [importedUsers, setImportedUsers] = useState([])
    const [userCount, setUserCount] = useState([])

    const handleSubmit = async (e) => {
        const req = new FormData()
        req.append('file', new Blob([e.target.files[0]], { type: 'text/csv' }))

        const importCSV = await request.post(`organisation/users/import`, req)
        setImportedUsers(importCSV.data)
        setStep(2)
    }

    const handleImport = async () => {
        let defaultSignature = {}
        const signatures = await request.get(`signatures`)
        if (signatures.data["hydra:totalItems"] > 0)
            defaultSignature = signatures.data["hydra:member"][0]
        importedUsers.map(async (user) => {
            const req = signatures.data["hydra:totalItems"] > 0 ? {
                email: user.email,
                phone_number: user.phone_number,
                first_name: user.first_name,
                last_name: user.last_name,
                position: user.position,
                signature_template_id: defaultSignature
            } : {
                email: user.email,
                phone_number: user.phone_number,
                first_name: user.first_name,
                last_name: user.last_name,
                position: user.position
            }

            await request.post(`users`, req)
            const users = await request.get(`users`)
            setUserCount(users.data["hydra:totalItems"])
            setStep(4)
        })
        const req = { signature_template_id: defaultSignature }
        // ADD USER ID
        await request.patch(`users/`, req)
    }

    useEffect(() => {
        setState([])
        importedUsers.map((item) => {
            if (item.first_name.toLowerCase().search(searchQuery?.toLowerCase()) >= 0) {
                setState((prevState) => prevState.concat(`${item.first_name} ${item.last_name}`))
            }
            else if (item.last_name.toLowerCase().search(searchQuery?.toLowerCase()) >= 0) {
                setState((prevState) => prevState.concat(`${item.first_name} ${item.last_name}`))
            }
        })
    }, [searchQuery, importedUsers])

    useEffect(() => {
        setResultCount(state.length)
    }, [state, userCount])

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
                <Menu page={"teams"} />
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
                <div className={classes.uploadFile}>
                    <input type="file" onChange={(e) => { handleSubmit(e) }} />
                    <button className={`${classes.orangeBtn}`}>Importer le fichier</button>
                </div>
                <Menu page={"teams"} />
            </div>
        )
    }
    else if (step === 2) {
        return (<div className={`${classes.container} ${classes.spaceBe}`}>
            <h2>Import réussi</h2>
            <img src={Success} alt="success" />
            <p className={classes.center}>Les {importedUsers.length} utilisateurs contenus dans votre fichier ont bien été importés.</p>
            <div className={classes.tile} onClick={() => setStep(3)}>
                <img src={Users} alt="users" />
                <span>Voir les {importedUsers.length} nouveaux utilisateurs</span>
                <img src={ChevronRight} className={classes.chevron} alt="view" />
            </div>
            <button className={`${classes.btn} ${classes.orangeBtn}`} onClick={() => setStep(3)}>Suivant</button>
            <Menu page={"teams"} />
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
                    <button className={`${classes.btn} ${classes.orangeBtn}`} onClick={() => handleImport()}>Valider</button>
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
                            <h4>{userCount.length} utilisateurs</h4>
                            <span>0,5 € / mois / utilisateur</span>
                        </div>
                        <img src={Rocket} alt="rocket" />
                        <div className={classes.priceContainer}>
                            <span className={classes.price}>{0.5 * userCount.length} €</span>
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
                <Menu page={"teams"} />
            </div>
        )
    }
}

export default ImportCSV