import { CustomisableInput } from "../Details/CustomisableInput";
import DefineSocials from "views/AccountSettings/Customization/DefineSocials";
import { useState } from "react";

const Social = ({ selectedTemplate }) => {
    const [list, setList] = useState([]);
    if (!selectedTemplate?.signatureStyles) return null;
    if (!selectedTemplate.signatureStyles.includes("social"))
        return <span>No socials</span>;
    return (
        <>
            <CustomisableInput defaultValue="Follow us" />
            <DefineSocials setList={setList} />
        </>
    );
};

export { Social };
