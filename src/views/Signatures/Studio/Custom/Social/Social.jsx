import { CustomisableInput } from "../Details/CustomisableInput";
import DefineSocials from "views/AccountSettings/Customization/DefineSocials";
import { useState } from "react";

const Social = () => {
    const [list, setList] = useState([]);
    return (
        <>
            <CustomisableInput defaultValue="Follow us" />
            <DefineSocials setList={setList} />
        </>
    );
};

export { Social };
