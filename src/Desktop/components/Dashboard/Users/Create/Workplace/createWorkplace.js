import { useEffect, useRef, useState } from 'react'
import Button from 'Utils/Button/btn'
import Input from 'Utils/Input/input'
import classes from '../create.module.css'

import { useHistory } from 'react-router-dom'
import request from 'Utils/Request/request'
import Select from 'Utils/Select/select'
import { useNotification } from 'Utils/Notifications/notifications'
import { Box } from 'Assets/img/KUKLA/illustrations'

export default function CreateWorkplace() {
    const slide = useRef(null)
    const width = "15rem"
    const [workplace, setWorkplace] = useState(
        {
            logos: [],
            name: "",
            address: {
                street: "",
                streetInfo: ""
            },
            digitalAddress: { phone: "" }
        })
    const history = useHistory()
    const notification = useNotification()

    const handleCSV = async (file) => {
        const csv = new FormData()
        const url = `import/organisation/users`

        csv.append('file', file)

        await request.post(url, csv)
            .then((res) => {
                // props.setState(`${res.data["hydra:totalItems"]} ${props.fill.type} ajoutés`)
                history.push(`/teams/users`)
            }).catch(() => notification({ content: <>Une erreur s'est produite lors de l'import.</>, status: "invalid" }))
    }

    const handleSave = async () => {
        const req = {
            ...workplace
        }
        const create = await request.post('workplaces', req).catch(
            () => notification({ content: <>Le workplace <span style={{ color: "#FF7954" }}>{workplace.name}</span> n'a pas pu être créé.</>, status: "invalid" }))
        create.data && notification({ content: <>Le workplace <span style={{ color: "#FF7954" }}>{workplace.name}</span> a été créé avec succès.</>, status: "valid" })
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
            <div className={`${classes.slide} ${classes.space}`}>
                <p>Administrez les signatures de vos équipes par pays, villes, filiales, départements etc. selon la structure de votre organisation.</p>
                <Button width="15rem" color="orange" arrow={true} onClick={(e) => handleSlide(e, 1)}>Ajouter un workplace</Button>
            </div>
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
                <div>
                    <Input style={{ width: "100%" }} onChange={(e) => setWorkplace({ ...workplace, name: e.target.value })} type="text" placeholder="Nom du workplace" />
                    <Input style={{ width: "100%" }} onChange={(e) => setWorkplace({ ...workplace, address: { ...workplace.address, street: e.target.value } })} type="text" placeholder="Adresse" />
                    <Input style={{ width: "100%" }} onChange={(e) => setWorkplace({ ...workplace, address: { ...workplace.address, streetInfo: e.target.value } })} type="text" placeholder="Adresse 2" />
                    <Input style={{ width: "100%" }} onChange={(e) => setWorkplace({ ...workplace, digitalAddress: { phone: e.target.value } })} type="text" placeholder="Téléphone" />
                    <Button width={width} color="orangeFill" arrow={true} onClick={(e) => { handleSave(); handleSlide(e, 3) }} className={`${classes.btn} ${workplace.name < 1 ? classes.disabled : ""}`}>Valider</Button>
                    <button className={`${classes.btn} ${classes.back}`} onClick={(e) => handleSlide(e, 1)}>Retour</button>
                </div>
            </div>
        </div>
    </div>)
}