import classes from './teams.module.css'
import ChevronRight from '../../../assets/icons/chevron-right.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API } from '../../../config'
import axios from 'axios'
import SingleTeam from './singleTeam'

function Teams(props) {
    const [teamsList, setTeamsList] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        setDeleted(false)
    }, [deleted])

    useEffect(async () => {
        props.handleHeader("Équipes et utilisateurs")
        props.create([["Créer une équipe", "create-team"], ["Ajouter des utilisateurs", "import"]])
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/teams?access_token=${localStorage.getItem("token")}`).then((res) => {
            setTeamsList(res.data.data)
        })
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/users?access_token=${localStorage.getItem("token")}`).then((res) => {
            setAllUsers(res.data.data)
        })
    }, [deleted])
    
    return (
        <div className={classes.container}>
            <ul>
                <li>
                    <Link to={"/team/allusers"}>
                        Utilisateurs ({allUsers.length})<img src={ChevronRight} className={classes.chevron} alt="Click" />
                    </Link>
                </li>
            </ul>
            <span>{teamsList.length > 1 ? `${teamsList.length} équipes` : teamsList.length === 1 ? `${teamsList.length} équipe` : "Aucune équipe"}</span>
            <ul>
                {teamsList.map((team, index) => {
                    return (
                        <SingleTeam team={team} index={index} deleted={setDeleted} />
                    )
                })}
            </ul>
        </div>)
}

export default Teams