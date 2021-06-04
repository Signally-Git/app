import classes from './team.module.css'
import ChevronRight from '../../../../assets/icons/chevron-right.svg'
import Cross from '../../../../assets/icons/cross.svg'
import { useParams } from 'react-router-dom'
import Header from '../../Header/Header'
import { useSwipeable } from 'react-swipeable'
import { useEffect, useState } from 'react'
import Menu from '../../Menu/Menu'
import axios from 'axios'
import { API } from '../../../../config'

function Team() {
    const [teamInfos, setTeamInfos] = useState([])
    const [users, setUsers] = useState([])
    let { teamId } = useParams()
    const [editing, setEditing] = useState(false)
    // const handlers = useSwipeable({ onSwipedLeft: (e) => console.log(e.event.target) })
    const handlers = useSwipeable({ onSwipedLeft: () => setEditing(true), onSwipedRight: () => setEditing(false) })

    useEffect(async () => {
        if (teamId === "allusers")
        {
            await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/users?access_token=${localStorage.getItem("token")}`).then((res) => {
                setUsers(res.data.data)
            })
            setTeamInfos({name: "Utilisateurs"})
            return false
        }
        await axios.get(`${API}team/${teamId}?access_token=${localStorage.getItem("token")}`).then((res) => {
            setTeamInfos(res.data)
        })
        await axios.get(`${API}team/${teamId}/members?access_token=${localStorage.getItem("token")}`).then((res) => {
            setUsers(res.data.data)
        })
    }, [])

    console.log("infos:", users)
    return (
        <div>
            <Header title={teamInfos.name} create="/import" />
            <div className={classes.container}>
            <span>{users.length > 1 ? `${users.length} utilisateurs` : users.length === 1 ? `${users.length} utilisateur` : "Aucun utilisateur"}</span>
                <ul>
                    {users.map((user, index) => {
                        return (
                        <li className={`${editing && classes.editing}`} {...handlers} key={index} id={index}>
                            <span className={user.is_deployed ? 
                           `${classes.active}` : `${classes.inactive}`}>
                                {`${user.first_name} ${user.last_name}`}
                            </span>
                            <img src={ChevronRight} className={classes.chevron} alt="Click" />
                            <div className={classes.onSwipe}>
                                <img className={classes.chevron} src={Cross} alt="delete" />
                            </div>
                        </li>)
                    })}
                </ul>
            </div>
            <Menu page="teams" />
        </div>)
}

export default Team