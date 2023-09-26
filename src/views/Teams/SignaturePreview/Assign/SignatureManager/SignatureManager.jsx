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

    const notification = useNotification();

    const fetchSignatures = useCallback(async () => {
        try {
            setState((prev) => ({ ...prev, loading: true }));
            const promises = signatures.map((signature) =>
                request.get(
                    `/compile_for_attribution_signature/${entity.id}/${signature.id}`
                )
            );

            const results = await Promise.allSettled(promises);

            const updatedSignatures = signatures
                .map((signature, index) => {
                    if (results[index].status === "fulfilled") {
                        return {
                            ...signature,
                            html: results[index].value.data,
                        };
                    }
                    return null;
                })
                .filter(Boolean);

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
            setState((prev) => ({ ...prev, loading: false }));
        }
    }, [entity, signatures, notification]);

    useEffect(() => {
        fetchSignatures();
    }, [fetchSignatures]);

    let parsedHTML = "";
    if (typeof state.signaturePreview?.html === "string") {
        parsedHTML = parse(state.signaturePreview?.html);
    }

    return (
        <>
            {state.signaturesDisplay.length > 0 && (
                <CustomSelect
                    key={entity?.id}
                    defaultValue={state.selectedSignatureId}
                    items={state.signaturesDisplay}
                    display={"name"}
                    getValue={"id"}
                    onChange={(selectedId) => {
                        const selectedItem = state.signaturesDisplay.find(
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
                <h3>{state.signaturePreview?.name}</h3>
                {state.loading ? <Loading /> : parsedHTML}
            </div>
        </>
    );
});

export { SignatureManager };
