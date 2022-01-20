import { useEffect, useRef, useState } from 'react'
import Button from 'Utils/Button/btn'
import Input from 'Utils/Input/input'
import classes from '../create.module.css'

import { useHistory } from 'react-router-dom'
import request from 'Utils/Request/request'
import { useNotification } from 'Utils/Notifications/notifications'
import { Box } from 'Assets/img/KUKLA/illustrations'
import CustomSelect from 'Utils/CustomSelect/customselect'

export default function CreateTeam() {
    const slide = useRef(null)
    const focus = useRef(null)
    const width = "12rem"
    const [workplaces, setWorkplaces] = useState([])
    const [workplace, setWorkplace] = useState("")
    const [teamName, setTeamName] = useState("")
    const history = useHistory()
    const notification = useNotification()

    const handleSave = async () => {


        const req = workplace !== "Aucun groupe" && workplace !== "" ? {
            workplace: workplace,
            name: teamName,
            organisation: JSON.parse(localStorage.getItem('user')).organisation
        } : { name: teamName, organisation: JSON.parse(localStorage.getItem('user')).organisation }
        const create = await request.post('teams', req).catch(
            () => notification({ content: <>La team <span style={{ color: "#FF7954" }}>{teamName}</span> n'a pas pu être créée</>, status: "invalid" }))
        console.log(create)
        create.data && notification({ content: <>La team <span style={{ color: "#FF7954" }}>{teamName}</span> a été créée avec succès</>, status: "valid" })
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
        const wps = await request.get('workplaces')
        if (wps.data["hydra:member"].length > 0) {
            wps.data["hydra:member"].unshift({ '@id': "Aucun groupe", name: "Aucun groupe" })
            setWorkplace(wps.data["hydra:member"][1]['@id'])
            setWorkplaces(wps.data["hydra:member"])
        }
    }

    useEffect(() => {
        getWorkplaces()
    }, [])

    return (<div className={classes.container}>
        {Box}
        <div className={classes.slidesContainer} ref={slide}>
        {!localStorage.getItem("understand_team") ? 
            <div className={`${classes.slide} ${classes.space}`}>
                <p>Créez vos équipes (Marketing, Vente, Corporate, Design, etc.). Ajoutez les membres de chaque équipe et associez leur une signature de mail spécifique.</p>
                <Button width="15rem" color="orange" arrow={true} onClick={(e) => {handleSlide(e, 1); localStorage.setItem('understand_team', true)}}>J'ai compris</Button>
            </div> : "" }
            <div className={classes.slide}>
                <div>
                    {workplaces.length > 0 && 
                    <CustomSelect display="name" getValue="@id" 
                    styleList={{ height: '15rem', paddingTop: '2.5rem'}}
                    items={workplaces} onChange={(e) => { setWorkplace(e); focus.current.focus() }} />}
                    <Input style={{ width: "100%" }} ref={focus} onChange={(e) => setTeamName(e.target.value)} type="text" placeholder="Nom de l'équipe" />

                    <div className={classes.btnsContainer}>
                        <Button width={width} color="orange" className={`${classes.btn}`} onClick={(e) => handleSlide(e, 2)}>Retour</Button>
                        <Button width={width} color="orangeFill"
                            color={teamName.length < 1 ? "orange" : "orangeFill"}
                            onClick={(e) => { handleSave(); handleSlide(e, 3) }}
                            className={`${classes.btn} ${teamName.length < 1 ? classes.disabled : ""}`}>Valider</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}