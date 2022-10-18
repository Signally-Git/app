import classes from "./btns.module.css";

const { default: Button } = require("Utils/Button/btn");

function Buttons({ cancelTxt, confirmTxt, onCancel, onConfirm, ...props }) {
    return (
        <div className={classes.container} {...props}>
            <Button
                color={"orange"}
                onClick={(e) => onConfirm(e)}
                type="submit"
            >
                {confirmTxt || "Confirmer"}
            </Button>
            <Button color={"brown"} onClick={(e) => onCancel(e)}>
                {cancelTxt || "Annuler"}
            </Button>
        </div>
    );
}

export default Buttons;
