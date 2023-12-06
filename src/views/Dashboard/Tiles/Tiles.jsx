import ChevronRight from "assets/icons/chevron-right.svg";
import classes from "./tiles.module.css";
import {useEffect, useRef, useState} from "react";
import {TokenService, request, useNotification} from "utils";
import {Tile} from "./Tile";
import {ConnectTile} from "./ConnectTile";
import {FormattedMessage} from "react-intl";

function Tiles(props) {
    const [events, setEvents] = useState([]);
    const [activeEvent, setActiveEvent] = useState();
    const [teamsList, setTeamsList] = useState([]);
    const [activeTeams, setActiveTeams] = useState(0);
    const [activeWorkplaces, setActiveWorkplaces] = useState(0);
    const [users, setUsers] = useState([]);
    const [wps, setWPs] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [signatures, setSignatures] = useState([]);
    const [activeSignatures, setActiveSignatures] = useState(0);
    let workplaceName = "WORKPLACE_NAME";
    const [userName, setUserName] = useState("USER_NAME");

    const config = TokenService.getConfig() || [];

    const notification = useNotification();

    const isMountedRef = useRef(true); // Utiliser une référence pour suivre le montage/démontage du composant

    useEffect(() => {
        return () => {
            isMountedRef.current = false; // Mettre à jour la référence lorsque le composant est démonté
        };
    }, []);

    useEffect(async () => {
        props.setLoading(false);

        await request.get("configurations").then(({data}) => {
            TokenService.setConfig(data["hydra:member"]);
            workplaceName = data["hydra:member"]?.filter((entity) => (entity.key = workplaceName)).value;
            setUserName(data["hydra:member"]?.filter((entity) => (entity.key = userName)).value);
        });

        await request
            .get(`events`)
            .then((res) => {
                let count = 0;
                res.data["hydra:member"].map((event) => {
                    if (event.users.length > 0 || event.teams.length > 0 || event.workplaces.length > 0) count++;
                });
                if (isMountedRef.current) {
                    setActiveEvent(count);
                    setEvents(res.data["hydra:member"]);
                }
            })
            .catch(() => {
                if (isMountedRef.current) {
                    notification({
                        content: (<FormattedMessage id="message.error.generic"/>), status: "invalid",
                    });
                }
            });
        await request
            .get(`teams`)
            .then((res) => {
                let count = 0;
                res.data["hydra:member"].map((team) => {
                    if (team.users.length > 0) count++;
                });
                if (isMountedRef.current) {
                    setActiveTeams(count);
                    setTeamsList(res.data["hydra:member"]);
                }
            })
            .catch(() => {
                if (isMountedRef.current) {
                    notification({
                        content: (<FormattedMessage id="message.error.generic"/>), status: "invalid",
                    });
                }
            });
        await request
            .get(`workplaces`)
            .then((res) => {
                let count = 0;
                res.data["hydra:member"].map((wp) => {
                    if (wp.teams.length > 0) count++;
                });
                if (isMountedRef.current) {
                    setActiveWorkplaces(count);
                    setWPs(res.data["hydra:member"]);
                }
            })
            .catch(() => {
                if (isMountedRef.current) {
                    notification({
                        content: (<FormattedMessage id="message.error.generic"/>), status: "invalid",
                    });
                }
            });
        await request
            .get(`users`)
            .then((res) => {
                if (isMountedRef.current) {
                    setUsers(res.data["hydra:member"]);
                }
            })
            .catch(() => {
                if (isMountedRef.current) {
                    notification({
                        content: (<FormattedMessage id="message.error.generic"/>), status: "invalid",
                    });
                }
            });
        await request
            .get(`signatures`)
            .then((res) => {
                let count = 0;
                res.data["hydra:member"].map((signature) => {
                    if (signature.users.length > 0 || signature.teams.length > 0 || signature.workplaces.length > 0) count++;
                });
                if (isMountedRef.current) {
                    setActiveSignatures(count);
                    setTemplates(res.data["hydra:member"]);
                }
            })
            .catch(() => {
                if (isMountedRef.current) {
                    notification({
                        content: (<FormattedMessage id="message.error.generic"/>), status: "invalid",
                    });
                }
            });
        props.setLoading(true);
    }, []);

    useEffect(() => {
        users.map((user) => {
            if (user.signature_template_id) setSignatures([...signatures, [user.signature_template_id]]);
        });
    }, [users, props.loading]);

    return (<div className={classes.container}>
            <div className={classes.tilesList}>
                {!templates.length < 1 && (<Tile
                        link="/signatures"
                        title={<FormattedMessage id="signatures"/>}
                        icon={ChevronRight}
                        iconAlt="View"
                        leftCorner={<>
                            {activeSignatures}{" "}
                            <span> /{templates?.length}</span>
                        </>}
                    />)}
                {!events.length < 1 && (<Tile
                        link="/events"
                        title={<FormattedMessage id="events"/>}
                        icon={ChevronRight}
                        iconAlt="View"
                        leftCorner={<>
                            {activeEvent} <span> /{events.length}</span>
                        </>}
                    />)}
                {!wps.length < 1 && (<Tile
                        link="/teams/workplaces"
                        title={config.filter((item) => item.key === "WORKPLACE_NAME")[0].value}
                        icon={ChevronRight}
                        iconAlt="View"
                        leftCorner={<>
                            {activeWorkplaces} <span> /{wps.filter((wp) => wp.synchronizable).length}</span>
                        </>}
                        rightCorner={<FormattedMessage
                            id="activated.male"
                            values={{count: wps.length}}
                        />}
                    />)}
                {!teamsList.length < 1 && (<Tile
                        link="/teams/teams"
                        title={config.filter((item) => item.key === "TEAM_NAME")[0].value}
                        icon={ChevronRight}
                        iconAlt="View"
                        leftCorner={<>
                            {activeTeams} <span> /{teamsList.filter((team) => team.synchronizable).length}</span>
                        </>}
                        rightCorner={<FormattedMessage
                            id="activated.female"
                            values={{count: teamsList.length}}
                        />}
                    />)}
                <Tile
                    link="/teams/users"
                    title={config.filter((item) => item.key === "USER_NAME")[0]?.value}
                    icon={ChevronRight}
                    iconAlt="View"
                    leftCorner={users.length}
                    rightCorner={<FormattedMessage
                        id="activated.male"
                        values={{count: users.length}}
                    />}
                />
                <ConnectTile organisation={TokenService.getOrganisation()}/>
            </div>
        </div>);
}

export default Tiles;
