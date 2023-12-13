import React, { useState, useEffect, useRef } from "react";
import { Input, UploadFile } from "components";
import classes from "./DefineSocials.module.css";
import { FiCheck, FiPlusCircle, FiTrash } from "react-icons/fi";
import {
    checkImageExists,
    TokenService,
    validateURL,
    request,
    useNotification,
} from "utils";
import { FormattedMessage, useIntl } from "react-intl";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function DefineSocials({ setList }) {
    const socialBaseUrl = "https://files.signally.io/socials/default/";

    const [socials, setSocials] = useState([{ url: "", name: "" }]);
    const [select, setSelect] = useState(0);
    const [value, setValue] = useState("");
    const [uploadedMedia, setUploadedMedia] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(true);

    const intl = useIntl();

    const socialLink = useRef(null);

    const notification = useNotification();

    const getDomainName = (string) => {
        let domain;
        try {
            domain = new URL(string).hostname
                .replace("www.", "")
                .replace(".com" || ".fr", "")
                .replace(`^(?:.*://)?(?:.*?.)?([^:/]*?.[^:/]*).*$`, "");
            return domain;
        } catch (_) {
            return false;
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        const name = getDomainName(e.target.value);
        const updatedSocials = [...socials];
        const isExistingSocial = socials[select]?.["@id"]; // Vérifie si le RS actuel a un @id

        updatedSocials[select] = isExistingSocial
            ? {
                ...socials[select], // Pour un RS existant, conservez toutes les propriétés existantes
                url: e.target.value,
                name: name,
                image: preview, // Mettez à jour avec la nouvelle image, si elle a été modifiée
            }
            : {
                url: e.target.value, // Pour un nouveau RS, créez un nouvel objet
                name: name,
                image: preview,
            };

        setSocials(updatedSocials);
        setValue(e.target.value || "");
    };


    const handleAdd = (e) => {
        e.preventDefault();
        setSelect(socials.length);
        setValue("");
    };

    const handleSwap = (social) => {
        const selectedIndex = socials.findIndex((x) => x === social);
        setUploadedMedia(socials[selectedIndex]?.image);
        setSelect(selectedIndex);
        setValue(socials[selectedIndex]?.url || "");
    };

    const handleSaveIcon = async () => {
        if (!uploadedMedia) return null;
        const img = new FormData();
        img.append("file", uploadedMedia);

        const { data } = await request.post(`import/file`, img);
        return data.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let image;
        if (uploadedMedia instanceof File) {
            image = await handleSaveIcon();
        } else {
            image = socials[select]?.image;
        }
        if (!getDomainName(value)) {
            notification({
                content: <FormattedMessage id="message.error.generic" />,
                status: "invalid",
            });
            return;
        }
        if (
            socials.filter((social) => getDomainName(value) === social?.name)
                .length !== 1
        ) {
            notification({
                content: (
                    <>Il existe déjà un réseau social {getDomainName(value)}</>
                ),
                status: "invalid",
            });
            return;
        } else if (
            !image &&
            !(await checkImageExists(
                `${socialBaseUrl}${getDomainName(value)}.png`
            ))
        ) {
            notification({
                content: (
                    <FormattedMessage
                        id="message.error.social_unknown"
                        values={{ social: getDomainName(value) }}
                    />
                ),
                status: "invalid",
            });
            return;
        } else {
            setSelect(socials.length);
            setValue("");
            setUploadedMedia(null);
            socialLink.current.focus();
            notification({
                content: <>{getDomainName(value)} enregistré</>,
                status: "valid",
            });
        }
        const updatedSocial = {
            ...socials[select],
            image: image || `${socialBaseUrl}${getDomainName(value)}.png`,
            organisation: TokenService.getUser().organisation,
        };
        
        if (socials[select]["@id"]) {
            await request.patch(socials[select]["@id"], updatedSocial, {
                headers: {
                    "Content-Type": "application/merge-patch+json",
                },
            });
        } else {
            await request
                .post("social_media_accounts", updatedSocial)
                .then((res) => {
                    const index = socials.findIndex(
                        (social) => social["url"] === res.data.url
                    );
                    socials[index] = res.data;
                });
        }
        setList(socials);
    };

    const handleRemove = () => {
        const index = select >= socials.length ? socials.length - 1 : select;
        const oldSocial = socials[index];
        request
            .delete(socials[index]["@id"])
            .then(() => {
                socials.splice(
                    socials.findIndex((x) => x?.url === value),
                    1
                );
                notification({
                    content: (
                        <>
                            {oldSocial.name}{" "}
                            <FormattedMessage id="message.success.delete" />
                        </>
                    ),
                    status: "valid",
                });
                setValue("");
                setSelect(socials.length);
            })
            .catch(() =>
                notification({
                    content: (
                        <>
                            <FormattedMessage id="message.error.delete" />{" "}
                            {socials[index]?.name}
                        </>
                    ),
                    status: "invalid",
                })
            );
    };

    useEffect(() => {
        request.get(TokenService.getUser().organisation).then((org) => {
            setSocials(org.data.socialMediaAccounts);
            setSelect(org.data.socialMediaAccounts.length);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (!uploadedMedia) {
            setPreview(null);
            return;
        }
        // todo proxy
        const objectUrl = validateURL(uploadedMedia)
            ? uploadedMedia
            : URL.createObjectURL(uploadedMedia);
        setPreview(objectUrl);

        const updatedSocials = [...socials];
        updatedSocials[select] = {
            ...updatedSocials[select],
            image: objectUrl,
        };
        setSocials(updatedSocials);
    }, [uploadedMedia]);

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <FormattedMessage id="socials.title" />
                    </label>
                    {loading ? (
                        <AiOutlineLoading3Quarters
                            className={classes.loading}
                        />
                    ) : (
                        <ul className={classes.socialsList}>
                            {socials?.map((social, index) => (
                                <li
                                    key={index}
                                    title={social?.url}
                                    onClick={() => handleSwap(social)}
                                >
                                    {social?.image && (
                                        <img
                                            alt={social?.name?.toString()}
                                            src={social?.image}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                    <button
                        className={classes.addSocials}
                        type="button"
                        onClick={handleAdd}
                    >
                        <FiPlusCircle />
                    </button>
                </div>
                <div className={classes.editSocials}>
                    <Input
                        ref={socialLink}
                        style={{ width: "15rem" }}
                        value={value}
                        onChange={handleChange}
                        type="text"
                        placeholder={intl.formatMessage({
                            id: "socials.link_placeholder",
                        })}
                    />
                    <UploadFile
                        file={uploadedMedia}
                        setFile={(e) => {
                            setUploadedMedia(e);
                        }}
                        removeFile={() => {
                            setUploadedMedia(null);
                            setPreview(null);
                        }}
                        style={{
                            width: "15rem",
                            paddingLeft: 0,
                            paddingRight: 0,
                            paddingTop: ".8rem",
                            paddingBottom: ".8rem",
                        }}
                        type="image/*"
                        placeholder={intl.formatMessage({
                            id: "socials.icon_placeholder",
                        })}
                    />
                    <FiCheck onClick={handleSubmit} />
                    {socials[0]?.url?.length > 1 && (
                        <FiTrash
                            title={`Supprimer ${
                                socials[select]?.url || socials[select - 1]?.url
                            }`}
                            onClick={handleRemove}
                        />
                    )}
                </div>
            </form>
        </div>
    );
}
