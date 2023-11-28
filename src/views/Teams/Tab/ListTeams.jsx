import classes from "./tab.module.css";
import { Link } from "react-router-dom";
import { Button, CustomCheckbox, Loading } from "components";
import { FormattedMessage, useIntl } from "react-intl";
import { HiOutlineSearch } from "react-icons/hi";
import { request, TokenService, useNotification } from "utils";
import { FiCheck, FiTrash } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import React, { useEffect, useState } from "react";

export const getDataTeam = (teams, setTeams, setLoading) => {
    request
        .get("teams")
        .then((teamsAPI) => {
            const promises = teamsAPI.data["hydra:member"].map((team) => {
                if (team.signature) {
                    return request
                        .get(team.signature["@id"])
                        .then((res) => {
                            team["preview"] = res.data.preview;
                            return team;
                        })
                        .catch(() => {
                            return team;
                        });
                } else {
                    return Promise.resolve(team);
                }
            });
            return Promise.all(promises);
        })
        .then((teamsList) => {
            setTeams(teamsList);
        })
        .catch((err) => console.log("Error during outer request: ", err))
        .finally(() => {
            setLoading(false);
        });
};

export const ListTeams = ({
    modal,
    setModal,
    modalContent,
    teams,
    setTeams,
    selected,
    setSelected,
    searchTeam,
    setSearchTeam,
    edit,
    setEdit,
    editInfo,
    setEditInfo,
    toFocus,
    teamName,
    setTeamName,
    changed,
    setChanged,
}) => {
    const [isDeployed, setIsDeployed] = useState(
        editInfo?.synchronizable || false
    );
    const configuration = TokenService.getConfig();
    const [loading, setLoading] = useState(true);
    const intl = useIntl();
    const notification = useNotification();

    useEffect(() => {
        setIsDeployed(editInfo?.synchronizable || false);
    }, [editInfo]);
    const handleChangeTeam = async (e, team) => {
        e.preventDefault();
        if (changed)
            await request
                .patch(
                    team["@id"],
                    { name: teamName || team.name, synchronizable: isDeployed },
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
                    getDataTeam(teams, setTeams);
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

    useEffect(() => {
        getDataTeam(teams, setTeams, setLoading);
    }, []);

    useEffect(() => {}, [teams]);

    return (
        <div>
            {modal.type ? modalContent : ""}
            <Link to="create-team">
                <Button style={{ width: "15rem" }} color="primary" arrow={true}>
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
                    {teams?.length}{" "}
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
                    {loading ? (
                        <Loading />
                    ) : (
                        teams?.map((team, index) => {
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
                                            <>
                                                <input
                                                    autoFocus
                                                    className={classes.rename}
                                                    ref={toFocus}
                                                    type="text"
                                                    defaultValue={team?.name}
                                                    onChange={(e) => {
                                                        setTeamName(
                                                            e.target.value
                                                        );
                                                        setChanged(true);
                                                    }}
                                                />
                                                <label
                                                    className={
                                                        classes.deployContainer
                                                    }
                                                    htmlFor="isDeployed"
                                                >
                                                    <FormattedMessage id="deploy.cta" />
                                                    <CustomCheckbox
                                                        onChange={(e) => {
                                                            setIsDeployed(
                                                                e.target.checked
                                                            );
                                                            setChanged(true);
                                                        }}
                                                        name="isDeployed"
                                                        id="isDeployed"
                                                        type="checkbox"
                                                        checked={isDeployed}
                                                    />
                                                </label>
                                            </>
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
                        })
                    )}
                </form>
            </ul>
        </div>
    );
};
