import { BsArrowRight } from "react-icons/bs";
import classes from './btn.module.css'

export default function Button({ arrow, color, onClick, width, children, ...props }) {
    return <button
        {...props}
        style={{ width, ...props.style }}
        className={`${classes.btn} ${classes[color]}`}
        onClick={onClick}>
        {children}{arrow === true ? <BsArrowRight /> : ""}
    </button>
}