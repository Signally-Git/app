import { request } from "utils";
import classes from "./tab.module.css";
import { FormattedMessage } from "react-intl";
import React from "react";
import { Button } from "../../../components";

const handleModal = (
    toDelete,
    workplaces,
    configuration,
    setModal,
    notification,
    refreshData,
    setEdit,
    selected,
    setSelected,
    teams,
    users
) => {
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
                                handleDeleteAll(
                                    "workplaces",
                                    notification,
                                    configuration,
                                    refreshData,
                                    setEdit,
                                    setSelected,
                                    teams,
                                    users,
                                    setModal
                                )
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
                            onClick={() =>
                                handleDeleteAll(
                                    "teams",
                                    notification,
                                    configuration,
                                    refreshData,
                                    setEdit,
                                    setSelected,
                                    teams,
                                    users,
                                    setModal
                                )
                            }
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
                            onClick={() =>
                                handleDeleteAll(
                                    "users",
                                    notification,
                                    configuration,
                                    refreshData,
                                    setEdit,
                                    setSelected,
                                    teams,
                                    users,
                                    setModal
                                )
                            }
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
                                    toDelete?.name,
                                    notification,
                                    setModal,
                                    selected,
                                    setSelected,
                                    refreshData
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
const handleDelete = async (
    id,
    type,
    name,
    notification,
    setModal,
    selected,
    setSelected,
    refreshData
) => {
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
const handleDeleteAll = async (
    type,
    workplaces,
    notification,
    configuration,
    refreshData,
    setEdit,
    setSelected,
    teams,
    users,
    setModal
) => {
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
                                        <span className={classes.primaryColor}>
                                            {count}{" "}
                                            {
                                                configuration.filter(
                                                    (item) =>
                                                        item.key === "TEAM_NAME"
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
                                        <span className={classes.primaryColor}>
                                            {count}{" "}
                                            {
                                                configuration.filter(
                                                    (item) =>
                                                        item.key === "TEAM_NAME"
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
                    element?.id !== JSON.parse(localStorage.getItem("user"))?.id
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
                                                className={classes.primaryColor}
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
                                        <span className={classes.primaryColor}>
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

export { handleModal, handleDelete, handleDeleteAll };
