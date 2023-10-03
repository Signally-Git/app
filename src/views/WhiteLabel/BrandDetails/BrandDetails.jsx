import React, { useState, useEffect } from "react";
import { Input, UploadFile, Popup } from "components"; // Assurez-vous d'importer les bons composants
import { request, useNotification, dataURItoBlob, TokenService } from "utils"; // Assurez-vous d'importer les bons utilitaires
import { FormattedMessage } from "react-intl";
import classes from "../whiteLabel.module.css"; // Importez le bon fichier CSS

function BrandDetails({ instance, setInstance }) {
    const [uploadedMedia, setUploadedMedia] = useState();
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState(instance?.logo?.url || null);
    const [croppedImage, setCroppedImage] = useState(null);
    const organisation = TokenService.getOrganisation();
    const notification = useNotification();

    const handleCroppedImage = (image) => {
        setCroppedImage(image);
        setPreview(image);
        setOpen(false);
    };

    // useEffect(() => {
    //     setPreview(instance?.logo?.url || null);
    //     setInstance({ ...instance, name: instance.name } || {});
    // }, [instance]);

    useEffect(() => {
        if (!uploadedMedia) {
            setPreview(instance?.logo?.url || null);
            return;
        }
        const objectUrl = URL.createObjectURL(uploadedMedia);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [uploadedMedia]);

    return (
        <div>
            <h2>Details</h2>
            <div className={classes.detailsContainer}>
                <div>
                    <FormattedMessage id="logo" tagName="label" />
                    <div className={classes.logoCompanyDiv}>
                        {preview && (
                            <img
                                alt={`Logo ${instance.name}`}
                                className={classes.logoPreview}
                                src={preview}
                            />
                        )}
                        <UploadFile
                            file={uploadedMedia}
                            setFile={(e) => {
                                setUploadedMedia(e);
                                setOpen(true);
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
                        value={instance.name}
                        onChange={(e) =>
                            setInstance({ ...instance, name: e.target.value })
                        }
                    />
                </div>
                <div>
                    <FormattedMessage
                        id="profile.company.url"
                        tagName="label"
                    />
                    <Input
                        type="text"
                        value={instance.url}
                        onChange={(e) =>
                            setInstance({ ...instance, url: e.target.value })
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default BrandDetails;
