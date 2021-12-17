import classes from './users.module.css'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from 'config'
import ListItem from '../Teams/Team/user'
import RenderHTML from '../Signatures/createSignature/RenderHTML/RenderHTML'
import { HiOutlineSearch } from 'react-icons/hi'
import { previousWednesday } from 'date-fns'
import { FiEdit } from 'react-icons/fi'

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
    const [preview, setPreview] = useState({ name: "Design" })
    let userId = localStorage.getItem('user_id');
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
            firstName: "Prénom",
            lastName: "Nom",
            poste: "Poste",
            company: organisation?.name,
            address: organisation?.address,
            mobile: "Mobile",
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
                <h1>Équipes</h1>
                <div className={classes.teamsContainer}>
                    <ul className={classes.menu}>
                        <li onClick={() => setActive("groups")} className={active === "groups" ? classes.active : ""}>Hotels</li>
                        <li onClick={() => setActive("teams")} className={active === "teams" ? classes.active : ""}>Équipes</li>
                        <li onClick={() => setActive("users")} className={active === "users" ? classes.active : ""}>Utilisateurs</li>
                    </ul>
                    {active === "groups" ?
                        <div>
                            <div className={classes.btn}>Ajouter un hotel<BsArrowRight /></div>
                            <div className={classes.searchInput}>
                                <HiOutlineSearch />
                                <input className={classes.search} type="text" placeholder="Rechercher un hotel" />
                            </div>
                            <span>3 hotels</span>
                            <ul className={classes.itemsList}>
                                <li tabIndex="0">
                                    Mama Los Angeles
                                </li>
                                <li tabIndex="0">Mama Lyon</li>
                                <li tabIndex="0">Mama Rio de Janeiro</li>
                            </ul>
                        </div>
                        : active === "teams" ?
                            <div>
                                <div className={classes.btn}>Ajouter une équipe<BsArrowRight /></div>
                                <div className={classes.searchInput}>
                                    <HiOutlineSearch />
                                    <input className={classes.search} type="text" placeholder="Rechercher une équipe" />
                                </div>
                                <span>3 équipes</span>
                                <ul className={classes.itemsList}>
                                    <li tabIndex="0">
                                        <div>
                                            <span>Design <span>(22)</span></span>
                                        </div>
                                        <div className={classes.infos}>
                                            <span className={classes.groupName}>#Mama Los Angeles</span>
                                        </div>
                                    </li>
                                    <li tabIndex="0">
                                        <div>
                                            <span>Commercial <span>(44)</span></span>
                                        </div>
                                        <div className={classes.infos}>
                                            <span className={classes.groupName}>#Mama Los Angeles</span>
                                        </div>
                                    </li>
                                    <li tabIndex="0">
                                        <div>
                                            <span>Commercial <span>(7)</span></span>
                                        </div>
                                        <div className={classes.infos}>
                                            <span className={classes.groupName}>#Mama Rio de Janeiro</span>
                                        </div>
                                    </li>
                                </ul>
                            </div> :
                            <div>
                                <div className={classes.btn}>Ajouter un utilisateur</div>
                                <div className={classes.searchInput}>
                                    <HiOutlineSearch />
                                    <input className={classes.search} type="text" placeholder="Rechercher un utilisateur" />
                                </div>
                                <span>22 utilisateurs</span>
                                <ul className={classes.itemsList}>
                                    <li tabIndex="0">Sylvain</li>
                                    <li tabIndex="0">Benjamin</li>
                                    <li tabIndex="0">Sylvain</li>
                                    <li tabIndex="0">Benjamin</li>
                                    <li tabIndex="0">Sylvain</li>
                                    <li tabIndex="0">Benjamin</li>
                                    <li tabIndex="0">Sylvain</li>
                                    <li tabIndex="0">Benjamin</li>
                                    <li tabIndex="0">Sylvain</li>
                                    <li tabIndex="0">Benjamin</li>
                                    <li tabIndex="0">Sylvain</li>
                                    <li tabIndex="0">Benjamin</li>
                                    <li tabIndex="0">Sylvain</li>
                                    <li tabIndex="0">Benjamin</li>
                                    <li tabIndex="0">Sylvain</li>
                                    <li tabIndex="0">Benjamin</li>
                                    <li tabIndex="0">Sylvain</li>
                                    <li tabIndex="0">Benjamin</li>
                                </ul>
                            </div>}
                </div>
                <div className={classes.overflow}>
                    <div className={classes.signaturePreview}>
                        <div className={classes.topLine}>
                            <h2>Signature active pour l'équipe <span className={classes.orangeTxt}>{preview.name}</span></h2>
                            <FiEdit />
                        </div>
                        <div className={classes.signatureContainer}>
                            <RenderHTML template={template} data={data} />
                        </div>
                        <span className={classes.groupName}>#Mama Los Angeles</span>

                    </div>
                    <div className={classes.teamAssignment}>
                        <div className={classes.col}>
                            <h2>Membres de l'équipe </h2>
                            <span>3 utilisateurs</span>
                            <ul className={`${classes.itemsList} ${classes.users}`}>
                                <li tabIndex="0">Sylvain</li>
                                <li tabIndex="0">Benjamin</li>
                                <li tabIndex="0">Sylvain</li>
                            </ul>
                        </div>
                        <div className={classes.col}>
                            <h2>Autres utilisateurs</h2>
                            <div className={classes.searchInput}>
                                <HiOutlineSearch />
                                <input className={classes.search} type="text" placeholder="Rechercher un utilisateur" />
                            </div>
                            <ul className={classes.itemsList}>
                                <li tabIndex="0">Sylvain</li>
                                <li tabIndex="0">Benjamin</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default Team