import classes from './users.module.css'
import { useEffect, useState } from 'react'
// import axios from 'axios'
// import { API } from 'config'
import { HiOutlineMinusCircle, HiOutlineSearch } from 'react-icons/hi'
import Tab from './Tab/tab'
import SignaturePreview from './SignaturePreview/signaturePreview'
import { Link, useParams } from 'react-router-dom'
import request from 'Utils/Request/request'
import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi'


function Team() {
    const [entity, setEntity] = useState()
    const { type } = useParams()
    const [users, setUsers] = useState([])
    const [otherUser, setOtherUser] = useState("")
    const [edit, setEdit] = useState()
    const [userList, setUserList] = useState([])
    let test;
    console.log(entity)
    useEffect(async () => {
        setUserList([])
        const listUsers = await request.get('users')
        setUsers(listUsers.data['hydra:member'])
        // if (entity)
        //     listUsers.data['hydra:member'].map((user) => {
        //             test.push(entity.users.filter(val => user['@id'] !== (val['@id'])))
        //     })
        // console.log(listUsers.data['hydra:member'] = listUsers.data['hydra:member'].filter(val => !entity.users.includes(val['@id'])));

    }, [entity])

    useEffect(() => {
        setEntity()
    }, [type])

    return (
        <div>
            <div className={classes.container}>
                <h1>Teams</h1>
                <div className={classes.teamsContainer}>
                    <ul className={classes.menu}>
                        <li className={type === "workplaces" ? classes.active : ""}>
                            <Link to="/teams/workplaces">Hotels</Link>
                        </li>
                        <li className={type === "teams" ? classes.active : ""}>
                            <Link to="/teams/teams">Équipes</Link>
                        </li>
                        <li className={type === "users" ? classes.active : ""}>
                            <Link to="/teams/users">Collaborateurs</Link>
                        </li>
                    </ul>
                    <Tab tab={type} selected={entity} setSelected={setEntity} edit={edit} setEdit={setEdit} />
                </div>
                {entity ?
                    <div className={classes.overflow}>
                        {edit === "assign-workplace" ?
                            <div className={classes.teamAssignment}>
                                <div className={classes.col}>
                                    <h2>Équipes de <span className={classes.orangeTxt}>{entity?.name}</span></h2>
                                    {entity?.teams ? <><span>{entity?.teams?.length} équipes</span>
                                    <ul className={`${classes.itemsList} ${classes.users}`}>
                                        {entity?.users?.map((user) => {
                                            return <li tabIndex="0" key={user.id}>{user.firstName} {user.lastName}</li>
                                        })}
                                    </ul></> : "Aucune équipe associée"}
                                </div>
                                <div className={classes.col}>
                                    <h2>Autres équipes</h2>
                                    <div className={classes.searchInput}>
                                        <HiOutlineSearch />
                                        <input className={classes.search} type="text" onChange={(e) => setOtherUser(e.target.value)} placeholder="Rechercher un collaborateur" />
                                    </div>
                                    <ul className={classes.itemsList}>
                                        {users.map((user) => {
                                            const fullName = user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()
                                            if (fullName.search(otherUser.toLowerCase()) !== -1)
                                                return <li tabIndex="0" key={user.id}>{user.firstName} {user.lastName}</li>
                                        })}
                                    </ul>
                                </div>
                            </div> : edit === "assign-team" ?
                            <div className={classes.teamAssignment}>
                                <div className={classes.col}>
                                    <h2>Membres de l'équipe <span className={classes.orangeTxt}>{entity?.name}</span></h2>
                                    <span>{entity?.users?.length} collaborateurs</span>
                                    <ul className={`${classes.itemsList} ${classes.users}`}>
                                        {entity?.users?.map((user) => {
                                            return <li tabIndex="0" key={user.id} className={classes.assignItem}><span>{user.firstName} {user.lastName}</span><button><BiMinusCircle /></button></li>
                                        })}
                                    </ul>
                                </div>
                                <div className={classes.col}>
                                    <h2>Autres collaborateurs</h2>
                                    <div className={classes.searchInput}>
                                        <HiOutlineSearch />
                                        <input className={classes.search} type="text" onChange={(e) => setOtherUser(e.target.value)} placeholder="Rechercher un collaborateur" />
                                    </div>
                                    <ul className={classes.itemsList}>
                                        {users.map((user) => {
                                            const fullName = user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()
                                            if (fullName.search(otherUser.toLowerCase()) !== -1)
                                                return <li tabIndex="0" key={user.id} className={classes.assignItem}><span>{user.firstName} {user.lastName}</span><button><BiPlusCircle /></button></li>
                                        })}
                                    </ul>
                                </div>
                            </div> : 
                        <div className={classes.signaturePreview}>
                            <SignaturePreview show={entity} edit={edit} setEdit={setEdit} />
                        </div>}
                    </div> : ""}
            </div>
        </div>)
}

export default Team