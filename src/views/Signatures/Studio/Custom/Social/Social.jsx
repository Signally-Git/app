import DefineSocials from "views/AccountSettings/Customization/DefineSocials";
import { useState } from "react";
import classes from "./Social.module.css";
import SocialsRenderer from "./SocialsRenderer";

const Social = ({ styles, setStyles, selectedTemplate }) => {
    const [list, setList] = useState([]);
    if (!selectedTemplate?.signatureStyles) return null;
    return (
        <div className={classes.container}>
            <SocialsRenderer
                styles={styles}
                setStyles={setStyles}
                typesToShow={["socialMedias"]}
            />
            <DefineSocials setList={setList} />
        </div>
    );
};

export { Social };
