import React, { memo, useCallback, useEffect, useState } from "react";
import { request, useNotification } from "utils";
import parse from "html-react-parser";
import classes from "./signatureManager.module.css";
import { CustomSelect, Loading } from "components";
import { FormattedMessage } from "react-intl";

const SignatureManager = memo(({ entity, signatures, setEditSignature }) => {
    const [state, setState] = useState({
        signaturesDisplay: [],
        loading: false,
        signaturePreview: null,
        selectedSignatureId: null,
    });

    const {
        signaturesDisplay,
        loading,
        signaturePreview,
        selectedSignatureId,
    } = state;

    const [parsedHTML, setParsedHTML] = useState(null);
    const notification = useNotification();

    const updateSignatures = (results) => {
        return signatures
            .map((signature, index) => {
                if (results[index].status === "fulfilled") {
                    return { ...signature, html: results[index].value?.data };
                }
                return null;
            })
            .filter(Boolean);
    };

    const fetchSignatures = useCallback(async () => {
        if (!entity || !signatures) return;

        setState((prev) => ({ ...prev, loading: true }));

        const promises = signatures.map((signature) =>
            request.get(
                `/compile_for_attribution_signature/${entity.id}/${signature.id}`
            )
        );

        try {
            const results = await Promise.allSettled(promises);
            const updatedSignatures = updateSignatures(results);

            const correspondingSignature = updatedSignatures.find(
                (sig) => sig["@id"] === entity.signature["@id"]
            );

            setState((prev) => ({
                ...prev,
                signaturesDisplay: updatedSignatures,
                signaturePreview: correspondingSignature,
                selectedSignatureId: correspondingSignature?.id,
                loading: false,
            }));
        } catch (error) {
            notification({
                content: <FormattedMessage id="message.error.generic" />,
                status: "invalid",
            });
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    }, [entity, signatures, notification]);

    useEffect(() => {
        fetchSignatures();
    }, [fetchSignatures]);

    useEffect(() => {
        const regex = /The user with [\w-]+ has not been found/;

        if (
            typeof signaturePreview?.html === "string" &&
            !signaturePreview.html.match(regex)
        ) {
            setParsedHTML(parse(signaturePreview.html));
        }
        setParsedHTML("");
    }, [signaturePreview]);

    return (
        <>
            {signaturesDisplay.length > 0 && (
                <CustomSelect
                    key={entity?.id}
                    defaultValue={selectedSignatureId}
                    items={signaturesDisplay}
                    display={"name"}
                    getValue={"id"}
                    onChange={(selectedId) => {
                        const selectedItem = signaturesDisplay.find(
                            (sig) => sig?.id === selectedId
                        );
                        setState((prev) => ({
                            ...prev,
                            signaturePreview: selectedItem,
                            selectedSignatureId: selectedId,
                        }));
                        setEditSignature(selectedItem["@id"]);
                    }}
                />
            )}
            <div className={classes.signatureContainer}>
                <h3>{signaturePreview?.name}</h3>
                {loading ? <Loading /> : parsedHTML}
            </div>
        </>
    );
});

export { SignatureManager };
