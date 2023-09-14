import React, { useEffect, useState } from "react";
import classes from "../accountSettings.module.css";
import { useHistory } from "react-router-dom";
import {
    Input,
    SwitchLang,
    NavigationButtons,
    CustomCheckbox,
    UploadFile,
    Popup,
} from "components";
import { TokenService, request, useNotification, dataURItoBlob } from "utils";
import { FormattedMessage } from "react-intl";

function UserSettings() {
    const user = TokenService.getUser();
    const [loading, setLoading] = useState(false);

    const [uploadedMedia, setUploadedMedia] = useState();
    const [open, setOpen] = useState(false);

    const [preview, setPreview] = useState(user?.picture || "");

    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [position, setPosition] = useState(user?.position || "");
    const [linkPicture, setLinkPicture] = useState(user?.linkPicture || "");
    const [mobile, setMobile] = useState(user?.phone || "");
    const [language, setLanguage] = useState(user?.lang || "");
    const [deployed, setDeployed] = useState(user?.synchronizable || false);
    const [urlAgenda, setUrlAgenda] = useState(user?.urlAgenda || "");
    const [croppedImage, setCroppedImage] = useState(null);

    const notification = useNotification();
    let history = useHistory();

    useEffect(() => {
        if (!uploadedMedia) {
            setPreview(user?.picture || null);
            return;
        }
        const objectUrl = URL.createObjectURL(uploadedMedia);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [uploadedMedia]);

    useEffect(() => {
        setPreview(user?.picture ?? "");
    }, [user?.picture]);

    const handleCroppedImage = (image) => {
        setCroppedImage(image);
        setPreview(image);
        setOpen(false);
    };

    const handleSavePersonal = async () => {
        setLoading(true);
        if (uploadedMedia) {
            const img = new FormData();
            img.append("file", dataURItoBlob(croppedImage));
            await request
                .post(`import/file?destination=profile_picture`, img)
                .then(async (res) => {
                    const req = {
                        picture: res.data.url,
                        linkPicture: linkPicture,
                        firstName: firstName,
                        lastName: lastName,
                        position: position,
                        phone: mobile,
                        urlAgenda: urlAgenda,
                        synchronizable: deployed,
                        lang: language["@id"] || language,
                    };

                    await request
                        .patch(`users/${user.id}`, req, {
                            headers: {
                                "Content-Type": "application/merge-patch+json",
                            },
                        })
                        .then(() => {
                            setCroppedImage(null);
                            setUploadedMedia(null);
                            notification({
                                content: (
                                    <>
                                        <span className={classes.primaryColor}>
                                            {firstName} {lastName}{" "}
                                        </span>
                                        <FormattedMessage id="message.success.edit" />
                                    </>
                                ),
                                status: "valid",
                            });
                        })
                        .catch(() => {
                            notification({
                                content: (
                                    <>
                                        <FormattedMessage id="message.error.edit" />
                                        <span className={classes.primaryColor}>
                                            {" "}
                                            {firstName} {lastName}
                                        </span>
                                    </>
                                ),
                                status: "invalid",
                            });
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                })
                .catch(() =>
                    notification({
                        content: <FormattedMessage id="message.error.logo" />,
                        status: "invalid",
                    })
                )
                .finally(() => {
                    setLoading(false);
                });
        } else {
            const req = {
                firstName: firstName,
                lastName: lastName,
                position: position,
                phone: mobile,
                urlAgenda: urlAgenda,
                linkPicture: linkPicture,
                synchronizable: deployed,
                lang: language["@id"] || language,
            };
            await request
                .patch(`users/${user.id}`, req, {
                    headers: { "Content-Type": "application/merge-patch+json" },
                })
                .then(() => {
                    notification({
                        content: (
                            <>
                                <span className={classes.primaryColor}>
                                    {firstName} {lastName}{" "}
                                </span>
                                <FormattedMessage id="message.success.edit" />
                            </>
                        ),
                        status: "valid",
                    });
                })
                .catch(() => {
                    notification({
                        content: (
                            <>
                                <FormattedMessage id="message.error.edit" />
                                <span className={classes.primaryColor}>
                                    {" "}
                                    {firstName} {lastName}
                                </span>
                            </>
                        ),
                        status: "invalid",
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <>
            <div className={classes.inputsContainer}>
                <div className={classes.inputContainer}>
                    <div className={classes.row}>
                        <div className={classes.logoCompanyDiv}>
                            <FormattedMessage
                                tagName="label"
                                id="buttons.placeholder.import.profile_picture"
                            />
                            <div>
                                {preview && (
                                    <img
                                        alt={`Picture ${firstName} ${lastName}`}
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
                                    style={{
                                        paddingTop: ".8rem",
                                        paddingBottom: ".8rem",
                                    }}
                                    type="image/*"
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
                        <div className={classes.inputContainer}>
                            <label>
                                <FormattedMessage id="buttons.placeholder.import.profile_picture_link" />
                            </label>
                            <Input
                                value={linkPicture}
                                onChange={(e) => setLinkPicture(e.target.value)}
                                type="text"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className={classes.row}>
                        <div className={classes.inputContainer}>
                            <label>
                                <FormattedMessage id="firstname" />
                            </label>
                            <Input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>
                                <FormattedMessage id="lastname" />
                            </label>
                            <Input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                type="text"
                            />
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.inputContainer}>
                            <label>
                                <FormattedMessage id="position" />
                            </label>
                            <Input
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>
                                <FormattedMessage id="mobile" />
                            </label>
                            <Input
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                type="tel"
                            />
                        </div>
                    </div>
                    <div className={classes.inputContainer}>
                        <label>
                            <FormattedMessage id="url_agenda" />
                        </label>
                        <Input
                            value={urlAgenda}
                            onChange={(e) => setUrlAgenda(e.target.value)}
                            type="text"
                            placeholder="https://calendly.com/"
                        />
                    </div>
                    <div>
                        <div className={classes.inputContainer}>
                            <label>
                                <FormattedMessage id="email" />
                            </label>
                            <Input disabled value={user?.email} type="mail" />
                        </div>
                        <div className={classes.inputContainer}>
                            <label className={classes.checkbox}>
                                <FormattedMessage id="deploy.cta" />
                                <CustomCheckbox
                                    onChange={(e) =>
                                        setDeployed(e.target.checked)
                                    }
                                    name="isDeployed"
                                    id="isDeployed"
                                    type="checkbox"
                                    defaultChecked={deployed}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div className={classes.inputContainer}>
                    <label>
                        <FormattedMessage id="profile.informations.lang" />
                    </label>
                    <SwitchLang setUserLanguage={setLanguage} />
                </div>
            </div>
            <NavigationButtons
                onCancel={() => {
                    history.goBack();
                }}
                loading={loading}
                confirmTxt=<FormattedMessage id="buttons.placeholder.save" />
                onConfirm={(e) => {
                    e.preventDefault();
                    handleSavePersonal();
                }}
            />
        </>
    );
}

export default UserSettings;
