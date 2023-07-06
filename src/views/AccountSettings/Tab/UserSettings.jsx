import React, { useState } from "react";
import classes from "../accountSettings.module.css";
import { useHistory } from "react-router-dom";
import {
    Input,
    SwitchLang,
    NavigationButtons,
    CustomCheckbox,
} from "components";
import { TokenService, request, useNotification } from "utils";
import { FormattedMessage } from "react-intl";

function UserSettings() {
    const user = TokenService.getUser();
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [position, setPosition] = useState(user?.position || "");
    const [mobile, setMobile] = useState(user?.phone || "");
    const [language, setLanguage] = useState(user?.lang || "");
    const [deployed, setDeployed] = useState(user?.synchronizable || false);
    const [urlAgenda, setUrlAgenda] = useState(user?.urlAgenda || "");

    const notification = useNotification();
    let history = useHistory();

    const handleSavePersonal = async () => {
        setLoading(true);
        const req = {
            firstName: firstName,
            lastName: lastName,
            position: position,
            phone: mobile,
            urlAgenda: urlAgenda,
            synchronizable: deployed,
            lang: language["@id"] || language,
        };
        await request
            .patch(`users/${user.id}`, req, {
                headers: { "Content-Type": "application/merge-patch+json" },
            })
            .then(() => {
                notification({
                    content: (
                        <>
                            <span className={classes.primaryColor}>
                                {firstName} {lastName}{" "}
                            </span>
                            <FormattedMessage id="message.success.edit" />
                        </>
                    ),
                    status: "valid",
                });
            })
            .catch(() => {
                notification({
                    content: (
                        <>
                            <FormattedMessage id="message.error.edit" />
                            <span className={classes.primaryColor}>
                                {" "}
                                {firstName} {lastName}
                            </span>
                        </>
                    ),
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
                <div>
                    <div className={classes.row}>
                        <div className={classes.inputContainer}>
                            <label>
                                <FormattedMessage id="firstname" />
                            </label>
                            <Input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>
                                <FormattedMessage id="lastname" />
                            </label>
                            <Input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                type="text"
                            />
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.inputContainer}>
                            <label>
                                <FormattedMessage id="position" />
                            </label>
                            <Input
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>
                                <FormattedMessage id="mobile" />
                            </label>
                            <Input
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                type="tel"
                            />
                        </div>
                    </div>
                    <div className={classes.inputContainer}>
                        <label>
                            <FormattedMessage id="url_agenda" />
                        </label>
                        <Input
                            value={urlAgenda}
                            onChange={(e) => setUrlAgenda(e.target.value)}
                            type="text"
                            placeholder="https://calendly.com/"
                        />
                    </div>
                    <div>
                        <div className={classes.inputContainer}>
                            <label>
                                <FormattedMessage id="email" />
                            </label>
                            <Input disabled value={user?.email} type="mail" />
                        </div>
                        <div className={classes.inputContainer}>
                            <label className={classes.checkbox}>
                                <FormattedMessage id="deploy.cta" />
                                <CustomCheckbox
                                    onChange={(e) =>
                                        setDeployed(e.target.checked)
                                    }
                                    name="isDeployed"
                                    id="isDeployed"
                                    type="checkbox"
                                    defaultChecked={deployed}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div className={classes.inputContainer}>
                    <label>
                        <FormattedMessage id="profile.informations.lang" />
                    </label>
                    <SwitchLang setUserLanguage={setLanguage} />
                </div>
            </div>
            <NavigationButtons
                onCancel={() => {
                    history.goBack();
                }}
                loading={loading}
                confirmTxt=<FormattedMessage id="buttons.placeholder.save" />
                onConfirm={(e) => {
                    e.preventDefault();
                    handleSavePersonal();
                }}
            />
        </>
    );
}

export default UserSettings;
