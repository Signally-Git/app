import { useEffect, useState } from "react";
import CreateEventImage from "../../../../assets/img/create-team.svg";
import Search from "../../../../assets/icons/search.svg";
import classes from "./createTeam.module.css";
import { Link } from "react-router-dom";

const usersAPI = ["Antoine David", "Yanne Alessandri", "David Carez", "Marie Luciani"]

function CreateTeam() {
    const [isNameFilled, setIsNameFilled] = useState("")
    const [step, setStep] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [resultCount, setResultCount] = useState(0)
    const [state, setState] = useState([])

    const handleSubmit = (e) => {
        console.log(e)
        e.preventDefault()
        if (isNameFilled.length > 0) {
            setStep(step + 1)
        }
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

    if (step === 1) {
        return (
            <div className={classes.smallContainer}>
                <div className={classes.subcontainer}>
                    <h1>Créer une équipe</h1>
                    <div className={classes.imgBgContainer}>
                        <img className={classes.congrats} src={CreateEventImage} alt="Congratulations" />
                        <div className={classes.imgBg}></div>
                    </div>
                    <p>
                        Les équipes vous permettent d’administrer & de mettre à jour les signatures de vos utilisateurs par groupe.
          </p>
                </div>
                <button className={`${classes.button} ${classes.enabledBtn}`} onClick={() => setStep(2)}>
                    Suivant
        </button>
            </div>
        );
    }
    else if (step === 2) {
        return (
            <div className={classes.smallContainer}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={classes.subcontainerShort}>
                        <h1>Nom de l'équipe</h1>

                        <input
                            onChange={(e) => setIsNameFilled(e.target.value)}
                            className={classes.input}
                            type="text"
                            placeholder="Nom de l'équipe"
                        />
                    </div>
                    <button className={`${classes.button} ${isNameFilled.length > 0 ? classes.enabledBtn : ""}`}>
                        Suivant
        </button>
                </form>
            </div>
        );
    }
    else if (step === 3)
        return (
            <div className={classes.container}>
                <h1>{isNameFilled}</h1>
                <img src={Search} alt="search" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={classes.searchInput} placeholder="Rechercher un utilisateur" />
                <span className={classes.userCount}>
                    {resultCount > 1 ? <> {resultCount} utilisateurs disponibles </> :
                        <> {resultCount} utilisateur disponible </>}
                </span>
                <form className={classes.userSelection}>
                    <ul className={classes.userList}>
                        {state?.map((item, key) => {
                            return (
                                <li key={key}>
                                    <label htmlFor={key}>
                                        {item}
                                    </label>
                                    <input className={classes.checkbox} type="checkbox" id={key} />
                                    <span className={classes.checkmark}></span>
                                </li>)
                        })}
                    </ul>
                    <button className={`${classes.button} ${classes.enabledBtn} ${classes.createTeamBtn}`} onClick={() => setStep(step + 1)}>Créer l'équipe</button>
                </form>
            </div>
        );
    else {
        console.log(step)
        return (
            <div className={classes.container}>
                <div className={classes.imgBgContainer}>
                    <img className={classes.congrats} src={CreateEventImage} alt="Congratulations" />
                    <div className={classes.imgBg}></div>
                </div>
                <h1>Félicitations !</h1>
                <p>L’équipe
                <span className={classes.teamName}>"{isNameFilled}"</span>
                vient d’être créée. Vous pouvez maintenant lui assigner une signature.</p>
                <div className={classes.btnsContainer}>
                    <button className={`${classes.button}`} onClick={() => setStep(2)}>Créer une autre équipe</button>
                    <Link to="/payment">
                        <button className={`${classes.button} ${classes.enabledBtn}`}>
                            Terminer
                    </button>
                    </Link>
                </div>
            </div>)
    }
}

export default CreateTeam;
