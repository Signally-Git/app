import Button from "Utils/Button/btn";
import classes from './modal.module.css'

export default function Modal({ title, content, cancel, validate, onCancel, onConfirm, ...props }) {
    return <div className={classes.container} {...props}>
        <h3>{title}</h3>
        {content ? <p>{content}</p> : ""}
        <div className={classes.btnsContainer}>
            <Button color="brown" onClick={() => onCancel()}>{cancel}</Button>
            <Button color="orange" onClick={() => onConfirm()}>{validate}</Button>
        </div>
    </div>
}