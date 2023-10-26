import React, { useState, useEffect } from "react";
import { Input, UploadFile, Popup } from "components";
import {
    request,
    useNotification,
    dataURItoBlob,
    TokenService,
    fileToBase64,
} from "utils";
import { FormattedMessage } from "react-intl";
import classes from "../whiteLabel.module.css";

function BrandDetails({ instance, setInstance }) {
    const [uploadedMedia, setUploadedMedia] = useState();
    const [open, setOpen] = useState(false);
    const [instanceName, setInstanceName] = useState(instance?.name || "");
    const [preview, setPreview] = useState(instance?.logo?.url || null);
    const [instanceUrl, setInstanceUrl] = useState(instance?.url || "");
    const [loading, setLoading] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    const organisation = TokenService.getOrganisation();
    const notification = useNotification();

    const handleUploadImage = async (image) => {
        if (image?.type === "image/gif") {
            setUploadedMedia(image);
            const imgBase64 = await fileToBase64(image);
            handleCroppedImage(imgBase64);
        } else {
            setUploadedMedia(image);
            setOpen(true);
        }
    };

    const handleCroppedImage = (image) => {
        setCroppedImage(image);
        setPreview(image);
        setOpen(false);
    };

    useEffect(() => {
        setPreview(instance?.logo?.url || null);
        setInstanceName(instance?.name || "");
    }, [instance]);

    useEffect(() => {
        if (!uploadedMedia) {
            setPreview(instance?.logo?.url || null);
            return;
        }
        const objectUrl = URL.createObjectURL(uploadedMedia);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [uploadedMedia]);

    const handleSaveInstance = async () => {
        setLoading(true);
        try {
            if (uploadedMedia) {
                const img = new FormData();
                img.append("file", dataURItoBlob(croppedImage));

                const uploadedImage = await request.post(`import/file`, img); // Ajustez selon votre API
                const req = {
                    name: instanceName,
                    path: uploadedImage.data.path,
                    distributor: true,
                    organisation: organisation["@id"],
                };
                await request
                    .post("logos", req)
                    .then(({ data }) => console.log(data));
                const updatedInstance = {
                    ...instance,
                    name: instanceName,
                };

                await setInstance(updatedInstance); // Ajustez selon votre logique d'application

                notification({
                    content: <FormattedMessage id="message.success.edit" />,
                    status: "valid",
                });
            } else {
                const updatedInstance = {
                    ...instance,
                    name: instanceName,
                };

                await setInstance(updatedInstance); // Ajustez selon votre logique d'application

                notification({
                    content: <FormattedMessage id="message.success.edit" />,
                    status: "valid",
                });
            }
        } catch (error) {
            notification({
                content: <FormattedMessage id="message.error.edit" />,
                status: "invalid",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Details</h2>
            <div className={classes.detailsContainer}>
                <div>
                    <FormattedMessage id="logo" tagName="label" />
                    <div className={classes.logoCompanyDiv}>
                        {preview && (
                            <img
                                alt={`Logo ${instanceName}`}
                                className={classes.logoPreview}
                                src={preview}
                            />
                        )}
                        <UploadFile
                            file={uploadedMedia}
                            setFile={(e) => {
                                handleUploadImage(e);
                            }}
                            removeFile={() => {
                                setUploadedMedia(null);
                                setPreview(null);
                            }}
                            placeholder={
                                <FormattedMessage id="buttons.placeholder.import.image" />
                            }
                            type=".png, .gif, .jpeg, .jpg"
                        />
                        <Popup
                            open={open}
                            image={preview}
                            handleClose={() => setOpen(false)}
                            getCroppedFile={handleCroppedImage}
                            aspectRatios={["1:1"]}
                        />
                    </div>
                </div>
                <div>
                    <FormattedMessage
                        id="profile.company.name"
                        tagName="label"
                    />
                    <Input
                        type="text"
                        value={instanceName || ""}
                        onChange={(e) => setInstanceName(e.target.value)}
                    />
                </div>
                <div>
                    <FormattedMessage id="link" tagName="label" />
                    <Input
                        type="text"
                        value={instanceUrl || ""}
                        onChange={(e) => setInstanceUrl(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={handleSaveInstance} disabled={loading}>
                Save Instance
            </button>
        </div>
    );
}

export default BrandDetails;
