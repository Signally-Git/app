import classes from './signature.module.css'
import SignaturePreviewImg from '../../../../assets/img/signallypreview.svg'
import { useEffect, useState } from 'react'
import { API } from '../../../../config'
import axios from 'axios'

const assignedTeams = false

function Signature(props) {
    props.handleHeader(props.model)
    props.create("")
    const [checkbox, setCheckbox] = useState([])
    const [isChanged, setIsChanged] = useState(false)
    const [teamsList, setTeamsList] = useState([])

    useEffect(async () => {
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/teams?access_token=${localStorage.getItem("token")}`).then((res) => {
            setTeamsList(res.data.data)
            
            console.log(teamsList)
        })
    }, [])

    return (<div className={classes.container}>
        <span className={classes.assignTo}>Assignée à  {checkbox.length > 1 ? `${checkbox.length} équipes` : checkbox.length === 1 ? `${checkbox.length} équipe` : "aucune équipe"}</span>
        <div className={`${classes.assignedContainer} ${classes.shadowed}`}>
            <div className={classes.previewContainer}>
                <img src={SignaturePreviewImg} alt="Signature preview" />
                <div className={classes.signText}>
                    <h3>Benjamin Morgaine</h3>
                    <p>CEO</p>
                    <h4>Signally</h4>
                    <p>44 Boulevard Hausmann 75009 Paris</p>
                    <p>T <span className={classes.orangeTxt}>0624927190</span> / M <span className={classes.orangeTxt}>0175298234</span></p>
                </div>
            </div>
            <hr className={classes.hr} />
            {assignedTeams ? 
            <ul className={`${classes.teamsList} ${classes.assignedTeams}`}>
                {/* {teamsList?.map((item, key) => {
                    return (
                        <li key={key}>
                            <label htmlFor={key}>
                                {item.name}
                            </label>
                            <input className={classes.checkbox} defaultChecked={checkbox.filter((check) => check === key) ? true : false} type="checkbox" id={key} onChange={(e) => { e.target.checked ? setCheckbox([...checkbox, e.target.id]) : setCheckbox(checkbox.filter(check => check !== e.target.id)) }} />
                            <span className={classes.checkmark}></span>
                        </li>)
                })} */}
            </ul> : null}
        </div>
        <span className={classes.assignTo}>Assigner cette signature à une autre équipe</span>
        <ul className={`${classes.teamsList} ${classes.shadowed}`}>
        {teamsList?.map((item, key) => {
                    return (
                        <li key={key}>
                            <label htmlFor={key}>
                                {item.name}
                            </label>
                            <input className={classes.checkbox} type="checkbox" id={key} onChange={(e) => { e.target.checked ? setCheckbox([...checkbox, e.target.id]) : setCheckbox(checkbox.filter(check => check !== e.target.id)) }} />
                            <span className={classes.checkmark}></span>
                        </li>)
                })}
        </ul>
        <button className={`${classes.saveCTA} ${isChanged && classes.orangeBtn}`}>Sauvegarder</button>
    </div>)
}

export default Signature