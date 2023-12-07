import React, { useState, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { request, useNotification } from "utils";
import { Button, CustomSelect } from "components";
import classes from "./deploy.module.css";
import EntitySelector from "./EntitySelector";
import ConfirmModal from "./ConfirmModal";

const Deploy = () => {
    // États pour les données
    const [workplaces, setWorkplaces] = useState([]);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);

    // États pour les recherches
    const [searchWorkplaces, setSearchWorkplaces] = useState("");
    const [searchTeams, setSearchTeams] = useState("");
    const [searchUsers, setSearchUsers] = useState("");

    // États pour la sélection
    const [selectAllWorkplaces, setSelectAllWorkplaces] = useState(false);
    const [selectAllTeams, setSelectAllTeams] = useState(false);
    const [selectAllUsers, setSelectAllUsers] = useState(false);
    const [selectedWorkplaces, setSelectedWorkplaces] = useState(new Set());
    const [selectedTeams, setSelectedTeams] = useState(new Set());
    const [selectedUsers, setSelectedUsers] = useState(new Set());

    const [sortCriteria, setSortCriteria] = useState("name_asc"); // Les options peuvent être 'name_asc', 'name_desc', 'date_asc', 'date_desc'
    const sortOptions = [{ value: "name_asc", label: "Nom (Ascendant)" }, {
        value: "name_desc",
        label: "Nom (Descendant)"
    }, { value: "lastName_asc", label: "Nom de famille (Ascendant)" }, {
        value: "lastName_desc",
        label: "Nom de famille (Descendant)"
    } // @Todo update API to get date
        // { value: "date_asc", label: "Date de création (Ascendant)" },
        // { value: "date_desc", label: "Date de création (Descendant)" },
    ];

    const [isModalVisible, setIsModalVisible] = useState(false);

    const notification = useNotification();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [workplacesRes, teamsRes, usersRes] = await Promise.all([request.get("workplaces"), request.get("teams"), request.get("users")]);
                setWorkplaces(workplacesRes.data["hydra:member"]);
                setTeams(teamsRes.data["hydra:member"]);
                setUsers(usersRes.data["hydra:member"]);
            } catch (error) {
                notification({
                    content: "Error loading data", status: "invalid"
                });
            }
        };
        fetchData();
    }, []);

    const handleSelectAll = (entityType, isChecked) => {
        switch (entityType) {
            case "Workplaces":
                setSelectAllWorkplaces(isChecked);
                setSelectedWorkplaces(isChecked ? new Set(workplaces.map((wp) => wp.id)) : new Set());
                break;
            case "Teams":
                setSelectAllTeams(isChecked);
                setSelectedTeams(isChecked ? new Set(teams.map((team) => team.id)) : new Set());
                break;
            case "Users":
                setSelectAllUsers(isChecked);
                setSelectedUsers(isChecked ? new Set(users.map((user) => user.id)) : new Set());
                break;
            default:
                break;
        }
    };

    const handleCheckboxChange = (id, isChecked, entityType) => {

        const newSet = new Set(entityType === "Workplaces" ? selectedWorkplaces : entityType === "Teams" ? selectedTeams : selectedUsers);
        if (isChecked) {
            newSet.add(id);
        } else {
            newSet.delete(id);
        }

        if (entityType === "Workplaces") {
            setSelectedWorkplaces(newSet);
        } else if (entityType === "Teams") {
            setSelectedTeams(newSet);
        } else if (entityType === "Users") {
            setSelectedUsers(newSet);
        }
    };

    const confirmDeployment = () => setIsModalVisible(true);
    const cancelDeployment = () => setIsModalVisible(false);

    const handleSubmit = async () => {
        const payload = {
            workplaceIds: Array.from(selectedWorkplaces),
            teamIds: Array.from(selectedTeams),
            userIds: Array.from(selectedUsers)
        };

        try {
            const response = await request.post("/user/send-token", payload);
            notification({
                content: `Emails sent to ${response.data?.sentTo?.length} users`, status: "valid"
            });
            setIsModalVisible(false);
        } catch (error) {
            notification({
                content: "Error sending emails", status: "invalid"
            });
        }
    };

    const filterEntities = (entities = [], search) => {
        if (!Array.isArray(entities)) {
            console.error("Expected 'entities' to be an array, but got:", entities);
            return [];
        }

        let filtered = entities.filter((entity) => {
            const entityName = entity.name || `${entity.firstName} ${entity.lastName}`;
            return entityName.toLowerCase().includes(search.toLowerCase());
        });

        switch (sortCriteria) {
            case "name_asc":
                filtered.sort((a, b) => (a.name || `${a.firstName} ${a.lastName}`).localeCompare(b.name || `${b.firstName} ${b.lastName}`));
                break;
            case "name_desc":
                filtered.sort((a, b) => (b.name || `${b.firstName} ${b.lastName}`).localeCompare(a.name || `${a.firstName} ${a.lastName}`));
                break;
            case "lastName_asc":
                filtered.sort((a, b) => (a.lastName || "").localeCompare(b.lastName || ""));
                break;
            case "lastName_desc":
                filtered.sort((a, b) => (b.lastName || "").localeCompare(a.lastName || ""));
                break;

            case "date_asc":
                filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case "date_desc":
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                break;
        }

        return filtered;
    };

    return (<div className={classes.container}>
            <h1>
                <FormattedMessage id="deploy.title" />
                <CustomSelect
                    items={sortOptions}
                    display="label"
                    displayinlist="label"
                    getValue="value"
                    defaultValue={sortCriteria}
                    onChange={(newValue) => setSortCriteria(newValue)}
                    styleList={{ maxHeight: "200px" }} // Exemple de style, ajustez selon vos besoins
                />
            </h1>
            <div className={classes.row}>
                <EntitySelector
                    entityType="Workplaces"
                    entities={filterEntities(workplaces, searchWorkplaces)}
                    selectedEntities={selectedWorkplaces}
                    selectAll={selectAllWorkplaces}
                    handleSelectAll={handleSelectAll}
                    handleCheckboxChange={handleCheckboxChange}
                    searchValue={searchWorkplaces}
                    handleSearchChange={(e) => setSearchWorkplaces(e.target.value)}
                />
                <EntitySelector
                    entityType="Teams"
                    entities={filterEntities(teams, searchTeams)}
                    selectedEntities={selectedTeams}
                    selectAll={selectAllTeams}
                    handleSelectAll={handleSelectAll}
                    handleCheckboxChange={handleCheckboxChange}
                    searchValue={searchTeams}
                    handleSearchChange={(e) => setSearchTeams(e.target.value)}
                />
                <EntitySelector
                    entityType="Users"
                    entities={filterEntities(users, searchUsers)}
                    selectedEntities={selectedUsers}
                    selectAll={selectAllUsers}
                    handleSelectAll={handleSelectAll}
                    handleCheckboxChange={handleCheckboxChange}
                    searchValue={searchUsers}
                    handleSearchChange={(e) => setSearchUsers(e.target.value)}
                />
            </div>
            <p>
                <FormattedMessage id="deploy.send_mail.description" />
            </p>
            <div className={classes.ctaContainer}>
                <Button color="primaryFill" onClick={confirmDeployment}>
                    <FormattedMessage id="buttons.placeholder.send_mail" />
                </Button>
            </div>
            <ConfirmModal
                isModalVisible={isModalVisible}
                cancelDeployment={cancelDeployment}
                handleSubmit={handleSubmit}
                selectedWorkplaces={selectedWorkplaces}
                selectedTeams={selectedTeams}
                selectedUsers={selectedUsers}
                workplaces={workplaces}
                teams={teams}
                users={users}
            />
        </div>);
};

export { Deploy };
