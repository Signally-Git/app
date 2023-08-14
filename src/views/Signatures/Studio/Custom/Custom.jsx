import { Templates } from "./Templates/Templates";
import { Details } from "./Details/Details";
import classes from "./custom.module.css";

const COMPONENT_MAP = {
    Templates: Templates,
    Details: Details,
    // Images: Images,
    // Social: Social,
    // Addons: Addons
};

const Custom = ({ tab }) => {
    const Component = COMPONENT_MAP[tab];
    if (!Component) return null;

    return (
        <div className={classes.customTabContainer}>
            <Component />
        </div>
    );
};

export default Custom;
