import classes from './users.module.css'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../../../config'
import ListItem from '../Teams/Team/user'
import RenderHTML from '../Signatures/createSignature/RenderHTML/RenderHTML'

function Team() {
    const [teamInfos, setTeamInfos] = useState([])
    const [users, setUsers] = useState([])
    const [deleted, setDeleted] = useState(false)
    const [active, setActive] = useState("groups")
    const [user, setUser] = useState()
    const [template, setTemplate] = useState()
    const [data, setData] = useState([])
    const [organisation, setOrganisation] = useState()
    let { teamId } = useParams()
    let userId = "ed89e8b9953171695dd6628789be3b8108605073f83";
    // const handlers = useSwipeable({ onSwipedLeft: (e) => console.log(e.event.target) })
    // const handlers = useSwipeable({ onSwipedLeft: () => setEditing(true), onSwipedRight: () => setEditing(false) })

    useEffect(async () => {
        await axios.get(`${API}user/${userId}?access_token=${localStorage.getItem("token")}`).then(async (res) => {
            setUser(res.data)
            if (res.data.signature)
                await axios.get(`${API}template/${res.data?.signature?.id}?access_token=${localStorage.getItem("token")}`).then((res) => {
                    setTemplate(res.data.signatureData)
                    console.log(res.data)
                })
        })
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}?access_token=${localStorage.getItem("token")}`).then((res) => {
            setOrganisation(res.data)
        })
    }, [])

    useEffect(() => {
        setData({
            firstName: user?.first_name,
            lastName: user?.last_name,
            poste: user?.position,
            company: organisation?.name,
            address: organisation?.address,
            mobile: user?.phone_number,
            phone: organisation?.phone_number
        })
    }, [user, template])

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
            <div className={classes.container}>
                <div className={classes.teamsContainer}>
                    <ul className={classes.menu}>
                        <li onClick={() => setActive("groups")} className={active === "groups" ? classes.active : ""}>Groupes</li>
                        <li onClick={() => setActive("teams")} className={active === "teams" ? classes.active : ""}>Équipes</li>
                        <li onClick={() => setActive("users")} className={active === "users" ? classes.active : ""}>Utilisateurs</li>
                    </ul>
                    {active === "groups" ?
                        <div>
                            <input className={classes.search} type="text" placeholder="Search" />
                            <span>19 groupes</span>
                            <div className={classes.btn}>Ajouter un groupe</div>
                            <ul className={classes.itemsList}>
                                <li>
                                    Mama Los Angeles
                                </li>
                                <li>Mama Lyon</li>
                                <li>Mama Rio de Janeiro</li>
                            </ul>
                        </div>
                        : active === "teams" ?
                            <div>
                                <input className={classes.search} type="text" placeholder="Search" />
                                <span>19 équipes</span>
                                <div className={classes.btn}>Ajouter une équipe</div>
                                <ul className={classes.itemsList}>
                                    <li>
                                        <div>
                                            <span>Design</span>
                                        </div>
                                        <div className={classes.infos}>
                                            <span className={classes.groupName}>#Mama Los Angeles</span>
                                            <span>17 utilisateurs</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <span>Commercial</span>
                                        </div>
                                        <div className={classes.infos}>
                                            <span className={classes.groupName}>#Mama Los Angeles</span>
                                            <span>45 utilisateurs</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <span>Commercial</span>
                                        </div>
                                        <div className={classes.infos}>
                                            <span className={classes.groupName}>#Mama Rio de Janeiro</span>
                                            <span>22 utilisateurs</span>
                                        </div>
                                    </li>
                                </ul>
                            </div> :
                            <div>
                                <input className={classes.search} type="text" placeholder="Search" />
                                <span>19 utilisateurs</span>
                                <div className={classes.btn}>Ajouter un utilisateur</div>
                                <ul className={classes.itemsList}>
                                    <li>Sylvain</li>
                                    <li>Benjamin</li>
                                    <li>Sylvain</li>
                                    <li>Benjamin</li>
                                    <li>Sylvain</li>
                                    <li>Benjamin</li>
                                    <li>Sylvain</li>
                                    <li>Benjamin</li>
                                    <li>Sylvain</li>
                                    <li>Benjamin</li>
                                    <li>Sylvain</li>
                                    <li>Benjamin</li>
                                    <li>Sylvain</li>
                                    <li>Benjamin</li>
                                    <li>Sylvain</li>
                                    <li>Benjamin</li>
                                    <li>Sylvain</li>
                                    <li>Benjamin</li>
                                </ul>
                            </div>}
                </div>
                <div className={classes.signaturePreview}>
                    <h2>Signature active</h2>
                    <RenderHTML template={template} data={data} />
                </div>
            </div>
        </div>)
}

export default Team