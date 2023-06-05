import ChevronRight from "Assets/icons/chevron-right.svg";
import classes from "./tiles.module.css";
import { useEffect, useState } from "react";
import request from "Utils/Request/request";
import Modal from "Utils/Modals/modal";
import { BsBroadcastPin } from "react-icons/bs";
import { useNotification } from "Utils/Notifications/notifications";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TokenService } from "Utils";
import { Tile } from "./Tile";
import { ConnectTile } from "./ConnectTile";
import { FormattedMessage } from "react-intl";

function Tiles(props) {
    const [events, setEvents] = useState([]);
    const [activeEvent, setActiveEvent] = useState();
    const [teamsList, setTeamsList] = useState([]);
    const [activeTeams, setActiveTeams] = useState(0);
    const [activeWorkplaces, setActiveWorkplaces] = useState(0);
    const [users, setUsers] = useState([]);
    const [wps, setWPs] = useState([]);
    const [modal, setModal] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [signatures, setSignatures] = useState([]);
    const [activeSignatures, setActiveSignatures] = useState(0);
    let workplaceName = "WORKPLACE_NAME";
    const [userName, setUserName] = useState("USER_NAME");

    const config = TokenService.getConfig() || [];

    const [sendMailBtn, setSendMailBtn] = useState(
        <FormattedMessage id="buttons.placeholder.send_mail" />
    );

    const notification = useNotification();

    useEffect(async () => {
        props.setLoading(false);

        await request.get("configurations").then(({ data }) => {
            TokenService.setConfig(data["hydra:member"]);
            workplaceName = data["hydra:member"]?.filter(
                (entity) => (entity.key = workplaceName)
            ).value;
            setUserName(
                data["hydra:member"]?.filter(
                    (entity) => (entity.key = userName)
                ).value
            );
        });

        await request
            .get(`events`)
            .then((res) => {
                let count = 0;
                res.data["hydra:member"].map((event) => {
                    if (
                        event.users.length > 0 ||
                        event.teams.length > 0 ||
                        event.workplaces.length > 0
                    )
                        count++;
                });
                setActiveEvent(count);
                setEvents(res.data["hydra:member"]);
            })
            .catch(() => {
                notification({
                    content: <FormattedMessage id="message.error.generic" />,
                    status: "invalid",
                });
            });
        await request
            .get(`teams`)
            .then((res) => {
                let count = 0;
                res.data["hydra:member"].map((team) => {
                    if (team.users.length > 0) count++;
                });
                setActiveTeams(count);
                setTeamsList(res.data["hydra:member"]);
            })
            .catch(() => {
                notification({
                    content: <FormattedMessage id="message.error.generic" />,
                    status: "invalid",
                });
            });
        await request
            .get(`workplaces`)
            .then((res) => {
                let count = 0;
                res.data["hydra:member"].map((wp) => {
                    if (wp.teams.length > 0) count++;
                });
                setActiveWorkplaces(count);
                setWPs(res.data["hydra:member"]);
            })
            .catch(() => {
                notification({
                    content: <FormattedMessage id="message.error.generic" />,
                    status: "invalid",
                });
            });
        await request
            .get(`users`)
            .then((res) => {
                setUsers(res.data["hydra:member"]);
            })
            .catch(() => {
                notification({
                    content: <FormattedMessage id="message.error.generic" />,
                    status: "invalid",
                });
            });
        await request
            .get(`signatures`)
            .then((res) => {
                let count = 0;
                res.data["hydra:member"].map((signature) => {
                    if (
                        signature.users.length > 0 ||
                        signature.teams.length > 0 ||
                        signature.workplaces.length > 0
                    )
                        count++;
                });
                setActiveSignatures(count);
                setTemplates(res.data["hydra:member"]);
            })
            .catch(() => {
                notification({
                    content: <FormattedMessage id="message.error.generic" />,
                    status: "invalid",
                });
            });
        props.setLoading(true);
    }, []);

    useEffect(() => {
        users.map((user) => {
            if (user.signature_template_id)
                setSignatures([...signatures, [user.signature_template_id]]);
        });
    }, [users, props.loading]);

    const handleDeploy = async () => {
        setSendMailBtn(
            <>
                <span style={{ opacity: 0 }}>
                    <FormattedMessage id="buttons.placeholder.send_mail" />
                </span>
                <AiOutlineLoading3Quarters className={classes.loadingBtn} />
            </>
        );
        await request
            .get("user/send-token")
            .then(() => {
                notification({
                    content: <>{users.length} collaborateur(s) notifiés</>,
                    status: "valid",
                });
                setSendMailBtn(
                    <FormattedMessage id="buttons.placeholder.send_mail" />
                );
                setModal(false);
            })
            .catch(() => {
                notification({
                    content: (
                        <FormattedMessage id="buttons.placeholder.send_mail" />
                    ),
                    status: "invalid",
                });
                setSendMailBtn(
                    <>
                        <FormattedMessage id="buttons.placeholder.send_mail" />
                    </>
                );
                setModal(false);
            });
    };

    return (
        <div className={classes.container}>
            {modal && (
                <Modal
                    style={{ left: 0, padding: "1rem 2rem" }}
                    title={
                        <span className={classes.primaryTxt}>
                            <FormattedMessage id="deploy.send_mail.title" />
                        </span>
                    }
                    content={
                        <FormattedMessage id="deploy.send_mail.description" />
                    }
                    cancel={
                        <FormattedMessage id="buttons.placeholder.cancel" />
                    }
                    validate={sendMailBtn}
                    onCancel={() => setModal(false)}
                    onConfirm={handleDeploy}
                />
            )}
            <div className={classes.tilesList}>
                {!templates.length < 1 && (
                    <Tile
                        link="/signatures"
                        title={<FormattedMessage id="signatures" />}
                        icon={ChevronRight}
                        iconAlt="View"
                        leftCorner={
                            <>
                                {activeSignatures}{" "}
                                <span> /{templates?.length}</span>
                            </>
                        }
                        rightCorner={
                            <FormattedMessage
                                id="activated.female"
                                values={{ count: templates.length }}
                            />
                        }
                    />
                )}
                {!events.length < 1 && (
                    <Tile
                        link="/events"
                        title={<FormattedMessage id="events" />}
                        icon={ChevronRight}
                        iconAlt="View"
                        leftCorner={
                            <>
                                {activeEvent} <span> /{events.length}</span>
                            </>
                        }
                        rightCorner={
                            <FormattedMessage
                                id="activated.male"
                                values={{ count: events.length }}
                            />
                        }
                    />
                )}
                {!wps.length < 1 && (
                    <Tile
                        link="/teams/workplaces"
                        title={
                            config.filter(
                                (item) => item.key === "WORKPLACE_NAME"
                            )[0].value
                        }
                        icon={ChevronRight}
                        iconAlt="View"
                        leftCorner={
                            <>
                                {activeWorkplaces} <span> /{wps.length}</span>
                            </>
                        }
                        rightCorner={
                            <FormattedMessage
                                id="activated.male"
                                values={{ count: wps.length }}
                            />
                        }
                    />
                )}
                {!teamsList.length < 1 && (
                    <Tile
                        link="/teams/teams"
                        title={
                            config.filter((item) => item.key === "TEAM_NAME")[0]
                                .value
                        }
                        icon={ChevronRight}
                        iconAlt="View"
                        leftCorner={
                            <>
                                {activeTeams} <span> /{teamsList.length}</span>
                            </>
                        }
                        rightCorner={
                            <FormattedMessage
                                id="activated.female"
                                values={{ count: teamsList.length }}
                            />
                        }
                    />
                )}
                <Tile
                    link="/teams/users"
                    title={
                        config.filter((item) => item.key === "USER_NAME")[0]
                            ?.value
                    }
                    icon={ChevronRight}
                    iconAlt="View"
                    leftCorner={users.length}
                    rightCorner={
                        <FormattedMessage
                            id="activated.male"
                            values={{ count: users.length }}
                        />
                    }
                />
                <div
                    className={`${classes.tile} ${classes.deploy}`}
                    onClick={() => setModal(true)}
                >
                    <div className={`${classes.row} ${classes.onUnHover}`}>
                        <p style={{ width: "5rem" }}>
                            <FormattedMessage id="deploy.title" />
                        </p>
                        <BsBroadcastPin
                            fontSize={"1.75rem"}
                            style={{ margin: "auto 0 1rem 0" }}
                        />
                    </div>
                    <div className={`${classes.row} ${classes.onHover}`}>
                        <p style={{ width: "5rem" }}>
                            <FormattedMessage id="deploy.cta" />
                        </p>
                        <BsBroadcastPin
                            fontSize={"1.75rem"}
                            style={{ margin: "auto 0 1rem 0" }}
                        />
                    </div>
                    <div className={classes.row}>
                        <div>
                            <span className={classes.bigTxt}>
                                {users.length}
                            </span>
                        </div>
                        <span className={classes.activeSpan}>
                            <FormattedMessage
                                id="activated.male"
                                values={{ count: users.length }}
                            />
                        </span>
                    </div>
                </div>
                <div className={`${classes.tile} ${classes.billingTile}`}>
                    <div className={classes.row}>
                        <p>
                            <FormattedMessage id="billing" />
                        </p>
                        <img src={ChevronRight} alt="View" />
                    </div>
                    <div className={classes.row}>
                        <div>
                            <span className={classes.free}>
                                <FormattedMessage id="free" />
                            </span>
                        </div>
                    </div>
                </div>
                <ConnectTile organisation={TokenService.getOrganisation()} />
            </div>
        </div>
    );
}

export default Tiles;
