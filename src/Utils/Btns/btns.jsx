import classes from './btns.module.css';

const { default: Button } = require("Utils/Button/btn");

function Btns({ cancelTxt, confirmTxt, onCancel, onConfirm, ...props }) {

    return (<div className={classes.container} {...props}>
        <Button color={"brown"} onClick={(e) => onCancel(e)}>{cancelTxt || "Annuler"}</Button>
        <Button color={"orange"} onClick={(e) => onConfirm(e)}>{confirmTxt || "Confirmer"}</Button>
    </div>)
}

export default Btns