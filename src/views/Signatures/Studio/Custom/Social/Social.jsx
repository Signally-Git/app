import { CustomisableInput } from "components";
import DefineSocials from "views/AccountSettings/Customization/DefineSocials";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

const Social = ({ selectedTemplate }) => {
    const [list, setList] = useState([]);
    if (!selectedTemplate?.signatureStyles) return null;
    if (!selectedTemplate.signatureStyles.includes("social"))
        return <FormattedMessage id="message.warning.no_data" />;
    return (
        <>
            <CustomisableInput defaultValue="Follow us" />
            <DefineSocials setList={setList} />
        </>
    );
};

export { Social };
