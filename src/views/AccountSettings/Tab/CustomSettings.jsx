import classes from "../accountSettings.module.css";
import { Input, NavigationButtons } from "components";
import { TokenService, request } from "utils";
import DefineSocials from "../Customization/DefineSocials";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";

function CustomSettings() {
    const getValue = (search) => {
        const config = TokenService.getConfig();
        const configItem = config.find((item) => item.key === search);
        return configItem ? configItem.value : "";
    };

    const [wpName, setWpName] = useState(getValue("WORKPLACE_NAME"));
    const [teamName, setTeamName] = useState(getValue("TEAM_NAME"));
    const [userName, setUserName] = useState(getValue("USER_NAME"));
    const [socialsList, setSocialsList] = useState(
        TokenService.getOrganisation().socialMediaAccounts
    );

    const history = useHistory();

    const handleSaveCustomization = async () => {
        const data = {
            ConfigurationKeys: [
                { WORKPLACE_NAME: wpName },
                { TEAM_NAME: teamName },
                { USER_NAME: userName },
            ],
        };
        request
            .post("configurations", data)
            .then(() =>
                request("configurations").then((result) =>
                    TokenService.setConfig(result.data["hydra:member"])
                )
            );
    };

    return (
        <>
            <div className={classes.inputsContainer}>
                <div className={classes.inputContainer}>
                    <FormattedMessage id="workplaces" tagName="label" />
                    <Input
                        type="text"
                        value={wpName}
                        onChange={(e) => setWpName(e.target.value)}
                    />
                </div>
                <div className={classes.inputContainer}>
                    <FormattedMessage id="teams" tagName="label" />
                    <Input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                </div>
                <div className={classes.inputContainer}>
                    <FormattedMessage id="employees" tagName="label" />
                    <Input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
            </div>
            <div className={classes.socialsContainer}>
                <DefineSocials setList={setSocialsList} />
            </div>
            <NavigationButtons
                onCancel={() => {
                    history.goBack();
                }}
                confirmTxt=<FormattedMessage id="NavigationButtons.placeholder.save" />
                onConfirm={(e) => {
                    e.preventDefault();
                    handleSaveCustomization();
                }}
            />
        </>
    );
}

export default CustomSettings;
