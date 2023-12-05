import { request } from "utils";
import classes from "./tab.module.css";
import { FormattedMessage } from "react-intl";
import React from "react";
import { Button } from "components";

const ModalButton = ({ color, onClick, messageId }) => (
    <Button color={color} onClick={onClick}>
        <FormattedMessage id={messageId} />
    </Button>
);

const getConfigurationValue = (configuration, key) => {
    const configItem = configuration.find((item) => item.key === key);
    return configItem ? configItem.value : "";
};

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
    const handleCloseModal = () => setModal({ type: "", name: "", id: "" });
    const { type, id, name } = toDelete;

    const getEntityCount = () => {
        switch (type) {
            case "allworkplaces":
                return workplaces.length;
            case "allteams":
                return teams.length;
            case "allusers":
                return users.length - 1;
            default:
                return toDelete?.name;
        }
    };

    const getEntityName = () => {
        switch (type) {
            case "allworkplaces":
                return getConfigurationValue(configuration, "WORKPLACE_NAME");
            case "allteams":
                return getConfigurationValue(configuration, "TEAM_NAME");
            case "allusers":
                return getConfigurationValue(configuration, "USER_NAME");
            default:
                return "";
        }
    };

    const handleDeleteClick = () => {
        if (["allworkplaces", "allteams", "allusers"].includes(type)) {
            handleDeleteAll(
                type,
                users,
                notification,
                configuration,
                refreshData,
                setEdit,
                setSelected,
                teams,
                setModal
            );
        } else {
            handleDelete(
                id,
                type,
                name,
                notification,
                setModal,
                selected,
                setSelected,
                refreshData
            );
        }
    };

    return (
        <div className={classes.modal}>
            <h4>
                <FormattedMessage id="message.warning.delete" />
                <br />
                <span
                    className={classes.primaryTxt}
                >{`${getEntityCount()} ${getEntityName()}`}</span>
            </h4>
            <div>
                <ModalButton
                    color="primary"
                    onClick={handleCloseModal}
                    messageId="buttons.placeholder.cancel"
                />
                <ModalButton
                    color="primaryFill"
                    onClick={handleDeleteClick}
                    messageId="buttons.placeholder.delete"
                />
            </div>
        </div>
    );
};

const notify = (messageId, name, status, notification, classes) => {
    notification({
        content: (
            <>
                {messageId === "message.success.delete" ? (
                    <span>{name}</span>
                ) : null}
                <FormattedMessage id={messageId} />
                {messageId === "message.error.delete" ? (
                    <span>{name}</span>
                ) : null}
            </>
        ),
        status: status,
    });
};

const handleDelete = async (
    id,
    type,
    name,
    notification,
    setModal,
    selected,
    setSelected,
    refreshData,
    classes
) => {
    try {
        await request.delete(`${type}/${id}`);
        notify("message.success.delete", name, "valid", notification, classes);
    } catch (error) {
        notify("message.error.delete", name, "invalid", notification, classes);
    } finally {
        if (selected?.id === id) {
            setSelected();
        }
        await refreshData();
        setModal({ type: "", name: "", id: "" });
    }
};

const handleDeleteAll = async (
    type,
    items,
    notification,
    configuration,
    refreshData,
    setEdit,
    setSelected,
    setModal,
    classes
) => {
    let count = 0;
    const promises = items.map(async (element) => {
        try {
            await request.delete(`${type.replace("all", "")}/${element.id}`);
            notify(
                "message.success.delete",
                element.name,
                "valid",
                classes,
                notification
            );
            count++;
        } catch (error) {
            notify(
                "message.error.delete",
                element.name,
                "invalid",
                classes,
                notification
            );
        }
    });

    await Promise.all(promises);

    if (count > 0) {
        const configItem = configuration.find(
            (item) => item.key === `${type.toUpperCase()}_NAME`
        );
        notify(
            "message.success.delete",
            `${count} ${configItem?.value}`,
            "valid",
            classes,
            notification
        );
        await refreshData();
        setEdit();
        setSelected();
    }
    setModal({ type: "", name: "", id: "" });
};

export { handleModal, handleDelete, handleDeleteAll };
