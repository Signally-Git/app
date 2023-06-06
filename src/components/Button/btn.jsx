import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import classes from "./btn.module.css";

export default function Button({
    arrow,
    color,
    defaultBgColor,
    onClick,
    width,
    children,
    hidden,
    disabled,
    ...props
}) {
    return (
        <button
            {...props}
            style={{ width, ...props.style }}
            className={`${classes.btn} ${classes[color]} ${
                defaultBgColor === "white" ? classes.whiteBg : ""
            } ${disabled ? classes.disabled : ""} ${
                hidden ? classes.hidden : ""
            }`}
            onClick={onClick}
        >
            {arrow === "left" ? <BsArrowLeft className={classes.left} /> : ""}
            {children}
            {arrow === true ? <BsArrowRight /> : ""}
        </button>
    );
}
