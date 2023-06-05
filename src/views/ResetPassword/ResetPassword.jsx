import Header from "components/Header/Header";
import Button from "Utils/Button/btn";
import Input from "Utils/Input/input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import classes from "./ResetPassword.module.css";
import React, { useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function ResetPassword() {
    const token = useQuery();
    const [showPass, setShowPass] = React.useState(false);
    const [newPass, setNewPass] = React.useState(" ");
    const [confirm, setConfirm] = React.useState("");
    const [done, setDone] = React.useState(false);
    const [error, setError] = React.useState("");
    const history = useHistory();
    const intl = useIntl();

    const handleSubmit = (e) => {
        e.preventDefault();
        const req = {
            password: confirm,
        };
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/reset/${token
                    .toString()
                    .replace("token=", "")}`,
                req
            )
            .then(() => {
                setDone(true);
                setTimeout(() => {
                    history.push("/sign-in");
                }, 2500);
            })
            .catch((err) => console.log(err));
        setDone(true);
        setTimeout(() => {
            history.push("/sign-in");
        }, 2500);
    };

    useEffect(() => {
        if (newPass === confirm) setError("");
    }, [newPass, confirm]);

    return (
        <>
            <Header landing />
            {!done ? (
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    style={{
                        display: "flex",
                        height: "80vh",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    <FormattedMessage id="reset_password" tagName="h1" />
                    <div className={classes.passwordContainer}>
                        <Input
                            onChange={(e) => setNewPass(e.target.value)}
                            style={{ width: "20rem", fontWeight: "bold" }}
                            type={!showPass ? "password" : "text"}
                            placeholder={intl.formatMessage({
                                id: "new_password",
                            })}
                        />
                        <div onClick={() => setShowPass(!showPass)}>
                            {showPass ? <FiEyeOff /> : <FiEye />}
                        </div>
                    </div>

                    <Input
                        onChange={(e) => setConfirm(e.target.value)}
                        onBlur={() => {
                            newPass !== confirm &&
                                setError(
                                    intl.formatMessage({
                                        id: "check_passwords",
                                    })
                                );
                        }}
                        style={{ width: "20rem" }}
                        type={!showPass ? "password" : "text"}
                        placeholder={intl.formatMessage({ id: "new_password" })}
                    />
                    <p className={classes.error}>{error}</p>
                    <Button
                        color={
                            newPass === confirm && newPass.length > 1
                                ? "primaryFill"
                                : "primary"
                        }
                        disabled={
                            newPass !== confirm ? true : !(newPass.length > 1)
                        }
                    >
                        <FormattedMessage id="buttons.placeholder.reset" />
                    </Button>
                </form>
            ) : (
                <div className={classes.success}>
                    <FormattedMessage id="reset_password.thanks" tagName="h2" />
                    <FormattedMessage
                        id="reset_password.password_reset"
                        tagName="p"
                    />
                    <FormattedMessage
                        id="reset_password.redirect"
                        tagName="p"
                    />
                </div>
            )}
        </>
    );
}
