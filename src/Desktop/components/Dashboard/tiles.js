import ChevronRight from "Assets/icons/chevron-right.svg";
import classes from "./tiles.module.css";
import { useEffect, useState } from "react";
import request from "Utils/Request/request";
import Modal from "Utils/Modals/modal";
import { BsBroadcastPin } from "react-icons/bs";
import { useNotification } from "Utils/Notifications/notifications";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TokenService } from "Utils/index";
import { Tile } from "./Tile";
import { ConnectTile } from "./ConnectTile";

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
        <span>Envoyer le mail</span>
    );

    const notification = useNotification();

    useEffect(async () => {
        props.setLoading(false);
        props.handleHeader(" ");

        await request.get("configurations").then(({ data }) => {
            TokenService.setConfig(data["hydra:member"])
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
            .catch(() => {});
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
            .catch(() => {});
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
            .catch(() => {});
        await request
            .get(`users`)
            .then((res) => {
                setUsers(res.data["hydra:member"]);
            })
            .catch(() => {});
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
                props.setLoading(true);
            })
            .catch(() => {});
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
                <span style={{ opacity: 0 }}>Envoyer le mail</span>
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
                setSendMailBtn(<>Envoyer le mail</>);
                setModal(false);
            })
            .catch(() => {
                notification({
                    content: <>Une erreur est survenue. Veuillez réessayer</>,
                    status: "invalid",
                });
                setSendMailBtn(<>Envoyer le mail</>);
                setModal(false);
            });
    };

    return (
        <div className={classes.container}>
            {modal && (
                <Modal
                    style={{ left: 0, padding: "1rem 2rem" }}
                    title={
                        <span className={classes.orangeTxt}>
                            Envoyer le lien par mail
                            <br /> à tous les collaborateurs
                        </span>
                    }
                    content={`Le déploiement permet à vos collaborateurs de copier directement leur signature dans leur client mail (mobile ou desktop)`}
                    cancel="Annuler"
                    validate={sendMailBtn}
                    onCancel={() => setModal(false)}
                    onConfirm={handleDeploy}
                />
            )}
            <div className={classes.tilesList}>
                {!templates.length < 1 && (
                    <Tile
                        link="/signatures"
                        title="Signatures"
                        icon={ChevronRight}
                        iconAlt="View"
                        leftCorner={
                            <>
                                {activeSignatures}{" "}
                                <span> /{templates?.length}</span>
                            </>
                        }
                        rightCorner="actives"
                    />
                )}
                {!events.length < 1 && (
                    <Tile
                        link="/events"
                        title="Events"
                        icon={ChevronRight}
                        iconAlt="View"
                        leftCorner={
                            <>
                                {activeEvent} <span> /{events.length}</span>
                            </>
                        }
                        rightCorner="actifs"
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
                        iconAlt="Voir workplaces"
                        leftCorner={
                            <>
                                {activeWorkplaces} <span> /{wps.length}</span>
                            </>
                        }
                        rightCorner="actifs"
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
                        iconAlt="Voir teams"
                        leftCorner={
                            <>
                                {activeTeams} <span> /{teamsList.length}</span>
                            </>
                        }
                        rightCorner="actives"
                    />
                )}
                <Tile
                    link="/teams/users"
                    title={
                        config.filter((item) => item.key === "USER_NAME")[0]
                            ?.value
                    }
                    icon={ChevronRight}
                    iconAlt="Voir users"
                    leftCorner={users.length}
                    rightCorner="actifs"
                />
                <div
                    className={`${classes.tile} ${classes.deploy}`}
                    onClick={() => setModal(true)}
                >
                    <div className={`${classes.row} ${classes.onUnHover}`}>
                        <p style={{ width: "5rem" }}>Déploiement</p>
                        <BsBroadcastPin
                            fontSize={"1.75rem"}
                            style={{ margin: "auto 0 1rem 0" }}
                        />
                    </div>
                    <div className={`${classes.row} ${classes.onHover}`}>
                        <p style={{ width: "5rem" }}>Déployer</p>
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
                        <span className={classes.activeSpan}>actifs</span>
                    </div>
                </div>
                <div className={`${classes.tile} ${classes.billingTile}`}>
                    <div className={classes.row}>
                        <p>Abonnement</p>
                        <img src={ChevronRight} alt="View" />
                    </div>
                    <div className={classes.row}>
                        <div>
                            <span className={classes.free}>Gratuit</span>
                        </div>
                    </div>
                </div>
                <ConnectTile organisation={TokenService.getOrganisation()} />
            </div>
        </div>
    );
}

export default Tiles;
