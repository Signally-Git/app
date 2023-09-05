import { Templates } from "./Templates/Templates";
import { Details } from "./Details/Details";
import classes from "./custom.module.css";
import { Images } from "./Images/Images";
import { Social } from "./Social/Social";
import { Addons } from "./Addons/Addons";

const COMPONENT_MAP = {
    Templates: Templates,
    Details: Details,
    Images: Images,
    Social: Social,
    Addons: Addons,
};

const CustomTab = ({ tab, template, setTemplate, styles, setStyles }) => {
    const Component = COMPONENT_MAP[tab];
    if (!Component) return null;

    return (
        <div className={classes.customTabContainer}>
            <Component
                styles={styles}
                setStyles={setStyles}
                selectedTemplate={template}
                setSelectedTemplate={setTemplate}
            />
        </div>
    );
};

export default CustomTab;
