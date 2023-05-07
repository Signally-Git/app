import Header from "components/Header/Header";
import React, { useEffect, useState } from "react";
import Button from "Utils/Button/btn";
import Input from "Utils/Input/input";
import CustomSelect from "Utils/CustomSelect/customselect";
import PluginsOutlook from "Assets/img/Plugins-Outlook.png";
import PluginsSoon from "Assets/img/Plugins-GA.png";
import Takeoff from "Assets/img/takeoff.png";

import classes from "../landing.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { FormattedMessage, useIntl } from "react-intl";

const Signup = () => {
    const intl = useIntl();
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [position, setPosition] = useState("");
    const [error, setError] = useState({ content: "", disappear: false });
    const [siren, setSiren] = useState("");
    const [societyName, setSocietyName] = useState("");
    const [password, setPassword] = useState("");
    const [nbPerson, setNbPerson] = useState();
    const [showPass, setShowPass] = useState(false);
    const [valid, setValid] = useState(false);
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const nbs = [
        {
            name: intl.formatMessage({
                id: "signup.number_of_employees_options.1-5",
            }),
        },
        {
            name: intl.formatMessage({
                id: "signup.number_of_employees_options.5-20",
            }),
        },
        {
            name: intl.formatMessage({
                id: "signup.number_of_employees_options.20-50",
            }),
        },
        {
            name: intl.formatMessage({
                id: "signup.number_of_employees_options.50-100",
            }),
        },
        {
            name: intl.formatMessage({
                id: "signup.number_of_employees_options.100+",
            }),
        },
    ];

    function validateSiren(siren) {
        var isValid = true;
        siren = siren.replace(/[^\d.-]/g, "");
        if (siren.length !== 9 || isNaN(siren)) isValid = false;
        return isValid;
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setError((a) => ({ ...a, disappear: true }));
        }, 5500);

        return () => clearTimeout(timeout);
    }, [error]);

    useEffect(() => {
        if (
            firstname.length > 0 &&
            lastname.length > 0 &&
            position.length > 0 &&
            password.length > 0 &&
            societyName.length > 0
        ) {
            if (validateEmail(email) && validateSiren(siren)) {
                setValid(true);
            } else {
                setValid(false);
            }
        } else setValid(false);
    }, [firstname, lastname, position, password, societyName, siren, email]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError({
                content: (
                    <>
                        <FormattedMessage id="message.error.email" />{" "}
                        <ImCross />
                    </>
                ),
            });
        }
        if (!validateSiren(siren)) {
            setError({
                content: (
                    <>
                        <FormattedMessage id="message.error.siren" />{" "}
                        <ImCross />
                    </>
                ),
            });
        }
        const req = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password,
            position: position,
            organisationName: societyName,
            employeeNumber: nbPerson,
            siren: siren,
        };
        if (valid) {
            setLoading(true);
            await axios
                .post(process.env.REACT_APP_API_URL + "/register", req)
                .then(() => {
                    setSent(true);
                })
                .catch((err) => {
                    if (
                        err?.response?.data?.title ===
                        "App\\Exception\\Organisation\\OrganisationWithSameSirenAlreadyExistsDomainException"
                    )
                        setError({
                            content: (
                                <>
                                    <FormattedMessage id="message.error.company_already_created" />{" "}
                                    <ImCross />
                                </>
                            ),
                        });
                    if (
                        err?.response?.data?.title ===
                        "App\\Exception\\User\\UserWithSameEmailAlreadyExistsDomainException"
                    )
                        setError({
                            content: (
                                <>
                                    <FormattedMessage id="message.error.user_already_created" />{" "}
                                    <ImCross />
                                </>
                            ),
                        });
                });
            setLoading(false);
        }
    };

    return (
        <div
            style={{ background: "#FFF", overflow: "hidden", height: "100vh" }}
        >
            <Header landing={true} />
            <div className={classes.container}>
                <div className={classes.registerContainer}>
                    <div className={classes.textIllustration}>
                        <img
                            alt="Rocket taking off"
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
                                    alt="Outlook compatible and ready plugin"
                                    className={classes.plugins}
                                    src={PluginsOutlook}
                                />
                                <img
                                    alt="Gmail & Apple Mail compatible and soon ready plugin"
                                    className={classes.plugins}
                                    src={PluginsSoon}
                                />
                            </div>
                        </div>
                    </div>
                    {sent ? (
                        <>
                            <div className={classes.congrats}>
                                <FormattedMessage
                                    id="signup.congratulations"
                                    values={{ firstname }}
                                    tagName="h2"
                                />
                                <FormattedMessage
                                    id="signup.accountCreated"
                                    tagName="p"
                                />
                                <FormattedMessage
                                    id="signup.checkMail"
                                    tagName="p"
                                />
                                <FormattedMessage
                                    id="signup.mailNotReceived"
                                    tagName="span"
                                />
                            </div>
                        </>
                    ) : (
                        <div
                            className={`${classes.formContainer} ${
                                sent ? classes.disappear : ""
                            }`}
                        >
                            <span
                                className={`${classes.error} ${
                                    error.disappear ? classes.fadeOut : ""
                                }`}
                            >
                                {error.content}
                            </span>
                            <form onSubmit={(e) => handleSignUp(e)}>
                                <div className={classes.inputs}>
                                    <div className={classes.inputContainer}>
                                        <label className={classes.inputTitle}>
                                            <FormattedMessage id="firstname" />
                                        </label>
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "flex",
                                            }}
                                        >
                                            <Input
                                                required
                                                autoComplete="given-name"
                                                placeholder="Jean"
                                                onChange={(e) =>
                                                    setFirstname(e.target.value)
                                                }
                                                value={firstname}
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div className={classes.inputContainer}>
                                        <label className={classes.inputTitle}>
                                            <FormattedMessage id="lastname" />
                                        </label>
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "flex",
                                            }}
                                        >
                                            <Input
                                                required
                                                autoComplete="family-name"
                                                placeholder="Dupont"
                                                onChange={(e) =>
                                                    setLastname(e.target.value)
                                                }
                                                value={lastname}
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={classes.inputs}>
                                    <div
                                        className={classes.inputContainer}
                                        style={{
                                            width: "35%",
                                            maxWidth: "35%",
                                        }}
                                    >
                                        <label className={classes.inputTitle}>
                                            <FormattedMessage id="position" />
                                        </label>
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "flex",
                                            }}
                                        >
                                            <Input
                                                required
                                                autoComplete="organization-title"
                                                placeholder="CEO"
                                                onChange={(e) =>
                                                    setPosition(e.target.value)
                                                }
                                                value={position}
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={classes.inputContainer}
                                        style={{
                                            width: "61%",
                                            maxWidth: "61%",
                                        }}
                                    >
                                        <label className={classes.inputTitle}>
                                            <FormattedMessage id="email" />
                                        </label>
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "flex",
                                            }}
                                        >
                                            <Input
                                                required
                                                placeholder="jean.dupont@signally.io"
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                                value={email}
                                                autoComplete="email"
                                                type="email"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.inputContainer}>
                                    <label className={classes.inputTitle}>
                                        <FormattedMessage id="password" />
                                    </label>
                                    <div
                                        style={{
                                            position: "relative",
                                            display: "flex",
                                        }}
                                    >
                                        <Input
                                            required
                                            placeholder={
                                                showPass
                                                    ? intl.formatMessage({
                                                          id: "password",
                                                      })
                                                    : "********"
                                            }
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            value={password}
                                            autoComplete="new-password"
                                            type={
                                                showPass ? "text" : "password"
                                            }
                                        />
                                        <div
                                            className={classes.showPassword}
                                            onClick={() =>
                                                setShowPass(!showPass)
                                            }
                                        >
                                            {showPass ? (
                                                <FiEyeOff />
                                            ) : (
                                                <FiEye />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.inputs}>
                                    <div className={classes.inputContainer}>
                                        <label className={classes.inputTitle}>
                                            <FormattedMessage id="company" />
                                        </label>
                                        <Input
                                            required
                                            autoComplete="organization"
                                            placeholder="Signally"
                                            onChange={(e) =>
                                                setSocietyName(e.target.value)
                                            }
                                            value={societyName}
                                            type="text"
                                        />
                                        <div className={classes.spacing}></div>
                                        <label className={classes.inputTitle}>
                                            <FormattedMessage id="siren" />
                                        </label>
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "flex",
                                                marginBottom: 15,
                                            }}
                                        >
                                            <Input
                                                required
                                                placeholder="443061841"
                                                onChange={(e) =>
                                                    setSiren(e.target.value)
                                                }
                                                value={siren}
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div className={classes.inputContainer}>
                                        <label className={classes.inputTitle}>
                                            <FormattedMessage id="number_of_employees" />
                                        </label>
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "flex",
                                            }}
                                        >
                                            <CustomSelect
                                                styleList={{
                                                    height: "10.5rem",
                                                }}
                                                onChange={(e) => setNbPerson(e)}
                                                items={nbs}
                                                getValue={"name"}
                                                display={"name"}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    style={{ width: "40%", marginTop: "1rem" }}
                                    defaultBgColor={"transparent"}
                                    color={valid ? "orangeFill" : "orange"}
                                    type="submit"
                                >
                                    {loading ? (
                                        <AiOutlineLoading3Quarters />
                                    ) : (
                                        <FormattedMessage id="buttons.placeholder.sign_up" />
                                    )}
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
