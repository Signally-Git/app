import axios from "axios";
import classes from "../landing.module.css";
import { FormattedMessage, useIntl } from "react-intl";
import Button from "Utils/Button/btn";
import Input from "Utils/Input/input";
import React, { useRef, useState } from "react";

export const ForgottenPassword = ({ isOpen, setIsOpen }) => {
    const [email, setEmail] = useState("");

    const toFocusMail = useRef(null);

    const intl = useIntl();
    const handleForgotSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${process.env.REACT_APP_API_URL}/reset_password`, {
                email: email,
            })
            .then(() => {
                setIsOpen("done");
            });
    };

    if (isOpen === "done") {
        return (
            <div className={classes.modal}>
                <p>
                    <FormattedMessage id="message.success.sign_up.part1" />
                    <span className={classes.primaryTxt}> {email} </span>
                    <FormattedMessage id="message.success.sign_up.part2" />
                </p>
                <Button
                    color={"primary"}
                    width={"40%"}
                    onClick={() => setIsOpen(null)}
                >
                    <FormattedMessage id="buttons.placeholder.confirm" />
                </Button>
            </div>
        );
    } else if (isOpen !== null) {
        return (
            <form
                onSubmit={(e) => handleForgotSubmit(e)}
                className={classes.modal}
            >
                <h3>
                    <FormattedMessage id="reset_password" />
                </h3>
                <Input
                    ref={toFocusMail}
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="mail"
                    style={{ width: "100%" }}
                    autoComplete="email"
                    placeholder={intl.formatMessage({ id: "email" })}
                />
                <div className={classes.btnsContainer}>
                    <Button type="submit" color={"primaryFill"} width={"40%"}>
                        <FormattedMessage id="buttons.placeholder.send" />
                    </Button>
                    <Button
                        type="button"
                        color={"primary"}
                        width={"40%"}
                        onClick={() => setIsOpen(null)}
                    >
                        <FormattedMessage id="buttons.placeholder.cancel" />
                    </Button>
                </div>
            </form>
        );
    }
    return <></>;
};
