import classes from './signatures.module.css'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from 'config'
import { HiOutlineSearch } from 'react-icons/hi'
import { AiOutlineEdit } from 'react-icons/ai'
import { FiTrash } from 'react-icons/fi'
import Button from 'Utils/Button/btn'
import ReadOnlyPreview from './create/Preview/readOnlyPreview'
import { useNotification } from 'Utils/Notifications/notifications'
import request from 'Utils/Request/request'
import Preview from './create/Preview/customizablePreview'

function Team() {
    const [templates, setTemplates] = useState([])
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

    const [organisation, setOrganisation] = useState()
    const [preview, setPreview] = useState({})
    const history = useHistory()
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        const signatures = await request.get(`signatures`)
        signatures.data["hydra:totalItems"] < 1 ? history.push("/create-signature")
        // : console.log(signatures.data["hydra:member"])
            : setTemplates(signatures.data["hydra:member"])
        setLoading(false)

    }

    useEffect(async () => {
        getData()
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
            event: `http://fakeimg.pl/380x126?font=noto&amp;font_size=14`
        })
    }, [user, template])

    const handleDelete = async (id) => {
        await request.delete(`signatures/${id}`).then(
            (res) => {
                notification({ content: <>La signature a été supprimée avec succès</>, status: "valid" })
                setPreview([]); setDeleted(id)
            }).catch(() => notification({ content: <>Impossible de supprimer <span style={{ color: "#FF7954" }}>{preview.name}</span></>, status: "invalid" }))

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
                            {/* <li onClick={() => setActive("inactive")} className={`${active === "inactive" ? classes.active : ""}`}>Inactives</li> */}
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
                                        return (<li onMouseEnter={() => setPreview(signature)} key={signature.id}>
                                            <span  onClick={() => history.push('/edit-signature/'+ signature.id)}>{signature.name}</span>
                                            <div className={classes.actionsContainer}>
                                                {/* <AiOutlineEdit /> */}
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
                    {preview.html?.length > 0 ?
                        <div className={classes.signaturePreview}>
                            {/* <h2>Design</h2> */}
                            <ul>
                                <li>
                                    <h5>Signature <span className={classes.orangeTxt}>{preview.name}</span></h5>
                                    {/* {preview.signatureData?.length > 0 && parse(preview.signatureData)} */}
                                    <Preview template={preview.html} />
                                    {/* <ReadOnlyPreview infos={data} template={preview.html} /> */}
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