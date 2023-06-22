import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import classes from "./Button.module.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Button({
    arrow,
    color,
    defaultBgColor,
    onClick,
    width,
    loading,
    children,
    hidden,
    disabled,
    ...props
}) {
    const buttonClasses = `
        ${classes.btn}
        ${classes[color]}
        ${defaultBgColor === "white" ? classes.whiteBg : ""}
        ${disabled ? classes.disabled : ""}
        ${hidden ? classes.hidden : ""}
         ${loading ? classes.loading : ""}
    `;

    return (
        <button
            {...props}
            style={{ width, ...props.style }}
            className={buttonClasses}
            onClick={onClick}
        >
            {arrow === "left" && !loading && (
                <BsArrowLeft className={classes.left} />
            )}
            {loading ? (
                <AiOutlineLoading3Quarters className={classes.loadingCircle} />
            ) : (
                children
            )}
            {arrow === true && !loading && <BsArrowRight />}
        </button>
    );
}
