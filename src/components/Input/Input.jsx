import { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
    const handleChange = (e) => {
        e.preventDefault();
        props.onChange(e.target.value);
    };
    if (props.type === "textarea") {
        return (
            <textarea
                className={classes.input}
                onChange={handleChange}
                {...props}
            />
        );
    }
    return (
        <input
            ref={ref}
            className={classes.input}
            onChange={handleChange}
            {...props}
        />
    );
});

export default Input;
