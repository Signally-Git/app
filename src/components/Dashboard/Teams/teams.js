import classes from './teams.module.css'
import ChevronRight from '../../../assets/icons/chevron-right.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API } from '../../../config'
import axios from 'axios'

function Teams(props) {
    const [teamsList, setTeamsList] = useState([])
    const [allUsers, setAllUsers] = useState([])

    useEffect(async () => {
        props.handleHeader("Équipes")
        props.create("create-team")
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/teams?access_token=${localStorage.getItem("token")}`).then((res) => {
            setTeamsList(res.data.data)
            
            console.log(teamsList)
        })
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/users?access_token=${localStorage.getItem("token")}`).then((res) => {
            setAllUsers(res.data.data)
            console.log(allUsers)
        })
    }, [])
    // console.log(localStorage)
    console.log(API, "organisation/", localStorage.organisation_id, "/teams?access_token=", localStorage.token)
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
                        <li key={index} className={`${team.signature_template_deploy_count === team.members_count ? classes.active : classes.inactive}`}>
                            <Link to={`/team/${team.id}`}>
                                {team.name} ({team.members_count})<img src={ChevronRight} className={classes.chevron} alt="Click" />
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>)
}

export default Teams