import classes from './team.module.css'
import { Link, useParams } from 'react-router-dom'
import Header from '../../Header/HeaderMobile'
import { useEffect, useState } from 'react'
import Menu from '../../Menu/Menu'
import axios from 'axios'
import { API } from 'config'
import ListItem from './user'

function Team() {
    const [teamInfos, setTeamInfos] = useState([])
    const [users, setUsers] = useState([])
    const [deleted, setDeleted] = useState(false)
    let { teamId } = useParams()
    // const handlers = useSwipeable({ onSwipedLeft: (e) => console.log(e.event.target) })
    // const handlers = useSwipeable({ onSwipedLeft: () => setEditing(true), onSwipedRight: () => setEditing(false) })

    useEffect(async () => {
        setDeleted(false)
        if (teamId === "allusers") {
            await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/users?access_token=${localStorage.getItem("token")}`).then((res) => {
                setUsers(res.data.data)
            })
            setTeamInfos({ name: "Utilisateurs" })
            return false
        }
        await axios.get(`${API}team/${teamId}?access_token=${localStorage.getItem("token")}`).then((res) => {
            setTeamInfos(res.data)
        })
        await axios.get(`${API}team/${teamId}/members?access_token=${localStorage.getItem("token")}`).then((res) => {
            setUsers(res.data.data)
        })
    }, [deleted])

    console.log("infos:", users)
    return (
        <div>
            <Header title={teamInfos.name} create="/import" />
            <div className={classes.container}>
                <div className={classes.infosContainer}>
                    <span>{users.length > 1 ? `${users.length} utilisateurs` : users.length === 1 ? `${users.length} utilisateur` : "Aucun utilisateur"}</span>
                    <span className={classes.assignedSignature}><Link to={`/signatures/${teamInfos.signature_template_id}`}>{teamInfos.signature_template?.name}</Link></span>
                </div>
                <ul>
                    {users.map((user, index) => {
                        return (<ListItem user={user} index={index} setDeleted={setDeleted} />)
                    })}
                </ul>
            </div>
            <Menu page="teams" />
        </div>)
}

export default Team