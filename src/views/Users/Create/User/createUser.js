import { useEffect, useRef, useState } from "react";
import Button from "Utils/Button/btn";
import Input from "Utils/Input/input";
import classes from "../create.module.css";

import { useHistory } from "react-router-dom";
import request from "Utils/Request/request";
import CustomSelect from "Utils/CustomSelect/customselect";
import { useNotification } from "Utils/Notifications/notifications";
import { FormattedMessage, useIntl } from "react-intl";

export default function CreateUser({ setDone }) {
    const intl = useIntl();
    const number = !localStorage.getItem("understand_user") ? 0 : 1;
    const slide = useRef(null);
    const focus = useRef(null);
    const width = "12rem";
    const [teams, setTeams] = useState([]);
    const [roles] = useState([
        { name: intl.formatMessage({ id: "user" }), value: "ROLE_USER" },
        { name: intl.formatMessage({ id: "rh" }), value: "ROLE_RH" },
        {
            name: intl.formatMessage({ id: "administrator" }),
            value: "ROLE_ADMIN",
        },
    ]);
    const [role, setRole] = useState();
    const [team, setTeam] = useState("");
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        position: "",
        email: "",
        phone: "",
        urlAgenda: "",
        roles: ["ROLE_USER"],
    });
    const [hide, setHide] = useState(false);
    const history = useHistory();
    const notification = useNotification();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleCSV = async (file) => {
        const csv = new FormData();
        const url = `import/organisation/users`;

        csv.append("file", file);

        await request
            .post(url, csv)
            .then(() => {
                notification({
                    content: <FormattedMessage id="import.success" />,
                    status: "valid",
                });
                setDone(true);
                // props.setState(`${res.data["hydra:totalItems"]} ${props.fill.type} ajoutés`)
                if (window.location.hash === "#onboarding") history.goBack();
                else history.push(`/teams/users`);
            })
            .catch(() =>
                notification({
                    content: <FormattedMessage id="import.failed" />,
                    status: "invalid",
                })
            );
    };

    const handleSave = async () => {
        if (!validateEmail(user.email)) {
            notification({
                content: (
                    <>
                        <span className={classes.primaryColor}>
                            {user.email}{" "}
                        </span>
                        <FormattedMessage id="message.error.invalid_user_email" />
                    </>
                ),
                status: "invalid",
            });
            return false;
        }
        const req =
            team === "Aucune équipe" || !team
                ? user
                : {
                      team: team,
                      ...user,
                  };

        await request
            .post("users", req)
            .then(() => {
                notification({
                    content: (
                        <>
                            <FormattedMessage id="message.success.teams.edit_part1" />
                            <span className={classes.primaryColor}>
                                {" "}
                                {user.firstName} {user.lastName}{" "}
                            </span>
                            <FormattedMessage id="message.success.teams.edit_part2" />
                        </>
                    ),
                    status: "valid",
                });
                setDone(true);
                history.push("/teams/users");
            })
            .catch(({ response }) => {
                const error = response.data;
                if (
                    error.title ===
                    "App\\Exception\\User\\UserWithSameEmailAlreadyExistsDomainException"
                ) {
                    console.log(error);
                    notification({
                        content: (
                            <FormattedMessage id="message.error.user_already_created" />
                        ),
                        status: "invalid",
                    });
                } else {
                    notification({
                        content: (
                            <>
                                <span className={classes.primaryColor}>
                                    {error.detail}
                                </span>
                            </>
                        ),
                        status: "invalid",
                    });
                }
            });
    };

    const handleSlide = async (e, multiple) => {
        e.preventDefault();
        slide.current.scrollTo({
            top: 0,
            left: slide.current.offsetWidth * (multiple - number),
            behavior: "smooth",
        });
    };

    const getTeams = async () => {
        const tms = await request.get("teams");
        if (tms.data["hydra:member"].length > 0) {
            tms.data["hydra:member"].unshift({
                "@id": "Aucune équipe",
                name: "Aucune équipe",
            });
            setTeam(tms.data["hydra:member"][1]["@id"]);
            setTeams(tms.data["hydra:member"]);
        }
    };

    const handleAccept = async (e) => {
        handleSlide(e, 1);
        setTimeout(() => {
            setHide(true);
            slide.current.scrollTo({
                top: 0,
                left: 0,
            });
        }, 1000);
        localStorage.setItem("understand_user", true);
    };

    useEffect(() => {
        getTeams();
    }, []);

    return (
        <div className={classes.container}>
            <div className={classes.slidesContainer} ref={slide}>
                {!localStorage.getItem("understand_user") && hide === false ? (
                    <div className={`${classes.slide} ${classes.space}`}>
                        <FormattedMessage id="users_description" />
                        <Button
                            width="15rem"
                            color="orange"
                            arrow={true}
                            onClick={(e) => {
                                handleAccept(e);
                            }}
                        >
                            <FormattedMessage id="buttons.placeholder.confirm" />
                        </Button>
                    </div>
                ) : (
                    ""
                )}
                <div className={classes.slide}>
                    <Button
                        width={width}
                        color="orangeFill"
                        arrow={true}
                        className={classes.btn}
                        onClick={(e) => handleSlide(e, 2)}
                    >
                        <FormattedMessage id="manual" />
                    </Button>
                    <Button width={width} color="brown" className={classes.btn}>
                        {" "}
                        <input
                            type="file"
                            accept=".csv"
                            onChange={(e) => {
                                // handleSave()
                                handleCSV(e.target.files[0]);
                            }}
                        />
                        <FormattedMessage id="from_csv" />
                    </Button>
                </div>
                <div className={classes.slide}>
                    <form
                        onSubmit={(e) => {
                            handleSlide(e, 4);
                        }}
                    >
                        {teams.length > 0 && (
                            <CustomSelect
                                display="name"
                                getValue="@id"
                                styleList={{
                                    maxHeight: "15rem",
                                    paddingTop: "2.5rem",
                                }}
                                items={teams}
                                onChange={(e) => {
                                    setTeam(e);
                                    focus.current.focus();
                                }}
                                defaultValue={team}
                            />
                        )}
                        <Input
                            style={{ width: "100%" }}
                            ref={focus}
                            onChange={(e) =>
                                setUser({ ...user, firstName: e.target.value })
                            }
                            type="text"
                            placeholder={intl.formatMessage({
                                id: "firstname",
                            })}
                        />
                        <Input
                            style={{ width: "100%" }}
                            onChange={(e) =>
                                setUser({ ...user, lastName: e.target.value })
                            }
                            type="text"
                            placeholder={intl.formatMessage({ id: "lastname" })}
                        />
                        <div className={classes.btnsContainer}>
                            <Button
                                type="submit"
                                disabled={
                                    user.firstName.length < 1 ||
                                    user.lastName.length < 1
                                }
                                width={width}
                                color={
                                    user.firstName.length < 1 ||
                                    user.lastName.length < 1
                                        ? "orange"
                                        : "orangeFill"
                                }
                                arrow={true}
                                className={`${classes.btn}`}
                            >
                                <FormattedMessage id="buttons.placeholder.confirm" />
                            </Button>
                            <Button
                                width={width}
                                color="orange"
                                className={`${classes.btn}`}
                                onClick={(e) => handleSlide(e, 1)}
                            >
                                <FormattedMessage id="buttons.placeholder.cancel" />
                            </Button>
                        </div>
                    </form>
                </div>
                <div className={classes.slide}>
                    <form onSubmit={(e) => handleSlide(e, 2)}>
                        <div>
                            <CustomSelect
                                display="name"
                                getValue="value"
                                styleList={{
                                    maxHeight: "15rem",
                                    paddingTop: "2.5rem",
                                }}
                                items={roles}
                                onChange={(e) => {
                                    setRole(e);
                                    setUser({
                                        ...user,
                                        roles:
                                            role === "ROLE_USER"
                                                ? ["ROLE_USER"]
                                                : ["ROLE_USER", e],
                                    });
                                }}
                                defaultValue={role}
                            />
                            <Input
                                style={{ width: "100%" }}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        position: e.target.value,
                                    })
                                }
                                type="text"
                                placeholder={intl.formatMessage({
                                    id: "position",
                                })}
                            />
                            <Input
                                style={{ width: "100%" }}
                                onChange={(e) =>
                                    setUser({ ...user, email: e.target.value })
                                }
                                type="text"
                                placeholder={intl.formatMessage({
                                    id: "email",
                                })}
                            />
                            <Input
                                style={{ width: "100%" }}
                                onChange={(e) =>
                                    setUser({ ...user, phone: e.target.value })
                                }
                                type="text"
                                placeholder={intl.formatMessage({
                                    id: "mobile",
                                })}
                            />
                            {/* Todo: add a Phone number - default is organisation's */}
                            <Input
                                style={{ width: "100%" }}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        urlAgenda: e.target.value,
                                    })
                                }
                                type="text"
                                placeholder={intl.formatMessage({
                                    id: "url_agenda",
                                })}
                            />
                        </div>
                        <div className={classes.btnsContainer}>
                            <Button
                                disabled={
                                    user.position.length < 1 ||
                                    user.email.length < 1
                                }
                                width={width}
                                color={
                                    user.position.length < 1 ||
                                    user.email.length < 1
                                        ? "orange"
                                        : "orangeFill"
                                }
                                onClick={(e) => {
                                    handleSave();
                                    handleSlide(e, 4);
                                }}
                                className={`${classes.btn}`}
                            >
                                <FormattedMessage id="buttons.placeholder.confirm" />
                            </Button>
                            <Button
                                width={width}
                                color="orange"
                                className={`${classes.btn}`}
                                onClick={(e) => handleSlide(e, 2)}
                            >
                                <FormattedMessage id="buttons.placeholder.cancel" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
