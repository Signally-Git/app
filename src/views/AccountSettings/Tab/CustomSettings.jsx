import classes from "../accountSettings.module.css";
import { Input, NavigationButtons } from "components";
import { TokenService, request, useNotification } from "utils";
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

    const [wpName, setWpName] = useState(getValue("WORKPLACE_NAME") || "");
    const [teamName, setTeamName] = useState(getValue("TEAM_NAME") || "");
    const [userName, setUserName] = useState(getValue("USER_NAME") || "");
    const [socialsList, setSocialsList] = useState(
        TokenService.getOrganisation()?.socialMediaAccounts
    );
    const [loading, setLoading] = useState(false);

    const notification = useNotification();
    const history = useHistory();

    const handleSaveCustomization = async () => {
        setLoading(true);
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
                request("configurations").then((result) => {
                    TokenService.setConfig(result.data["hydra:member"]);
                    notification({
                        content: <FormattedMessage id="message.success.edit" />,
                        status: "valid",
                    });
                })
            )
            .catch(() => {
                notification({
                    content: <FormattedMessage id="message.error.edit" />,
                    status: "invalid",
                });
            })
            .finally(() => {
                setLoading(false);
            });
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
                loading={loading}
                confirmTxt=<FormattedMessage id="buttons.placeholder.save" />
                onConfirm={(e) => {
                    e.preventDefault();
                    handleSaveCustomization();
                }}
            />
        </>
    );
}

export default CustomSettings;
