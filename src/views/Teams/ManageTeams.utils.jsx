import { TokenService } from "utils";
import classes from "./ManageTeams.module.css";
import { Link } from "react-router-dom";

export const getMenuLink = (type, key, link) => {
    const configuration = TokenService.getConfig();
    const value = configuration.find((item) => item.key === key)?.value;
    const isActive = type === link ? classes.active : "";
    return (
        <li className={isActive}>
            <Link to={`/teams/${link}`}>{value}</Link>
        </li>
    );
};
