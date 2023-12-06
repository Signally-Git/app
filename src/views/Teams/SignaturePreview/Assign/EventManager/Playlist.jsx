import classes from "./Playlist.module.css";
import moment from "moment/moment";
import { Button, CustomCheckbox } from "components";
import { FormattedMessage, useIntl } from "react-intl";
import Search from "assets/icons/search.svg";
import { useState } from "react";

const Playlist = ({
    eventsList,
    selectedEvents,
    setSelectedEvents,
    onSave,
    onClose,
}) => {
    console.log(selectedEvents);
    const [searchQuery, setSearchQuery] = useState("");
    const intl = useIntl();

    const handleEventSelection = (eventId, isSelected) => {
        if (isSelected) {
            setSelectedEvents((prevEvents) => [...prevEvents, eventId]);
        } else {
            setSelectedEvents((prevEvents) =>
                prevEvents.filter((id) => id !== eventId)
            );
        }
    };

    const filteredEvents = eventsList.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={classes.container}>
            <div>
                <div className={classes.titleContainer}>
                    <FormattedMessage id="event_playlist_title" tagName="h3" />
                    <span>({selectedEvents.length})</span>
                </div>
                <div className={classes.searchContainer}>
                    <img src={Search} alt="search" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={intl.formatMessage({ id: "event_search" })}
                    />
                </div>
                <ul className={classes.eventList}>
                    {filteredEvents.map((event) => {
                        const isEventSelected = selectedEvents.some((e) => {
                            return e === event["@id"];
                        });
                        return (
                            <li key={event["@id"]}>
                                <label
                                    htmlFor={event["@id"]}
                                    className={classes.event}
                                >
                                    <img
                                        alt={event.name}
                                        className={classes.bannerPreview}
                                        src={event?.imageUrl}
                                    />
                                    <div className={classes.eventText}>
                                        <span className={classes.title}>
                                            {event.name}
                                        </span>
                                        <span className={classes.duration}>
                                            <div className={classes.col}>
                                                <FormattedMessage
                                                    id={"campaign_dates"}
                                                    tagName="span"
                                                    values={{
                                                        start: moment
                                                            .utc(event?.startAt)
                                                            .local(false)
                                                            .format("DD/MM"),
                                                        end: moment
                                                            .utc(event?.endAt)
                                                            .local(false)
                                                            .format("D/MM"),
                                                    }}
                                                />
                                            </div>
                                            <div className={classes.col}>
                                                <span>{`${moment
                                                    .utc(event?.startAt)
                                                    .local(false)
                                                    .format("HH:mm")}`}</span>
                                                <span>{`${moment
                                                    .utc(event?.endAt)
                                                    .local(false)
                                                    .format("HH:mm")}`}</span>
                                            </div>
                                        </span>
                                    </div>
                                    <CustomCheckbox
                                        id={event["@id"]}
                                        checked={isEventSelected}
                                        onChange={(e) =>
                                            handleEventSelection(
                                                event["@id"],
                                                e.target.checked
                                            )
                                        }
                                    />
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className={classes.buttonsContainer}>
                <Button color="secondaryFill" onClick={onClose}>
                    Annuler
                </Button>
                <Button color="primaryFill" onClick={onSave}>
                    Enregistrer
                </Button>
            </div>
        </div>
    );
};

export default Playlist;
