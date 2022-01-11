import { useEffect, useRef, useState } from 'react'
import Button from 'Utils/Button/btn'
import Input from 'Utils/Input/input'
import classes from '../create.module.css'

import { useHistory } from 'react-router-dom'
import request from 'Utils/Request/request'
import Select from 'Utils/Select/select'
import { useNotification } from 'Utils/Notifications/notifications'
import { Box } from 'Assets/img/KUKLA/illustrations'

export default function CreateTeam() {
    const slide = useRef(null)
    const focus = useRef(null)
    const width = "15rem"
    const [workplaces, setWorkplaces] = useState([])
    const [workplace, setWorkplace] = useState("")
    const [teamName, setTeamName] = useState("")
    const history = useHistory()
    const notification = useNotification()

    const handleSave = async () => {
        const req = {
            workplace: workplace,
            name: teamName
        }
        const create = await request.post('teams', req).catch(
            () => notification({ content: <>La team <span style={{ color: "#FF7954" }}>{teamName}</span> n'a pas pu être créée.</>, status: "invalid" }))
            console.log(create)
        create.data && notification({ content: <>La team <span style={{ color: "#FF7954" }}>{teamName}</span> a été créée avec succès.</>, status: "valid" })
        history.push('/teams/teams')
    }

    const handleSlide = async (e, multiple) => {
        e.preventDefault()
        slide.current.scrollTo({
            top: 0,
            left: slide.current.offsetWidth * multiple,
            behavior: 'smooth'
        })
    }


    const getWorkplaces = async () => {
        console.log("here")
        const wps = await request.get('workplaces')
        if (wps.data["hydra:member"].length > 0)
        {
            setWorkplaces(wps.data["hydra:member"])
            setWorkplace(wps.data["hydra:member"][0]['@id'])
        }
    }

    useEffect(() => {
        getWorkplaces()
    }, [])

    return (<div className={classes.container}>
        {Box}
        <div className={classes.slidesContainer} ref={slide}>
            <div className={`${classes.slide} ${classes.space}`}>
                <p>Créez vos équipes (Marketing, Vente, Corporate, Design, etc.). Ajoutez les membres de chaque équipe et associez leur une signature de mail spécifique.</p>
                <Button width="15rem" color="orange" arrow={true} onClick={(e) => handleSlide(e, 1)}>Ajouter une équipe</Button>
            </div>
            <div className={classes.slide}>
                <div>
                    <Select items={workplaces} onChange={(e) => { setWorkplace(e.target?.value); focus.current.focus() }} onSubmit={(e) => console.log(e)} />
                    <Input style={{ width: "100%" }} ref={focus} onChange={(e) => setTeamName(e.target.value)} type="text" placeholder="Nom de l'équipe" />
                    <Button width={width} color="orangeFill" arrow={true} onClick={(e) => { handleSave(); handleSlide(e, 3) }} className={`${classes.btn} ${teamName.length < 1 ? classes.disabled : ""}`}>Valider</Button>
                    <button className={`${classes.btn} ${classes.back}`} onClick={(e) => handleSlide(e, 1)}>Retour</button>
                </div>
            </div>
        </div>
    </div>)
}