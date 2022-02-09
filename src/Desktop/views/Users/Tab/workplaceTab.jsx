import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { FiCheck, FiTrash } from 'react-icons/fi'
import { HiOutlineSearch } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Button from 'Utils/Button/btn'
import Input from 'Utils/Input/input'
import { useNotification } from 'Utils/Notifications/notifications'
import request from 'Utils/Request/request'
import classes from '../Tab/tab.module.css'

function WorkplaceTab({ time, selected, workplaces, setWorkplaces, setSelected, edit, setEdit, editInfo, setEditInfo, modal, setModal }) {
    const [user, setUser] = React.useState({})
    const [search, setSearch] = React.useState('')
    const [changed, setChanged] = React.useState(false)
    const [usersList, setUsersList] = React.useState([])
    const toFocus = React.useRef(null)
    const notification = useNotification()

    const sortUsers = (usersList) => {
        let admin;
        usersList.map((user, index) => {
            if (user['@id'] === JSON.parse(localStorage.getItem('user'))['@id'])
                admin = usersList.splice(index, 1)
        })
        setUsersList(usersList?.sort((function (a, b) {
            if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) { return -1; }
            if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) { return 1; }
            return 0
        })))
        usersList.unshift(admin[0])
        setUsers(usersList)
    }

    const getDataUser = async () => {
        await request.get(`users`).then((res) => sortUsers(res.data['hydra:member']))
    }

    React.useMemo(() => {
        getDataUser()
    }, [modal, edit])

    const handleChange = (e, data) => {
        setChanged(true)
        setUser({ ...user, [data]: e })
    }

    const handleSubmit = async (e, id) => {
        e.preventDefault()
        const req = {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.mobilePhone,
            position: user.position,
            email: user.email
        }
        console.log(req)
        await request.patch(id, req, {
            headers: { 'Content-Type': 'application/merge-patch+json' }
        }).then(() => {
            setEdit()
            setEditInfo()
            getDataUser()
            setChanged(false)
            notification({ content: <><span style={{ color: "#FF7954" }}>{user.firstName} {user.lastName}</span> a bien été modifié</> })
        })
    }


    return (<div className={classes.mh100}>
        <Link to="create-user">
            <Button style={{ width: "15rem" }} color="orange" arrow={true}>Ajouter un collaborateur</Button>
        </Link>
        <div className={classes.searchInput}>
            <HiOutlineSearch />
            <input className={classes.search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Rechercher un collaborateur" />
        </div>

        <div className={classes.colheader}>
            <span className={classes.totalNumber}>{usersList.length < 2 ? `${usersList.length} collaborateur` : `${usersList.length} collaborateurs`}</span>
            <button onClick={() => setModal({ type: "allusers", items: usersList })}>Supprimer tout</button>
        </div>
        <ul className={`${classes.itemsList} ${classes.usersList}`}>
            <form onChange={(e) => e.target.type === "radio" && setSelected(JSON.parse(e.target.value))}>
                {usersList.map((user) => {
                    const fullName = user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()
                    if (fullName.search(search.toLowerCase()) !== -1)
                        return (
                            <li onMouseMove={() => {
                                if (!edit) {
                                    clearTimeout(time)
                                    time = setTimeout(() => {
                                        setSelected(user)
                                    }, 100)
                                }
                            }}
                                key={user.id} className={`${editInfo === user && user?.id !== JSON.parse(localStorage.getItem("user"))?.id ? classes.editing : ""} ${selected?.id === user.id && selected?.name === user.name ? classes.selected : ""}`} >
                                <input className={classes.checkbox} onChange={(e) => { setEdit(user); setSelected(user) }} checked={edit?.id === user.id && edit?.name === user.name ? true : false} type="radio" name="user" value={JSON.stringify(user)} />
                                {editInfo === user && user?.id !== JSON.parse(localStorage.getItem("user"))?.id ? <>
                                    <div className={classes.renameContainer}>
                                        <input placeholder='Prénom' className={classes.rename} ref={toFocus} type="text" defaultValue={`${user.firstName}`} onChange={(e) => handleChange(e.target.value, 'firstName')} />
                                        <input placeholder='Nom' className={classes.rename} ref={toFocus} type="text" defaultValue={`${user.lastName}`} onChange={(e) => handleChange(e.target.value, 'lastName')} />
                                    </div>
                                </>
                                    :
                                    <input className={classes.rename} disabled type="text" value={`${user.firstName} ${user.lastName}`} />}
                                <span></span>
                                {user?.id === JSON.parse(localStorage.getItem("user"))?.id ?
                                    <div className={classes.actionsContainerAdmin}>
                                        <Link to="/profile/informations"><FaUser /></Link>
                                    </div> :
                                    <div className={`${classes.actionsContainer} ${changed === true ? classes.btnReady : ""}`}>
                                        {editInfo === user ? <FiCheck className={classes.checkmark} strokeWidth={"4"} onClick={(e) => { handleSubmit(e, user['@id']) }} /> : <AiOutlineEdit onClick={(e) => { e.preventDefault(); setEditInfo(user) }} />}
                                        <FiTrash onClick={() => setModal({ name: `${user.firstName} ${user.lastName}`, id: user.id, type: "users" })} />
                                    </div>}
                                {editInfo === user && user?.id !== JSON.parse(localStorage.getItem("user"))?.id ? <>
                                    <div className={classes.editDiv}>
                                        <Input type="text" placeholder="Adresse mail" defaultValue={user.email} onChange={(e) => handleChange(e.target.value, 'email')} />
                                        <div className={classes.inputsContainer}>
                                            <Input type="text" placeholder="Poste" defaultValue={user.position} onChange={(e) => handleChange(e.target.value, 'poste')} />
                                            <Input type="tel" placeholder="Mobile" defaultValue={user.phone} onChange={(e) => handleChange(e.target.value, 'phone')} />
                                        </div>
                                    </div>
                                </> : <></>}
                            </li>)
                })}
            </form>
        </ul>
    </div>)
}

export default UserTab