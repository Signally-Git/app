import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { FiCheck, FiTrash } from 'react-icons/fi'
import { HiOutlineSearch } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Button from 'Utils/Button/btn'
import Input from 'Utils/Input/input'
import request from 'Utils/Request/request'
import classes from '../Tab/tab.module.css'

function UserTab({ time, selected, setSelected, edit, setEdit, editInfo, setEditInfo, setModal }) {
    const [user, setUser] = React.useState({})
    const [search, setSearch] = React.useState('')
    const [usersList, setUsersList] = React.useState([])
    const toFocus = React.useRef(null)

    const sortUsers = (usersList) => {
        setUsersList(usersList?.sort((function (a, b) {
            if (a.firstName.toLowerCase() < b.firstName.toLowerCase() || a['@id'] === JSON.parse(localStorage.getItem('user'))['@id']) { return -1; }
            if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) { return 1; }
            return 0
        })))
    }

    const getDataUser = async () => {
        const users = await request.get(`users`)
        setUsersList(users.data['hydra:member'])
    }

    React.useMemo(() => {
        getDataUser()
        sortUsers(usersList)
    }, [edit])

    React.useMemo(() => {
        sortUsers(usersList)
    }, usersList)

    React.useEffect(() => {
        // if (!user['@id'])
        //     return;
        // const sse = new EventSource(`https://hub.signally.io/.well-known/mercure?topic=https://api.beta.signally.io${user['@id']}`);
        // function getRealtimeData(data) {
        //     setEditInfo(data)
        // }
        // sse.onmessage = e => { getDataUser(); getRealtimeData(JSON.parse(e.data)) };
        // return () => {
        //     sse.close();
        // };
    }, [])

    const handleChange = async (e, id) => {
        e.preventDefault()
        const req = {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            position: user.poste,
            mail: user.mail
        }
        await request.patch(id, req, {
            headers: { 'Content-Type': 'application/merge-patch+json' }
        }).then(() => getDataUser())
        
        setEdit()
        setEditInfo()
    }

    return (<div>
        <Link to="create-user">
            <Button style={{ width: "15rem" }} color="orange" arrow={true}>Ajouter un collaborateur</Button>
        </Link>
        <div className={classes.searchInput}>
            <HiOutlineSearch />
            <input className={classes.search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Rechercher un collaborateur" />
        </div>

        <div className={classes.colheader}>
            <span>{usersList.length < 2 ? `${usersList.length} collaborateur` : `${usersList.length} collaborateurs`}</span>
            <button onClick={() => setModal({ type: "allusers" })}>Supprimer tout</button>
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
                                        <input placeholder='Prénom' className={classes.rename} ref={toFocus} type="text" defaultValue={`${user.firstName}`} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                                        <input placeholder='Nom' className={classes.rename} ref={toFocus} type="text" defaultValue={`${user.lastName}`} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                                    </div>
                                </>
                                    :
                                    <input className={classes.rename} disabled type="text" defaultValue={`${user.firstName} ${user.lastName}`} />}
                                <span></span>
                                {user?.id === JSON.parse(localStorage.getItem("user"))?.id ?
                                    <div className={classes.actionsContainerAdmin}>
                                        <Link to="/profile/informations"><FaUser /></Link>
                                    </div> :
                                    <div className={classes.actionsContainer}>
                                        {editInfo === user ? <FiCheck strokeWidth={"4"} onClick={(e) => { handleChange(e, user['@id']) }} /> : <AiOutlineEdit onClick={(e) => { e.preventDefault(); setEditInfo(user) }} />}
                                        <FiTrash onClick={() => setModal({ name: `${user.firstName} ${user.lastName}`, id: user.id, type: "usersList" })} />
                                    </div>}
                                {editInfo === user && user?.id !== JSON.parse(localStorage.getItem("user"))?.id ? <>
                                    <div className={classes.editDiv}>
                                        <Input type="text" placeholder="Adresse mail" defaultValue={user.email} onChange={(e) => setUser({ ...user, mail: e.target.value })} />
                                        <div className={classes.inputsContainer}>
                                            <Input type="text" placeholder="Poste" defaultValue={user.position} onChange={(e) => setUser({ ...user, poste: e.target.value })} />
                                            <Input type="tel" placeholder="Mobile" defaultValue={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
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