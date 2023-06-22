import classes from "./btns.module.css";
import { FormattedMessage } from "react-intl";

const { default: Button } = require("Utils/Button/btn");

function Buttons({ cancelTxt, confirmTxt, onCancel, onConfirm, ...props }) {
    return (
        <div className={classes.container} {...props}>
            <Button
                color={"orange"}
                onClick={(e) => onConfirm(e)}
                type="submit"
            >
                {confirmTxt || <FormattedMessage id="buttons.placeholder.save" />}
            </Button>
            <Button color={"brown"} onClick={(e) => onCancel(e)}>
                {cancelTxt || <FormattedMessage id="buttons.placeholder.cancel" />}
            </Button>
        </div>
    );
}

export default Buttons;
