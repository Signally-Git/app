import React, { useEffect, useRef, useState } from "react";
import CreateTeam from "../Create/createTeam";
import CreateUser from "../Create/createUser";
import CreateWorkplace from "../Create/createWorkplace";
import ListUsers from "./ListUsers";
import { getDataTeam, ListTeams} from "./ListTeams";
import { TokenService, useNotification } from "utils";
import { handleModal } from "./tabs.utils";
import { getDataWorkplaces, ListWorkplaces } from "./ListWorkplaces";

export default function Tab({
    tab,
    selected,
    setSelected,
    edit,
    setEdit,
    editInfo,
    setEditInfo,
}) {
    const [changed, setChanged] = useState(false);
    const [addedWorkplace, setAddedWorkplace] = useState("");
    const [searchTeam, setSearchTeam] = useState("");
    const toFocus = useRef(null);
    const [workplaces, setWorkplaces] = useState([]);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState({ type: "", name: "", id: "" });
    const [modalContent, setModalContent] = useState();
    const [teamName, setTeamName] = useState("");

    const [done, setDone] = useState(false);
    const configuration = TokenService.getConfig();
    let time;

    const notification = useNotification();

    const refreshData = async () => {
        getDataWorkplaces(setWorkplaces);
        await getDataTeam(teams, setTeams);
        setDone(false);
    };

    useEffect(() => {
        refreshData();
    }, [addedWorkplace, done, tab]);

    // Modal confirmation
    useEffect(() => {
        setModalContent(
            handleModal(
                modal,
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
            )
        );
    }, [modal]);

    useEffect(() => {
        setTimeout(() => {
            setAddedWorkplace("");
        }, 2000);
    }, [addedWorkplace]);

    useEffect(() => {
        toFocus?.current?.focus();
    }, [edit]);
    
    if (tab === "workplaces")
        return (
            <ListWorkplaces
                modal={modal}
                modalContent={modalContent}
                setModal={setModal}
                changed={changed}
                setChanged={setChanged}
                edit={edit}
                setEdit={setEdit}
                editInfo={editInfo}
                selected={selected}
                setSelected={setSelected}
                setEditInfo={setEditInfo}
                workplaces={workplaces}
                setWorkplaces={setWorkplaces}
                addedWorkplace={addedWorkplace}
                toFocus={toFocus}
                time={time}
            />
        );
    if (tab === "create-workplace")
        return <CreateWorkplace setDone={setDone} />;

    if (tab === "teams")
        return (
            <ListTeams
                modal={modal}
                setModal={setModal}
                modalContent={modalContent}
                selected={selected}
                setSelected={setSelected}
                searchTeam={searchTeam}
                setSearchTeam={setSearchTeam}
                edit={edit}
                teams={teams}
                setTeams={setTeams}
                setEdit={setEdit}
                editInfo={editInfo}
                setEditInfo={setEditInfo}
                toFocus={toFocus}
                teamName={teamName}
                setTeamName={setTeamName}
                changed={changed}
                setChanged={setChanged}
            />
        );
    if (tab === "create-team") return <CreateTeam setDone={setDone} />;
    if (tab === "create-user") return <CreateUser setDone={setDone} />;

    if (tab === "users")
        return (
            <div>
                {modal.type ? modalContent : ""}
                <ListUsers
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
