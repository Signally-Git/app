import { HiOutlineSearch } from 'react-icons/hi'
import { useEffect, useRef, useState } from 'react'
import classes from './tab.module.css'
import Create from '../Create/create'
import { FiCheck, FiTrash } from 'react-icons/fi'
import { AiOutlineEdit } from 'react-icons/ai'
import Button from 'Utils/Button/btn'
import axios from 'axios'
import { API } from 'config'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Input from 'Utils/Input/input'
import request from 'Utils/Request/request'

// Displays the current list
// Workplaces by default
// Teams or Users
// Assigns templates and structure

export default function Tab(props) {
    const [display, setDisplay] = useState("workplaces")
    const [addedWorkplace, setAddedWorkplace] = useState("")
    const [searchWorkplace, setSearchWorkplace] = useState("")
    const [searchTeam, setSearchTeam] = useState("")
    const [searchUser, setSearchUser] = useState("")
    const toFocus = useRef(null)
    const [workplaces, setWorkplaces] = useState([])
    const [teams, setTeams] = useState([])
    const [users, setUsers] = useState([])
    const [edit, setEdit] = useState()
    const [modal, setModal] = useState({ type: "", name: "", id: "" })
    const [modalContent, setModalContent] = useState()
    // Variables for creation modals
    const workplacesCreate = {
        type: "workplaces",
        firstCTA: "Ajouter un hotel",
        subTxt: "Les Hotels vous permettent d’administrer et de mettre à jour les signatures de vos équipes par pays, villes, filiales, départements, etc. selon la structure de votre organisation.",
        import: true,
        placeholder: "Nom du hotel",
        placeholder2: "Adresse",
        placeholder3: "(Adresse suite)",
        placeholder4: "Téléphone",
        placeholder5: "Fax",
        secondCTA: "Valider",
        thirdCTA: "Créer le hotel",
        fourthCTA: "Passer cette étape"
    }
    const teamsCreate = {
        firstCTA: "Ajouter une équipe",
        subTxt: "Les équipes vous permettent d’administrer et de mettre à jour les signatures de vos équipes par pays, villes, filiales, départements, etc. selon la structure de votre organisation.",
        import: false,
        placeholder: "Nom de l'équipe",
        secondCTA: "Valider"
    }
    const usersCreate = {
        type: "users",
        firstCTA: "Ajouter un collaborateur",
        subTxt: "Les collaborateurs vous permettent d’administrer et de mettre à jour les signatures de vos équipes par pays, villes, filiales, départements, etc. selon la structure de votre organisation.",
        import: true,
        placeholder: "Nom de l'collaborateur",
        secondCTA: "Valider"
    }

    // Gathering data
    const getDataWorkspace = async () => {
        const workplaces = await request.get("workplaces")
        setWorkplaces(workplaces.data["hydra:member"])
    }

    const getDataTeam = async () => {
        const teams = await request.get("teams")
        setTeams(teams.data["hydra:member"])
    }

    const getDataUser = async () => {
        const users = await request.get(`users`)
        setUsers(users.data["hydra:member"])
    }

    const refreshData = () => {
        getDataWorkspace()
        getDataTeam()
        getDataUser()
    }

    useEffect(() => {
        refreshData()
    }, [addedWorkplace])

    // Deletes either specified workplace, team or user
    const handleDelete = (id, type) => {
        request.delete(`${type}/${id}`).then(
            () => { refreshData() }
        )
        setModal({ type: "", name: "", id: "" })
    }

    // Deletes eithe every workplace, every team or every user
    const handleDeleteAll = (type) => {
        switch (type) {
            case "workplace":
                for (let index = 0; index < workplaces.length; index++) {
                    const element = workplaces[index];
                    axios.delete(`${API}workplace/${element.id}`).then(
                        (res) => index === workplaces.length - 1 && refreshData())
                }
                break;
            case "teams":
                for (let index = 0; index < teams.length; index++) {
                    const element = teams[index];
                    request.delete(`teams/${element["@id"]}`).then(
                        (res) => index === teams.length - 1 && refreshData())
                }
                break;
            case "user":
                for (let index = 0; index < users.length; index++) {
                    const element = users[index];
                    if (element.id !== localStorage.getItem("user_id"))
                        axios.delete(`${API}users/${element.id}`).then(
                            (res) => index === users.length - 1 && refreshData())
                }
                break;
            default:
                break;
        }
        setModal({ type: "", name: "", id: "" })
    }


    // Modals confirmation
    useEffect(() => {
        const handleModal = (toDelete) => {
            switch (toDelete.type) {
                case "allworkplaces":
                    return (<div className={classes.modal}>
                        <h4>Vous allez supprimer
                            <br /><span className={classes.orangeTxt}>{`${workplaces.length} Hotels`}</span></h4>
                        <div>
                            <Button color="orangeFill">Annuler</Button>
                            <Button color="orange" onClick={() => handleDeleteAll("workplace")}>Supprimer</Button>
                        </div>
                    </div>)
                case "allteams":
                    return (<div className={classes.modal}>
                        <h4>Vous allez supprimer
                            <br /><span className={classes.orangeTxt}>{`${teams.length} teams`}</span></h4>
                        <div>
                            <Button color="orangeFill">Annuler</Button>
                            <Button color="orange" onClick={() => handleDeleteAll("teams")}>Supprimer</Button>
                        </div>
                    </div>)
                case "allusers":
                    return (<div className={classes.modal}>
                        <h4>Vous allez supprimer
                            <br /><span className={classes.orangeTxt}>{`${users.length} collaborateurs`}</span></h4>
                        <div>
                            <Button color="orangeFill">Annuler</Button>
                            <Button color="orange" onClick={() => handleDeleteAll("user")}>Supprimer</Button>
                        </div>
                    </div>)
                default:
                    return (<div className={classes.modal}>
                        <h4>Vous allez supprimer
                            <br /><span className={classes.orangeTxt}>{toDelete?.name}</span></h4>
                        <div>
                            <Button color="orangeFill" onClick={() => setModal({ type: "", name: "", id: "" })}>Annuler</Button>
                            <Button color="orange" onClick={() => handleDelete(toDelete?.id, toDelete?.type)}>Supprimer</Button>
                        </div>
                    </div>)
            }

        }
        setModalContent(handleModal(modal))
    }, [modal])

    useEffect(() => {
        setTimeout(() => {
            setAddedWorkplace("")
        }, 2000);
    }, [addedWorkplace])

    useEffect(() => {
        setDisplay(props.tab)
    }, [props])

    useEffect(() => {
        toFocus?.current?.focus();
    }, [edit])

    if (display === "workplaces")
        return (<div>{modal.type ? modalContent : ""}
            <Button style={{ width: "15rem" }} color="orange" arrow={true} onClick={() => setDisplay("create-workplace")}>Ajouter un hotel</Button>
            <div className={classes.searchInput}>
                <HiOutlineSearch />
                <input onChange={(e) => setSearchWorkplace(e.target.value.toLowerCase())} className={classes.search} type="text" placeholder="Rechercher un hotel" />
            </div>
            <div className={classes.colheader}>
                <span className={addedWorkplace.length > 0 ? classes.orangeTxt : ""}>{addedWorkplace.length > 0 ? addedWorkplace : `${workplaces.length} hotels`}</span>
                <button onClick={() => setModal({ type: "allworkplaces" })}>Supprimer tout</button>
            </div>
            <ul className={classes.itemsList}>
                <form onChange={(e) => e.target.type === "radio" && props.setSelected(JSON.parse(e.target.value))}>
                    {workplaces.map((workplace) => {
                        if (workplace?.name?.toLowerCase().search(searchWorkplace) !== -1)
                            return (
                                <li key={workplace.id} className={`${edit === workplace ? classes.editing : ""} ${props.selected?.id === workplace.id && props.selected?.name === workplace?.name ? classes.selected : ""}`} >
                                    <input className={classes.checkbox} defaultChecked={props.selected?.id === workplace.id && props.selected?.name === workplace?.name ? true : false} type="radio" name="workplace" value={JSON.stringify(workplace)} />
                                    {edit === workplace ? <input className={classes.rename} ref={toFocus} type="text" defaultValue={workplace?.name} /> :
                                        <input className={classes.rename} disabled type="text" defaultValue={workplace?.name} />}
                                    <span></span>
                                    <div className={classes.actionsContainer}>
                                        {edit === workplace ? <FiCheck onClick={(e) => { e.preventDefault(); setEdit() }} /> : <AiOutlineEdit onClick={(e) => { e.preventDefault(); setEdit(workplace) }} />}
                                        <FiTrash onClick={() => setModal({ name: workplace?.name, id: workplace.id, type: "workplace" })} />
                                    </div>
                                    {edit === workplace ? <>
                                        <div className={classes.editDiv}>
                                            <div className={classes.inputsContainer}>
                                                <Input type="text" placeholder="Adresse" />
                                                <Input type="text" placeholder="Adresse 2" />
                                            </div>
                                            <div className={classes.inputsContainer}>
                                                <Input type="tel" placeholder="Téléphone" />
                                                <Input type="tel" placeholder="Fax" />
                                            </div>
                                        </div>
                                    </> : <></>}
                                </li>)
                    })}
                </form>
            </ul>
        </div >)
    if (display === "create-workplace")
        return (<Create fill={workplacesCreate} setState={setAddedWorkplace} setValidate={setDisplay} />)

    if (display === "teams")
        return (<div>{modal.type ? modalContent : ""}
            <Button style={{ width: "15rem" }} color="orange" arrow={true} onClick={() => setDisplay("create-team")}>Ajouter une équipe</Button>
            <div className={classes.searchInput}>
                <HiOutlineSearch />
                <input className={classes.search} onChange={(e) => setSearchTeam(e.target.value.toLowerCase())} type="text" placeholder="Rechercher une équipe" />
            </div>
            <div className={classes.colheader}>
                <span>{teams.length} équipes</span>
                <button onClick={() => setModal({ type: "allteams" })}>Supprimer tout</button>
            </div>
            <ul className={classes.itemsList}>
                <form onChange={(e) => props.setSelected(JSON.parse(e.target.value))}>
                    {teams.map((team) => {
                        if (team.name?.toLowerCase().search(searchTeam) !== -1 || team.workplace?.name?.toLowerCase().search(searchTeam) !== -1)
                            return (
                                <li key={team.id} className={props.selected?.id === team.id && props.selected?.name === team.name ? classes.selected : ""} >
                                    <input className={classes.checkbox} defaultChecked={props.selected === team.name ? true : false} type="radio" name="workplace" value={JSON.stringify(team)} />
                                    <span></span>
                                    <div>
                                        <span>{team.name}</span>
                                    </div>
                                    <div className={classes.infos}>
                                        <span className={classes.groupName}>{team.workplace?.name}</span>
                                    </div>
                                    <div className={classes.actionsContainer}>
                                        <AiOutlineEdit />
                                        <FiTrash onClick={() => setModal({ name: team.name, id: team.id, type: "teams" })} />
                                    </div>
                                </li>)
                    })}
                </form>
            </ul>
        </div>)
    if (display === "create-team")
        return (<Create fill={teamsCreate} setState={setAddedWorkplace} setValidate={setDisplay} />)

    if (display === "create-user")
        return (<Create fill={usersCreate} setState={setAddedWorkplace} setValidate={setDisplay} />)
    if (display === "users")
        return (<div>{modal.type ? modalContent : ""}
            <Button style={{ width: "15rem" }} color="orange" arrow={true} onClick={() => setDisplay("create-user")}>Ajouter un collaborateur</Button>
            <div className={classes.searchInput}>
                <HiOutlineSearch />
                <input className={classes.search} type="text" placeholder="Rechercher un collaborateur" />
            </div>
            <div className={classes.colheader}>
                <span>{users.length < 2 ? `${users.length} collaborateur` : `${users.length} collaborateurs`}</span>
                <button onClick={() => setModal({ type: "allusers" })}>Supprimer tout</button>
            </div>
            <ul className={classes.itemsList}>
                <form onChange={(e) => props.setSelected(JSON.parse(e.target.value))}>
                    {users.map((user) => {
                        if (user.name?.toLowerCase().search(searchUser) !== -1)
                            return (
                                <li key={user.id} className={`${edit === user ? classes.editing : ""} ${props.selected?.id === user.id && props.selected?.name === user.name ? classes.selected : ""}`} >
                                    <input className={classes.checkbox} defaultChecked={props.selected?.id === user.id && props.selected?.name === user.name ? true : false} type="radio" name="user" value={JSON.stringify(user)} />
                                    {edit === user ? <input className={classes.rename} ref={toFocus} type="text" defaultValue={`${user.firstName} ${user.lastName}`} /> :
                                        <input className={classes.rename} disabled type="text" defaultValue={`${user.firstName} ${user.lastName}`} />}
                                    <span></span>
                                    {user.id === localStorage.getItem("user_id") ?
                                        <div className={classes.actionsContainerAdmin}>
                                            <Link to="/profile/informations"><FaUser /></Link>
                                        </div> :
                                        <div className={classes.actionsContainer}>
                                            {edit === user ? <FiCheck onClick={(e) => { e.preventDefault(); setEdit() }} /> : <AiOutlineEdit onClick={(e) => { e.preventDefault(); setEdit(user) }} />}
                                            <FiTrash onClick={() => setModal({ name: `${user.firstName} ${user.lastName}`, id: user.id, type: "user" })} />
                                        </div>}
                                    {edit === user ? <>
                                        <div className={classes.editDiv}>
                                            <Input type="text" placeholder="Adresse mail" />
                                            <div className={classes.inputsContainer}>
                                                <Input type="text" placeholder="Poste" />
                                                <Input type="tel" placeholder="Mobile" />
                                            </div>
                                        </div>
                                    </> : <></>}
                                </li>)
                    })}
                </form>
            </ul>
        </div>)
}