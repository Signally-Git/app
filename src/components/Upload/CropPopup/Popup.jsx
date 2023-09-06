import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import classes from "./Cropper.module.css";
import CropperInput from "./CropperInput";
import { FormattedMessage } from "react-intl";
import { Button } from "components";

export default function Popup({
    open,
    image,
    handleClose,
    getCroppedFile,
    aspectRatios,
}) {
    const portalContainerRef = useRef(document.createElement("div"));
    const container = useRef(null);
    const handleClickOutside = (event) => {
        if (!container?.current?.contains(event.target)) {
            handleClose();
        }
    };

    useEffect(() => {
        if (open) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [open]);

    if (!open) return null;

    // Si le conteneur n'est pas déjà dans le body, ajoutez-le
    if (!document.body.contains(portalContainerRef.current)) {
        document.body.appendChild(portalContainerRef.current);
    }

    return createPortal(
        <div className={classes.popupOverlay}>
            <div ref={container} className={classes.popupContainer}>
                <FormattedMessage
                    id="buttons.placeholder.import.crop.title"
                    tagName="h2"
                />
                <div className={classes.popupContent}>
                    <CropperInput
                        handleClose={handleClose}
                        src={image}
                        getCroppedFile={getCroppedFile}
                        aspectRatios={aspectRatios}
                    />
                </div>
            </div>
        </div>,
        portalContainerRef.current
    );
}
