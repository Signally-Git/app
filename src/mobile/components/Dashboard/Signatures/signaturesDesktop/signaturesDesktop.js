import classes from './signaturesDesktop.module.css'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from 'config'
import { HiOutlineSearch } from 'react-icons/hi'

function Team() {
    const [teamInfos, setTeamInfos] = useState([])
    const [users, setUsers] = useState([])
    const [deleted, setDeleted] = useState(false)
    const [active, setActive] = useState("Signally")
    const [user, setUser] = useState()
    const [template, setTemplate] = useState()
    const [data, setData] = useState([])
    const [organisation, setOrganisation] = useState()
    let { teamId } = useParams()
    const [preview, setPreview] = useState({ name: "Design" })
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
                <h1>Signatures</h1>
                <div className={classes.teamsContainer}>
                    <ul className={classes.menu}>
                        <li onClick={() => setActive("Signally")} className={active === "Signally" ? classes.active : ""}>Basiques</li>
                        <li onClick={() => setActive("Studio")} className={active === "Studio" ? classes.active : ""}>My Studio</li>
                        <li onClick={() => setActive("Store")} className={active === "Store" ? classes.active : ""}>My Store</li>
                    </ul>
                    {active === "Signally" ?
                        <div>
                            <Link to="create-signature" className={classes.btn}>Créer ma signature</Link>
                            <div className={classes.searchInput}>
                                <HiOutlineSearch />
                                <input className={classes.search} type="text" placeholder="Rechercher une signature" />
                            </div>
                            <span>3 signatures</span>
                            <ul className={classes.itemsList}>
                                <li tabIndex="0">
                                    Design
                                </li>
                                <li tabIndex="0">Sales</li>
                            </ul>
                        </div>
                        : active === "Studio" ?
                            <div>
                                <div className={classes.noStudio}>
                                    <span className={classes.tagline}>Les designers du <b className={classes.orangeTxt}>Signally Studio</b> sont à votre disposition pour créer avec vous une signature d’email intelligente, authentifiable et sur-mesure.</span>
                                    <div className={classes.CTA}>Contacter un designer</div>
                                </div>
                            </div> :
                            <div>
                                <div className={classes.btn}>Visiter le store</div>
                                <div className={classes.searchInput}>
                                    <HiOutlineSearch />
                                    <input className={classes.search} type="text" placeholder="Rechercher une signature" />
                                </div>
                                <span>0 signature</span>
                                <ul className={classes.itemsList}>
                                </ul>
                            </div>}
                </div>
                {active === "Signally" ?
                    <div className={classes.signaturePreview}>
                        <h2>Design</h2>
                        <ul>
                            <li>
                                <h5>Mama Design</h5>
                                <div></div>
                                <p className={classes.groupName}>Team Design</p>
                                <span className={classes.groupName}>#Mama Los Angeles</span>
                            </li>
                            <li>
                                <h5>Mama Design</h5>
                                <div></div>
                                <p className={classes.groupName}>Team Design</p>
                                <span className={classes.groupName}>#Mama Los Angeles</span>
                            </li>
                            <li>
                                <h5>Mama Design</h5>
                                <div></div>
                                <p className={classes.groupName}>Team Design</p>
                                <span className={classes.groupName}>#Mama Los Angeles</span>
                            </li>
                        </ul>
                    </div> : ""}
            </div>
        </div>)
}

export default Team