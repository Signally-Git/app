import { useHistory } from "react-router-dom";
import classes from "./tiles.module.css";
export const Tile = ({
    title,
    icon,
    iconAlt,
    leftCorner,
    rightCorner,
    link,
}) => {
    const history = useHistory();
    return (
        <div onClick={() => history.push(link)} className={classes.tile}>
            <div className={classes.row}>
                <p>{title}</p>
                <img src={icon} alt={iconAlt} />
            </div>
            <div className={classes.row}>
                <div>
                    <span className={classes.bigTxt}>{leftCorner}</span>
                </div>
                <span className={classes.activeSpan}>{rightCorner}</span>
            </div>
        </div>
    );
};
