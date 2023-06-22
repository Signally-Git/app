import classes from "./events.module.css";
import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import Button from "Utils/Button/btn";
import CreateEvent from "./CreateEvent/createEvent";
import { FiTrash } from "react-icons/fi";
import { useNotification } from "Utils/Notifications/notifications";
import request from "Utils/Request/request";
import Modal from "Utils/Modals/modal";
import moment from "moment";
import { FormattedMessage, useIntl } from "react-intl";

function Events() {
    const [active, setActive] = useState("present");
    const [search, setSearch] = useState("");
    const [create, setCreate] = useState(false);
    const [preview, setPreview] = useState();
    const [edit, setEdit] = useState(false);
    const [activeEvents, setActiveEvents] = useState([]);
    const [modal, setModal] = useState();
    const [modalContent, setModalContent] = useState();

    const notification = useNotification();
    const [drag, setDrag] = useState();

    const intl = useIntl();

    const getData = async () => {
        const events = await request.get(`events`);
        setActiveEvents(
            events.data["hydra:member"].sort(function (a, b) {
                if (a.startAt < b.startAt) {
                    return -1;
                }
                if (a.startAt > b.startAt) {
                    return 1;
                }
                return 0;
            })
        );
    };

    useEffect(() => {
        getData();
        handleEvents();
    }, [create, edit, preview]);

    const handleDelete = async (id) => {
        await request.delete(`events/${id}`).catch(() =>
            notification({
                content: (
                    <>
                        <FormattedMessage id="message.error.delete" />
                        <span style={{ color: "#FF7954" }}>
                            {" "}
                            {preview.name}
                        </span>
                    </>
                ),
                status: "invalid",
            })
        );
        getData();
        setModal();
        setPreview();
        notification({
            content: (
                <>
                    <span style={{ color: "#FF7954" }}>{preview.name} </span>
                    <FormattedMessage id="message.success.delete" />
                </>
            ),
            status: "valid",
        });
    };

    useEffect(() => {
        const handleModal = (toDelete) => {
            return (
                <Modal
                    style={{ width: "20rem", height: "11rem" }}
                    title={
                        <>
                            <FormattedMessage id="message.warning.delete" />{" "}
                            <br />
                            <span className={classes.orangeTxt}>
                                {toDelete?.name}
                            </span>
                        </>
                    }
                    cancel={
                        <FormattedMessage id="buttons.placeholder.cancel" />
                    }
                    validate={
                        <FormattedMessage id="buttons.placeholder.confirm" />
                    }
                    onCancel={() => setModal()}
                    onConfirm={() => {
                        handleDelete(toDelete?.id);
                    }}
                />
            );
        };
        setModalContent(handleModal(modal));
    }, [modal, preview]);

    const handleEvents = (status) => {
        const events = activeEvents.map((activeEvent, index) => {
            if (
                activeEvent?.name.toLowerCase().search(search.toLowerCase()) !==
                -1
            )
                if (
                    (status === "past" &&
                        new Date(activeEvent.endAt) < new Date()) ||
                    (new Date(activeEvent.startAt) < new Date() &&
                        status === "present" &&
                        new Date(activeEvent.endAt) > new Date()) ||
                    (status === "future" &&
                        new Date(activeEvent.startAt) > new Date())
                ) {
                    return (
                        <li
                            key={index}
                            className={`${
                                preview?.activeEvent["@id"] ===
                                activeEvent["@id"]
                                    ? edit
                                        ? classes.selected
                                        : classes.preview
                                    : ""
                            } ${status === "past" ? classes.pastEvent : ""}`}
                            onMouseEnter={() => {
                                if (!edit && !create)
                                    setPreview({
                                        activeEvent,
                                        past: status === "past",
                                        index,
                                    });
                            }}
                        >
                            <input
                                disabled={
                                    JSON.parse(localStorage.getItem("user"))
                                        .roles[1] === "ROLE_RH"
                                }
                                type="checkbox"
                                name="events"
                                className={classes.checkbox}
                                defaultChecked={edit}
                                onChange={() => {
                                    setCreate(false);
                                    setEdit(true);
                                    setPreview({
                                        activeEvent,
                                        past: status === "past",
                                        index,
                                    });
                                }}
                            />
                            <img
                                className={classes.bannerPreview}
                                src={`${activeEvent.imageUrl}`}
                            />
                            <div className={classes.eventText}>
                                <span className={classes.active}>
                                    {activeEvent.name}
                                </span>
                                <span className={classes.duration}>
                                    <div
                                        className={`${classes.col} ${classes.bold}`}
                                    >
                                        <span>{`du ${moment
                                            .utc(activeEvent?.startAt)
                                            .local(false)
                                            .format("D MMM YYYY")}`}</span>
                                        <span>{`au ${moment
                                            .utc(activeEvent?.endAt)
                                            .local(false)
                                            .format("D MMM YYYY")}`}</span>
                                    </div>
                                    <div className={classes.col}>
                                        <span>{`${moment
                                            .utc(activeEvent?.startAt)
                                            .local(false)
                                            .format("HH:mm")}`}</span>
                                        <span>{`${moment
                                            .utc(activeEvent?.endAt)
                                            .local(false)
                                            .format("HH:mm")}`}</span>
                                    </div>
                                </span>
                                {JSON.parse(localStorage.getItem("user"))
                                    .roles[1] !== "ROLE_RH" ? (
                                    <div className={classes.actionsContainer}>
                                        <FiTrash
                                            onClick={() =>
                                                setModal({
                                                    name: activeEvent.name,
                                                    id: activeEvent.id,
                                                })
                                            }
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            {/* <img src={ChevronRight} className={classes.chevron} alt="Click" /> */}
                        </li>
                    );
                }
        });
        return events.filter((event) => event !== undefined);
    };
    return (
        <div onDragEnter={() => setDrag(true)}>
            <div className={classes.container}>
                <h1>Events</h1>
                <div className={classes.eventsContainer}>
                    <ul className={classes.menu}>
                        <li
                            onClick={() => setActive("past")}
                            className={active === "past" ? classes.active : ""}
                        >
                            <FormattedMessage id="past" />
                        </li>
                        <li
                            onClick={() => setActive("present")}
                            className={
                                active === "present" ? classes.active : ""
                            }
                        >
                            <FormattedMessage id="present" />
                        </li>
                        <li
                            onClick={() => setActive("incoming")}
                            className={
                                active === "incoming" ? classes.active : ""
                            }
                        >
                            <FormattedMessage id="future" />
                        </li>
                    </ul>
                    {active === "past" ? (
                        <div>
                            <div className={classes.searchInput}>
                                <HiOutlineSearch />
                                <input
                                    onChange={(e) => setSearch(e.target.value)}
                                    className={classes.search}
                                    type="text"
                                    placeholder={intl.formatMessage({
                                        id: "event_search",
                                    })}
                                />
                            </div>
                            <span className={classes.boldOrange}>
                                {" "}
                                {handleEvents("past").length} event
                                {handleEvents("past").length > 1 ? "s" : ""}
                            </span>
                            <ul className={classes.itemsList}>
                                {handleEvents("past")}
                            </ul>
                        </div>
                    ) : active === "present" ? (
                        <div>
                            {JSON.parse(localStorage.getItem("user"))
                                .roles[1] !== "ROLE_RH" ? (
                                <Button
                                    color="orange"
                                    arrow={true}
                                    onClick={() => {
                                        setPreview();
                                        setCreate(true);
                                    }}
                                >
                                    <FormattedMessage id="create_event" />
                                </Button>
                            ) : (
                                ""
                            )}
                            <div className={classes.searchInput}>
                                <HiOutlineSearch />
                                <input
                                    onChange={(e) => setSearch(e.target.value)}
                                    className={classes.search}
                                    type="text"
                                    placeholder={intl.formatMessage({
                                        id: "event_search",
                                    })}
                                />
                            </div>
                            <span className={classes.boldOrange}>
                                {handleEvents("present").length} event
                                {handleEvents("present").length > 1 ? "s" : ""}
                            </span>
                            <ul className={classes.itemsList}>
                                {handleEvents("present")}
                            </ul>
                        </div>
                    ) : (
                        <div>
                            {JSON.parse(localStorage.getItem("user"))
                                .roles[1] !== "ROLE_RH" ? (
                                <Button
                                    color="orange"
                                    arrow={true}
                                    onClick={() => {
                                        setPreview();
                                        setCreate(true);
                                    }}
                                >
                                    <FormattedMessage id="create_event" />
                                </Button>
                            ) : (
                                ""
                            )}
                            <div className={classes.searchInput}>
                                <HiOutlineSearch />
                                <input
                                    onChange={(e) => setSearch(e.target.value)}
                                    className={classes.search}
                                    type="text"
                                    placeholder={intl.formatMessage({
                                        id: "event_search",
                                    })}
                                />
                            </div>
                            <span className={classes.boldOrange}>
                                {handleEvents("future").length} event
                                {handleEvents("future").length > 1 ? "s" : ""}
                            </span>
                            <ul className={classes.itemsList}>
                                {handleEvents("future")}
                            </ul>
                        </div>
                    )}
                </div>
                {create ? (
                    <div className={classes.createEventContainer}>
                        <CreateEvent setDone={setCreate} drag={drag} />
                    </div>
                ) : (
                    ""
                )}
                {preview ? (
                    <div className={classes.flipcontainer}>
                        {modal ? modalContent : ""}
                        <div
                            className={`${classes.flipper} ${
                                edit ? classes.flip : ""
                            }`}
                        >
                            <div className={classes.front}>
                                <div
                                    className={`${classes.eventPreview} ${
                                        activeEvents[preview?.index].past
                                            ? classes.pastEvent
                                            : ""
                                    }`}
                                >
                                    {/* <h3>Signature active</h3> */}
                                    <h2>
                                        <span className={classes.orangeTxt}>
                                            {activeEvents[preview?.index].name}
                                        </span>
                                        {/* <FiEdit onClick={() => setEdit(!edit)} /> */}
                                    </h2>
                                    <img
                                        src={`${
                                            activeEvents[preview?.index]
                                                ?.imageUrl
                                        }`}
                                    />
                                </div>
                            </div>
                            <div className={classes.back}>
                                <div className={classes.createEventContainer}>
                                    <CreateEvent
                                        setDone={setEdit}
                                        event={activeEvents[preview?.index]}
                                        drag={drag}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default Events;
