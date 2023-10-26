import React, { useEffect, useRef, useState } from "react";
import { Button, CustomSelect, Input, UploadFile, Popup } from "components";
import classes from "./create.module.css";
import { useHistory } from "react-router-dom";
import { request, useNotification, dataURItoBlob, fileToBase64 } from "utils";
import { FormattedMessage, useIntl } from "react-intl";

export default function CreateUser({ setDone }) {
    const intl = useIntl();
    const number = !localStorage.getItem("understand_user") ? 0 : 1;
    const slide = useRef(null);
    const focus = useRef(null);
    const width = "12rem";
    const [teams, setTeams] = useState([]);
    const [roles] = useState([
        { name: intl.formatMessage({ id: "roles.user" }), value: "ROLE_USER" },
        { name: intl.formatMessage({ id: "roles.rh" }), value: "ROLE_RH" },
        {
            name: intl.formatMessage({ id: "roles.administrator" }),
            value: "ROLE_ADMIN",
        },
    ]);
    const [role, setRole] = useState();
    const [team, setTeam] = useState("");
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        position: "",
        picture: "",
        linkPicture: "",
        email: "",
        phone: "",
        urlAgenda: "",
        roles: ["ROLE_USER"],
    });
    const [hide, setHide] = useState(false);
    const [uploadedMedia, setUploadedMedia] = useState();
    const [open, setOpen] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    const [preview, setPreview] = useState("");

    const history = useHistory();
    const notification = useNotification();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const uploadProfilePicture = async () => {
        const img = new FormData();
        img.append("file", dataURItoBlob(croppedImage));

        await request
            .post("import/file?destination=profile_picture", img)
            .then((res) => {
                const updatedUser = { ...user, profilePicture: res.data.url };
                setUser(updatedUser);
            })
            .catch(() => {
                notification({
                    content: (
                        <FormattedMessage id="message.error.profile_picture" />
                    ),
                    status: "invalid",
                });
            });
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
        if (uploadedMedia) {
            uploadProfilePicture();
        }

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

    useEffect(() => {
        if (!uploadedMedia) {
            setPreview(user.profilePicture || null);
            return;
        }
        const objectUrl = URL.createObjectURL(uploadedMedia);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [uploadedMedia]);

    useEffect(() => {
        setPreview(user.profilePicture || "");
    }, [user.profilePicture]);

    const handleUploadImage = async (image) => {
        if (image?.type === "image/gif") {
            setUploadedMedia(image);
            const imgBase64 = await fileToBase64(image);
            handleCroppedImage(imgBase64);
        } else {
            setUploadedMedia(image);
            setOpen(true);
        }
    };

    const handleCroppedImage = (image) => {
        setCroppedImage(image);
        setPreview(image);
        setOpen(false);
    };

    return (
        <div className={classes.container}>
            <div className={classes.slidesContainer} ref={slide}>
                {!localStorage.getItem("understand_user") && hide === false ? (
                    <div className={`${classes.slide} ${classes.space}`}>
                        <FormattedMessage id="users_description" />
                        <Button
                            width="15rem"
                            color="primary"
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
                        color="primaryFill"
                        arrow={true}
                        className={classes.btn}
                        onClick={(e) => handleSlide(e, 2)}
                    >
                        <FormattedMessage id="buttons.placeholder.manual" />
                    </Button>
                    <Button
                        width={width}
                        color="secondary"
                        className={classes.btn}
                    >
                        {" "}
                        <input
                            type="file"
                            accept=".csv"
                            onChange={(e) => {
                                handleCSV(e.target.files[0]);
                            }}
                        />
                        <FormattedMessage id="buttons.placeholder.from_csv" />
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
                        <div className={classes.inputsContainer}>
                            <div className={classes.inputContainer}>
                                <div className={classes.logoCompanyDiv}>
                                    {preview && (
                                        <img
                                            alt={`${user.firstName} ${user.lastName}`}
                                            className={classes.logoPreview}
                                            src={preview}
                                        />
                                    )}
                                    <UploadFile
                                        file={uploadedMedia}
                                        setFile={(e) => {
                                            handleUploadImage(e);
                                        }}
                                        removeFile={() => {
                                            setUploadedMedia(null);
                                            setPreview(null);
                                        }}
                                        placeholder={
                                            <FormattedMessage id="buttons.placeholder.import.profile_picture" />
                                        }
                                        style={{
                                            paddingTop: ".8rem",
                                            paddingBottom: ".8rem",
                                        }}
                                        type="image/*"
                                    />
                                    <Popup
                                        open={open}
                                        image={preview}
                                        handleClose={() => setOpen(false)}
                                        getCroppedFile={handleCroppedImage}
                                        aspectRatios={["1:1"]}
                                    />
                                </div>
                            </div>
                        </div>
                        <Input
                            style={{ width: "100%" }}
                            ref={focus}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    linkPicture: e.target.value,
                                })
                            }
                            type="text"
                            placeholder={intl.formatMessage({
                                id: "buttons.placeholder.import.profile_picture_link",
                            })}
                        />
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
                                        ? "primary"
                                        : "primaryFill"
                                }
                                arrow={true}
                                className={`${classes.btn}`}
                            >
                                <FormattedMessage id="buttons.placeholder.confirm" />
                            </Button>
                            <Button
                                width={width}
                                color="primary"
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
                                        ? "primary"
                                        : "primaryFill"
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
                                color="primary"
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
