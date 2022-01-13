import { BsArrowRight } from "react-icons/bs";
import classes from './btn.module.css'

export default function Button({ arrow, color, onClick, width, children, hidden, disabled, ...props }) {
    return <button
        {...props}
        style={{ width, ...props.style }}
        className={`${classes.btn} ${classes[color]} ${disabled ? classes.disabled : ""} ${hidden ? classes.hidden : ""}`}
        onClick={onClick}>
        {children}{arrow === true ? <BsArrowRight /> : ""}
    </button>
}