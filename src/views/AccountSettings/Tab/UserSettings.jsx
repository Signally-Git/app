import { useState } from "react";
import classes from "../accountSettings.module.css";
import { useHistory } from "react-router-dom";
import Input from "Utils/Input/input";
import request from "Utils/Request/request";
import { useNotification } from "Utils/Notifications/notifications";
import Buttons from "Utils/Btns/buttons";
import { TokenService, SwitchLang } from "Utils";
import { FormattedMessage } from "react-intl";

function UserSettings() {
    const user = TokenService.getUser();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [position, setPosition] = useState(user?.position);
    const [mobile, setMobile] = useState(user?.phone);
    const [language, setLanguage] = useState(user?.lang || "");
    const [urlAgenda, setUrlAgenda] = useState(user?.urlAgenda || "");

    const notification = useNotification();
    let history = useHistory();

    const handleSavePersonal = async () => {
        const req = {
            firstName: firstName,
            lastName: lastName,
            position: position,
            phone: mobile,
            urlAgenda: urlAgenda,
            lang: language,
        };
        await request
            .patch(`users/${user.id}`, req, {
                headers: { "Content-Type": "application/merge-patch+json" },
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
                    <div className={classes.inputContainer}>
                        <label>
                            <FormattedMessage id="email" />
                        </label>
                        <Input disabled value={user.email} type="mail" />
                    </div>
                </div>
                <div className={classes.inputContainer}>
                    <label>
                        <FormattedMessage id="profile.informations.lang" />
                    </label>
                    <SwitchLang setUserLanguage={setLanguage} />
                </div>
            </div>
            <Buttons
                onCancel={() => {
                    history.goBack();
                }}
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