import classes from "./btns.module.css";
import { FormattedMessage } from "react-intl";
import { Button } from "components";

function NavigationButtons({
    cancelTxt,
    confirmTxt,
    loading,
    onCancel,
    onConfirm,
    ...props
}) {
    return (
        <div className={classes.container} {...props}>
            <Button
                loading={loading}
                color={"primaryFill"}
                onClick={(e) => onConfirm(e)}
                type="submit"
            >
                {confirmTxt || (
                    <FormattedMessage id="buttons.placeholder.save" />
                )}
            </Button>
            <Button color={"primary"} onClick={(e) => onCancel(e)}>
                {cancelTxt || (
                    <FormattedMessage id="buttons.placeholder.cancel" />
                )}
            </Button>
        </div>
    );
}

export default NavigationButtons;
