import classes from "./signaturePreview.module.css";
import { useEffect, useState } from "react";
import { request } from "utils";
import Search from "assets/icons/search.svg";
import { Button, CustomSelect, NavigationButtons } from "components";
import moment from "moment";
import { FormattedMessage, useIntl } from "react-intl";

export default function EventManager({ edit }) {
    const [event, setEvent] = useState({ "@id": "event", name: "event" });
    const [multiEvents, setMultiEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [incomingEvents, setIncEvents] = useState([]);
    const [choosePlaylist, setChoosePlaylist] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
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
                style: { fontWeight: "bold" },
            },
        ]);
    }, []);

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

    // Modal
    const [modal, setModal] = useState(false);

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

    return (
        <div className={classes.flipContainer}>
            {choosePlaylist && (
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
            )}
            <div>
                <div className={classes.back}>
                    <>
                        <div className={classes.row}>
                            <div>
                                {/* if event list events */}
                                {events.length > 1 ? (
                                    <>
                                        <FormattedMessage
                                            id="signature.event_or_playlist"
                                            tagName="label"
                                        />
                                        <CustomSelect
                                            onChange={(e) => handleSwapEvent(e)}
                                            display="name"
                                            displayinlist="listName"
                                            getValue="@id"
                                            items={events}
                                            defaultValue={
                                                edit?.events?.length > 1
                                                    ? events[0]
                                                    : edit?.events?.[0]?.["@id"]
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
                                        >
                                            <FormattedMessage id="add_playlist" />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </div>
    );
}
