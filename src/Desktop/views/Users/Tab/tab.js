import { HiOutlineSearch } from 'react-icons/hi'
import React, { useEffect, useRef, useState } from 'react'
import classes from './tab.module.css'
import { FiCheck, FiTrash } from 'react-icons/fi'
import { AiOutlineEdit } from 'react-icons/ai'
import Button from 'Utils/Button/btn'
import { Link } from 'react-router-dom'
import Input from 'Utils/Input/input'
import request from 'Utils/Request/request'
import { useNotification } from 'Utils/Notifications/notifications'
import UploadFile from 'Utils/Upload/uploadFile'
import CreateTeam from '../Create/Team/createTeam'
import CreateUser from '../Create/User/createUser'
import CreateWorkplace from '../Create/Workplace/createWorkplace'
import UserTab from './userTab'

// Displays the current list
// Workplaces by default
// Teams or Users
// Assigns templates and structure

export default function Tab({ tab, selected, setSelected, edit, setEdit, editInfo, setEditInfo }) {
    const [addedWorkplace, setAddedWorkplace] = useState("")
    const [searchWorkplace, setSearchWorkplace] = useState("")
    const [searchTeam, setSearchTeam] = useState("")
    const toFocus = useRef(null)
    const [workplaces, setWorkplaces] = useState([])
    const [teams, setTeams] = useState([])
    const [users, setUsers] = useState([])
    const [modal, setModal] = useState({ type: "", name: "", id: "" })
    const [modalContent, setModalContent] = useState()
    const [workplaceName, setWorkplaceName] = useState('')
    const [teamName, setTeamName] = useState('')
    const [street, setStreet] = useState("")
    const [streetInfo, setStreetInfo] = useState("")
    const [mobile, setMobile] = useState("")
    const [fax, setFax] = useState("")
    const [done, setDone] = useState(false)
    let time;

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

    // const getDataUser = async () => {
    //     const users = await request.get(`users`)
    //     setUsers(users.data['hydra:member'])
    // }

    const refreshData = (type) => {
        if (type === "workplace" || !type)
            getDataWorkspace()
        if (type === "teams" || !type)
            getDataTeam()
        // if (type === "users" || !type)
        //     getDataUser()
        setDone(false)
    }

    useEffect(() => {
        refreshData()
    }, [addedWorkplace, done])

    // Deletes either specified workplace, team or user
    const handleDelete = (id, type, name) => {
        request.delete(`${type}/${id}`).then(
            () => {
                refreshData(type)
                notification({ content: <><span style={{ color: "#FF7954" }}>{name}</span> supprimé avec succès</>, status: "valid" })
            }

        ).catch(() => notification({ content: <>Une erreur s'est produite. Impossible de supprimer <span style={{ color: "#FF7954" }}>{name}</span></>, status: "invalid" }))
        if (selected?.id === id)
            setSelected()
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
                        () => {
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
                            <Button color="orange" onClick={() => setModal({ type: "", name: "", id: "" })}>Annuler</Button>
                            <Button color="orangeFill" onClick={() => handleDeleteAll("workplace")}>Supprimer</Button>
                        </div>
                    </div>)
                case "allteams":
                    return (<div className={classes.modal}>
                        <span>Les équipes <>Blabla</>, <>Blablou</></span>
                        <h4>Vous allez supprimer
                            <br /><span className={classes.orangeTxt}>{`${teams.length} équipes`}</span></h4>
                        <br />
                        <div>
                            <Button color="orange" onClick={() => setModal({ type: "", name: "", id: "" })}>Annuler</Button>
                            <Button color="orangeFill" onClick={() => handleDeleteAll("teams")}>Supprimer</Button>
                        </div>
                    </div>)
                case "allusers":
                    return (<div className={classes.modal}>
                        <h4>Vous allez supprimer
                            <br /><span className={classes.orangeTxt}>{`${users.length} collaborateurs`}</span></h4>
                        <div>
                            <Button color="orange" onClick={() => setModal({ type: "", name: "", id: "" })}>Annuler</Button>
                            <Button color="orangeFill" onClick={() => handleDeleteAll("users")}>Supprimer</Button>
                        </div>
                    </div>)
                default:
                    return (<div className={classes.modal}>
                        <h4>Vous allez supprimer
                            <br /><span className={classes.orangeTxt}>{toDelete?.name}</span></h4>
                        <div>
                            <Button color="orange" onClick={() => setModal({ type: "", name: "", id: "" })}>Annuler</Button>
                            <Button color="orangeFill" onClick={() => handleDelete(toDelete?.id, toDelete?.type, toDelete?.name)}>Supprimer</Button>
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

    const handleChangeTeam = async (e, team) => {
        e.preventDefault()
        if (teamName.length > 0)
            await request.patch(team['@id'], { name: teamName }, {
                headers: { 'Content-Type': 'application/merge-patch+json' }
            }).then(() => notification({ content: <><span style={{ color: "#FF7954" }}>{team.name}</span> modifié avec succès</>, status: "valid" })).catch(() => notification({ content: <><span style={{ color: "#FF7954" }}>{team.name}</span> n'a pas pu être modifié</>, status: "invalid" }))
        setEditInfo()
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
                                    <li onMouseMove={() => {
                                        if (!edit) {
                                            clearTimeout(time)
                                            time = setTimeout(() => {
                                                setSelected(workplace)
                                            }, 100)
                                        }
                                    }}
                                        key={workplace.id} className={`${editInfo === workplace ? classes.editing : ""} ${selected?.id === workplace.id && selected?.name === workplace?.name ? classes.selected : ""}`} >
                                        <input onChange={(e) => { if (e.target.checked) { setEdit(workplace); setSelected(workplace) } }}
                                            className={classes.checkbox}
                                            checked={edit?.id === workplace.id && edit?.name === workplace?.name ? true : false} type="radio" name="workplace" value={JSON.stringify(workplace)} />
                                        {editInfo === workplace ? <input className={classes.rename} ref={toFocus} type="text" defaultValue={workplace?.name} onChange={(e) => setWorkplaceName(e.target.value)} /> :
                                            <input className={classes.rename} disabled type="text" defaultValue={workplaceName || workplace?.name} />}
                                        <span></span>
                                        <div className={classes.actionsContainer}>
                                            {/* <BsCreditCard2Front /> */}
                                            {/* <GrUserSettings onClick={(e) => { setEdit('assign-workplace') }} /> */}
                                            {editInfo === workplace ? <FiCheck strokeWidth={"4"} onClick={(e) => { handleChangeWP(e, workplace) }} /> : <AiOutlineEdit onClick={(e) => { e.preventDefault(); setEditInfo(workplace) }} />}
                                            <FiTrash onClick={() => setModal({ name: workplace?.name, id: workplace.id, type: "workplaces" })} />
                                        </div>
                                        {editInfo === workplace ? <>
                                            <div className={classes.editDiv}>
                                                <UploadFile placeholder="Importer un logo" style={{ background: '#FFF', marginBottom: '.2rem' }} />
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
        return (<CreateWorkplace setDone={setDone} />)

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
            <ul className={`${classes.itemsList} ${classes.teamList}`}>
                <form onChange={(e) => e.target.type === "radio" && setSelected(JSON.parse(e.target.value))}>
                    {teams.map((team) => {
                        if (team.name?.toLowerCase().search(searchTeam) !== -1 || team.workplace?.name?.toLowerCase().search(searchTeam) !== -1)
                            return (
                                <li onMouseMove={() => {
                                    if (!edit) {
                                        clearTimeout(time)
                                        time = setTimeout(() => {
                                            setSelected(team)
                                        }, 100)
                                    }
                                }} key={team.id} className={`${team.workplace?.name?.length > 0 ? classes.teamWithWP : ""} ${editInfo === team ? classes.editing : ""} ${selected?.id === team.id && selected?.name === team.name ? classes.selected : ""}`} >
                                    <input onChange={(e) => { if (e.target.checked) { setEdit(team); setSelected(team) } }}
                                        className={classes.checkbox}
                                        checked={edit?.id === team.id && edit?.name === team?.name ? true : false} type="radio" name="team" value={JSON.stringify(team)} />
                                    {/* <input onChange={(e) => { setEdit(team); setSelected(team) }} className={classes.checkbox} checked={edit?.id === team.id && edit?.name === team.name ? true : false} type="radio" name="team" value={JSON.stringify(team)} /> */}
                                    <span></span>
                                    {editInfo === team ? <input autoFocus className={classes.rename} ref={toFocus} type="text" defaultValue={team?.name} onChange={(e) => setTeamName(e.target.value)} /> :
                                        <input className={classes.rename} disabled type="text" defaultValue={teamName || team?.name} />}
                                    {team.workplace?.name?.length > 0 ? <div className={classes.infos}>
                                        <span className={classes.groupName}>{team.workplace?.name}</span>
                                    </div> : ""}
                                    <div className={classes.actionsContainer}>
                                        {editInfo === team ? <FiCheck strokeWidth={"4"} className={classes.validate} onClick={(e) => { handleChangeTeam(e, team) }} /> : <AiOutlineEdit onClick={(e) => { e.preventDefault(); setEditInfo(team) }} />}
                                        {/* <AiOutlineEdit onClick={(e) => { setEdit('assign-team') }} /> */}
                                        <FiTrash onClick={() => setModal({ name: team.name, id: team.id, type: "teams" })} />
                                    </div>
                                </li>)
                    })}
                </form>
            </ul>
        </div>)
    if (tab === "create-team")
        return (<CreateTeam setDone={setDone} />)

    if (tab === "create-user")
        return (<CreateUser setDone={setDone} />)
    if (tab === "users")
        return (<div>
            {modal.type ? modalContent : ""}
                <UserTab time={time} selected={selected} setUsers={setUsers}
                    setSelected={setSelected} edit={edit} setEdit={setEdit} editInfo={editInfo}
                    setEditInfo={setEditInfo} modal={modal} setModal={setModal} />
        </div>)
}