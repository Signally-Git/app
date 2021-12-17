import classes from './signatures.module.css'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import parse from "html-react-parser"
import { API } from 'config'
import { HiOutlineSearch } from 'react-icons/hi'
import { BsArrowRight } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { FiTrash } from 'react-icons/fi'
import Button from 'Utils/Button/btn'
import { renderToString } from 'react-dom/server'
import ReadOnlyPreview from '../create/Preview/readOnlyPreview'
import { useNotification } from 'Utils/Notifications/notifications'

function Team() {
    const [templates, setTemplates] = useState([])
    const [teamInfos, setTeamInfos] = useState([])
    const [users, setUsers] = useState([])
    const notification = useNotification()
    const [deleted, setDeleted] = useState(false)
    const [active, setActive] = useState("active")
    const [user, setUser] = useState()
    const [template, setTemplate] = useState()
    const [data, setData] = useState({
        firstName: localStorage.getItem('user')?.first_name,
        lastName: localStorage.getItem('user')?.last_name,
        position: localStorage.getItem('user')?.position,

    })

    let { teamId } = useParams()
    const [organisation, setOrganisation] = useState()
    const [preview, setPreview] = useState({})
    let userId = "ed89e8b9953171695dd6628789be3b8108605073f83";
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    console.log(preview)
    // const handlers = useSwipeable({ onSwipedLeft: (e) => console.log(e.event.target) })
    // const handlers = useSwipeable({ onSwipedLeft: () => setEditing(true), onSwipedRight: () => setEditing(false) })

    const ConvertToPNG = async () => {
        let svg = <svg height="24" viewBox="0 0 152 152" fill="#FFF" width="24" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g fill="#FFF" id="_02.twitter" data-name="02.twitter"><path d="m76 0a76 76 0 1 0 76 76 76 76 0 0 0 -76-76zm37.85 53a32.09 32.09 0 0 1 -6.51 7.15 2.78 2.78 0 0 0 -1 2.17v.25a45.58 45.58 0 0 1 -2.94 15.86 46.45 46.45 0 0 1 -8.65 14.5 42.73 42.73 0 0 1 -18.75 12.39 46.9 46.9 0 0 1 -14.74 2.29 45 45 0 0 1 -22.6-6.09 1.3 1.3 0 0 1 -.62-1.44 1.25 1.25 0 0 1 1.22-.94h1.9a30.31 30.31 0 0 0 16.94-5.14 16.45 16.45 0 0 1 -13-11.17.86.86 0 0 1 1-1.11 15.08 15.08 0 0 0 2.76.26h.35a16.42 16.42 0 0 1 -9.57-15.11.86.86 0 0 1 1.27-.75 14.44 14.44 0 0 0 3.74 1.45 16.42 16.42 0 0 1 -2.65-19.91.86.86 0 0 1 1.41-.11 43 43 0 0 0 29.51 15.77h.08a.62.62 0 0 0 .6-.67 17.39 17.39 0 0 1 .38-6 15.91 15.91 0 0 1 10.7-11.44 17.59 17.59 0 0 1 5.19-.8 16.36 16.36 0 0 1 10.84 4.09 2.12 2.12 0 0 0 1.41.54 2.15 2.15 0 0 0 .5-.07 30.3 30.3 0 0 0 8-3.3.85.85 0 0 1 1.25 1 16.23 16.23 0 0 1 -4.31 6.87 29.38 29.38 0 0 0 5.24-1.77.86.86 0 0 1 1.05 1.23z"></path></g></g></svg>
        svg = renderToString(svg)
        const width = 40;
        const height = 40;
        await axios({
            url: `https://svgtopng.signally.io/convert?height=${height}&width=${width}`,
            method: 'POST',
            data: svg,
        }).then(async (response) => {
            console.log(response)
            const img = new FormData()
            img.append('file', (new Blob([response.data])))
            await axios({
                method: 'POST',
                url: `${API}media`,
                data: response.data,
                headers: { "Content-Type": "multipart/form-data" },
            }).then((res) => console.log(res))
            // const url = window.URL.createObjectURL(new Blob([response.data]));
            // console.log(img)
            // return img
        });
    }

    useEffect(() => {

        ConvertToPNG()
    }, [])

    const getData = async () => {
        await axios.get(`${API}organisation/${localStorage.getItem('organisation_id')}/signature-templates?access_token=${localStorage.getItem('token')}`)
            .then((res) => {
                if (res.data.data.length < 1)
                    history.push("/create-signature")
                setTemplates(res.data.data)
                setLoading(false)
            })
    }

    useEffect(async () => {
        getData()
        // await axios.get(`${API}user/${userId}?access_token=${localStorage.getItem("token")}`).then(async (res) => {
        //     setUser(res.data)
        //     if (res.data.signature)
        //         await axios.get(`${API}template/${res.data?.signature?.id}?access_token=${localStorage.getItem("token")}`).then((res) => {
        //             setTemplate(res.data.signatureData)
        //             console.log(res.data)
        //         })
        // })
        // await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}?access_token=${localStorage.getItem("token")}`).then((res) => {
        //     setOrganisation(res.data)
        // })
    }, [deleted])

    useEffect(() => {
        setData({
            firstName: "Prénom",
            lastName: "Nom",
            poste: "Poste",
            company: organisation?.name,
            address: organisation?.address,
            mobile: "Mobile",
            phone: organisation?.phone_number,
            event: `<img src="http://fakeimg.pl/380x126?font=noto&amp;font_size=14" style="margin-bottom: 12px; border-radius: 4px;"/>`
        })
    }, [user, template])

    // useEffect(async () => {
    //     setDeleted(false)
    //     if (teamId === "allusers") {
    //         await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/users?access_token=${localStorage.getItem("token")}`).then((res) => {
    //             setUsers(res.data.data)
    //         })
    //         setTeamInfos({ name: "Utilisateurs" })
    //         return false
    //     }
    //     await axios.get(`${API}team/${teamId}?access_token=${localStorage.getItem("token")}`).then((res) => {
    //         setTeamInfos(res.data)
    //     })
    //     await axios.get(`${API}team/${teamId}/members?access_token=${localStorage.getItem("token")}`).then((res) => {
    //         setUsers(res.data.data)
    //     })
    // }, [deleted])

    const handleDelete = async (id) => {
        await axios.delete(`${API}template/${id}?access_token=${localStorage.getItem('token')}`).then(
            (res) => {
                notification({ content: <>La signature a été supprimée avec succès</>, status: "valid" })
                setPreview([]); setDeleted(res.data)
            })

    }

    if (loading)
        return <div></div>
    return (
        <div>
            <div className={classes.container}>
                <h1>Signatures</h1>
                <div className={classes.row}>
                    <div className={classes.teamsContainer}>
                        <ul className={classes.menu}>
                            <li onClick={() => setActive("active")} className={active === "active" ? classes.active : ""}>Actives</li>
                            <li onClick={() => setActive("inactive")} className={`${active === "inactive" ? classes.active : ""}`}>Inactives</li>
                        </ul>
                        {active === "active" ?
                            <div>
                                <Link to="create-signature"><Button color="orange" arrow={true}>Ajouter une signature</Button></Link>
                                <div className={classes.searchInput}>
                                    <HiOutlineSearch />
                                    <input className={classes.search} type="text" placeholder="Rechercher une signature" />
                                </div>
                                <span>{templates.length} signatures</span>
                                <ul className={classes.itemsList}>
                                    {templates.map((signature) => {
                                        return (<li key={signature.id} tabIndex="0" onClick={() => setPreview(signature)}>
                                            <span>{signature.name}</span>
                                            <div className={classes.actionsContainer}>
                                                <AiOutlineEdit />
                                                <FiTrash onClick={() => handleDelete(signature.id)} />
                                            </div>
                                        </li>)
                                    })}
                                </ul>
                            </div>
                            : active === "inactive" ?
                                <div>
                                    <Button color="orange" arrow={true}><Link to="create-signature">Ajouter une signature</Link></Button>
                                    {/* IF PAS DE SIGNATURE INACTIVE */}
                                    { }
                                    {/* <div className={classes.searchInput}>
                                        <HiOutlineSearch />
                                        <input className={classes.search} type="text" placeholder="Rechercher une signature" />
                                    </div>
                                    <span>0 signature</span>
                                    <ul className={classes.itemsList}> */}
                                    {/* <li tabIndex="0">
                                            Design
                                        </li>
                                        <li tabIndex="0">Sales</li> */}
                                    {/* </ul> */}
                                </div> : ""}
                    </div>
                    {preview.signatureData?.length > 0 ?
                        <div className={classes.signaturePreview}>
                            {/* <h2>Design</h2> */}
                            <ul>
                                <li>
                                    <h5>Signature <span className={classes.orangeTxt}>{preview.name}</span></h5>
                                    {/* {preview.signatureData?.length > 0 && parse(preview.signatureData)} */}
                                    <ReadOnlyPreview infos={data} template={preview.signatureData} />
                                    {/* <p className={classes.groupName}>Team Design</p>
                                    <span className={classes.groupName}>#Mama Los Angeles</span> */}
                                </li>
                            </ul>
                        </div> : ""}
                </div>
            </div>
        </div>)
}

export default Team