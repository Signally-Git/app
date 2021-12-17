import { useEffect, useState } from "react";
import { ReactComponent as CreateEventImage } from 'Assets/img/create-team.svg';
// import CreateEventImage from "Assets/img/create-team.svg";
import Search from "Assets/icons/search.svg";
import classes from "./createTeam.module.css";
import { Link } from "react-router-dom";
import Menu from "../../Menu/Menu";
import axios from "axios";
import { API } from "config";

function CreateTeam() {
    const [isNameFilled, setIsNameFilled] = useState("")
    const [step, setStep] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [resultCount, setResultCount] = useState(0)
    const [state, setState] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])

    useEffect(async () => {
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/users?access_token=${localStorage.getItem("token")}`).then((res) => {
            setAllUsers(res.data.data)
            console.log("users:", allUsers)
        })
    }, [])

    const handleSubmit = (e) => {
        console.log(e)
        e.preventDefault()
        if (isNameFilled.length > 0) {
            setStep(step + 1)
        }
    }

    const createTeam = async (e) => {
        e.preventDefault()
        const team = { "name": isNameFilled, "is_global": false }
        await axios.post(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/teams?access_token=${localStorage.getItem("token")}`, team).then((team) => {
            setStep(step + 1)
            selectedUsers.map(async (user, index) => {
                await axios.get(`${API}user/${user}?access_token=${localStorage.getItem("token")}`).then(async (res) => {
                    console.log(`${API}user/${user}?access_token=${localStorage.getItem("token")}`, { team_id: team.data.id })
                    await axios.patch(`${API}user/${user}?access_token=${localStorage.getItem("token")}`, { team_id: team.data.id }).then((res) => {
                        console.log(res)
                    })
                })
            })
        })
        // await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/teams?access_token=${localStorage.getItem("token")}`).then((res) => {
        //    console.log(res)
        // })

    }

    // useEffect(() => {
    //     setState([])
    //     allUsers.map((item, index) => {
    //         if (item.first_name.toLowerCase().search(searchQuery?.toLowerCase()) >= 0) {
    //             setState((prevState) => prevState.push([item.id, item.first_name, item.last_name]))
    //             console.log("state:", state)
    //         }
    //     })
    // }, [searchQuery])

    useEffect(() => {
        setResultCount(state.length)
    }, [state])

    if (step === 1) {
        return (
            <div className={classes.smallContainer}>
                <div className={classes.subcontainer}>
                    <h1>Créer une équipe</h1>
                    <div className={classes.imgBgContainer}>
                        <CreateEventImage className={classes.congrats} alt="Congratulations" />
                        <div className={classes.imgBg}></div>
                    </div>
                    <p>
                        Les équipes vous permettent d’administrer & de mettre à jour les signatures de vos utilisateurs par groupe.
                    </p>
                </div>
                <button className={`${classes.button} ${classes.enabledBtn}`} onClick={() => setStep(2)}>
                    Suivant
                </button>
                <Menu page="teams" />
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
                <Menu page="teams" />
            </div>
        );
    }
    else if (step === 3)
        return (
            <div className={classes.container}>
                <h1>{isNameFilled}</h1>
                <div className={classes.searchContainer}>
                    <img src={Search} alt="search" />
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={classes.searchInput} placeholder="Rechercher un utilisateur" />
                </div>
                <span className={classes.userCount}>
                    {resultCount > 1 ? <> {resultCount} utilisateurs disponibles </> :
                        <> {resultCount} utilisateur disponible </>}
                </span>
                <form className={classes.userSelection}>
                    <ul className={classes.userList}>
                        {allUsers.map((user, key) => {
                            console.log(user)
                            console.log(selectedUsers)
                            return (
                                <li key={key}>
                                    <label htmlFor={key}>
                                        {`${user.first_name} ${user.last_name}`}
                                    </label>
                                    <input className={classes.checkbox} type="checkbox" id={key} onClick={(e) => e.target.checked ? setSelectedUsers(selected => [...selectedUsers, user.id]) : setSelectedUsers(selectedUsers.filter((id) => user.id !== id))} />
                                    <span className={classes.checkmark}></span>
                                </li>)
                        })}
                    </ul>
                    <div className={classes.createBtnContainer}>
                        <button className={`${classes.button} ${classes.enabledBtn} ${classes.createTeamBtn}`} onClick={(e) => createTeam(e)}>Créer l'équipe</button>
                    </div>
                </form>
                <Menu page="teams" />
            </div>
        );
    else {
        console.log(step)
        return (
            <div className={classes.container}>
                <br />
                <br />
                <div className={classes.imgBgContainer}>
                    <CreateEventImage className={classes.congrats} alt="Congratulations" />
                    <div className={classes.imgBg}></div>
                </div>
                <h1>Félicitations !</h1>
                <p>L’équipe
                    <span className={classes.teamName}>"{isNameFilled}"</span>
                    vient d’être créée. Vous pouvez maintenant lui assigner une signature.</p>
                <div className={classes.btnsContainer}>
                    <button className={`${classes.button}`} onClick={() => setStep(2)}>Créer une autre équipe</button>
                    <Link to="/teams">
                        <button className={`${classes.button} ${classes.enabledBtn}`}>
                            Terminer
                        </button>
                    </Link>
                </div>
                <Menu page="teams" />
            </div>)
    }
}

export default CreateTeam;
