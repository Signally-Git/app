import classes from './signature.module.css'
import SignaturePreviewImg from '../../../../assets/img/signallypreview.svg'
import { useState } from 'react'

const teamsList = ["Mes employés", "Marketing", "Vente", "Design", "Tech"]

function Signature(props) {
    props.handleHeader(props.model)
    props.create("")
    const [checkbox, setCheckbox] = useState([])

    return (<div className={classes.container}>
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
            <span className={classes.assignTo}>Assignée à {checkbox.length} {checkbox.length > 1 ? "groupes" : "groupe"}</span>
            <ul className={classes.teamsList}>
                        {teamsList.map((item, key) => {
                            console.log(checkbox)
                            return (
                                <li key={key}>
                                    <label htmlFor={key}>
                                        {item}
                                    </label>
                                    <input className={classes.checkbox} type="checkbox" id={key} onChange={(e) => {e.target.checked ? setCheckbox([...checkbox, e.target.id]) : setCheckbox(checkbox.filter(check => check !== e.target.id)) }}/>
                                    <span className={classes.checkmark}></span>
                                </li>)
                        })}
                    </ul>
        </div>)
}

export default Signature