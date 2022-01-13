import { useEffect, useRef, useState } from 'react'
import Button from 'Utils/Button/btn'
import Input from 'Utils/Input/input'
import classes from '../create.module.css'

import { useHistory } from 'react-router-dom'
import request from 'Utils/Request/request'
import Select from 'Utils/Select/select'
import { useNotification } from 'Utils/Notifications/notifications'
import { Box } from 'Assets/img/KUKLA/illustrations'

export default function CreateUser() {
    const slide = useRef(null)
    const focus = useRef(null)
    const width = "12rem"
    const [teams, setTeams] = useState([])
    const [team, setTeam] = useState("")
    const [user, setUser] = useState({ firstName: "", lastName: "", position: "", email: "", phone: "" })
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
        const req = team !== "Aucun" ? {
            team: team,
            ...user
        } : { ...user }
        const create = await request.post('users', req).catch(
            () => notification({ content: <>Le collaborateur <span style={{ color: "#FF7954" }}>{user.firstName} {user.lastName}</span> n'a pas pu être créé.</>, status: "invalid" }))
        create.data && notification({ content: <>Le collaborateur <span style={{ color: "#FF7954" }}>{user.firstName} {user.lastName}</span> a été créé avec succès.</>, status: "valid" })
        history.push('/teams/users')
    }

    const handleSlide = async (e, multiple) => {
        e.preventDefault()
        slide.current.scrollTo({
            top: 0,
            left: slide.current.offsetWidth * multiple,
            behavior: 'smooth'
        })
    }


    const getTeams = async () => {
        const tms = await request.get('teams')
        if (tms.data["hydra:member"].length > 0) {
            tms.data["hydra:member"].unshift({ value: "Aucun", name: "Aucun", selected: false })
            setTeams(tms.data["hydra:member"])
            setTeam(tms.data["hydra:member"][1]['@id'])
        }
    }

    useEffect(() => {
        getTeams()
    }, [])

    return (<div className={classes.container}>
        {Box}
        <div className={classes.slidesContainer} ref={slide}>
            <div className={`${classes.slide} ${classes.space}`}>
                <p>Ajoutez l’ensemble de vos collaborateurs par l’import d’un simple fichier CSV ou manuellement.</p>
                <Button width="15rem" color="orange" arrow={true} onClick={(e) => handleSlide(e, 1)}>Ajouter un collaborateur</Button>
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
                    {teams.length > 0 &&
                        <Select items={teams} defaultValue={team} onChange={(e) => { setTeam(e.target?.value); focus.current.focus() }} onSubmit={(e) => console.log(e)} />}
                    <Input style={{ width: "100%" }} ref={focus} onChange={(e) => setUser({ ...user, firstName: e.target.value })} type="text" placeholder="Prénom" />
                    <Input style={{ width: "100%" }} onChange={(e) => setUser({ ...user, lastName: e.target.value })} type="text" placeholder="Nom" />
                    <div className={classes.btnsContainer}>
                        <Button width={width} color="orange" className={`${classes.btn}`} onClick={(e) => handleSlide(e, 1)}>Retour</Button>
                        <Button disabled={user.firstName.length < 1 || user.lastName.length < 1} width={width} color={user.firstName.length < 1 || user.lastName.length < 1 ? "orange" : "orangeFill"} arrow={true} onClick={(e) => { handleSlide(e, 4) }} className={`${classes.btn}`}>Valider</Button>
                    </div>
                </div>
            </div>
            <div className={classes.slide}>
                <div>
                    <Input style={{ width: "100%" }} onChange={(e) => setUser({ ...user, position: e.target.value })} type="text" placeholder="Poste" />
                    <Input style={{ width: "100%" }} onChange={(e) => setUser({ ...user, email: e.target.value })} type="text" placeholder="Adresse mail" />
                    <Input style={{ width: "100%" }} onChange={(e) => setUser({ ...user, phone: e.target.value })} type="text" placeholder="Téléphone" />
                    <div className={classes.btnsContainer}>
                        <Button width={width} color="orange" className={`${classes.btn}`} onClick={(e) => handleSlide(e, 2)}>Retour</Button>
                        <Button disabled={user.position.length < 1 || user.email.length < 1}
                            width={width} color={user.position.length < 1 || user.email.length < 1 ? "orange" : "orangeFill"}
                            onClick={(e) => { handleSave(); handleSlide(e, 4) }} className={`${classes.btn}`}>Valider</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}