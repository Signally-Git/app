import { Link } from "react-router-dom"
import classes from './signatures.module.css'
import { useSwipeable } from "react-swipeable"
import Cross from '../../../assets/icons/cross.svg'
import { useEffect, useState } from "react"
import RenderHTML from "./createSignature/RenderHTML/RenderHTML"
import axios from "axios"
import { API } from "../../../config"

export default function SingleSignature(props) {
    useEffect(() => {
        props.create("/create-signature")
        props.handleHeader("Signatures")
    }, [props.data])

    const [editing, setEditing] = useState(false)
    const handlers = useSwipeable({
        onSwipedLeft: () => setEditing(true), onSwipedRight: () => setEditing(false),
    });
    const deleteSignature = (id) => {
        axios.delete(`${API}template/${id}?access_token=${localStorage.getItem("token")}`).then((res) => {
            setEditing(false)
            props.deleted(true)
        })
    }
    return (<li {...handlers} className={classes.activeSignature} key={props.template.id} id={props.index}>
            <h2 className={classes.active}>{props.template.name}</h2>
        <Link to={`signatures/${props.template.id}`} className={`${classes.swipeable} ${editing && classes.editing}`} >
            <RenderHTML data={props.data} template={props.template.signatureData} />
        </Link>
        <div className={classes.onSwipe}>
            <img className={classes.chevron} src={Cross} alt="delete" onClick={() => deleteSignature(props.template.id)} />
        </div>
    </li>)
}