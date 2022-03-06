import { useEffect, useRef, useState } from 'react'
import Button from 'Utils/Button/btn'
import Input from 'Utils/Input/input'
import classes from '../create.module.css'

import { useHistory } from 'react-router-dom'
import request from 'Utils/Request/request'
import { useNotification } from 'Utils/Notifications/notifications'
import { Box } from 'Assets/img/KUKLA/illustrations'
import UploadFile from 'Utils/Upload/uploadFile'

export default function CreateWorkplace({ setDone }) {
    const number = !localStorage.getItem("understand_workplace") ? 0 : 1;
    const slide = useRef(null)
    const [hide, setHide] = useState(false)
    const [file, setFile] = useState()
    const width = "12rem"
    const [workplace, setWorkplace] = useState(
        {
            logos: [],
            name: "",
            websiteUrl: "",
            address: {
                street: "",
                city: "",
                zipCode: "",
                country: ""
            },
            digitalAddress: { mobile: "" }
        })
    const history = useHistory()
    const notification = useNotification()

    const handleCSV = async (file) => {
        const csv = new FormData()
        const url = `import/workplaces`

        csv.append('file', file)

        await request.post(url, csv)
            .then((res) => {
                // props.setState(`${res.data["hydra:totalItems"]} ${props.fill.type} ajoutés`)
                setDone(true)
                history.push(`/teams/workplaces`)
            }).catch(() => notification({ content: <>Une erreur s'est produite lors de l'import</>, status: "invalid" }))
    }

    const handleSave = async () => {
        const req = {
            ...workplace
        }
        const create = await request.post('workplaces', req).catch(
            () => notification({ content: <>L'hôtel <span style={{ color: "#FF7954" }}>{workplace.name}</span> n'a pas pu être créé</>, status: "invalid" }))
        create.data && notification({ content: <>L'hôtel <span style={{ color: "#FF7954" }}>{workplace.name}</span> a été créé avec succès</>, status: "valid" })
        const img = new FormData()
        img.append('file', file)
        if (file)
            await request.post(`import/file`, img).then(async (res) => {
                const requestLogo = {
                    name: file.name,
                    path: res.data.path,
                    workplace: create.data['@id']
                }
                await request.post('logos', requestLogo).then((res) => {
                    console.log(res.data)
                })
            })
        setDone(true)
        history.push('/teams/workplaces')
    }

    const handleSlide = async (e, multiple) => {
        e.preventDefault()
        slide.current.scrollTo({
            top: 0,
            left: slide.current.offsetWidth * (multiple - number),
            behavior: 'smooth'
        })
    }

    const handleAccept = async (e) => {
        handleSlide(e, 1);
        setTimeout(() => {
            setHide(true);
            slide.current.scrollTo({
                top: 0,
                left: 0,
            })
        }, 1000);
        localStorage.setItem('understand_workplace', true)
    }

    return (<div className={classes.container}>
        {Box}
        <div className={classes.slidesContainer} ref={slide}>
            {!localStorage.getItem("understand_workplace") && hide === false ?
                <div className={`${classes.slide} ${classes.space}`}>
                    <p>Administrez les signatures de vos équipes par pays, villes, filiales, départements etc. selon la structure de votre organisation.</p>
                    <Button width="15rem" color="orange" arrow={true} onClick={(e) => { handleAccept(e) }}>J'ai compris</Button>
                </div> : ""}
            <div className={classes.slide}>
                <Button width={width} color="orangeFill" arrow={true} className={classes.btn} onClick={(e) => handleSlide(e, 2)}>Manuellement</Button>
                <Button width={width} color="brown" className={classes.btn}> <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => {
                        // handleSave()
                        handleCSV(e.target.files[0])
                    }}
                />A partir d'un fichier .csv</Button>
            </div>
            <div className={classes.slide}>
                <div className={classes.inputsContainer}>
                    <Input style={{ width: "100%", marginBottom: '1rem' }} onChange={(e) => setWorkplace({ ...workplace, name: e.target.value })} type="text" placeholder="Nom du workplace" />
                    <UploadFile placeholder="Importer un logo" file={file} setFile={setFile} />
                    <Input style={{ width: "100%" }} onChange={(e) => setWorkplace({ ...workplace, websiteUrl: e.target.value })} type="text" placeholder="Lien du site" />
                    <div className={classes.btnsContainer}>
                        <Button width={width} color="orange" className={`${classes.btn}`} onClick={(e) => handleSlide(e, 1)}>Retour</Button>
                        <Button disabled={workplace.name.length < 1} width={width} color={workplace.name.length < 1 ? "orange" : "orangeFill"} arrow={true} onClick={(e) => { handleSlide(e, 4) }} className={`${classes.btn}`}>Valider</Button>
                    </div>
                </div>
            </div>
            <div className={classes.slide}>
                <div className={classes.inputsContainer}>
                    <div className={classes.row}>
                        <Input style={{ width: "100%" }} onChange={(e) => setWorkplace({ ...workplace, address: { ...workplace.address, street: e.target.value } })} type="text" placeholder="Adresse" />
                        <Input style={{ width: "100%" }} onChange={(e) => setWorkplace({ ...workplace, address: { ...workplace.address, zipCode: e.target.value } })} type="text" placeholder="ZIP Code" />
                    </div>
                    <div className={classes.row}>
                        <Input style={{ width: "100%" }} onChange={(e) => setWorkplace({ ...workplace, address: { ...workplace.address, city: e.target.value } })} type="text" placeholder="City" />
                        <Input style={{ width: "100%" }} onChange={(e) => setWorkplace({ ...workplace, address: { ...workplace.address, country: e.target.value } })} type="text" placeholder="Country" />
                    </div>
                    <Input style={{ width: "100%" }} onChange={(e) => setWorkplace({ ...workplace, digitalAddress: { mobile: e.target.value } })} type="text" placeholder="Téléphone" />
                    <div className={classes.btnsContainer}>
                        <Button width={width} color="orange" className={`${classes.btn}`} onClick={(e) => handleSlide(e, 2)}>Retour</Button>
                        <Button width={width} color="orangeFill"
                            color={workplace.address.street.length < 5 || workplace.digitalAddress.mobile.length < 9 ? "orange" : "orangeFill"}
                            onClick={(e) => { handleSave(); handleSlide(e, 3) }}
                            className={`${classes.btn} ${workplace.name < 1 ? classes.disabled : ""}`}>Valider</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}