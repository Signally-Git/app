import classes from "./SignInForm.module.css";
import axios from "axios";
import React, { useState } from "react";
import MagicLink from "Assets/img/magic-link.png";
import { useHistory } from "react-router";
import { FormattedMessage, useIntl } from "react-intl";

function SignInForm() {
    const [mail, setMail] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState(0);
    const history = useHistory();
    const intl = useIntl();

    const handleSignIn = async (e) => {
        e.preventDefault();
        await axios
            .get(
                `${process.env.REACT_APP_API_URL}/auth/magiclink/login?email=${mail}&code=${code}`
            )
            .then((res) => {
                localStorage.setItem("token", res.data.authData.access_token);
                localStorage.setItem("user_id", res.data.authData.user_id);
                localStorage.setItem(
                    "organisation_id",
                    res.data.authData.organisation_id
                );
            });
        history.push("/dashboard");
    };

    const handleMagicLink = async (e) => {
        e.preventDefault();
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(mail).toLowerCase())) {
            await axios
                .get(
                    `${process.env.REACT_APP_API_URL}/auth/magiclink/send?email=${mail}`
                )
                .then((res) => {
                    setCode(res.data.code);
                });
            setStep(1);
        }
    };

    if (step === 0) {
        return (
            <div className={classes.container}>
                <img src={MagicLink} alt="MagicLink" />
                <FormattedMessage id="signup.magic_link" tagName="p" />
                <form onSubmit={(e) => handleMagicLink(e)}>
                    <input
                        autoFocus
                        type="mail"
                        value={mail}
                        onChange={(mail) => setMail(mail.target.value)}
                        placeholder={intl.formatMessage({ id: "email" })}
                    />
                    <FormattedMessage
                        id="buttons.placeholder.magic_link"
                        tagName="button"
                    />
                </form>
            </div>
        );
    } else {
        return (
            <div className={classes.container}>
                <img src={MagicLink} alt="MagicLink" />
                <FormattedMessage
                    id="buttons.placeholder.magic_link"
                    values={{ email: mail }}
                    tagName="p"
                />
                <FormattedMessage id="signup.no_mail" tagName="p" />
                <span className={classes.verify} onClick={() => setStep(0)}>
                    <FormattedMessage id="signup.check_email" />
                </span>
                <form onSubmit={(e) => handleSignIn(e)}>
                    <input
                        autoFocus
                        type="tel"
                        value={code}
                        onChange={(code) => setCode(code.target.value)}
                        placeholder={intl.formatMessage({ id: "code" })}
                    />
                    <FormattedMessage
                        id="buttons.placeholder.sign_in"
                        tagName="button"
                    />
                </form>
            </div>
        );
    }
}

export default SignInForm;
