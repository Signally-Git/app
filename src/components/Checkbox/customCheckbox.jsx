import classes from "./customCheckbox.module.scss";

function CustomCheckbox(props) {
    return (
        <label title={props?.title || null} className={classes.switch}>
            <input type="checkbox" {...props} />
            <span className={`${classes.slider} ${classes.round}`}></span>
        </label>
    );
}

export default CustomCheckbox;
