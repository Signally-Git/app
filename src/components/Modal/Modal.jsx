import { Button } from "components";
import classes from "./Modal.module.css";
import { useEffect, useRef } from "react";

export default function Modal({
    title,
    content,
    cancel,
    validate,
    onCancel,
    onConfirm,
    ...props
}) {
    const modalRef = useRef();

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onCancel();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm();
    };

    return (
        <div className={classes.overlay} onClick={handleClickOutside}>
            <div
                className={classes.container}
                {...props}
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
            >
                <h3>{title}</h3>
                <form onSubmit={handleSubmit}>
                    {content}
                    <div className={classes.btnsContainer}>
                        <Button
                            color="secondary"
                            type="button"
                            onClick={() => onCancel()}
                        >
                            {cancel}
                        </Button>
                        <Button color="primaryFill" type="submit">
                            {validate}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
