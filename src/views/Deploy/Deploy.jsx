import React, { useState, useEffect } from "react";
import classes from "./deploy.module.css";
import { FormattedMessage, useIntl } from "react-intl";
import { request, TokenService, useNotification } from "utils";
import { CustomCheckbox, Button, Input, Modal } from "components";

const Deploy = () => {
    const [workplaces, setWorkplaces] = useState([]);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchWorkplaces, setSearchWorkplaces] = useState("");
    const [searchTeams, setSearchTeams] = useState("");
    const [searchUsers, setSearchUsers] = useState("");
    const [selectAllWorkplaces, setSelectAllWorkplaces] = useState(false);
    const [selectAllTeams, setSelectAllTeams] = useState(false);
    const [selectAllUsers, setSelectAllUsers] = useState(false);
    const [selectedWorkplaces, setSelectedWorkplaces] = useState(new Set());
    const [selectedTeams, setSelectedTeams] = useState(new Set());
    const [selectedUsers, setSelectedUsers] = useState(new Set());

    const [isModalVisible, setIsModalVisible] = useState(false);

    const configuration = TokenService.getConfig();
    const workplaceName = configuration.filter(
        (item) => item.key === "WORKPLACE_NAME"
    )[0]?.value;
    const teamName = configuration.filter((item) => item.key === "TEAM_NAME")[0]
        ?.value;
    const userName = configuration.filter((item) => item.key === "USER_NAME")[0]
        ?.value;

    const notification = useNotification();
    const intl = useIntl();

    useEffect(() => {
        const fetchData = async () => {
            const [workplacesRes, teamsRes, usersRes] = await Promise.all([
                request.get("workplaces"),
                request.get("teams"),
                request.get("users"),
            ]);

            setWorkplaces(workplacesRes.data["hydra:member"]);
            setTeams(teamsRes.data["hydra:member"]);
            setUsers(usersRes.data["hydra:member"]);
        };
        fetchData();
    }, []);

    const handleSelectAll = (type, checked) => {
        if (type === "workplaces") {
            setSelectAllWorkplaces(checked);
            setSelectedWorkplaces(
                checked ? new Set(workplaces.map((wp) => wp.id)) : new Set()
            );
        } else if (type === "teams") {
            setSelectAllTeams(checked);
            setSelectedTeams(
                checked ? new Set(teams.map((team) => team.id)) : new Set()
            );
        } else if (type === "users") {
            setSelectAllUsers(checked);
            setSelectedUsers(
                checked ? new Set(users.map((user) => user.id)) : new Set()
            );
        }
    };

    const handleCheckboxChange = (id, isChecked, type) => {
        const selectionSets = {
            workplaces: selectedWorkplaces,
            teams: selectedTeams,
            users: selectedUsers,
        };
        const setSelected = {
            workplaces: setSelectedWorkplaces,
            teams: setSelectedTeams,
            users: setSelectedUsers,
        };
        if (isChecked) {
            selectionSets[type].add(id);
        } else {
            selectionSets[type].delete(id);
        }
        setSelected[type](new Set(selectionSets[type]));
    };

    const filterItems = (items, search) => {
        if (!search) return items;
        const lowercasedSearch = search.toLowerCase();
        return items.filter((item) => {
            const name = item.name || `${item.firstName} ${item.lastName}`;
            return name.toLowerCase().includes(lowercasedSearch);
        });
    };

    const confirmDeployment = () => {
        setIsModalVisible(true);
    };

    const cancelDeployment = () => {
        setIsModalVisible(false);
    };

    const selectedEntitiesPreview = () => {
        const workplacesPreview = Array.from(selectedWorkplaces)
            .map((id) => workplaces.find((wp) => wp.id === id)?.name)
            .join(", ");
        const teamsPreview = Array.from(selectedTeams)
            .map((id) => teams.find((team) => team.id === id)?.name)
            .join(", ");
        const usersPreview = Array.from(selectedUsers)
            .map((id) => {
                const user = users.find((user) => user.id === id);
                return `${user?.firstName} ${user?.lastName}`;
            })
            .join(", ");
        if (workplacesPreview || teamsPreview || usersPreview)
            return (
                <ul className={classes.recapContainer}>
                    {workplacesPreview && (
                        <li>
                            <b>{workplaceName}:</b> {workplacesPreview}
                        </li>
                    )}
                    {teamsPreview && (
                        <li>
                            <b>{teamName}:</b> {teamsPreview}
                        </li>
                    )}
                    {usersPreview && (
                        <li>
                            <b>{userName}:</b> {usersPreview}
                        </li>
                    )}
                </ul>
            );
        return <>{TokenService.getOrganisation().name}</>;
    };

    const handleSubmit = async () => {
        const payload = {
            workplaceIds: Array.from(selectedWorkplaces),
            teamIds: Array.from(selectedTeams),
            userIds: Array.from(selectedUsers),
        };

        try {
            const response = await request.post("/user/send-token", payload);
            notification({
                content: (
                    <>{response.data.sentTo.length} collaborateur(s) notifiés</>
                ),
                status: "valid",
            });
        } catch (error) {
            notification({
                content: <FormattedMessage id="message.error.generic" />,
                status: "invalid",
            });
        } finally {
            cancelDeployment();
        }
    };

    return (
        <div className={classes.container}>
            <h1>
                <FormattedMessage id="deploy.title" />
            </h1>

            <div className={classes.column}>
                <div className={classes.header}>
                    <h2>
                        <label htmlFor="selectAllWorkplaces">
                            {workplaceName}
                        </label>
                    </h2>
                    <CustomCheckbox
                        checked={selectAllWorkplaces}
                        id="selectAllWorkplaces"
                        onChange={(e) =>
                            handleSelectAll("workplaces", e.target.checked)
                        }
                    />
                </div>
                <Input
                    placeholder={intl.formatMessage({ id: "search" })}
                    value={searchWorkplaces}
                    onChange={(e) => setSearchWorkplaces(e.target.value)}
                />
                <div className={classes.scrollableList}>
                    {filterItems(workplaces, searchWorkplaces).map((wp) => (
                        <div className={classes.checkboxContainer}>
                            <CustomCheckbox
                                key={wp.id}
                                id={`workplace-${wp.id}`}
                                checked={selectedWorkplaces.has(wp.id)}
                                onChange={(e) =>
                                    handleCheckboxChange(
                                        wp.id,
                                        e.target.checked,
                                        "workplaces"
                                    )
                                }
                                label={wp.name}
                            />
                            <label htmlFor={`workplace-${wp.id}`}>
                                {wp.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className={classes.column}>
                <div className={classes.header}>
                    <h2>
                        <label htmlFor="selectAllTeams">{teamName}</label>
                    </h2>
                    <CustomCheckbox
                        checked={selectAllTeams}
                        id="selectAllTeams"
                        onChange={(e) =>
                            handleSelectAll("teams", e.target.checked)
                        }
                    />
                </div>
                <Input
                    placeholder={intl.formatMessage({ id: "search" })}
                    value={searchTeams}
                    onChange={(e) => setSearchTeams(e.target.value)}
                />
                <div className={classes.scrollableList}>
                    {filterItems(teams, searchTeams).map((team) => (
                        <div className={classes.checkboxContainer}>
                            <CustomCheckbox
                                key={team.id}
                                id={`team-${team.id}`}
                                checked={selectedTeams.has(team.id)}
                                onChange={(e) =>
                                    handleCheckboxChange(
                                        team.id,
                                        e.target.checked,
                                        "teams"
                                    )
                                }
                                label={team.name}
                            />
                            <label htmlFor={`team-${team.id}`}>
                                {team.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className={classes.column}>
                <div className={classes.header}>
                    <h2>
                        <label htmlFor="selectAllUSers">{userName}</label>
                    </h2>
                    <CustomCheckbox
                        id="selectAllUSers"
                        checked={selectAllUsers}
                        onChange={(e) =>
                            handleSelectAll("users", e.target.checked)
                        }
                    />
                </div>
                <Input
                    placeholder={intl.formatMessage({ id: "search" })}
                    value={searchUsers}
                    onChange={(e) => setSearchUsers(e.target.value)}
                />
                <div className={classes.scrollableList}>
                    {filterItems(users, searchUsers).map((user) => (
                        <div className={classes.checkboxContainer}>
                            <CustomCheckbox
                                key={user.id}
                                id={`user-${user.id}`}
                                checked={selectedUsers.has(user.id)}
                                onChange={(e) =>
                                    handleCheckboxChange(
                                        user.id,
                                        e.target.checked,
                                        "users"
                                    )
                                }
                                label={`${user.firstName} ${user.lastName}`}
                            />
                            <label
                                htmlFor={`user-${user.id}`}
                            >{`${user.firstName} ${user.lastName}`}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className={classes.ctaContainer}>
                <Button color="primaryFill" onClick={confirmDeployment}>
                    <FormattedMessage id="buttons.placeholder.send_mail" />
                </Button>

                {selectedWorkplaces.size === 0 &&
                    selectedTeams.size === 0 &&
                    selectedUsers.size === 0 && (
                        <p className={classes.infoMessage}>
                            <FormattedMessage
                                id="noSelectionInfo"
                                defaultMessage="Si rien n'est sélectionné, l'email sera envoyé à tout le monde."
                            />
                        </p>
                    )}
            </div>
            {isModalVisible && (
                <Modal
                    style={{ maxHeight: "max-content" }}
                    title={
                        <span className={classes.primaryTxt}>
                            <FormattedMessage id="deploy.send_mail.title" />
                        </span>
                    }
                    content={
                        <>
                            <p>
                                <FormattedMessage id="deploy.send_mail.description" />
                            </p>
                            {selectedEntitiesPreview()}
                        </>
                    }
                    cancel={
                        <FormattedMessage id="buttons.placeholder.cancel" />
                    }
                    validate={
                        <FormattedMessage id="buttons.placeholder.send_mail" />
                    }
                    onCancel={cancelDeployment}
                    onConfirm={handleSubmit}
                />
            )}
        </div>
    );
};

export { Deploy };
