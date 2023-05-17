import React, { useEffect, useMemo, useRef, useState } from "react";
import classes from "../landing.module.css";

import Takeoff from "Assets/img/takeoff.png";
import PluginsOutlook from "Assets/img/Plugins-Outlook.png";
import PluginsSoon from "Assets/img/Plugins-GA.png";
import Button from "Utils/Button/btn";
import Input from "Utils/Input/input";
import { useHistory, useLocation } from "react-router-dom";
import request from "Utils/Request/request";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { TokenService } from "Utils";
import { FormattedMessage, useIntl } from "react-intl";

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const Login = () => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [logging, setLogging] = useState(false);
    const [showPassword, setShowPass] = useState(false);
    const slider = useRef(null);
    const toFocusMail = useRef(null);
    const toFocus = useRef(null);
    const [error, setError] = useState({ content: "", disappear: false });
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);

    const intl = useIntl();

    const history = useHistory();
    const query = useQuery();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    useEffect(() => {
        if (TokenService.getLocalToken()) history.push("/dashboard");
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setError((a) => ({ ...a, disappear: true }));
        }, 5500);

        return () => clearTimeout(timeout);
    }, [error]);

    useEffect(() => {
        async function redirectIfLogged() {
            if (query.get("user")) {
                setEmail(query.get("user"));
                const magicLink = await request.get(
                    `sign_in${window.location.search}`
                );
                axios
                    .get(`${process.env.REACT_APP_API_URL}/whoami`, {
                        headers: {
                            Authorization: `Bearer ${magicLink.data.token}`,
                        },
                    })
                    .then((result) => {
                        TokenService.setUser({
                            ...magicLink.data,
                            ...result.data,
                        });
                        history.push("/dashboard");
                    });
            }
        }
        redirectIfLogged();
    }, []);

    const handleScroll = (e, scroll) => {
        e.preventDefault();
        setIsScrollable(true);
        slider.current.scroll({
            top: 0,
            left: scroll,
            behavior: "smooth",
        });
        // setTimeout(() => {
        setLogging(false);
        slider.current.scroll({
            top: 0,
            left: scroll,
            behavior: "smooth",
        });
        setIsScrollable(false);
        // }, 300)
    };

    const handleForgotSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${process.env.REACT_APP_API_URL}/reset_password`, {
                email: email,
            })
            .then(() => {
                setModal("done");
            });
    };

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

    const handleLogIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        const req = {
            username: email,
            password: code,
        };

        await axios
            .post(`${process.env.REACT_APP_API_URL}/token/auth`, req)
            .then((response) => {
                if (response.data.token) {
                    axios
                        .get(`${process.env.REACT_APP_API_URL}/whoami`, {
                            headers: {
                                Authorization: `Bearer ${response.data.token}`,
                            },
                        })
                        .then((result) => {
                            TokenService.setUser({
                                ...response.data,
                                ...result.data,
                            });
                            history.go(0);
                        });
                }
            })
            .catch(() => {
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
            });
    };
    if (query.get("user")) return <></>;
    return (
        <div
            style={{ background: "#FFF", overflow: "hidden", height: "100vh" }}
        >
            {modal === "done" ? (
                <div className={classes.modal}>
                    <p>
                        <FormattedMessage id="message.success.sign_up.part1" />
                        <span className={classes.orangeTxt}> {email} </span>
                        <FormattedMessage id="message.success.sign_up.part2" />
                    </p>
                    <Button
                        color={"orange"}
                        width={"40%"}
                        onClick={() => setModal(false)}
                    >
                        <FormattedMessage id="buttons.placeholder.confirm" />
                    </Button>
                </div>
            ) : modal ? (
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
                        placeholder={<FormattedMessage id="email" />}
                    />
                    <div className={classes.btnsContainer}>
                        <Button
                            type="submit"
                            color={"orangeFill"}
                            width={"40%"}
                        >
                            <FormattedMessage id="buttons.placeholder.send" />
                        </Button>
                        <Button
                            type="button"
                            color={"orange"}
                            width={"40%"}
                            onClick={() => setModal(false)}
                        >
                            <FormattedMessage id="buttons.placeholder.cancel" />
                        </Button>
                    </div>
                </form>
            ) : (
                ""
            )}
            <div className={classes.container}>
                <div className={classes.logInContainer}>
                    <div className={classes.textIllustration}>
                        <img
                            alt="Take off"
                            className={classes.takeoff}
                            src={Takeoff}
                        />
                        <div className={classes.descriptionBeta}>
                            <FormattedMessage id="welcome.title" tagName="h1" />
                            <FormattedMessage id="welcome.intro" tagName="p" />
                            <FormattedMessage
                                id="welcome.description1"
                                tagName="p"
                            />
                            <FormattedMessage
                                id="welcome.description2"
                                tagName="p"
                            />
                            <FormattedMessage id="welcome.thanks" tagName="p" />
                            <FormattedMessage
                                id="welcome.signature"
                                tagName="p"
                            />
                            <br />
                            <div>
                                <img
                                    alt="Outlook"
                                    className={classes.plugins}
                                    src={PluginsOutlook}
                                />
                                <img
                                    alt="Soon Gmail & Apple Mail"
                                    className={classes.plugins}
                                    src={PluginsSoon}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classes.slider}>
                        <span
                            className={`${classes.error} ${
                                error.disappear ? classes.fadeOut : ""
                            }`}
                        >
                            {error.content}
                        </span>
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
                                            <Input
                                                autoComplete="email"
                                                style={{ width: "100%" }}
                                                placeholder={intl.formatMessage(
                                                    { id: "email" }
                                                )}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                value={email}
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        width={"30%"}
                                        color="orangeFill"
                                        type="submit"
                                        arrow
                                    >
                                        <FormattedMessage id="buttons.placeholder.sign_in" />
                                    </Button>
                                </form>
                            </div>
                            <div className={classes.formContainer}>
                                <FormattedMessage
                                    id="enter_password"
                                    tagName="h2"
                                />
                                <form onSubmit={(e) => handleLogIn(e)}>
                                    <div className={classes.codeContainer}>
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "flex",
                                            }}
                                        >
                                            <Input
                                                autoFocus={false}
                                                autoCorrect="off"
                                                disabled={!logging}
                                                autoCapitalize="off"
                                                autoComplete="current-password"
                                                defaultValue={code}
                                                ref={toFocus}
                                                placeholder={intl.formatMessage(
                                                    { id: "password" }
                                                )}
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
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
                                        onClick={() => setModal(true)}
                                        className={classes.forgot}
                                    >
                                        <FormattedMessage id="forgotten_password" />
                                    </span>
                                    <div className={classes.btnsContainer}>
                                        <Button
                                            width={"30%"}
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
                                            width={"30%"}
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
                </div>
            </div>
        </div>
    );
};

export default Login;
