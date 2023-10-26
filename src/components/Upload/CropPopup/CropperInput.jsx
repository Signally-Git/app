import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "components";
import classes from "./Cropper.module.scss";
import { useIntl } from "react-intl";
import { GrPowerReset } from "react-icons/gr";
import fileToBase64 from "utils/fileToBase64";

export default function CropperInput({
    src,
    initialImage,
    getCroppedFile,
    aspectRatios,
}) {
    const cropperRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);
    const [aspectRatio, setAspectRatio] = useState(null);

    const intl = useIntl();

    const handleClose = async () => {
        try {
            const base64Image = await fileToBase64(initialImage);
            getCroppedFile(base64Image);
        } catch (e) {
            console.error(
                "Erreur lors de la conversion de l'image en Base64:",
                e
            );
        }
    };

    const handleClick = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        const img = cropper.getCroppedCanvas().toDataURL();
        getCroppedFile(img);
    };
    const rotate = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        cropper.rotate(90);
    };
    const reset = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        cropper.reset();
    };
    const flip = (type) => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        if (type === "h") {
            cropper.scaleX(scaleX === 1 ? -1 : 1);
            setScaleX(scaleX === 1 ? -1 : 1);
        } else {
            cropper.scaleY(scaleY === 1 ? -1 : 1);
            setScaleY(scaleY === 1 ? -1 : 1);
        }
    };

    const setAspect = (ratio) => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        cropper.setAspectRatio(ratio);
        setAspectRatio(ratio);
    };

    return (
        <>
            {loading && (
                <div
                    style={{
                        width: "100%",
                        height: 400,
                        backgroundColor: "#f0f0f0",
                    }}
                />
            )}
            <div
                className={classes.container}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: 8,
                }}
            >
                <div>
                    <Button color="secondary" onClick={rotate}>
                        {intl.formatMessage({
                            id: "buttons.placeholder.import.crop.rotate",
                        })}
                    </Button>
                    <Button color="secondary" onClick={() => flip("h")}>
                        {intl.formatMessage({
                            id: "buttons.placeholder.import.crop.flip_h",
                        })}
                    </Button>
                    <Button color="secondary" onClick={() => flip("v")}>
                        {intl.formatMessage({
                            id: "buttons.placeholder.import.crop.flip_v",
                        })}
                    </Button>
                    <Button color="secondary" onClick={reset}>
                        <GrPowerReset />
                    </Button>
                </div>
                <div>
                    <Button
                        color={
                            aspectRatio === null ? "primaryFill" : "secondary"
                        }
                        disabled={aspectRatio === null}
                        onClick={() => setAspect(null)}
                    >
                        {intl.formatMessage({
                            id: "buttons.placeholder.import.crop.free",
                        })}
                    </Button>
                    {aspectRatios.map((ratio) => {
                        const [numerator, denominator] = ratio.split(":");
                        const ratioValue = numerator / denominator;
                        return (
                            <Button
                                key={ratio}
                                onClick={() => setAspect(ratioValue)}
                                disabled={aspectRatio === ratioValue}
                                color={
                                    aspectRatio === ratioValue
                                        ? "primaryFill"
                                        : "secondary"
                                }
                            >
                                {ratio}
                            </Button>
                        );
                    })}
                </div>
            </div>

            <Cropper
                src={src}
                style={{
                    height: 400,
                    width: 400,
                }}
                // Options pour Cropper.js
                aspectRatio={aspectRatio}
                autoCropArea={1}
                guides={false}
                ready={() => {
                    setLoading(false);
                }}
                ref={cropperRef}
            />
            <div className={classes.btnsContainer}>
                <Button color="primary" onClick={handleClose}>
                    {intl.formatMessage({
                        id: "buttons.placeholder.import.crop.close",
                    })}
                </Button>
                <Button color="primaryFill" onClick={handleClick}>
                    {intl.formatMessage({
                        id: "buttons.placeholder.import.crop.crop",
                    })}
                </Button>
            </div>
        </>
    );
}
