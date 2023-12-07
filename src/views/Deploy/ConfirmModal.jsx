import React from "react";
import { Modal } from "components";
import { FormattedMessage } from "react-intl";
import SelectedEntitiesPreview from "./SelectedEntitiesPreview";
import classes from "./deploy.module.css";

const ConfirmModal = ({
    isModalVisible,
    cancelDeployment,
    handleSubmit,
    selectedWorkplaces,
    selectedTeams,
    selectedUsers,
    workplaces,
    teams,
    users,
}) => {
    if (!isModalVisible) return null;
    return (
        <Modal
            onCancel={cancelDeployment}
            onConfirm={handleSubmit}
            title={<FormattedMessage id="deploy.send_mail.title" />}
            content={
                <>
                    <ul className={classes.recapContainer}>
                        <SelectedEntitiesPreview
                            selectedEntities={selectedWorkplaces}
                            entities={workplaces}
                            entityType="Workplaces"
                        />
                        <SelectedEntitiesPreview
                            selectedEntities={selectedTeams}
                            entities={teams}
                            entityType="Teams"
                        />
                        <SelectedEntitiesPreview
                            selectedEntities={selectedUsers}
                            entities={users}
                            entityType="Users"
                        />
                    </ul>
                </>
            }
            cancel={<FormattedMessage id="buttons.placeholder.cancel" />}
            validate={<FormattedMessage id="buttons.placeholder.send_mail" />}
        />
    );
};

export default ConfirmModal;
