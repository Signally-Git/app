import { HiOutlineSearch } from 'react-icons/hi'
import { useEffect, useRef, useState } from 'react'
import classes from './tab.module.css'
import Create from '../Create/create'
import { FiCheck, FiTrash } from 'react-icons/fi'
import { AiOutlineEdit } from 'react-icons/ai'
import { RiUserFill } from 'react-icons/ri'
import Button from 'Utils/Button/btn'
import axios from 'axios'
import { API } from 'config'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Input from 'Utils/Input/input'

// Displays the current list
// Groups by default
// Teams or Users
// Assigns templates and structure

export default function Tab(props) {
    const [display, setDisplay] = useState("groups")
    const [addedGroup, setAddedGroup] = useState("")
    const [searchGroup, setSearchGroup] = useState("")
    const [searchTeam, setSearchTeam] = useState("")
    const [searchUser, setSearchUser] = useState("")
    const toFocus = useRef(null)
    const [groups, setGroups] = useState([])
    const [teams, setTeams] = useState([])
    const [users, setUsers] = useState([])
    const [edit, setEdit] = useState()
    const [modal, setModal] = useState({ type: "", name: "", id: "" })
    const [modalContent, setModalContent] = useState()
    // Variables for creation modals
    const groupsCreate = {
        type: "groups",
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
    const getDataGroup = async () => {
        teams.splice(0, teams.length);
        return await axios.get(`${API}organisations/${localStorage.getItem('organisation_id')}/groups?access_token=${localStorage.getItem('token')}`).then(
            (res) => {
                setGroups(res.data.data)
                res.data.data.map(async (group) => {
                    await axios.get(`${API}group/${group.id}/teams?access_token=${localStorage.getItem('token')}`).then((resultat) =>
                        resultat.data.data.map((teamToAdd) => {
                            teams.push({ ...teamToAdd, group: group })
                        })
                    )
                })
            })
    }

    const getDataTeam = async () => {
        return await axios.get(`${API}organisations/${localStorage.getItem('organisation_id')}/teams?access_token=${localStorage.getItem('token')}`)
            .then(
                (res) => {
                    setTeams(res.data.data);
                })
    }
    const getDataUser = async () => {
        return await axios.get(`${API}organisations/${localStorage.getItem('organisation_id')}/users?access_token=${localStorage.getItem('token')}`).then(
            (res) => { setUsers(res.data.data) })
    }

    const refreshData = () => {
        getDataGroup()
        // getDataTeam()
        getDataUser()
    }

    useEffect(() => {
        refreshData()
    }, [addedGroup])

    // Deletes either specified group, team or user
    const handleDelete = (id, type) => {
        axios.delete(`${API}${type}/${id}?access_token=${localStorage.getItem("token")}`).then(
            () => { refreshData() }
        )
        setModal({ type: "", name: "", id: "" })
    }

    // Deletes eithe every group, every team or every user
    const handleDeleteAll = (type) => {
        switch (type) {
            case "group":
                for (let index = 0; index < groups.length; index++) {
                    const element = groups[index];
                    axios.delete(`${API}group/${element.id}?access_token=${localStorage.getItem("token")}`).then(
                        (res) => index === groups.length - 1 && refreshData())
                }
                break;
            case "team":
                for (let index = 0; index < teams.length; index++) {
                    const element = teams[index];
                    axios.delete(`${API}teams/${element.id}?access_token=${localStorage.getItem("token")}`).then(
                        (res) => index === teams.length - 1 && refreshData())
                }
                break;
            case "user":
                for (let index = 0; index < users.length; index++) {
                    const element = users[index];
                    if (element.id !== localStorage.getItem("user_id"))
                        axios.delete(`${API}users/${element.id}?access_token=${localStorage.getItem("token")}`).then(
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
                case "allgroups":
                    return (<div className={classes.modal}>
                        <h4>Vous allez supprimer
                            <br /><span className={classes.orangeTxt}>{`${groups.length} Hotels`}</span></h4>
                        <div>
                            <Button color="orangeFill">Annuler</Button>
                            <Button color="orange" onClick={() => handleDeleteAll("group")}>Supprimer</Button>
                        </div>
                    </div>)
                case "allteams":
                    return (<div className={classes.modal}>
                        <h4>Vous allez supprimer
                            <br /><span className={classes.orangeTxt}>{`${teams.length} teams`}</span></h4>
                        <div>
                            <Button color="orangeFill">Annuler</Button>
                            <Button color="orange" onClick={() => handleDeleteAll("team")}>Supprimer</Button>
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
            setAddedGroup("")
        }, 2000);
    }, [addedGroup])

    useEffect(() => {
        setDisplay(props.tab)
    }, [props])

    useEffect(() => {
        toFocus?.current?.focus();
    }, [edit])

    if (display === "groups")
        return (<div>{modal.type ? modalContent : ""}
            <Button style={{ width: "15rem" }} color="orange" arrow={true} onClick={() => setDisplay("create-group")}>Ajouter un hotel</Button>
            <div className={classes.searchInput}>
                <HiOutlineSearch />
                <input onChange={(e) => setSearchGroup(e.target.value.toLowerCase())} className={classes.search} type="text" placeholder="Rechercher un hotel" />
            </div>
            <div className={classes.colheader}>
                <span className={addedGroup.length > 0 ? classes.orangeTxt : ""}>{addedGroup.length > 0 ? addedGroup : `${groups.length} hotels`}</span>
                <button onClick={() => setModal({ type: "allgroups" })}>Supprimer tout</button>
            </div>
            <ul className={classes.itemsList}>
                <form onChange={(e) => e.target.type === "radio" && props.setSelected(JSON.parse(e.target.value))}>
                    {groups.map((group) => {
                        if (group?.name?.toLowerCase().search(searchGroup) !== -1)
                            return (
                                <li key={group.id} className={`${edit === group ? classes.editing : ""} ${props.selected?.id === group.id && props.selected?.name === group?.name ? classes.selected : ""}`} >
                                    <input className={classes.checkbox} defaultChecked={props.selected?.id === group.id && props.selected?.name === group?.name ? true : false} type="radio" name="group" value={JSON.stringify(group)} />
                                    {edit === group ? <input className={classes.rename} ref={toFocus} type="text" defaultValue={group?.name} /> :
                                        <input className={classes.rename} disabled type="text" defaultValue={group?.name} />}
                                    <span></span>
                                    <div className={classes.actionsContainer}>
                                        {edit === group ? <FiCheck onClick={(e) => { e.preventDefault(); setEdit() }} /> : <AiOutlineEdit onClick={(e) => { e.preventDefault(); setEdit(group) }} />}
                                        <FiTrash onClick={() => setModal({ name: group?.name, id: group.id, type: "group" })} />
                                    </div>
                                    {edit === group ? <>
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
    if (display === "create-group")
        return (<Create fill={groupsCreate} setState={setAddedGroup} setValidate={setDisplay} />)

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
                        if (team.name?.toLowerCase().search(searchTeam) !== -1 || team.group?.name?.toLowerCase().search(searchTeam) !== -1)
                            return (
                                <li key={team.id} className={props.selected?.id === team.id && props.selected?.name === team.name ? classes.selected : ""} >
                                    <input className={classes.checkbox} defaultChecked={props.selected === team.name ? true : false} type="radio" name="group" value={JSON.stringify(team)} />
                                    <span></span>
                                    <div>
                                        <span>{team.name}</span>
                                    </div>
                                    <div className={classes.infos}>
                                        <span className={classes.groupName}>{team.group?.name}</span>
                                    </div>
                                    <div className={classes.actionsContainer}>
                                        <AiOutlineEdit />
                                        <FiTrash onClick={() => setModal({ name: team.name, id: team.id, type: "team" })} />
                                    </div>
                                </li>)
                    })}
                </form>
            </ul>
        </div>)
    if (display === "create-team")
        return (<Create fill={teamsCreate} setState={setAddedGroup} setValidate={setDisplay} />)

    if (display === "create-user")
        return (<Create fill={usersCreate} setState={setAddedGroup} setValidate={setDisplay} />)
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
                                    {edit === user ? <input className={classes.rename} ref={toFocus} type="text" defaultValue={`${user.first_name} ${user.last_name}`} /> :
                                        <input className={classes.rename} disabled type="text" defaultValue={`${user.first_name} ${user.last_name}`} />}
                                    <span></span>
                                    {user.id === localStorage.getItem("user_id") ?
                                        <div className={classes.actionsContainerAdmin}>
                                            <Link to="/profile/informations"><FaUser /></Link>
                                        </div> :
                                        <div className={classes.actionsContainer}>
                                            {edit === user ? <FiCheck onClick={(e) => { e.preventDefault(); setEdit() }} /> : <AiOutlineEdit onClick={(e) => { e.preventDefault(); setEdit(user) }} />}
                                            <FiTrash onClick={() => setModal({ name: `${user.first_name} ${user.last_name}`, id: user.id, type: "user" })} />
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