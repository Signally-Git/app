import { FiEye, FiEyeOff } from "react-icons/fi";
import classes from "./VisibilityToggle.module.css";

function VisibilityToggle(props) {
    const handleToggle = () => {
        if (props.onChange) {
            props.onChange({
                target: {
                    checked: !props.checked,
                },
            });
        }
    };

    return (
        <label
            title={props?.title || null}
            onClick={handleToggle}
            className={classes.visibilityContainer}
        >
            {props.checked ? <FiEye {...props} /> : <FiEyeOff {...props} />}
        </label>
    );
}

export default VisibilityToggle;
