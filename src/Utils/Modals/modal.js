import Button from "Utils/Button/btn";
import classes from './modal.module.css'

export default function Modal({ title, content, cancel, validate, onCancel, onConfirm}) {
    return <div className={classes.container}>
        <h3>{title}</h3>
        {content ? <p>{content}</p> : ""}
        <div className={classes.btnsContainer}>
            <Button color="orange" onClick={() => onCancel()}>{cancel}</Button>
            <Button color="orangeFill" onClick={() => onConfirm()}>{validate}</Button>
        </div>
    </div>
}