import { useEffect, useRef, useState } from 'react'
import Button from 'Utils/Button/btn'
import Input from 'Utils/Input/input'
import classes from '../create.module.css'

import { useHistory } from 'react-router-dom'
import request from 'Utils/Request/request'
import Select from 'Utils/Select/select'
import { useNotification } from 'Utils/Notifications/notifications'
import { Box } from 'Assets/img/KUKLA/illustrations'
import UploadFile from 'Utils/Upload/uploadFile'

export default function CreateWorkplace() {
    const slide = useRef(null)
    const [file, setFile] = useState()
    const width = "12rem"
    const [workplace, setWorkplace] = useState(
        {
            logos: [],
            name: "",
            organisation: JSON.parse(localStorage.getItem('user')).organisation,
            address: {
                street: "",
                streetInfo: ""
            },
            digitalAddress: { mobile: "" }
        })
    const history = useHistory()
    const notification = useNotification()

    const handleCSV = async (file) => {
        const csv = new FormData()
        const url = `import/organisation/${JSON.parse(localStorage.getItem('user')).organisation.replace("/organisations/", "")}/workplaces`

        csv.append('file', file)

        await request.post(url, csv)
            .then((res) => {
                // props.setState(`${res.data["hydra:totalItems"]} ${props.fill.type} ajoutés`)
                history.push(`/teams/workplaces`)
            }).catch(() => notification({ content: <>Une erreur s'est produite lors de l'import</>, status: "invalid" }))
    }

    const handleSave = async () => {
        const req = {
            ...workplace
        }
        const create = await request.post('workplaces', req).catch(
            () => notification({ content: <>Le workplace <span style={{ color: "#FF7954" }}>{workplace.name}</span> n'a pas pu être créé</>, status: "invalid" }))
        create.data && notification({ content: <>Le workplace <span style={{ color: "#FF7954" }}>{workplace.name}</span> a été créé avec succès</>, status: "valid" })
        history.push('/teams/workplaces')
    }

    const handleSlide = async (e, multiple) => {
        e.preventDefault()
        slide.current.scrollTo({
            top: 0,
            left: slide.current.offsetWidth * multiple,
            behavior: 'smooth'
        })
    }

    return (<div className={classes.container}>
        {Box}
        <div className={classes.slidesContainer} ref={slide}>
        {!localStorage.getItem("understand_workplace") ? 
            <div className={`${classes.slide} ${classes.space}`}>
                <p>Administrez les signatures de vos équipes par pays, villes, filiales, départements etc. selon la structure de votre organisation.</p>
                <Button width="15rem" color="orange" arrow={true} onClick={(e) => {handleSlide(e, 1); localStorage.setItem('understand_workplace', true)}}>J'ai compris</Button>
            </div> : "" }
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
                    <Input style={{ width: "100%" }} onChange={(e) => setWorkplace({ ...workplace, name: e.target.value })} type="text" placeholder="Nom du workplace" />
                    <UploadFile placeholder="Importer un logo" setFile={setFile} />
                    <div className={classes.btnsContainer}>
                        <Button width={width} color="orange" className={`${classes.btn}`} onClick={(e) => handleSlide(e, 1)}>Retour</Button>
                        <Button disabled={workplace.name.length < 1} width={width} color={workplace.name.length < 1 ? "orange" : "orangeFill"} arrow={true} onClick={(e) => { handleSlide(e, 4) }} className={`${classes.btn}`}>Valider</Button>
                    </div>
                </div>
            </div>
            <div className={classes.slide}>
                <div className={classes.inputsContainer}>
                    <Input style={{ width: "100%" }} onChange={(e) => setWorkplace({ ...workplace, address: { ...workplace.address, street: e.target.value } })} type="text" placeholder="Adresse" />
                    <Input style={{ width: "100%" }} onChange={(e) => setWorkplace({ ...workplace, address: { ...workplace.address, streetInfo: e.target.value } })} type="text" placeholder="Adresse 2" />
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