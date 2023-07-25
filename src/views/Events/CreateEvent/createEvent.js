import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import classes from "./createEvent.module.css";
import { Input, NavigationButtons, UploadFile, Popup } from "components";
import { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import { useNotification, request, dataURItoBlob } from "utils";
import { useHistory } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { LangContext } from "contexts/LangContext";

export default function CreateEvent({ setDone, event }) {
    const { locale } = useContext(LangContext);
    const intl = useIntl();
    const [lc, setLc] = useState(
        locale === "en-US" || locale === "en" ? "en" : "fr"
    );
    const [startDate, setStartDate] = useState(
        event?.startAt ? new Date(event.startAt) : new Date()
    );
    const [endDate, setEndDate] = useState(
        event?.endAt ? new Date(event.endAt) : new Date()
    );

    const [banner, setBanner] = useState();
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState();
    const [eventName, setEventName] = useState(event?.name || "");
    const [eventLink, setEventLink] = useState(event?.link || "");
    const [croppedImage, setCroppedImage] = useState();

    const notification = useNotification();
    const eventNameRef = useRef(null);
    const history = useHistory();

    useEffect(() => {
        setEventName(event?.name || "");
        setEventLink(event?.link || "");
        setStartDate(
            new Date(event?.startAt ? new Date(event?.startAt) : new Date())
        );
        setEndDate(
            new Date(
                event?.endAt
                    ? new Date(event?.endAt)
                    : new Date(Date.now() + 24 * 60 * 60 * 1000)
            )
        );
    }, [event]);

    useEffect(() => {
        if (!event) {
            eventNameRef.current.focus();
        }

        // create the preview
        if (!banner) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(banner);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [banner]);

    useEffect(() => {
        // Charger dynamiquement le fichier de locale approprié en fonction de la langue sélectionnée
        if (lc === "en-US") moment.locale("en-us");
        else
            import(`moment/locale/${lc}`).then((module) => {
                moment.locale(locale, module.default);
            });
    }, [lc]);

    const checkEventLink = (url) => {
        let isValid = url.startsWith("http://") ? 1 : 0;
        if (isValid === 0) isValid = url.startsWith("https://") ? 2 : 0;
        if (url.length > 0 && isValid === 0)
            notification({
                content: (
                    <FormattedMessage id="message.warning.wrong_event_link" />
                ),
                status: "invalid",
            });
        return true;
    };

    const saveEvent = async (e) => {
        e.preventDefault();
        if (!eventName) {
            notification({
                content: (
                    <FormattedMessage id="message.warning.no_event_name" />
                ),
                status: "invalid",
            });
            return false;
        }
        const start = moment(startDate);
        const end = moment(endDate);
        const image = new FormData();
        image.append("file", dataURItoBlob(croppedImage));
        if (!event && banner) {
            await request
                .post(`import/file`, image)
                .then(async (res) => {
                    const req = {
                        imagePath: res.data.path,
                        name: eventName,
                        link: eventLink,
                        startAt: start.utc(false),
                        endAt: end.utc(false),
                    };
                    await request
                        .post(`events`, req)
                        .then((res) => {
                            notification({
                                content: (
                                    <>
                                        <span className={classes.primaryColor}>
                                            {eventName}{" "}
                                        </span>
                                        <FormattedMessage id="message.success.created" />
                                    </>
                                ),
                                status: "valid",
                            });
                            setDone(false);
                            if (window.location.hash === "#onboarding")
                                history.goBack();
                        })
                        .catch(() =>
                            notification({
                                content: (
                                    <>
                                        <FormattedMessage id="message.error.add" />
                                        <span className={classes.primaryColor}>
                                            {" "}
                                            {eventName}
                                        </span>
                                    </>
                                ),
                                status: "invalid",
                            })
                        );
                })
                .catch((err) =>
                    notification({
                        content: <FormattedMessage id="message.error.image" />,
                        status: "invalid",
                    })
                );
            return false;
        }
        if (event) {
            const start = moment(startDate).local(false);
            const end = moment(endDate).local(false);
            const image = new FormData();

            if (banner) {
                image.append("file", dataURItoBlob(croppedImage));
                await request
                    .post(`import/file`, image)
                    .then(async (res) => {
                        const req = {
                            name: eventName,
                            startAt: start.utc(false),
                            endAt: end.utc(false),
                            link: eventLink,
                            imagePath: res.data.path,
                        };
                        await request
                            .patch(`events/${event.id}`, req, {
                                headers: {
                                    "Content-Type":
                                        "application/merge-patch+json",
                                },
                            })
                            .then((res) => {
                                setDone(false);
                                notification({
                                    content: (
                                        <>
                                            <span
                                                className={classes.primaryColor}
                                            >
                                                {eventName}
                                            </span>{" "}
                                            <FormattedMessage id="message.success.edit" />
                                        </>
                                    ),
                                    status: "valid",
                                });
                            })
                            .catch(() =>
                                notification({
                                    content: (
                                        <>
                                            <FormattedMessage id="message.error.edit" />
                                            <span
                                                className={classes.primaryColor}
                                            >
                                                {" "}
                                                {eventName}
                                            </span>
                                        </>
                                    ),
                                    status: "invalid",
                                })
                            );
                    })
                    .catch(() =>
                        notification({
                            content: (
                                <FormattedMessage id="message.error.image" />
                            ),
                            status: "invalid",
                        })
                    );
                return false;
            } else {
                const req = {
                    name: eventName,
                    link: eventLink,
                    startAt: start.utc(false),
                    endAt: end.utc(false),
                };
                await request
                    .patch(`events/${event.id}`, req, {
                        headers: {
                            "Content-Type": "application/merge-patch+json",
                        },
                    })
                    .then(() => {
                        setDone(false);
                        notification({
                            content: (
                                <>
                                    <span className={classes.primaryColor}>
                                        {eventName}
                                    </span>{" "}
                                    <FormattedMessage id="message.success.edit" />
                                </>
                            ),
                            status: "valid",
                        });
                    })
                    .catch(() =>
                        notification({
                            content: (
                                <>
                                    <FormattedMessage id="message.error.edit" />
                                    <span className={classes.primaryColor}>
                                        {" "}
                                        {eventName}
                                    </span>
                                </>
                            ),
                            status: "invalid",
                        })
                    );
            }
        }
    };

    return (
        <form onSubmit={(e) => saveEvent(e)} className={classes.container}>
            {event ? (
                <FormattedMessage
                    id="edit_event"
                    values={{ event: eventName }}
                    tagName="h2"
                />
            ) : (
                <FormattedMessage id="create_event" tagName="h2" />
            )}
            <div className={classes.datePick}>
                <div>
                    <FormattedMessage
                        id="start_date_placeholder"
                        tagName="label"
                    />
                    <Datetime
                        locale={lc}
                        value={startDate}
                        onChange={setStartDate}
                        closeOnSelect={true}
                        dateFormat="D MMM YYYY"
                        timeFormat="HH mm"
                    />
                </div>
                <div>
                    <FormattedMessage
                        id="end_date_placeholder"
                        tagName="label"
                    />
                    <Datetime
                        locale={lc}
                        value={endDate}
                        onChange={(e) => {
                            e > startDate && setEndDate(e);
                        }}
                        closeOnSelect={true}
                        dateFormat="D MMM YYYY"
                        timeFormat="HH mm"
                    />
                </div>
            </div>
            <div className={classes.row}>
                <Input
                    required
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    style={{ width: "48%" }}
                    placeholder={intl.formatMessage({ id: "event_name" })}
                    type="text"
                    ref={eventNameRef}
                />
                <Input
                    required
                    value={eventLink}
                    onBlur={(e) => checkEventLink(e.target.value)}
                    onChange={(e) => setEventLink(e.target.value)}
                    style={{ width: "48%" }}
                    placeholder={intl.formatMessage({ id: "link" })}
                    type="text"
                />
            </div>
            <div className={classes.currentEventPreview}>
                {banner ? (
                    <img src={preview} />
                ) : event ? (
                    <img src={event.imageUrl} title={event.banner?.name} />
                ) : (
                    ""
                )}
            </div>
            <div className={classes.uploadContainer}>
                {/* <UploadFile
                    type="image/*"
                    file={banner}
                    placeholder={
                        event
                            ? intl.formatMessage({
                                  id: "buttons.placeholder.import.other_banner",
                              })
                            : intl.formatMessage({
                                  id: "buttons.placeholder.import.banner",
                              })
                    }
                    setFile={setBanner}
                /> */}
                <UploadFile
                    file={banner}
                    setFile={(e) => {
                        setBanner(e);
                        setOpen(true);
                    }}
                    removeFile={() => {
                        setBanner(null);
                        setPreview(null);
                    }}
                    type="image/*"
                    placeholder={
                        event
                            ? intl.formatMessage({
                                  id: "buttons.placeholder.import.other_banner",
                              })
                            : intl.formatMessage({
                                  id: "buttons.placeholder.import.banner",
                              })
                    }
                />
                <Popup
                    open={open}
                    handleClose={() => setOpen(false)}
                    image={preview}
                    getCroppedFile={(image) => {
                        setCroppedImage(image);
                        setPreview(image);
                        setOpen(false);
                    }}
                    aspectRatios={["1:1", "16:9", "4:3", "3:2"]}
                />
            </div>
            <div>
                <NavigationButtons
                    style={{ left: ".5rem", bottom: "-4rem" }}
                    confirmTxt={
                        <FormattedMessage id="buttons.placeholder.save" />
                    }
                    onCancel={(e) => {
                        e.preventDefault();
                        setDone(false);
                    }}
                    onConfirm={(e) => saveEvent(e)}
                />
            </div>
        </form>
    );
}
