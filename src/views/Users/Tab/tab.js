import { HiOutlineSearch } from "react-icons/hi";
import React, { useEffect, useRef, useState } from "react";
import classes from "./tab.module.css";
import { FiCheck, FiTrash } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { Button, Input, UploadFile } from "components";
import { Link } from "react-router-dom";
import CreateTeam from "../Create/createTeam";
import CreateUser from "../Create/createUser";
import CreateWorkplace from "../Create/createWorkplace";
import UserTab from "./userTab";
import { TokenService, request, useNotification } from "utils";
import { FormattedMessage, useIntl } from "react-intl";

// Displays the current list
// Workplaces by default
// Teams or Users
// Assigns templates and structure

export default function Tab({
    tab,
    selected,
    setSelected,
    edit,
    setEdit,
    editInfo,
    setEditInfo,
}) {
    const intl = useIntl();
    const [changed, setChanged] = useState(false);
    const [addedWorkplace, setAddedWorkplace] = useState("");
    const [searchWorkplace, setSearchWorkplace] = useState("");
    const [searchTeam, setSearchTeam] = useState("");
    const toFocus = useRef(null);
    const [file, setFile] = useState();
    const [workplaces, setWorkplaces] = useState([]);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState({ type: "", name: "", id: "" });
    const [modalContent, setModalContent] = useState();
    const [workplaceName, setWorkplaceName] = useState("");
    const [teamName, setTeamName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");
    const [mobile, setMobile] = useState("");
    const [fax, setFax] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [done, setDone] = useState(false);
    const configuration = TokenService.getConfig();
    let time;

    const notification = useNotification();
    // Variables for creation modals

    // Gathering data
    const getDataWorkspace = async () => {
        const workplaces = await request.get("workplaces");
        setWorkplaces(workplaces.data["hydra:member"]);
    };

    const getDataTeam = async () => {
        const teamsAPI = await request.get("teams");
        const teamsList = [];
        teamsAPI.data["hydra:member"].map((team) => {
            if (team.signature)
                request.get(team.signature["@id"]).then((res) => {
                    team["preview"] = res.data.preview;
                });
            teamsList.push(team);
        });
        setTeams([...teamsList]);
    };

    const refreshData = () => {
        getDataWorkspace();
        getDataTeam();
        setDone(false);
    };

    useEffect(() => {
        refreshData();
    }, [addedWorkplace, done, tab]);

    // Deletes either specified workplace, team or user
    const handleDelete = async (id, type, name) => {
        await request
            .delete(`${type}/${id}`)
            .then(() => {
                notification({
                    content: (
                        <>
                            <span className={classes.primaryColor}>{name}</span>{" "}
                            <FormattedMessage id="message.success.delete" />
                        </>
                    ),
                    status: "valid",
                });
                setModal({ type: "", name: "", id: "" });
            })
            .catch(() =>
                notification({
                    content: (
                        <>
                            <FormattedMessage id="message.error.delete" />{" "}
                            <span className={classes.primaryColor}>{name}</span>
                        </>
                    ),
                    status: "invalid",
                })
            );
        if (selected?.id === id) setSelected();
        await refreshData();
        setModal({ type: "", name: "", id: "" });
    };

    // Deletes either every workplace, every team or every user
    const handleDeleteAll = async (type) => {
        let count = 0;

        switch (type) {
            case "workplaces":
                const wps = workplaces;
                for (let index = 0; index < wps.length; index++) {
                    const element = wps[index];
                    request
                        .delete(`workplaces/${element.id}`)
                        .then(() => {
                            notification({
                                content: (
                                    <>
                                        <span className={classes.primaryColor}>
                                            {element.name}
                                        </span>{" "}
                                        <FormattedMessage id="message.success.delete" />
                                    </>
                                ),
                                status: "valid",
                            });
                            count++;
                            if (count === workplaces.length) {
                                notification({
                                    content: (
                                        <>
                                            <span
                                                className={classes.primaryColor}
                                            >
                                                {count}{" "}
                                                {
                                                    configuration.filter(
                                                        (item) =>
                                                            item.key ===
                                                            "TEAM_NAME"
                                                    )[0].value
                                                }
                                            </span>{" "}
                                            <FormattedMessage id="message.success.delete" />
                                        </>
                                    ),
                                    status: "valid",
                                });
                                refreshData();
                                setEdit();
                                setSelected();
                            }
                        })
                        .catch(() =>
                            notification({
                                content: (
                                    <>
                                        <FormattedMessage id="message.error.delete" />{" "}
                                        <span className={classes.primaryColor}>
                                            {element.name}
                                        </span>
                                    </>
                                ),
                                status: "invalid",
                            })
                        );
                }

                break;
            case "teams":
                for (let index = 0; index < teams.length; index++) {
                    const element = teams[index];
                    request
                        .delete(`teams/${element.id}`)
                        .then(() => {
                            index === teams.length - 1 && refreshData();
                            count++;
                            if (count === teams.length) {
                                notification({
                                    content: (
                                        <>
                                            <span
                                                className={classes.primaryColor}
                                            >
                                                {count}{" "}
                                                {
                                                    configuration.filter(
                                                        (item) =>
                                                            item.key ===
                                                            "TEAM_NAME"
                                                    )[0].value
                                                }
                                            </span>{" "}
                                            <FormattedMessage id="message.success.delete" />
                                        </>
                                    ),
                                    status: "valid",
                                });
                                refreshData();
                                setEdit();
                                setSelected();
                            }
                        })
                        .catch(() =>
                            notification({
                                content: (
                                    <>
                                        <FormattedMessage id="message.error.delete" />{" "}
                                        <span className={classes.primaryColor}>
                                            {element.name}
                                        </span>
                                    </>
                                ),
                                status: "invalid",
                            })
                        );
                }
                break;
            case "users":
                for (let index = 0; index < users.length; index++) {
                    const element = users[index];
                    if (
                        element?.id !==
                        JSON.parse(localStorage.getItem("user"))?.id
                    )
                        request
                            .delete(`users/${element.id}`)
                            .then(() => {
                                index === users.length - 1 && refreshData();
                                count++;
                                if (count === users.length - 1) {
                                    notification({
                                        content: (
                                            <>
                                                <span
                                                    className={
                                                        classes.primaryColor
                                                    }
                                                >
                                                    {count}{" "}
                                                    <FormattedMessage id="employees" />
                                                </span>{" "}
                                                <FormattedMessage id="message.success.delete" />
                                            </>
                                        ),
                                        status: "valid",
                                    });
                                    refreshData();
                                    setEdit();
                                    setSelected();
                                    setModal({ type: "", name: "", id: "" });
                                }
                            })
                            .catch(() =>
                                notification({
                                    content: (
                                        <>
                                            <FormattedMessage id="message.error.delete" />{" "}
                                            <span
                                                className={classes.primaryColor}
                                            >
                                                {element.firstName}{" "}
                                                {element.lastName}
                                            </span>
                                        </>
                                    ),
                                    status: "invalid",
                                })
                            );
                }
                break;
            default:
                break;
        }
        if (count > 0)
            notification({
                content: (
                    <>
                        <span className={classes.primaryColor}>
                            {count} {type}
                        </span>{" "}
                        <FormattedMessage id="message.success.delete" />
                    </>
                ),
                status: "valid",
            });
        setModal({ type: "", name: "", id: "" });
    };

    // Modal confirmation
    useEffect(() => {
        const handleModal = (toDelete) => {
            switch (toDelete.type) {
                case "allworkplaces":
                    return (
                        <div className={classes.modal}>
                            <h4>
                                <FormattedMessage id="message.warning.delete" />
                                <br />
                                <span className={classes.primaryTxt}>{`${
                                    workplaces.length
                                } ${
                                    configuration.filter(
                                        (item) => item.key === "WORKPLACE_NAME"
                                    )[0].value
                                }`}</span>
                            </h4>
                            <div>
                                <Button
                                    color="primary"
                                    onClick={() =>
                                        setModal({ type: "", name: "", id: "" })
                                    }
                                >
                                    <FormattedMessage id="buttons.placeholder.cancel" />
                                </Button>
                                <Button
                                    color="primaryFill"
                                    onClick={() =>
                                        handleDeleteAll("workplaces")
                                    }
                                >
                                    <FormattedMessage id="buttons.placeholder.delete" />
                                </Button>
                            </div>
                        </div>
                    );
                case "allteams":
                    return (
                        <div className={classes.modal}>
                            <h4>
                                <FormattedMessage id="message.warning.delete" />
                                <br />
                                <span className={classes.primaryTxt}>{`${
                                    teams.length
                                } ${
                                    configuration.filter(
                                        (item) => item.key === "TEAM_NAME"
                                    )[0].value
                                }`}</span>
                            </h4>
                            <br />
                            <div>
                                <Button
                                    color="primary"
                                    onClick={() =>
                                        setModal({ type: "", name: "", id: "" })
                                    }
                                >
                                    <FormattedMessage id="buttons.placeholder.cancel" />
                                </Button>
                                <Button
                                    color="primaryFill"
                                    onClick={() => handleDeleteAll("teams")}
                                >
                                    <FormattedMessage id="buttons.placeholder.delete" />
                                </Button>
                            </div>
                        </div>
                    );
                case "allusers":
                    return (
                        <div className={classes.modal}>
                            <h4>
                                <FormattedMessage id="message.warning.delete" />
                                <br />
                                <span className={classes.primaryTxt}>{`${
                                    users.length - 1
                                } ${
                                    configuration.filter(
                                        (item) => item.key === "USER_NAME"
                                    )[0].value
                                }`}</span>
                            </h4>
                            <div>
                                <Button
                                    color="primary"
                                    onClick={() =>
                                        setModal({ type: "", name: "", id: "" })
                                    }
                                >
                                    <FormattedMessage id="buttons.placeholder.cancel" />
                                </Button>
                                <Button
                                    color="primaryFill"
                                    onClick={() => handleDeleteAll("users")}
                                >
                                    <FormattedMessage id="buttons.placeholder.delete" />
                                </Button>
                            </div>
                        </div>
                    );
                default:
                    return (
                        <div className={classes.modal}>
                            <h4>
                                <FormattedMessage id="message.warning.delete" />
                                <br />
                                <span className={classes.primaryTxt}>
                                    {toDelete?.name}
                                </span>
                            </h4>
                            <div>
                                <Button
                                    color="primary"
                                    onClick={() =>
                                        setModal({ type: "", name: "", id: "" })
                                    }
                                >
                                    <FormattedMessage id="buttons.placeholder.cancel" />
                                </Button>
                                <Button
                                    color="primaryFill"
                                    onClick={() =>
                                        handleDelete(
                                            toDelete?.id,
                                            toDelete?.type,
                                            toDelete?.name
                                        )
                                    }
                                >
                                    <FormattedMessage id="buttons.placeholder.delete" />
                                </Button>
                            </div>
                        </div>
                    );
            }
        };
        setModalContent(handleModal(modal));
    }, [modal]);

    useEffect(() => {
        setTimeout(() => {
            setAddedWorkplace("");
        }, 2000);
    }, [addedWorkplace]);

    useEffect(() => {
        toFocus?.current?.focus();
    }, [edit]);

    const handleChangeWP = async (e, workplace) => {
        const img = new FormData();
        img.append("file", file);
        if (file)
            await request.post(`import/file`, img).then(async (res) => {
                const requestLogo = {
                    name: file.name,
                    path: res.data.path,
                    workplace: workplace["@id"],
                };
                await request.post("logos", requestLogo).then(() => {
                    setFile();
                });
            });
        e.preventDefault();
        const req = {
            name: workplaceName || workplace.name,
            websiteUrl: websiteUrl || workplace.websiteUrl,
            address: {
                street: street || workplace.address.street,
                city: city || workplace.address.city,
                zipCode: zipCode || workplace.address.zipCode,
                country: country || workplace.address.country,
            },
            digitalAddress: {
                mobile: mobile || workplace.digitalAddress.mobile,
                fax: fax || workplace.digitalAddress.fax,
            },
        };
        await request
            .patch(workplace["@id"], req, {
                headers: { "Content-Type": "application/merge-patch+json" },
            })
            .then(() => {
                notification({
                    content: (
                        <>
                            <span className={classes.primaryColor}>
                                {workplace.name}
                            </span>{" "}
                            <FormattedMessage id="message.success.edit" />
                        </>
                    ),
                    status: "valid",
                });
                setWorkplaceName("");
                setChanged(false);
                refreshData();
            });
        setEditInfo();
    };

    const handleChangeTeam = async (e, team) => {
        e.preventDefault();
        if (teamName.length > 0)
            await request
                .patch(
                    team["@id"],
                    { name: teamName },
                    {
                        headers: {
                            "Content-Type": "application/merge-patch+json",
                        },
                    }
                )
                .then(() => {
                    notification({
                        content: (
                            <>
                                <span className={classes.primaryColor}>
                                    {team.name}
                                </span>{" "}
                                <FormattedMessage id="message.success.edit" />
                            </>
                        ),
                        status: "valid",
                    });
                    refreshData();
                    setTeamName("");
                    setChanged(false);
                })
                .catch(() =>
                    notification({
                        content: (
                            <>
                                <FormattedMessage id="message.error.edit" />{" "}
                                <span className={classes.primaryColor}>
                                    {team.name}
                                </span>
                            </>
                        ),
                        status: "invalid",
                    })
                );
        setEditInfo();
    };

    if (tab === "workplaces")
        return (
            <div className={classes.container}>
                {modal.type ? modalContent : ""}
                <Link to="create-workplace">
                    <Button
                        style={{ width: "15rem" }}
                        color="primary"
                        arrow={true}
                    >
                        <FormattedMessage id="buttons.placeholder.add" />{" "}
                        {
                            configuration.filter(
                                (item) => item.key === "WORKPLACE_NAME"
                            )[0].value
                        }
                    </Button>
                </Link>
                <div className={classes.searchInput}>
                    <HiOutlineSearch />
                    <input
                        onChange={(e) =>
                            setSearchWorkplace(e.target.value.toLowerCase())
                        }
                        className={classes.search}
                        type="text"
                        placeholder={`${intl.formatMessage({ id: "search" })} ${
                            configuration.filter(
                                (item) => item.key === "WORKPLACE_NAME"
                            )[0].value
                        }`}
                    />
                </div>
                <div className={classes.colheader}>
                    <span
                        className={`${classes.totalNumber} ${
                            addedWorkplace.length > 0 ? classes.primaryTxt : ""
                        }`}
                    >
                        {addedWorkplace.length > 0
                            ? addedWorkplace
                            : `${workplaces.length} ${
                                  configuration.filter(
                                      (item) => item.key === "WORKPLACE_NAME"
                                  )[0].value
                              }`}
                    </span>
                    <button onClick={() => setModal({ type: "allworkplaces" })}>
                        <FormattedMessage id="buttons.placeholder.delete_all" />
                    </button>
                </div>

                <ul className={classes.itemsList}>
                    <form
                        onChange={(e) =>
                            e.target.type === "radio" &&
                            setSelected(JSON.parse(e.target.value))
                        }
                    >
                        {workplaces.map((workplace) => {
                            if (
                                workplace?.name
                                    ?.toLowerCase()
                                    .search(searchWorkplace) !== -1
                            )
                                return (
                                    <li
                                        onMouseMove={() => {
                                            if (!edit) {
                                                clearTimeout(time);
                                                time = setTimeout(() => {
                                                    setSelected(workplace);
                                                }, 100);
                                            }
                                        }}
                                        key={workplace.id}
                                        className={`${
                                            editInfo === workplace
                                                ? classes.editing
                                                : ""
                                        } ${
                                            selected?.id === workplace.id &&
                                            selected?.name === workplace?.name
                                                ? classes.selected
                                                : ""
                                        }`}
                                    >
                                        <input
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setEdit(workplace);
                                                    setSelected(workplace);
                                                }
                                            }}
                                            className={classes.checkbox}
                                            checked={
                                                edit?.id === workplace.id &&
                                                edit?.name === workplace?.name
                                            }
                                            type="radio"
                                            name="workplaces"
                                            value={JSON.stringify(workplace)}
                                        />
                                        {editInfo === workplace ? (
                                            <input
                                                className={classes.rename}
                                                ref={toFocus}
                                                type="text"
                                                defaultValue={workplace?.name}
                                                onChange={(e) => {
                                                    setWorkplaceName(
                                                        e.target.value
                                                    );
                                                    setChanged(true);
                                                }}
                                            />
                                        ) : (
                                            <input
                                                className={classes.rename}
                                                disabled
                                                type="text"
                                                defaultValue={
                                                    workplaceName ||
                                                    workplace?.name
                                                }
                                            />
                                        )}
                                        <span></span>
                                        <div
                                            className={`${
                                                classes.actionsContainer
                                            } ${
                                                changed === true
                                                    ? classes.btnReady
                                                    : ""
                                            }`}
                                        >
                                            {/* <BsCreditCard2Front /> */}
                                            {/* <GrUserSettings onClick={(e) => { setEdit('assign-workplace') }} /> */}
                                            {editInfo === workplace ? (
                                                <FiCheck
                                                    className={
                                                        classes.checkmark
                                                    }
                                                    strokeWidth={"4"}
                                                    onClick={(e) => {
                                                        handleChangeWP(
                                                            e,
                                                            workplace
                                                        );
                                                    }}
                                                />
                                            ) : (
                                                <AiOutlineEdit
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setEditInfo(workplace);
                                                    }}
                                                />
                                            )}
                                            <FiTrash
                                                onClick={() =>
                                                    setModal({
                                                        name: workplace?.name,
                                                        id: workplace?.id,
                                                        type: "workplaces",
                                                    })
                                                }
                                            />
                                        </div>
                                        {editInfo === workplace ? (
                                            <>
                                                <div
                                                    className={classes.editDiv}
                                                >
                                                    <div
                                                        className={
                                                            classes.inputsContainer
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                classes.wpLogoContainer
                                                            }
                                                        >
                                                            {workplace?.logo
                                                                ?.url && (
                                                                <img
                                                                    className={
                                                                        classes.logoPreview
                                                                    }
                                                                    src={
                                                                        workplace
                                                                            ?.logo
                                                                            ?.url
                                                                    }
                                                                    alt={
                                                                        workplace
                                                                            ?.logo
                                                                            ?.name
                                                                    }
                                                                />
                                                            )}
                                                            <UploadFile
                                                                file={file}
                                                                setFile={
                                                                    setFile
                                                                }
                                                                placeholder={
                                                                    workplace
                                                                        ?.logo
                                                                        ?.name
                                                                        ? "Remplacer " +
                                                                          workplace
                                                                              ?.logo
                                                                              ?.name
                                                                        : "Importer un logo"
                                                                }
                                                                style={{
                                                                    background:
                                                                        "#FFF",
                                                                    marginBottom:
                                                                        ".2rem",
                                                                    width: "100%",
                                                                }}
                                                            />
                                                        </div>

                                                        <Input
                                                            onChange={(e) => {
                                                                setWebsiteUrl(
                                                                    e.target
                                                                        .value
                                                                );
                                                                setChanged(
                                                                    true
                                                                );
                                                            }}
                                                            type="string"
                                                            placeholder="Lien du site"
                                                            defaultValue={
                                                                workplace.websiteUrl
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            classes.inputsContainer
                                                        }
                                                    >
                                                        <Input
                                                            onChange={(e) => {
                                                                setStreet(
                                                                    e.target
                                                                        .value
                                                                );
                                                                setChanged(
                                                                    true
                                                                );
                                                            }}
                                                            type="text"
                                                            placeholder="Adresse"
                                                            defaultValue={
                                                                workplace
                                                                    .address
                                                                    .street
                                                            }
                                                        />
                                                        <Input
                                                            onChange={(e) => {
                                                                setZipCode(
                                                                    e.target
                                                                        .value
                                                                );
                                                                setChanged(
                                                                    true
                                                                );
                                                            }}
                                                            type="text"
                                                            placeholder="ZIP Code"
                                                            defaultValue={
                                                                workplace
                                                                    .address
                                                                    .zipCode
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            classes.inputsContainer
                                                        }
                                                    >
                                                        <Input
                                                            onChange={(e) => {
                                                                setCity(
                                                                    e.target
                                                                        .value
                                                                );
                                                                setChanged(
                                                                    true
                                                                );
                                                            }}
                                                            type="text"
                                                            placeholder="City"
                                                            defaultValue={
                                                                workplace
                                                                    .address
                                                                    .city
                                                            }
                                                        />
                                                        <Input
                                                            onChange={(e) => {
                                                                setCountry(
                                                                    e.target
                                                                        .value
                                                                );
                                                                setChanged(
                                                                    true
                                                                );
                                                            }}
                                                            type="text"
                                                            placeholder="Country"
                                                            defaultValue={
                                                                workplace
                                                                    .address
                                                                    .country
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            classes.inputsContainer
                                                        }
                                                    >
                                                        <Input
                                                            onChange={(e) => {
                                                                setMobile(
                                                                    e.target
                                                                        .value
                                                                );
                                                                setChanged(
                                                                    true
                                                                );
                                                            }}
                                                            type="tel"
                                                            placeholder="Téléphone"
                                                            defaultValue={
                                                                workplace
                                                                    .digitalAddress
                                                                    .mobile
                                                            }
                                                        />
                                                        <Input
                                                            onChange={(e) => {
                                                                setFax(
                                                                    e.target
                                                                        .value
                                                                );
                                                                setChanged(
                                                                    true
                                                                );
                                                            }}
                                                            type="tel"
                                                            placeholder="Fax"
                                                            defaultValue={
                                                                workplace
                                                                    .digitalAddress
                                                                    .fax
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </li>
                                );
                        })}
                    </form>
                </ul>
            </div>
        );
    if (tab === "create-workplace")
        return <CreateWorkplace setDone={setDone} />;

    if (tab === "teams")
        return (
            <div>
                {modal.type ? modalContent : ""}
                <Link to="create-team">
                    <Button
                        style={{ width: "15rem" }}
                        color="primary"
                        arrow={true}
                    >
                        <FormattedMessage id="buttons.placeholder.add" />{" "}
                        {
                            configuration.filter(
                                (item) => item.key === "TEAM_NAME"
                            )[0].value
                        }
                    </Button>
                </Link>
                <div className={classes.searchInput}>
                    <HiOutlineSearch />
                    <input
                        className={classes.search}
                        onChange={(e) =>
                            setSearchTeam(e.target.value.toLowerCase())
                        }
                        type="text"
                        placeholder={`${intl.formatMessage({ id: "search" })} ${
                            configuration.filter(
                                (item) => item.key === "TEAM_NAME"
                            )[0].value
                        }`}
                    />
                </div>
                <div className={classes.colheader}>
                    <span className={classes.totalNumber}>
                        {teams.length}{" "}
                        {
                            configuration.filter(
                                (item) => item.key === "TEAM_NAME"
                            )[0].value
                        }
                    </span>
                    <button onClick={() => setModal({ type: "allteams" })}>
                        <FormattedMessage id="buttons.placeholder.delete_all" />
                    </button>
                </div>
                <ul className={`${classes.itemsList} ${classes.teamList}`}>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        onChange={(e) => {
                            e.target.type === "radio" &&
                                setSelected(JSON.parse(e.target.value));
                        }}
                    >
                        {teams?.map((team, index) => {
                            if (
                                team.name?.toLowerCase().search(searchTeam) !==
                                -1
                            )
                                return (
                                    <li
                                        onMouseMove={() => {
                                            if (!edit) setSelected(team);
                                        }}
                                        key={team.id + index}
                                        className={`${
                                            team.workplace?.name?.length > 0
                                                ? classes.teamWithWP
                                                : ""
                                        } ${
                                            editInfo === team
                                                ? classes.editing
                                                : ""
                                        } ${
                                            selected?.id === team.id &&
                                            selected?.name === team.name
                                                ? classes.selected
                                                : ""
                                        }`}
                                    >
                                        <input
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setEdit(team);
                                                    setSelected(team);
                                                }
                                            }}
                                            className={classes.checkbox}
                                            checked={
                                                edit?.id === team.id &&
                                                edit?.name === team?.name
                                            }
                                            type="radio"
                                            name="team"
                                            value={JSON.stringify(team)}
                                        />
                                        <span></span>
                                        {editInfo === team ? (
                                            <input
                                                autoFocus
                                                className={classes.rename}
                                                ref={toFocus}
                                                type="text"
                                                defaultValue={team?.name}
                                                onChange={(e) => {
                                                    setTeamName(e.target.value);
                                                    setChanged(true);
                                                }}
                                            />
                                        ) : (
                                            <input
                                                className={classes.rename}
                                                disabled
                                                type="text"
                                                defaultValue={
                                                    teamName || team?.name
                                                }
                                            />
                                        )}
                                        {team.workplace?.name?.length > 0 ? (
                                            <div className={classes.infos}>
                                                <span
                                                    className={
                                                        classes.groupName
                                                    }
                                                >
                                                    {team.workplace?.name}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div
                                            className={`${
                                                classes.actionsContainer
                                            } ${
                                                changed === true
                                                    ? classes.btnReady
                                                    : ""
                                            }`}
                                        >
                                            {editInfo === team ? (
                                                <FiCheck
                                                    strokeWidth={"4"}
                                                    className={`${classes.validate} ${classes.checkmark}`}
                                                    onClick={(e) => {
                                                        handleChangeTeam(
                                                            e,
                                                            team
                                                        );
                                                    }}
                                                />
                                            ) : (
                                                <AiOutlineEdit
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setEditInfo(team);
                                                    }}
                                                />
                                            )}
                                            <FiTrash
                                                onClick={() =>
                                                    setModal({
                                                        name: team.name,
                                                        id: team.id,
                                                        type: "teams",
                                                    })
                                                }
                                            />
                                        </div>
                                    </li>
                                );
                        })}
                    </form>
                </ul>
            </div>
        );
    if (tab === "create-team") return <CreateTeam setDone={setDone} />;

    if (tab === "create-user") return <CreateUser setDone={setDone} />;
    if (tab === "users")
        return (
            <div>
                {modal.type ? modalContent : ""}
                <UserTab
                    time={time}
                    selected={selected}
                    users={users}
                    setUsers={setUsers}
                    setSelected={setSelected}
                    edit={edit}
                    setEdit={setEdit}
                    editInfo={editInfo}
                    setEditInfo={setEditInfo}
                    modal={modal}
                    setModal={setModal}
                />
            </div>
        );
}
