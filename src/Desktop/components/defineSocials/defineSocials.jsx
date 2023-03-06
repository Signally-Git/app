import React, { useEffect } from "react";
import Input from "Utils/Input/input";
import classes from "./defineSocials.module.css";
import { useNotification } from "Utils/Notifications/notifications";
import { FiCheck, FiTrash } from "react-icons/fi";
import request from "Utils/Request/request";
import UploadFile from "../../../Utils/Upload/uploadFile";

export default function DefineSocials({ setList, defaultValue }) {
    const [socials, setSocials] = React.useState(
        defaultValue || [{ url: "", name: "" }]
    );
    const [select, setSelect] = React.useState(defaultValue.length || 0);
    const [value, setValue] = React.useState("");
    // const [image, setImage] = React.useState("");
    const socialLink = React.useRef(null);
    const notification = useNotification();
    const [uploadedMedia, setUploadedMedia] = React.useState(null);
    const [preview, setPreview] = React.useState(null);

    const getDomainName = (string) => {
        let domain;
        try {
            domain = new URL(string).hostname
                .replace("www.", "")
                .replace(".com", "")
                .replace(`^(?:.*://)?(?:.*?.)?([^:/]*?.[^:/]*).*$`, "");
            return domain;
        } catch (_) {
            return false;
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        const name = getDomainName(e.target.value);
        let newArr = [...socials];
        newArr[select] = {
            url: e.target.value,
            name: name,
            image: preview ||
                "https://s3.eu-west-3.amazonaws.com/files.signally.io/socials/default/" +
                    name +
                    ".png"
        };
        setSocials(newArr);
        setValue(e.target.value || "");
    };

    const handleSwap = (social) => {
        setSelect(socials.findIndex((x) => x === social));
        // setImage(socials[socials.findIndex((x) => x === social)]?.image || "");
        setValue(socials[socials.findIndex((x) => x === social)]?.url || "");
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
        if (!getDomainName(value)) {
            notification({
                content: <>Réseau social non disponible</>,
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
        } else {
            setSelect(socials.length);
            setValue("");
            // setImage("");
            setUploadedMedia(null);
            socialLink.current.focus();
            notification({
                content: <>{getDomainName(value)} enregistré</>,
                status: "valid",
            });
        }
        const image = await handleSaveIcon();
        const req = {
            ...socials[select],
            image: image,
            organisation: JSON.parse(localStorage.getItem("user")).organisation,
        };

        if (socials[select]["@id"])
            await request.patch(socials[select]["@id"], req);
        else 
            await request.post("social_media_accounts", req);
        setList(socials);
    };

    const handleRemove = () => {
        request.delete(socials[select]["@id"]).catch(() =>
            notification({
                content: <>Impossible de supprimer {socials[select].name}</>,
                status: "invalid",
            })
        );
        socials.splice(
            socials.findIndex((x) => x?.url === value),
            1
        );
        setValue("");
        // setImage("");
        setSelect(socials.length);
    };

    useEffect(() => {
        if (!uploadedMedia) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(uploadedMedia);
        setPreview(objectUrl);

        let newArr = [...socials];
        newArr[select] = {
            ...newArr[select],
            image: objectUrl
        };
        setSocials(newArr);

        // return () => URL.revokeObjectURL(objectUrl);
    }, [uploadedMedia]);

    return (
        <div className={classes.container}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Réseaux sociaux</label>
                    <ul className={classes.socialsList}>
                        {socials?.map((social, index) => {
                            return (
                                <li
                                    key={index}
                                    title={social?.url}
                                    onClick={() => handleSwap(social)}
                                >
                                    {social?.image ? (
                                        <img
                                            alt={social?.name.toString()}
                                            src={social?.image}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className={classes.editSocials}>
                    <Input
                        ref={socialLink}
                        style={{ width: "15rem" }}
                        value={value}
                        onChange={(e) => handleChange(e)}
                        type="text"
                        placeholder="URL"
                    />
                    <UploadFile
                        file={uploadedMedia}
                        setFile={(e) => setUploadedMedia(e)}
                        style={{
                            width: "15rem",
                            paddingLeft: 0,
                            paddingRight: 0,
                            paddingTop: ".8rem",
                            paddingBottom: ".8rem",
                        }}
                        type="image/*"
                        placeholder="Icône personnalisée"
                    />
                    <FiCheck onClick={(e) => handleSubmit(e)} />
                    {socials[0]?.url?.length > 1 && (
                        <FiTrash
                            title={`Supprimer ${
                                socials[select]?.url || socials[select - 1].url
                            }`}
                            onClick={() => handleRemove()}
                        />
                    )}
                </div>
            </form>
        </div>
    );
}
