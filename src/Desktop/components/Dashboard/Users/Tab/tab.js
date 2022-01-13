import { HiOutlineSearch } from 'react-icons/hi'
import { useEffect, useRef, useState } from 'react'
import classes from './tab.module.css'
import Create from '../Create/create'
import { FiCheck, FiTrash } from 'react-icons/fi'
import { AiOutlineEdit } from 'react-icons/ai'
import Button from 'Utils/Button/btn'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Input from 'Utils/Input/input'
import request from 'Utils/Request/request'
import { useNotification } from 'Utils/Notifications/notifications'
import UploadFile from 'Utils/Upload/uploadFile'
import CreateTeam from '../Create/Team/createTeam'
import CreateUser from '../Create/User/createUser'
import CreateWorkplace from '../Create/Workplace/createWorkplace'
import { BsCreditCard2Front } from 'react-icons/bs'
import { GrUserSettings } from 'react-icons/gr'
import { BiCopyAlt } from 'react-icons/bi'

// Displays the current list
// Workplaces by default
// Teams or Users
// Assigns templates and structure

export default function Tab({ tab, selected, setSelected, edit, setEdit, editInfo, setEditInfo }) {
    const [addedWorkplace, setAddedWorkplace] = useState("")
    const [searchWorkplace, setSearchWorkplace] = useState("")
    const [searchTeam, setSearchTeam] = useState("")
    const [searchUser, setSearchUser] = useState("")
    const toFocus = useRef(null)
    const [workplaces, setWorkplaces] = useState([])
    const [teams, setTeams] = useState([])
    const [users, setUsers] = useState([])
    const [modal, setModal] = useState({ type: "", name: "", id: "" })
    const [modalContent, setModalContent] = useState()
    const [workplaceName, setWorkplaceName] = useState('')
    const [teamName, setTeamName] = useState('')
    // const [userName, setUserName] = useState('')
    const [street, setStreet] = useState("")
    const [streetInfo, setStreetInfo] = useState("")
    const [mobile, setMobile] = useState("")
    const [fax, setFax] = useState("")
    const [mobileUser, setMobileUser] = useState("")
    const [poste, setPoste] = useState("")

    const notification = useNotification()
    // Variables for creation modals

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

    const refreshData = (type) => {
        if (type === "workplace" || !type)
            getDataWorkspace()
        if (type === "teams" || !type)
            getDataTeam()
        if (type === "users" || !type)
            getDataUser()
    }

    useEffect(() => {
        refreshData()
    }, [addedWorkplace])

    // Deletes either specified workplace, team or user
    const handleDelete = (id, type, name) => {
        request.delete(`${type}/${id}`).then(
            () => {
                refreshData(type)
                notification({ content: <><span style={{ color: "#FF7954" }}>{name}</span> supprimé avec succès</>, status: "valid" })
            }

        ).catch((error) => notification({ content: <>Une erreur s'est produite. Impossible de supprimer <span style={{ color: "#FF7954" }}>{name}</span></>, status: "invalid" }))
        setModal({ type: "", name: "", id: "" })
    }

    // Deletes eithe every workplace, every team or every user
    const handleDeleteAll = async (type) => {
        let count = 0;

        switch (type) {
            case "workplace":
                for (let index = 0; index < workplaces.length; index++) {
                    const element = workplaces[index];
                    await request.delete(`workplaces/${element.id}`).then(
                        (res) => {
                            index === workplaces.length - 1 && refreshData(type)
                            count++;
                        }).catch(() => notification({ content: <>Impossible de supprimer <span style={{ color: "#FF7954" }}>{element.name}</span></>, status: "invalid" }))
                }
                break;
            case "teams":
                for (let index = 0; index < teams.length; index++) {
                    const element = teams[index];
                    await request.delete(`teams/${element.id}`).then(
                        (res) => {
                            index === teams.length - 1 && refreshData(type)
                            count++;
                        }).catch(() => notification({ content: <>Impossible de supprimer <span style={{ color: "#FF7954" }}>{element.name}</span></>, status: "invalid" }))
                }
                break;
            case "users":
                for (let index = 0; index < users.length; index++) {
                    const element = users[index];
                    if (element?.id !== JSON.parse(localStorage.getItem("user"))?.id)
                        await request.delete(`users/${element.id}`).then(
                            () => {
                                index === users.length - 1 && refreshData(type)
                                count++;
                            }).catch(() => notification({ content: <>Impossible de supprimer <span style={{ color: "#FF7954" }}>{element.firstName} {element.lastName}</span></>, status: "invalid" }))
                }
                break;
            default:
                break;
        }
        if (count > 0)
            notification({ content: <><span style={{ color: "#FF7954" }}>{count} {type}</span> supprimés avec succès</>, status: "valid" })
        setModal({ type: "", name: "", id: "" })
    }

    // Modals confirmation
    useEffect(() => {
        const handleModal = (toDelete) => {
            switch (toDelete.type) {
                case "allworkplaces":
                    return (<div className={classes.modal}>
                        <h4>Vous allez supprimer
                            <br /><span className={classes.orangeTxt}>{`${workplaces.length} hotels`}</span></h4>
                        <div>
                            <Button color="orangeFill" onClick={() => setModal({ type: "", name: "", id: "" })}>Annuler</Button>
                            <Button color="orange" onClick={() => handleDeleteAll("workplace")}>Supprimer</Button>
                        </div>
                    </div>)
                case "allteams":
                    return (<div className={classes.modal}>
                        <span>Les équipes <>Blabla</>, <>Blablou</></span>
                        <h4>Vous allez supprimer
                            <br /><span className={classes.orangeTxt}>{`${teams.length} équipes`}</span></h4>
                        <br />
                        <div>
                            <Button color="orangeFill" onClick={() => setModal({ type: "", name: "", id: "" })}>Annuler</Button>
                            <Button color="orange" onClick={() => handleDeleteAll("teams")}>Supprimer</Button>
                        </div>
                    </div>)
                case "allusers":
                    return (<div className={classes.modal}>
                        <h4>Vous allez supprimer
                            <br /><span className={classes.orangeTxt}>{`${users.length} collaborateurs`}</span></h4>
                        <div>
                            <Button color="orangeFill" onClick={() => setModal({ type: "", name: "", id: "" })}>Annuler</Button>
                            <Button color="orange" onClick={() => handleDeleteAll("users")}>Supprimer</Button>
                        </div>
                    </div>)
                default:
                    return (<div className={classes.modal}>
                        <h4>Vous allez supprimer
                            <br /><span className={classes.orangeTxt}>{toDelete?.name}</span></h4>
                        <div>
                            <Button color="orangeFill" onClick={() => setModal({ type: "", name: "", id: "" })}>Annuler</Button>
                            <Button color="orange" onClick={() => handleDelete(toDelete?.id, toDelete?.type, toDelete?.name)}>Supprimer</Button>
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
        toFocus?.current?.focus();
    }, [edit])

    const handleChangeWP = async (e, workplace) => {
        // if ()
        e.preventDefault()
        const req = {
            name: workplaceName || workplace.name,
            address: {
                street: street || workplace.address.street,
                streetInfo: streetInfo || workplace.address.streetInfo
            },
            digitalAddress: {
                mobile: mobile,
                fax: fax
            }
        }
        console.log("editing!", workplace)
        await request.patch(workplace['@id'], req, {
            headers: { 'Content-Type': 'application/merge-patch+json' }
        })
        setEditInfo()
    }

    const handleChangeTeam = async (e, id) => {
        e.preventDefault()
        if (teamName.length > 0)
            await request.patch(id, { name: teamName }, {
                headers: { 'Content-Type': 'application/merge-patch+json' }
            })
        setEdit()
    }

    const handleChange = async (e, id) => {
        e.preventDefault()
        const req = {
            mobilePhone: mobileUser,
            position: poste
        }
        await request.patch(id, req, {
            headers: { 'Content-Type': 'application/merge-patch+json' }
        })
        setEdit()
    }

    if (tab === "workplaces")
        return (<div>{modal.type ? modalContent : ""}
            <Link to="create-workplace"><Button style={{ width: "15rem" }} color="orange" arrow={true}>Ajouter un hotel</Button></Link>
            <div className={classes.searchInput}>
                <HiOutlineSearch />
                <input onChange={(e) => setSearchWorkplace(e.target.value.toLowerCase())} className={classes.search} type="text" placeholder="Rechercher un hotel" />
            </div>
            <div className={classes.colheader}>
                <span className={addedWorkplace.length > 0 ? classes.orangeTxt : ""}>{addedWorkplace.length > 0 ? addedWorkplace : `${workplaces.length} hotels`}</span>
                <button onClick={() => setModal({ type: "allworkplaces" })}>Supprimer tout</button>
            </div>

            <ul className={classes.itemsList}>
                <form onChange={(e) => e.target.type === "radio" && setSelected(JSON.parse(e.target.value))}>
                    {
                        workplaces.map((workplace) => {
                            if (workplace?.name?.toLowerCase().search(searchWorkplace) !== -1)
                                return (
                                    <li onMouseEnter={() => setSelected(workplace)} key={workplace.id} className={`${editInfo === workplace ? classes.editing : ""} ${selected?.id === workplace.id && selected?.name === workplace?.name ? classes.selected : ""}`} >
                                        <input onChange={(e) => e.target.checked ? setEdit(workplace) : ""} onMouseEnter={() => selected?.id === workplace.id && selected?.name === workplace?.name ? true : false} className={classes.checkbox} defaultChecked={selected?.id === workplace.id && selected?.name === workplace?.name ? true : false} type="radio" name="workplace" value={JSON.stringify(workplace)} />
                                        {editInfo === workplace ? <input className={classes.rename} ref={toFocus} type="text" defaultValue={workplace?.name} onChange={(e) => setWorkplaceName(e.target.value)} /> :
                                            <input className={classes.rename} disabled type="text" defaultValue={workplaceName || workplace?.name} />}
                                        <span></span>
                                        <div className={classes.actionsContainer}>
                                            {/* <BsCreditCard2Front /> */}
                                            {/* <GrUserSettings onClick={(e) => { setEdit('assign-workplace') }} /> */}
                                            {editInfo === workplace ? <FiCheck onClick={(e) => { handleChangeWP(e, workplace) }} /> : <AiOutlineEdit onClick={(e) => { e.preventDefault(); setEditInfo(workplace) }} />}
                                            <FiTrash onClick={() => setModal({ name: workplace?.name, id: workplace.id, type: "workplaces" })} />
                                        </div>
                                        {editInfo === workplace ? <>
                                            <div className={classes.editDiv}>
                                                <UploadFile placeholder="Importer une image" />
                                                <div className={classes.inputsContainer}>
                                                    <Input onLoad={() => setStreet(workplace.address.street)} onChange={(e) => setStreet(e.target.value)} type="text" placeholder="Adresse" defaultValue={workplace.address.street} />
                                                    <Input onChange={(e) => setStreetInfo(e.target.value)} type="text" placeholder="Adresse 2" defaultValue={workplace.address.streetInfo} />
                                                </div>
                                                <div className={classes.inputsContainer}>
                                                    <Input onChange={(e) => setMobile(e.target.value)} type="tel" placeholder="Téléphone" defaultValue={workplace.digitalAddress.mobile} />
                                                    <Input onChange={(e) => setFax(e.target.value)} type="tel" placeholder="Fax" defaultValue={workplace.digitalAddress.fax} />
                                                </div>
                                            </div>
                                        </> : <></>}
                                    </li>)
                        })}
                </form>
            </ul>
        </div >)
    if (tab === "create-workplace")
        return (<CreateWorkplace />)

    if (tab === "teams")
        return (<div>{modal.type ? modalContent : ""}
            <Link to="create-team">
                <Button style={{ width: "15rem" }} color="orange" arrow={true}>Ajouter une équipe</Button>
            </Link>
            <div className={classes.searchInput}>
                <HiOutlineSearch />
                <input className={classes.search} onChange={(e) => setSearchTeam(e.target.value.toLowerCase())} type="text" placeholder="Rechercher une équipe" />
            </div>
            <div className={classes.colheader}>
                <span>{teams.length} équipes</span>
                <button onClick={() => setModal({ type: "allteams" })}>Supprimer tout</button>
            </div>
            <ul className={classes.itemsList}>
                <form onChange={(e) => setSelected(JSON.parse(e.target.value))}>
                    {teams.map((team) => {
                        if (team.name?.toLowerCase().search(searchTeam) !== -1 || team.workplace?.name?.toLowerCase().search(searchTeam) !== -1)
                            return (
                                <li onMouseEnter={() => setSelected(team)} key={team.id} className={selected?.id === team.id && selected?.name === team.name ? classes.selected : ""} >
                                    <input className={classes.checkbox} defaultChecked={selected === team.name ? true : false} type="radio" name="workplace" value={JSON.stringify(team)} />
                                    <span></span>
                                    <div>
                                        <span>{team.name}</span>
                                    </div>
                                    {team.workplace?.name?.length > 0 ? <div className={classes.infos}>
                                        <span className={classes.groupName}>{team.workplace?.name}</span>
                                    </div> : "" }
                                    <div className={classes.actionsContainer}>
                                        <AiOutlineEdit onClick={(e) => { setEdit('assign-team') }} />
                                        <FiTrash onClick={() => setModal({ name: team.name, id: team.id, type: "teams" })} />
                                    </div>
                                </li>)
                    })}
                </form>
            </ul>
        </div>)
    if (tab === "create-team")
        return (<CreateTeam />)

    if (tab === "create-user")
        return (<CreateUser />)
    if (tab === "users")
        return (<div>{modal.type ? modalContent : ""}
            <Link to="create-user">
                <Button style={{ width: "15rem" }} color="orange" arrow={true}>Ajouter un collaborateur</Button>
            </Link>
            <div className={classes.searchInput}>
                <HiOutlineSearch />
                <input className={classes.search} onChange={(e) => setSearchUser(e.target.value)} type="text" placeholder="Rechercher un collaborateur" />
            </div>
            <div className={classes.colheader}>
                <span>{users.length < 2 ? `${users.length} collaborateur` : `${users.length} collaborateurs`}</span>
                <button onClick={() => setModal({ type: "allusers" })}>Supprimer tout</button>
            </div>
            <ul className={classes.itemsList}>
                <form onChange={(e) => setSelected(JSON.parse(e.target.value))}>
                    {users.map((user) => {
                        const fullName = user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()
                        if (fullName.search(searchUser.toLowerCase()) !== -1)
                            return (
                                <li onMouseEnter={() => setSelected(user)} key={user.id} className={`${edit === user && user?.id !== JSON.parse(localStorage.getItem("user"))?.id ? classes.editing : ""} ${selected?.id === user.id && selected?.name === user.name ? classes.selected : ""}`} >
                                    <input className={classes.checkbox} onChange={(e) => { e.preventDefault(); setEdit(user) }}  defaultChecked={selected?.id === user.id && selected?.name === user.name ? true : false} type="radio" name="user" value={JSON.stringify(user)} />
                                    {edit === user && user?.id !== JSON.parse(localStorage.getItem("user"))?.id ? <input className={classes.rename} ref={toFocus} type="text" defaultValue={`${user.firstName} ${user.lastName}`} /> :
                                        <input className={classes.rename} disabled type="text" defaultValue={`${user.firstName} ${user.lastName}`} />}
                                    <span></span>
                                    {user?.id === JSON.parse(localStorage.getItem("user"))?.id ?
                                        <div className={classes.actionsContainerAdmin}>
                                            <Link to="/profile/informations"><FaUser /></Link>
                                        </div> :
                                        <div className={classes.actionsContainer}>
                                            {edit === user ? <FiCheck onClick={(e) => { handleChange(e, user['@id']) }} /> : <BsCreditCard2Front onClick={(e) => { e.preventDefault(); setEdit(user) }} />}
                                            <FiTrash onClick={() => setModal({ name: `${user.firstName} ${user.lastName}`, id: user.id, type: "users" })} />
                                        </div>}
                                    {edit === user && user?.id !== JSON.parse(localStorage.getItem("user"))?.id ? <>
                                        <div className={classes.editDiv}>
                                            <Input type="text" placeholder="Adresse mail" defaultValue={user.email} />
                                            <div className={classes.inputsContainer}>
                                                <Input type="text" placeholder="Poste" defaultValue={user.position} onChange={(e) => setPoste(e.target.value)} />
                                                <Input type="tel" placeholder="Mobile" defaultValue={user.phone} onChange={(e) => setMobileUser(e.target.value)} />
                                            </div>
                                        </div>
                                    </> : <></>}
                                </li>)
                    })}
                </form>
            </ul>
        </div>)
}