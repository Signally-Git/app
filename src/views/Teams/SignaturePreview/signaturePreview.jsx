import classes from "./signaturePreview.module.css";
import { Button, CopyButton, Loading, NavigationButtons } from "components";
import parse from "html-react-parser";
import { FormattedMessage } from "react-intl";
import { request, useNotification } from "utils";
import React, { useEffect, useState } from "react";
import { SignatureManager } from "./Assign/SignatureManager/SignatureManager";
import EventManager from "./Assign/EventManager/EventManager";

export default function SignaturePreview({
                                             show, setShow, edit, setEdit, signatures
                                         }) {
    const { name, firstName, lastName } = show || {};
    const type = show["@type"].toLowerCase();
    const displayName = name || `${firstName} ${lastName}`;

    const notification = useNotification();

    const [displayedSignature, setDisplayedSignature] = useState("");
    const [fetchingSignature, setFetchingSignature] = useState(false);
    const [editSignature, setEditSignature] = useState(edit?.signature?.["@id"]);
    const [editEvent, setEditEvent] = useState(edit?.events);

    const fetchSignature = (entity) => {
        setFetchingSignature(true);
        if (!entity) return null;
        const entityType = entity["@type"].toLowerCase();
        request
            .get(`compile_for_listing_signature_for_entity/${entity.id}/${entityType}`)
            .then(({ data }) => {
                setDisplayedSignature(data);
            })
            .finally(() => {
                setFetchingSignature(false);
            });
    };

    const handleSave = () => {
        const req = {
            signature: editSignature, events: editEvent?.[0] === "none" ? [] : editEvent
        };
        request
            .patch(edit["@id"], req, {
                headers: { "Content-Type": "application/merge-patch+json" }
            })
            .then(({ data }) => {
                notification({
                    content: (<>
                            {displayName}
                            <FormattedMessage id="message.success.edit" />
                        </>), status: "valid"
                });
                setShow({ ...show, data });
                setEdit(false);
            })
            .catch(() => {
                notification({
                    content: (<>
                            {displayName}
                            <FormattedMessage id="message.error.edit" />
                        </>), status: "invalid"
                });
            });
    };

    useEffect(() => {
        fetchSignature(show);
    }, [show]);

    return (<div className={classes.flipContainer}>
            <div className={`${classes.flipper} ${edit ? classes.flip : ""}`}>
                <div className={classes.front}>
                    <div className={classes.topLine}>
                        <h2>
                            <FormattedMessage id="signature.active_for" />
                            <span className={classes.primaryTxt}>
                                {displayName}
                            </span>
                        </h2>
                        <div className={classes.headerBtnsContainer}>
                            {displayedSignature && (<CopyButton signature={displayedSignature} />)}
                            <Button
                                color="primaryFill"
                                onClick={() => setEdit(show)}
                            >
                                Assign
                            </Button>
                            {type === "workplace" ? (<Button
                                    color="secondary"
                                    onClick={() => {
                                        setEdit("assign-workplace");
                                    }}
                                >
                                    <FormattedMessage id="teams" />
                                </Button>) : type === "team" ?
                                <Button color="secondary" onClick={() => setEdit("assign-team")}>
                                    <FormattedMessage id="employees" />
                                </Button> : null}
                        </div>
                    </div>
                    <div>
                        {fetchingSignature ? (<Loading />) : (parse(displayedSignature || ""))}
                    </div>
                </div>
                <div className={classes.back}>
                    <div className={classes.topLine}>
                        <h2>
                            <span>Assignation </span>
                            <span className={classes.primaryTxt}>
                                {displayName}
                            </span>
                        </h2>
                        <div className={classes.headerBtnsContainer}>
                            <Button
                                color="primary"
                                onClick={() => setEdit(null)}
                            >
                                Preview
                            </Button>
                        </div>
                    </div>
                    <SignatureManager
                        signatures={signatures}
                        entity={edit || show}
                        setEditSignature={setEditSignature}
                    />
                    <EventManager
                        editedEntity={edit || show}
                        setEditedEntityEvent={setEditEvent}
                    />
                    <NavigationButtons
                        onConfirm={handleSave}
                        onCancel={() => setEdit(null)}
                    />
                </div>
            </div>
        </div>);
}
