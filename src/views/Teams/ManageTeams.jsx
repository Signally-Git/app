import classes from "./ManageTeams.module.css";
import { useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import Tab from "./Tab/tab";
import SignaturePreview from "./SignaturePreview/SignaturePreview";
import { useParams } from "react-router-dom";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { Button } from "components";
import { handleScroll, TokenService, request } from "utils";
import { FormattedMessage, useIntl } from "react-intl";
import { getMenuLink } from "./ManageTeams.utils";

function Signatures() {
    const [entity, setEntity] = useState();
    const { type } = useParams();
    const [signatures, setSignatures] = useState([]);
    const [users, setUsers] = useState([]);
    const [otherUser, setOtherUser] = useState("");
    const [currentUsers, setCurrentUsers] = useState("");
    const [currentTeams, setCurrentTeams] = useState("");
    const [teams, setTeams] = useState([]);
    const [otherTeam, setOtherTeam] = useState("");
    const [edit, setEdit] = useState();
    const [editInfo, setEditInfo] = useState();
    const configuration = TokenService.getConfig();

    const intl = useIntl();

    const [transition, setTransition] = useState();

    const slider = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const [listUsers, listTeams, listSignatures] = await Promise.all([
                request.get("users?exists[team]=false"),
                request.get("teams?exists[workplace]=false"),
                request.get("signatures"),
            ]);
            setSignatures(listSignatures.data["hydra:member"]);
            setUsers(listUsers.data["hydra:member"]);
            setTeams(listTeams.data["hydra:member"]);
        };

        fetchData();
    }, [entity]);

    useEffect(() => {
        const sseAssignTeam = new EventSource(
            `${process.env.REACT_APP_HUB_URL}${entity?.["@id"]}`
        );
        const sseUsersWithoutTeam = new EventSource(
            `${process.env.REACT_APP_HUB_URL}/users/users-without-team`
        );
        const sseTeamsWithoutWP = new EventSource(
            `${process.env.REACT_APP_HUB_URL}/users/teams-without-workplace`
        );

        sseAssignTeam.onmessage = (e) =>
            handleRealtimeData(setEntity, "users", JSON.parse(e.data));
        sseUsersWithoutTeam.onmessage = (e) =>
            handleRealtimeData(setUsers, null, JSON.parse(e.data));
        sseTeamsWithoutWP.onmessage = (e) =>
            handleRealtimeData(setTeams, null, JSON.parse(e.data));

        function handleRealtimeData(setData, key, data) {
            setTimeout(() => {
                if (key) {
                    setData((prevData) => ({ ...prevData, [key]: data.users }));
                } else {
                    setData(data);
                }
            }, 1500);
        }

        return () => {
            sseAssignTeam.close();
            sseUsersWithoutTeam.close();
            sseTeamsWithoutWP.close();
        };
    }, [edit]);

    useEffect(() => {
        setEntity(null);
        setEdit(null);
    }, [type]);

    const handleAddTeam = (team) => {
        updateTeam(team.id, { workplace: entity?.["@id"] });
    };

    const handleRemoveTeam = (team) => {
        const removedTeams = entity.teams.filter(
            (teamCheck) => teamCheck.id !== team.id
        );
        updateTeam(team.id, { workplace: null });
        setEntity((prevEntity) => ({ ...prevEntity, teams: removedTeams }));
    };

    const handleUpdateAll = (users, action) => {
        users?.forEach((user) => {
            handleUpdate(user, action);
        });
    };

    const handleUpdate = (user, action) => {
        const handleRemove = () => {
            const removedUsers = entity.users.filter(
                (userCheck) => userCheck.id !== user.id
            );
            updateUser(user.id, { team: null });
            setEntity((prevEntity) => ({ ...prevEntity, users: removedUsers }));
        };

        const handleAdd = () => {
            updateUser(user.id, { team: entity?.["@id"] });
        };

        switch (action) {
            case "remove":
                handleRemove();
                break;
            case "add":
                handleAdd();
                break;
            default:
                break;
        }
    };

    const updateTeam = (teamId, data) => {
        request
            .patch(`teams/${teamId}`, data, {
                headers: { "Content-Type": "application/merge-patch+json" },
            })
            .then(() => {
                setTransition(teamId);
                setTimeout(() => {
                    setTransition("done");
                }, 1500);
            });
    };

    const updateUser = (userId, data) => {
        request
            .patch(`users/${userId}`, data, {
                headers: { "Content-Type": "application/merge-patch+json" },
            })
            .then(() => {
                setTransition(userId);
                setTimeout(() => {
                    setTransition("done");
                }, 1500);
            });
    };

    return (
        <div>
            <div className={classes.container}>
                <h1>Teams</h1>
                <div className={classes.teamsContainer}>
                    <ul className={classes.menu}>
                        {getMenuLink(type, "WORKPLACE_NAME", "workplaces")}
                        {getMenuLink(type, "TEAM_NAME", "teams")}
                        {getMenuLink(type, "USER_NAME", "users")}
                    </ul>
                    <Tab
                        tab={type}
                        selected={entity}
                        setSelected={setEntity}
                        edit={edit}
                        setEdit={setEdit}
                        editInfo={editInfo}
                        setEditInfo={setEditInfo}
                    />
                </div>
                {entity ? (
                    <div className={classes.overflow}>
                        {edit === "assign-workplace" ? (
                            <div className={classes.teamAssignment}>
                                <div className={classes.slider} ref={slider}>
                                    <div className={classes.col}>
                                        <div className={classes.tagline}>
                                            <h2>
                                                <span
                                                    className={
                                                        classes.primaryTxt
                                                    }
                                                >
                                                    {entity?.teams?.length || 0}
                                                </span>{" "}
                                                {
                                                    configuration.filter(
                                                        (item) =>
                                                            item.key ===
                                                            "TEAM_NAME"
                                                    )[0].value
                                                }{" "}
                                                <span
                                                    className={
                                                        classes.primaryTxt
                                                    }
                                                >
                                                    {entity?.name}
                                                </span>
                                            </h2>
                                            <Button
                                                color="secondary"
                                                onClick={() => {
                                                    setEdit("assign-signature");
                                                }}
                                            >
                                                <FormattedMessage id="signature.title" />
                                            </Button>
                                        </div>
                                        <br />
                                        <div className={classes.searchInput}>
                                            <HiOutlineSearch />
                                            <input
                                                className={classes.search}
                                                type="text"
                                                onChange={(e) =>
                                                    setCurrentTeams(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={`${intl.formatMessage(
                                                    { id: "search" }
                                                )} ${
                                                    configuration.filter(
                                                        (item) =>
                                                            item.key ===
                                                            "TEAM_NAME"
                                                    )[0].value
                                                }`}
                                            />
                                        </div>
                                        <ul
                                            className={`${classes.itemsList} ${classes.users}`}
                                        >
                                            {entity?.teams?.map((team) => {
                                                if (
                                                    team.name.search(
                                                        currentTeams.toLowerCase()
                                                    ) !== -1
                                                )
                                                    return (
                                                        <li
                                                            key={team.id}
                                                            className={`${
                                                                classes.assignItem
                                                            } ${
                                                                transition ===
                                                                team.id
                                                                    ? classes.transitionRemove
                                                                    : ""
                                                            }`}
                                                        >
                                                            <span>
                                                                {team.name}
                                                            </span>
                                                            {transition ===
                                                            team.id ? (
                                                                <span
                                                                    className={
                                                                        classes.added
                                                                    }
                                                                >
                                                                    <FormattedMessage id="message.success.removed" />
                                                                </span>
                                                            ) : (
                                                                <button>
                                                                    <BiMinusCircle
                                                                        title={intl.formatMessage(
                                                                            {
                                                                                id: "buttons.placeholder.unassign_child_from_parent",
                                                                                values: {
                                                                                    team: team.name,
                                                                                    entity: entity.name,
                                                                                },
                                                                            }
                                                                        )}
                                                                        onClick={() =>
                                                                            handleRemoveTeam(
                                                                                team
                                                                            )
                                                                        }
                                                                    />
                                                                </button>
                                                            )}
                                                        </li>
                                                    );
                                            })}
                                        </ul>
                                        <Button
                                            color={"primary"}
                                            arrow
                                            onClick={(e) =>
                                                handleScroll(e, 2000, slider)
                                            }
                                        >
                                            Ajouter des{" "}
                                            {
                                                configuration.filter(
                                                    (item) =>
                                                        item.key === "TEAM_NAME"
                                                )[0].value
                                            }
                                        </Button>
                                    </div>
                                    <div className={classes.col}>
                                        <div className={classes.tagline}>
                                            <h2>
                                                <FormattedMessage id="add_blank" />{" "}
                                                {
                                                    configuration.filter(
                                                        (item) =>
                                                            item.key ===
                                                            "TEAM_NAME"
                                                    )[0].value
                                                }
                                            </h2>
                                        </div>
                                        <br />
                                        <div className={classes.searchInput}>
                                            <HiOutlineSearch />
                                            <input
                                                className={classes.search}
                                                type="text"
                                                onChange={(e) =>
                                                    setOtherTeam(e.target.value)
                                                }
                                                placeholder={`<FormattedMessage id="search" /> ${
                                                    configuration.filter(
                                                        (item) =>
                                                            item.key ===
                                                            "USER_NAME"
                                                    )[0].value
                                                }`}
                                            />
                                        </div>
                                        <ul className={classes.itemsList}>
                                            {teams?.map((team) => {
                                                if (
                                                    team.name.search(
                                                        otherTeam.toLowerCase()
                                                    ) !== -1
                                                )
                                                    return (
                                                        <li
                                                            key={team.id}
                                                            className={`${
                                                                classes.assignItem
                                                            } ${
                                                                transition ===
                                                                team.id
                                                                    ? classes.transitionRight
                                                                    : ""
                                                            }`}
                                                        >
                                                            <span>
                                                                {team.name}
                                                            </span>
                                                            {transition ===
                                                            team.id ? (
                                                                <span
                                                                    className={
                                                                        classes.added
                                                                    }
                                                                >
                                                                    <FormattedMessage id="message.success.added" />
                                                                </span>
                                                            ) : (
                                                                <button>
                                                                    <BiPlusCircle
                                                                        title={`Ajouter ${team.name} dans ${entity?.name}`}
                                                                        onClick={() =>
                                                                            handleAddTeam(
                                                                                team
                                                                            )
                                                                        }
                                                                    />
                                                                </button>
                                                            )}
                                                        </li>
                                                    );
                                            })}
                                        </ul>
                                        <Button
                                            color={"primary"}
                                            onClick={(e) =>
                                                handleScroll(e, 0, slider)
                                            }
                                        >
                                            <FormattedMessage id="buttons.placeholder.end" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : edit === "assign-team" ? (
                            <div className={classes.teamAssignment}>
                                <div className={classes.slider} ref={slider}>
                                    <div className={classes.col}>
                                        <div className={classes.tagline}>
                                            <h2>
                                                <span
                                                    className={
                                                        classes.primaryTxt
                                                    }
                                                >
                                                    {entity?.users?.length || 0}
                                                </span>{" "}
                                                <FormattedMessage
                                                    id="members"
                                                    values={{
                                                        count:
                                                            entity.users
                                                                .length || 0,
                                                    }}
                                                />{" "}
                                                <span
                                                    className={
                                                        classes.primaryTxt
                                                    }
                                                >
                                                    {entity?.name}
                                                </span>
                                            </h2>
                                            <Button
                                                color="secondary"
                                                onClick={() => {
                                                    setEdit("assign-signature");
                                                }}
                                            >
                                                <FormattedMessage
                                                    id={"signature.title"}
                                                />
                                            </Button>
                                        </div>
                                        <br />
                                        <div className={classes.searchInput}>
                                            <HiOutlineSearch />
                                            <input
                                                className={classes.search}
                                                type="text"
                                                onChange={(e) =>
                                                    setCurrentUsers(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={`${intl.formatMessage(
                                                    { id: "search" }
                                                )} ${
                                                    configuration.filter(
                                                        (item) =>
                                                            item.key ===
                                                            "USER_NAME"
                                                    )[0].value
                                                }`}
                                            />
                                        </div>
                                        <span
                                            className={classes.all}
                                            onClick={() =>
                                                handleUpdateAll(
                                                    entity?.users,
                                                    "remove"
                                                )
                                            }
                                        >
                                            <FormattedMessage id="buttons.placeholder.unassign_all" />
                                        </span>
                                        <ul
                                            className={`${classes.itemsList} ${classes.users}`}
                                        >
                                            {entity?.users?.map((user) => {
                                                const fullName =
                                                    user.firstName.toLowerCase() +
                                                    " " +
                                                    user.lastName.toLowerCase();
                                                if (
                                                    fullName.search(
                                                        currentUsers.toLowerCase()
                                                    ) !== -1
                                                )
                                                    return (
                                                        <li
                                                            key={user.id}
                                                            className={`${
                                                                classes.assignItem
                                                            } ${
                                                                transition ===
                                                                user.id
                                                                    ? classes.transitionRemove
                                                                    : ""
                                                            }`}
                                                            title={intl.formatMessage(
                                                                {
                                                                    id: "buttons.placeholder.unassign_child_from_parent",
                                                                    values: {
                                                                        child: `${user.firstName} ${user.lastName}`,
                                                                        parent: entity?.name,
                                                                    },
                                                                }
                                                            )}
                                                            onClick={() =>
                                                                handleUpdate(
                                                                    user,
                                                                    "remove"
                                                                )
                                                            }
                                                        >
                                                            <span>
                                                                {user.firstName}{" "}
                                                                {user.lastName}
                                                            </span>
                                                            {transition ===
                                                            user.id ? (
                                                                <span
                                                                    className={
                                                                        classes.added
                                                                    }
                                                                >
                                                                    <FormattedMessage id="message.success.removed" />
                                                                </span>
                                                            ) : (
                                                                <button>
                                                                    <BiMinusCircle />
                                                                </button>
                                                            )}
                                                        </li>
                                                    );
                                            })}
                                        </ul>
                                        <Button
                                            color={"primary"}
                                            arrow
                                            onClick={(e) =>
                                                handleScroll(e, 2000, slider)
                                            }
                                        >
                                            <FormattedMessage id="buttons.placeholder.add" />{" "}
                                            {
                                                configuration.filter(
                                                    (item) =>
                                                        item.key === "USER_NAME"
                                                )[0].value
                                            }
                                        </Button>
                                    </div>
                                    <div className={classes.col}>
                                        <div className={classes.tagline}>
                                            <h2>
                                                <FormattedMessage id="buttons.placeholder.add" />{" "}
                                                {
                                                    configuration.filter(
                                                        (item) =>
                                                            item.key ===
                                                            "USER_NAME"
                                                    )[0].value
                                                }
                                            </h2>
                                        </div>
                                        <br />
                                        <div className={classes.searchInput}>
                                            <HiOutlineSearch />
                                            <input
                                                className={classes.search}
                                                type="text"
                                                onChange={(e) =>
                                                    setOtherUser(e.target.value)
                                                }
                                                placeholder={`${intl.formatMessage(
                                                    { id: "search" }
                                                )} ${
                                                    configuration.filter(
                                                        (item) =>
                                                            item.key ===
                                                            "TEAM_NAME"
                                                    )[0].value
                                                }`}
                                            />
                                        </div>
                                        <span
                                            className={classes.all}
                                            onClick={() =>
                                                handleUpdateAll(users, "add")
                                            }
                                        >
                                            <FormattedMessage id="buttons.placeholder.add_all" />
                                        </span>
                                        <ul className={classes.itemsList}>
                                            {users?.map((user) => {
                                                const fullName =
                                                    user.firstName.toLowerCase() +
                                                    " " +
                                                    user.lastName.toLowerCase();
                                                if (
                                                    fullName.search(
                                                        otherUser.toLowerCase()
                                                    ) !== -1
                                                )
                                                    return (
                                                        <li
                                                            key={user.id}
                                                            className={`${
                                                                classes.assignItem
                                                            } ${
                                                                transition ===
                                                                user.id
                                                                    ? classes.transitionRight
                                                                    : ""
                                                            }`}
                                                            title={`Ajouter ${user.firstName} ${user.lastName} dans ${entity?.name}`}
                                                            onClick={() =>
                                                                handleUpdate(
                                                                    user,
                                                                    "add"
                                                                )
                                                            }
                                                        >
                                                            <span>
                                                                {user.firstName}{" "}
                                                                {user.lastName}
                                                            </span>
                                                            {transition ===
                                                            user.id ? (
                                                                <span
                                                                    className={
                                                                        classes.added
                                                                    }
                                                                >
                                                                    <FormattedMessage id="message.success.add" />
                                                                </span>
                                                            ) : (
                                                                <button>
                                                                    <BiPlusCircle />
                                                                </button>
                                                            )}
                                                        </li>
                                                    );
                                            })}
                                        </ul>
                                        <Button
                                            color={"primary"}
                                            onClick={(e) =>
                                                handleScroll(e, 0, slider)
                                            }
                                        >
                                            <FormattedMessage id="buttons.placeholder.end" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={classes.signaturePreview}>
                                <SignaturePreview
                                    show={entity}
                                    signatures={signatures}
                                    setShow={setEntity}
                                    edit={edit}
                                    setEdit={setEdit}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default Signatures;
