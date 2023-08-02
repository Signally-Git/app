import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import classes from "./Cropper.module.css";
import CropperInput from "./CropperInput";
import { FormattedMessage } from "react-intl";

export default function Popup({
    open,
    image,
    handleClose,
    getCroppedFile,
    aspectRatios,
}) {
    const portalContainerRef = useRef(document.createElement("div"));

    useEffect(() => {
        const body = document.body;

        if (open) {
            body.appendChild(portalContainerRef.current);
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [open]);

    const handleClickOutside = (event) => {
        if (!portalContainerRef.current.contains(event.target)) {
            handleClose();
        }
    };

    if (!open) return null;

    return createPortal(
        <div className={classes.popupOverlay}>
            <div ref={portalContainerRef} className={classes.popupContainer}>
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
