import { useEffect, useState } from "react";
import classes from "../accountSettings.module.css";
import { useHistory } from "react-router-dom";
import { Input, UploadFile, NavigationButtons } from "components";
import { TokenService, request, useNotification } from "utils";
import { FormattedMessage } from "react-intl";
import Popup from "components/Upload/CropPopup/Popup";

function CompanySettings() {
    const [organisation, setOrganisation] = useState(
        TokenService.getOrganisation()
    );
    const [uploadedMedia, setUploadedMedia] = useState();
    const [open, setOpen] = useState(false);
    const [companyName, setCompanyName] = useState(organisation?.name || "");
    const [website, setWebsite] = useState(organisation?.websiteUrl || "");
    const [phone, setPhone] = useState(organisation?.address?.phone || "");
    const [email, setEmail] = useState(organisation?.address?.email || "");
    const [preview, setPreview] = useState();
    const [loading, setLoading] = useState(false);

    const notification = useNotification();
    let history = useHistory();

    useEffect(() => {
        // create the preview
        if (!uploadedMedia) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(uploadedMedia);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [uploadedMedia]);

    const handleSaveCompany = async () => {
        setLoading(true);
        const img = new FormData();
        img.append("file", uploadedMedia);
        if (uploadedMedia) {
            await request
                .post(`import/file`, img)
                .then(async (res) => {
                    const requestLogo = {
                        name: uploadedMedia.name,
                        path: res.data.path,
                        organisation: organisation["@id"],
                    };
                    console.log("requestLogo", requestLogo);
                    setTimeout(async () => {
                        await request.post("logos", requestLogo).catch(() =>
                            notification({
                                content: (
                                    <FormattedMessage id="message.error.logo" />
                                ),
                                status: "invalid",
                            })
                        );
                    }, 3000);
                    const req = {
                        name: companyName,
                        websiteUrl: website,
                        logo: res.data["@id"],
                        address: {
                            ...organisation.address,
                        },
                        digitalAddress: {
                            phone: phone,
                            email: email,
                        },
                    };
                    await request
                        .patch(organisation["@id"], req, {
                            headers: {
                                "Content-Type": "application/merge-patch+json",
                            },
                        })
                        .then(() => {
                            notification({
                                content: (
                                    <>
                                        <span className={classes.primaryColor}>
                                            {companyName}{" "}
                                        </span>
                                        <FormattedMessage id="message.success.edit" />
                                    </>
                                ),
                                status: "valid",
                            });
                        })
                        .catch(() =>
                            notification({
                                content: (
                                    <>
                                        <FormattedMessage id="message.error.edit" />
                                        <span className={classes.primaryColor}>
                                            {" "}
                                            {companyName}
                                        </span>
                                    </>
                                ),
                                status: "invalid",
                            })
                        );
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
                name: companyName,
                websiteUrl: website,
                address: {
                    ...organisation.address,
                },
                digitalAddress: {
                    phone: phone,
                    email: email,
                },
            };
            await request
                .patch(organisation["@id"], req, {
                    headers: { "Content-Type": "application/merge-patch+json" },
                })
                .then(() => {
                    notification({
                        content: (
                            <>
                                <span className={classes.primaryColor}>
                                    {companyName}{" "}
                                </span>
                                <FormattedMessage id="message.success.edit" />
                            </>
                        ),
                        status: "valid",
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        request.get(organisation?.["@id"]).then((org) => {
            org = org?.data;
            setOrganisation(org);
            setPreview(org?.logo?.url);
            setCompanyName(org?.name);
            setWebsite(org?.websiteUrl);
            setPhone(org?.digitalAddress?.phone);
            setEmail(org?.digitalAddress?.email);
        });
    }, []);

    return (
        <>
            <div className={classes.inputsContainer}>
                <div className={classes.inputContainer}>
                    <FormattedMessage tagName="label" id="logo" />
                    <div className={classes.logoCompanyDiv}>
                        {preview && (
                            <img
                                alt={`Logo ${companyName}`}
                                className={classes.logoPreview}
                                src={preview}
                            />
                        )}
                        <UploadFile
                            file={uploadedMedia}
                            setFile={(e) => {
                                setUploadedMedia(e)
                                setOpen(true)
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
                            handleClose={() => setOpen(false)}
                            image={preview}
                            getCroppedFile={(image) => {
                                setPreview(image);
                                setOpen(false);
                            }}
                            aspectRatios={["1:1", "3:4", "16:9", "2:3"]}
                        />
                    </div>
                </div>
                <div className={classes.row}>
                    <div className={classes.inputContainer}>
                        <FormattedMessage
                            tagName="label"
                            id="profile.company.name"
                        />
                        <Input
                            type="text"
                            value={companyName || ""}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div className={classes.inputContainer}>
                        <FormattedMessage tagName="label" id="siren" />
                        <Input
                            type="text"
                            value={organisation?.siren || ""}
                            disabled
                        />
                    </div>
                </div>
                <div className={classes.inputContainer}>
                    <label>
                        <FormattedMessage id="address" />
                    </label>
                    <Input
                        type="text"
                        value={organisation?.address?.street || ""}
                        onChange={(e) =>
                            setOrganisation({
                                ...organisation,
                                address: {
                                    ...organisation.address,
                                    street: e.target.value,
                                },
                            })
                        }
                    />
                </div>
                <div className={classes.row}>
                    <div
                        className={classes.inputContainer}
                        style={{ maxWidth: "20%" }}
                    >
                        <label>
                            <FormattedMessage id="zipcode" />
                        </label>
                        <Input
                            type="text"
                            value={organisation?.address?.zipCode || ""}
                            onChange={(e) =>
                                setOrganisation({
                                    ...organisation,
                                    address: {
                                        ...organisation.address,
                                        zipCode: e.target.value,
                                    },
                                })
                            }
                        />
                    </div>
                    <div
                        className={classes.inputContainer}
                        style={{ maxWidth: "35%" }}
                    >
                        <label>
                            <FormattedMessage id="city" />
                        </label>
                        <Input
                            type="text"
                            value={organisation?.address?.city || ""}
                            onChange={(e) =>
                                setOrganisation({
                                    ...organisation,
                                    address: {
                                        ...organisation.address,
                                        city: e.target.value,
                                    },
                                })
                            }
                        />
                    </div>
                    <div
                        className={classes.inputContainer}
                        style={{ maxWidth: "35%" }}
                    >
                        <label>
                            <FormattedMessage id="country" />
                        </label>
                        <Input
                            type="text"
                            value={organisation?.address?.country || ""}
                            onChange={(e) =>
                                setOrganisation({
                                    ...organisation,
                                    address: {
                                        ...organisation.address,
                                        country: e.target.value,
                                    },
                                })
                            }
                        />
                    </div>
                </div>
                <div className={classes.row}>
                    <div
                        className={classes.inputContainer}
                        style={{ maxWidth: "30%" }}
                    >
                        <label>
                            <FormattedMessage id="phone" />
                        </label>
                        <Input
                            type="tel"
                            value={phone || ""}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div
                        className={classes.inputContainer}
                        style={{ width: "65%", maxWidth: "65%" }}
                    >
                        <label>
                            <FormattedMessage id="website" />
                        </label>
                        <Input
                            type="text"
                            value={website || ""}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>
                </div>
                {!organisation?.azure && (
                    <div className={classes.inputContainer}>
                        <label>
                            <FormattedMessage id="profile.informations.google_email_address" />
                        </label>
                        <Input
                            type="email"
                            value={email || ""}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                )}
            </div>
            <NavigationButtons
                onCancel={() => {
                    history.goBack();
                }}
                loading={loading}
                confirmTxt=<FormattedMessage id="buttons.placeholder.save" />
                onConfirm={(e) => {
                    e.preventDefault();
                    handleSaveCompany();
                }}
            />
        </>
    );
}

export default CompanySettings;
