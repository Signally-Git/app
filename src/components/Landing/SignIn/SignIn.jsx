import classes from "../landing.module.css";
import { FormattedMessage, useIntl } from "react-intl";
import Input from "../../../Utils/Input/input";
import Button from "../../../Utils/Button/btn";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React, { useRef, useState } from "react";
import { TokenService, validateEmail } from "Utils";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ForgottenPassword } from "./ForgottenPassword";

export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [logging, setLogging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPass] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);
    const [error, setError] = useState({ content: "", disappear: false });
    const [modal, setModal] = useState(null);

    const slider = useRef(null);
    const toFocus = useRef(null);

    const intl = useIntl();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            handleScroll(e, 2000);
            setTimeout(() => {
                setLogging(true);
                toFocus.current.focus();
            }, 700);
        } else {
            setError({
                content: (
                    <>
                        <FormattedMessage id="message.error.invalid_email" />{" "}
                        <ImCross />
                    </>
                ),
                disappear: false,
            });
        }
    };

    const handleScroll = (e, scroll) => {
        e.preventDefault();
        setIsScrollable(true);
        slider.current.scroll({
            top: 0,
            left: scroll,
            behavior: "smooth",
        });
        setLogging(false);
        slider.current.scroll({
            top: 0,
            left: scroll,
            behavior: "smooth",
        });
        setIsScrollable(false);
    };
    const handleLogIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        const req = {
            username: email,
            password: code,
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/token/auth`,
                req
            );
            if (response.data.token) {
                const result = await axios.get(
                    `${process.env.REACT_APP_API_URL}/whoami`,
                    {
                        headers: {
                            Authorization: `Bearer ${response.data.token}`,
                        },
                    }
                );
                TokenService.setUser({ ...response.data, ...result.data });
                history.go(0);
            }
        } catch (error) {
            setError({
                content: (
                    <>
                        <FormattedMessage id="message.error.credentials" />{" "}
                        <ImCross />
                    </>
                ),
                disappear: false,
            });
            setLoading(false);
        }
    };

    return (
        <>
            <ForgottenPassword isOpen={modal} />
            <div className={classes.slider}>
                <div
                    ref={slider}
                    style={{
                        overflow: isScrollable ? "auto" : "hidden",
                    }}
                >
                    <div className={classes.formContainer}>
                        <h2>
                            <FormattedMessage id="signin.connect_to" />{" "}
                            <span>Signally</span>
                        </h2>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className={classes.inputContainer}>
                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                    }}
                                >
                                    <span
                                        className={`${classes.error} ${
                                            error.disappear
                                                ? classes.fadeOut
                                                : ""
                                        }`}
                                    >
                                        {error.content}
                                    </span>
                                    <Input
                                        autoComplete="email"
                                        style={{ width: "100%" }}
                                        placeholder={intl.formatMessage({
                                            id: "email",
                                        })}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        value={email}
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className={classes.submitContainer}>
                                <Button
                                    width={"50%"}
                                    color="orangeFill"
                                    type="submit"
                                    arrow
                                >
                                    <FormattedMessage id="buttons.placeholder.sign_in" />
                                </Button>
                                <Button
                                    width={"50%"}
                                    color="link-primary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        history.push("sign-up");
                                    }}
                                >
                                    <FormattedMessage id="buttons.placeholder.no_account" />
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className={classes.formContainer}>
                        <FormattedMessage id="enter_password" tagName="h2" />
                        <form onSubmit={(e) => handleLogIn(e)}>
                            <div className={classes.codeContainer}>
                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                    }}
                                >
                                    <span
                                        className={`${classes.error} ${
                                            error.disappear
                                                ? classes.fadeOut
                                                : ""
                                        }`}
                                    >
                                        {error.content}
                                    </span>
                                    <Input
                                        autoFocus={false}
                                        autoCorrect="off"
                                        disabled={!logging}
                                        autoCapitalize="off"
                                        autoComplete="current-password"
                                        defaultValue={code}
                                        ref={toFocus}
                                        placeholder={intl.formatMessage({
                                            id: "password",
                                        })}
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        onChange={(e) =>
                                            setCode(e.target.value)
                                        }
                                    />

                                    <div
                                        className={classes.showPassword}
                                        onClick={() =>
                                            setShowPass(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <FiEyeOff />
                                        ) : (
                                            <FiEye />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <span
                                onClick={() => setModal("")}
                                className={classes.forgot}
                            >
                                <FormattedMessage id="forgotten_password" />
                            </span>
                            <div className={classes.btnsContainer}>
                                <Button
                                    width={"50%"}
                                    color="orangeFill"
                                    type="submit"
                                >
                                    {loading ? (
                                        <AiOutlineLoading3Quarters
                                            strokeWidth="1"
                                            stroke="2px"
                                            fontWeight={"bolder"}
                                            className={classes.loading}
                                        />
                                    ) : (
                                        <FormattedMessage id="sign_in" />
                                    )}
                                </Button>
                                <Button
                                    width={"50%"}
                                    color="orange"
                                    onClick={(e) => {
                                        handleScroll(e, 0);
                                    }}
                                >
                                    <FormattedMessage id="buttons.placeholder.cancel" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
