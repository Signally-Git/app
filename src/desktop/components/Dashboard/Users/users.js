import classes from './users.module.css'
import { useEffect, useState } from 'react'
// import axios from 'axios'
// import { API } from 'config'
import { HiOutlineSearch } from 'react-icons/hi'
import Tab from './Tab/tab'
import SignaturePreview from './SignaturePreview/signaturePreview'
import { Link, useParams } from 'react-router-dom'
import request from 'Utils/Request/request'

function Team() {
    const [entity, setEntity] = useState()
    const { type } = useParams()
    const [users, setUsers] = useState([])
    const [otherUser, setOtherUser] = useState("")
    const [userList, setUserList] = useState([])
    let test;

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
                    <Tab tab={type} selected={entity} setSelected={setEntity} />
                </div>
                {entity ?
                    <div className={classes.overflow}>
                        {type === "users" ? <div className={classes.signaturePreview}>
                            <SignaturePreview show={entity} />
                        </div> : ""}

                        {type === "teams" ?
                            <div className={classes.teamAssignment}>
                                <div className={classes.col}>
                                    <h2>Membres de l'équipe </h2>
                                    <span>{entity.users.length} collaborateurs</span>
                                    <ul className={`${classes.itemsList} ${classes.users}`}>
                                        {entity.users.map((user) => {
                                            return <li tabIndex="0" key={user.id}>{user.firstName} {user.lastName}</li>
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
                                                return <li tabIndex="0" key={user.id}>{user.firstName} {user.lastName}</li>
                                        })}
                                    </ul>
                                </div>
                            </div> : ""}
                    </div> : ""}
            </div>
        </div>)
}

export default Team