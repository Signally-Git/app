import classes from "./signaturePreview.module.css";
import { useEffect, useState } from "react";
import { request, useNotification } from "utils";
import CopySignature from "views/CopySignature/CopySignature.jsx";
import Search from "assets/icons/search.svg";
import { Button, CustomSelect, Modal, NavigationButtons } from "components";
import parse from "html-react-parser";
import moment from "moment";
import { FormattedMessage, useIntl } from "react-intl";

export default function SignaturePreview({ show, setShow, edit, setEdit }) {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState([
        { "@id": "signature", name: "signature" },
    ]);
    const [previewSignature, setPreviewSignature] = useState();
    const [event, setEvent] = useState({ "@id": "event", name: "event" });
    const [multiEvents, setMultiEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [incomingEvents, setIncEvents] = useState([]);
    const [choosePlaylist, setChoosePlaylist] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const type = show["@type"]?.toLowerCase();
    const notification = useNotification();
    const intl = useIntl();

    //  PREVIEW EVENT
    useEffect(async () => {
        const events = await request.get("events");
        const toPush = events.data["hydra:member"]
            .filter(
                (data) =>
                    new Date(data.startAt) < new Date() &&
                    new Date(data.endAt) > new Date()
            )
            .sort(function (a, b) {
                if (a.startAt < b.startAt) {
                    return -1;
                }
                if (a.startAt > b.startAt) {
                    return 1;
                }
                return 0;
            });
        toPush.unshift({ name: "Event", "@id": "event" });
        setEvents([
            ...toPush,
            {
                name: "Playlist",
                "@id": "playlist",
                callback: setChoosePlaylist,
                listName:
                    event["@id"] === "playlist"
                        ? "Modifier la playlist"
                        : "Playlist",
                style: { fontWeight: "bold", color: `#FF7954` },
            },
        ]);
    }, [selectedTemplate]);

    useEffect(async () => {
        const events = await request.get("events");

        setIncEvents(
            events.data["hydra:member"]
                .filter((data) => new Date(data.endAt) > new Date())
                .sort(function (a, b) {
                    if (a.startAt < b.startAt) {
                        return -1;
                    }
                    if (a.startAt > b.startAt) {
                        return 1;
                    }
                    return 0;
                })
        );
    }, [edit]);

    useEffect(() => {
        handleSwapSignature(show?.signature?.["@id"]);
        const sse = new EventSource(
            `${process.env.REACT_APP_HUB_URL}${show?.["@id"]}`
        );
        sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
        function getRealtimeData(data) {
            setShow(data);
        }
        return () => {
            sse.close();
        };
    }, [show]);

    // PREVIEW SIGNATURE
    useEffect(() => {
        const refreshPreview = async () => {
            const entity = await request.get(show?.["@id"]);
            if (show?.events) {
                if (show?.events.length > 1) {
                    setMultiEvents(show?.events?.map((e) => e["@id"]));
                } else if (show?.events.length === 1) setEvent(show?.events[0]);
            }

            // if (show?.signature) set(show?.signature?.["@id"]);
            if (entity.data.compiledSignature)
                setPreviewSignature(entity.data.compiledSignature);
            else if (entity.data.signature?.["@id"]) {
                await request
                    .get(entity.data.signature["@id"])
                    .then((res) => setPreviewSignature(res.data?.preview));
            } else if (entity.data.signature) {
                await request
                    .get(entity.data.signature)
                    .then((res) => setPreviewSignature(res.data?.preview));
            } else setPreviewSignature(null);
        };
        refreshPreview();

        if (edit) handleSwapSignature(edit.signature?.["@id"]);
    }, [show, edit]);

    useEffect(() => {
        let templatesAPI = [{ "@id": "signature", name: "Signature" }];
        const listTemplates = () => {
            request.get("signatures").then((result) => {
                result.data["hydra:member"].map(async (template) => {
                    await request.get(template["@id"]).then((res) => {
                        templatesAPI.push(res.data);
                    });
                    setTemplates(templatesAPI);
                });
            });
        };
        listTemplates();
    }, []);

    // Modal
    const [modal, setModal] = useState(false);
    const handleSubmit = () => {
        setModal(true);
    };

    useEffect(() => {
        if (event === "playlist" || events === "playlist") {
            events.pop();
            setEvents([
                ...events,
                {
                    name: "Playlist",
                    "@id": "playlist",
                    callback: setChoosePlaylist,
                    listName:
                        event !== "playlist"
                            ? "Playlist"
                            : "Modifier la playlist",
                    style: { fontWeight: "bold", color: `#FF7954` },
                },
            ]);
        }
        if (event !== "playlist" && events.length > 1) {
            events.pop();
            setEvents((events) => [
                ...events,
                {
                    name: "Playlist",
                    "@id": "playlist",
                    callback: setChoosePlaylist,
                    listName:
                        event !== "playlist"
                            ? "Playlist"
                            : "Modifier la playlist",
                    style: { fontWeight: "bold", color: `#FF7954` },
                },
            ]);
        }
    }, [event]);

    // ASSIGNATION
    const handleProgram = () => {
        let markedCheckbox = document.querySelectorAll(
            'input[type="checkbox"]:checked'
        );
        let tmp = [];
        for (let checkbox of markedCheckbox) {
            tmp.push(JSON.parse(checkbox.value)["@id"]);
        }
        setMultiEvents(tmp);
        setChoosePlaylist(false);
    };

    const handleSwapSignature = (id) => {
        let template = Object?.values(templates)?.find((obj) => {
            return obj?.["@id"] === id;
        });
        console.log(show);
        if (event.imageUrl !== undefined)
            template = {
                ...template,
                preview: template?.preview?.replace(
                    "https://fakeimg.pl/380x126?font=noto&font_size=14",
                    `${event?.imageUrl}`
                ),
            };
        request
            .get(
                `compile_for_attribution_signature/${show?.id}/${show?.[
                    "@type"
                ].toLowerCase()}`
            )
            .then(({ data }) => {
                console.log(data);
                setSelectedTemplate({ preview: data });
            });
        // setSelectedTemplate(template);
    };

    const handleSwapEvent = (id) => {
        if (id === "playlist") {
            setChoosePlaylist(true);
        }

        setEvent(
            Object?.values(events)?.find((obj) => {
                return obj["@id"] === id;
            })
        );
        return null;
    };

    const handleAssign = async (element) => {
        let signatures = selectedTemplate["@id"] || selectedTemplate;
        let events;

        if (
            selectedTemplate?.["@id"] === "signature" ||
            selectedTemplate === "signature"
        )
            signatures = null;

        if (event["@id"] === "playlist") events = multiEvents;
        else if (event["@id"] === "event") events = [];
        else events = [event["@id"]];

        const req = {
            signature: signatures,
            events: events,
        };

        await request
            .patch(element?.["@id"], req, {
                headers: { "Content-Type": "application/merge-patch+json" },
            })
            .then((res) => {
                setPreviewSignature(res.data.signature?.preview);
                notification({
                    content: (
                        <>
                            <FormattedMessage id="message.success.signature.edit_variant1" />
                            <span className={classes.primaryTxt}>
                                {" "}
                                {type === "user"
                                    ? element.firstName + " " + element.lastName
                                    : element.name}{" "}
                            </span>
                            <FormattedMessage id="message.success.signature.edit_part2" />
                        </>
                    ),
                    status: "valid",
                });
                setEdit();
            })
            .catch(() =>
                notification({
                    content: <FormattedMessage id="message.error.edit" />,
                    status: "invalid",
                })
            );
    };

    return (
        <div className={classes.flipContainer}>
            {choosePlaylist ? (
                <div className={classes.modalContainer}>
                    {" "}
                    <div className={classes.playlistModal}>
                        <div>
                            <FormattedMessage
                                id="event_playlist_title"
                                tagName="h3"
                            />
                            <div className={classes.searchContainer}>
                                <img src={Search} alt="search" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className={classes.searchInput}
                                    placeholder={intl.formatMessage({
                                        id: "event_search",
                                    })}
                                />
                            </div>
                            <ul>
                                {incomingEvents.map((event) => {
                                    let checked = false;
                                    if (
                                        event.name
                                            .toLowerCase()
                                            .search(
                                                searchQuery?.toLowerCase()
                                            ) >= 0
                                    ) {
                                        checked =
                                            edit.events?.filter(
                                                (a) =>
                                                    a?.["@id"] ===
                                                    event?.["@id"]
                                            )[0]?.["@id"] === event?.["@id"];
                                        return (
                                            <li key={event["@id"]}>
                                                <img
                                                    alt={event.name}
                                                    className={
                                                        classes.bannerPreview
                                                    }
                                                    src={event.imageUrl}
                                                />
                                                <div
                                                    className={
                                                        classes.eventText
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            classes.active
                                                        }
                                                    >
                                                        {event.name}
                                                    </span>
                                                    <span
                                                        className={
                                                            classes.duration
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                classes.col
                                                            }
                                                        >
                                                            <span>{`du ${moment
                                                                .utc(
                                                                    event?.startAt
                                                                )
                                                                .local(false)
                                                                .format(
                                                                    "DD/MM"
                                                                )}`}</span>
                                                            <span>{`au ${moment
                                                                .utc(
                                                                    event?.endAt
                                                                )
                                                                .local(false)
                                                                .format(
                                                                    "D/MM"
                                                                )}`}</span>
                                                        </div>
                                                        <div
                                                            className={
                                                                classes.col
                                                            }
                                                        >
                                                            <span>{`${moment
                                                                .utc(
                                                                    event?.startAt
                                                                )
                                                                .local(false)
                                                                .format(
                                                                    "HH:mm"
                                                                )}`}</span>
                                                            <span>{`${moment
                                                                .utc(
                                                                    event?.endAt
                                                                )
                                                                .local(false)
                                                                .format(
                                                                    "HH:mm"
                                                                )}`}</span>
                                                        </div>
                                                    </span>
                                                </div>
                                                <label>
                                                    <input
                                                        defaultChecked={checked}
                                                        type="checkbox"
                                                        value={JSON.stringify(
                                                            event
                                                        )}
                                                    />
                                                    <span></span>
                                                </label>
                                            </li>
                                        );
                                    }
                                })}
                            </ul>
                        </div>
                        <NavigationButtons
                            onCancel={() => {
                                setChoosePlaylist(false);
                            }}
                            confirmTxt={intl.formatMessage({
                                id: "buttons.placeholder.confirm",
                            })}
                            onConfirm={() => handleProgram()}
                        />
                    </div>
                </div>
            ) : (
                ""
            )}
            {modal ? (
                <Modal
                    title={
                        <>
                            Vous allez mettre en ligne <br />
                            la signature{" "}
                            <span className={classes.primaryTxt}>
                                {selectedTemplate?.name}
                            </span>{" "}
                            <br />
                            <br />
                            pour{" "}
                            <span className={classes.primaryTxt}>
                                {show.name ||
                                    `${show.firstName} ${show.lastName}`}
                            </span>
                        </>
                    }
                    cancel={intl.formatMessage({
                        id: "buttons.placeholder.cancel",
                    })}
                    validate={intl.formatMessage({
                        id: "buttons.placeholder.confirm",
                    })}
                    onCancel={() => setModal(false)}
                    onConfirm={() => {
                        handleAssign(show);
                        setModal(false);
                    }}
                />
            ) : (
                ""
            )}
            <div className={`${classes.flipper} ${edit ? classes.flip : ""}`}>
                <div className={classes.front}>
                    <div className={classes.topLine}>
                        <h2>
                            <FormattedMessage id="signature.active_for" />
                            <span className={classes.primaryTxt}>
                                {show.name ||
                                    `${show.firstName} ${show.lastName}`}
                            </span>
                        </h2>
                    </div>
                    <div className={classes.signaturePreviewSelect}>
                        {typeof previewSignature === "string"
                            ? parse(previewSignature)
                            : ""}
                    </div>
                    {show?.group?.name && (
                        <span className={classes.groupName}>
                            {show?.group?.name}
                        </span>
                    )}
                </div>
                <div className={classes.back}>
                    {edit === "copySign" ? (
                        <CopySignature signature={previewSignature} />
                    ) : (
                        <>
                            <div className={classes.topLine}>
                                <h2>
                                    <FormattedMessage id="signature.edit" />{" "}
                                    <span className={classes.primaryTxt}>
                                        {show.name ||
                                            `${show.firstName} ${show.lastName}`}
                                    </span>
                                </h2>
                                {show["@type"] === "Team" ? (
                                    <Button
                                        color="secondary"
                                        onClick={() => {
                                            setEdit("assign-team");
                                        }}
                                    >
                                        <FormattedMessage id="employees" />
                                    </Button>
                                ) : show["@type"] === "Workplace" ? (
                                    <Button
                                        color="secondary"
                                        onClick={() => {
                                            setEdit("assign-workplace");
                                        }}
                                    >
                                        <FormattedMessage id="teams" />
                                    </Button>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className={classes.row}>
                                <div>
                                    <FormattedMessage
                                        id="signature.choose"
                                        tagName="label"
                                    />
                                    {templates.length > 0 && (
                                        <CustomSelect
                                            onChange={(e) =>
                                                handleSwapSignature(e)
                                            }
                                            defaultValue={
                                                show?.signature?.["@id"]
                                            }
                                            items={templates}
                                            display={"name"}
                                            getValue={"@id"}
                                        />
                                    )}
                                    <div className={classes.signature}>
                                        {typeof selectedTemplate?.preview ===
                                        "string"
                                            ? parse(
                                                  selectedTemplate?.preview.replace(
                                                      "https://fakeimg.pl/380x126?font=noto&font_size=14",
                                                      event.imageUrl
                                                          ? process.env
                                                                .REACT_APP_API_URL +
                                                                "/" +
                                                                event.imageUrl
                                                          : "https://fakeimg.pl/380x126?font=noto&font_size=14"
                                                  )
                                              )
                                            : ""}
                                    </div>
                                </div>
                                <div>
                                    {/* if event list events */}
                                    {events.length > 1 ? (
                                        <>
                                            <FormattedMessage
                                                id="signature.event_or_playlist"
                                                tagName="label"
                                            />
                                            <CustomSelect
                                                onChange={(e) =>
                                                    handleSwapEvent(e)
                                                }
                                                display="name"
                                                displayinlist="listName"
                                                getValue="@id"
                                                items={events}
                                                defaultValue={
                                                    show?.events?.length > 1
                                                        ? events[0]
                                                        : show?.events?.[0]?.[
                                                              "@id"
                                                          ]
                                                }
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <FormattedMessage
                                                id="event_playlist_title"
                                                tagName="label"
                                            />
                                            <Button
                                                onClick={() => {
                                                    setChoosePlaylist(true);
                                                }}
                                                color="primary"
                                                style={{
                                                    borderRadius: "10px",
                                                    margin: 0,
                                                    marginTop: "1.285rem",
                                                    height: "2.55rem",
                                                    width: "100%",
                                                }}
                                            >
                                                <FormattedMessage id="add_playlist" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <NavigationButtons
                                style={{ left: ".5rem", bottom: "-5rem" }}
                                onCancel={() => {
                                    setEdit();
                                }}
                                confirmTxt={intl.formatMessage({
                                    id: "buttons.placeholder.confirm",
                                })}
                                onConfirm={() => handleSubmit()}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
