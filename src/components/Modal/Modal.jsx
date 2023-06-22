import { Button } from "components";
import classes from "./Modal.module.css";

export default function Modal({
    title,
    content,
    cancel,
    validate,
    onCancel,
    onConfirm,
    ...props
}) {
    return (
        <div className={classes.container} {...props}>
            <h3>{title}</h3>
            {content ? <p>{content}</p> : ""}
            <div className={classes.btnsContainer}>
                <Button color="secondary" onClick={() => onCancel()}>
                    {cancel}
                </Button>
                <Button color="primary" onClick={() => onConfirm()}>
                    {validate}
                </Button>
            </div>
        </div>
    );
}
