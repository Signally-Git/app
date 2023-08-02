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
    const portalContainerRef = useRef(document.createElement("div")); // Créez le portalContainer une seule fois

    useEffect(() => {
        const body = document.body;

        if (open) {
            body.appendChild(portalContainerRef.current); // Ajouter le portalContainer au body s'il n'est pas déjà présent
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
            // Ne retirez pas le portalContainer du DOM lorsque le composant est démonté
            // Ainsi, il restera disponible pour les ouvertures ultérieures de la modal
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
        portalContainerRef.current // Utilisez le portalContainer comme point d'ancrage pour le createPortal
    );
}
