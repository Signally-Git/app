import React from "react";
import Input from "Utils/Input/input";
import classes from "./defineSocials.module.css";
import { useNotification } from "Utils/Notifications/notifications";
import { TiSocialLinkedin, TiSocialPinterest } from "react-icons/ti";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsSnapchat } from "react-icons/bs";
import { FiCheck, FiTrash } from "react-icons/fi";
import request from "Utils/Request/request";

export default function DefineSocials({ setList, defaultValue }) {
    const [socials, setSocials] = React.useState(
        defaultValue || [{ url: "", name: "" }]
    );
    const [select, setSelect] = React.useState(defaultValue.length || 0);
    const [value, setValue] = React.useState("");
    const [customIcon, setCustomIcon] = React.useState("");
    const socialLink = React.useRef(null);
    const notification = useNotification();

    const socialIcons = {
        FACEBOOK: <GrFacebookOption style={{ padding: "5px" }} />,
        INSTAGRAM: <AiOutlineInstagram style={{ padding: "4px" }} />,
        LINKEDIN: <TiSocialLinkedin style={{ padding: "1px" }} />,
        PINTEREST: <TiSocialPinterest />,
        SNAPCHAT: <BsSnapchat style={{ padding: "6px" }} />,
        TWITTER: <AiOutlineTwitter style={{ padding: "4px" }} />,
    };

    const renderSocial = (social) => {
        return (
            socialIcons[social.name.toUpperCase()] || (
                <img src={social.image} alt={social.name} />
            )
        );
    };

    const getName = (string) => {
        let name;
        try {
            name = new URL(string).hostname
                .replace("www.", "")
                .replace(".com", "")
                .replace(`^(?:.*://)?(?:.*?.)?([^:/]*?.[^:/]*).*$`, "");
            return name;
        } catch (_) {
            return false;
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        const name = getName(e.target.value);
        let newArr = [...socials];
        newArr[select] = {
            url: e.target.value,
            name: name,
            image:
                customIcon ||
                "https://signally-images.s3.eu-west-1.amazonaws.com/MAMA+SHELTER/" +
                    name +
                    ".png",
        };
        setSocials(newArr);
        setValue(e.target.value || "");
    };

    const handleChangeIcon = (e) => {
        e.preventDefault();
        const name = getName(value);
        let newArr = [...socials];
        newArr[select] = {
            url: value,
            name: name,
            image: e.target.value,
        };
        setCustomIcon(e.target.value);
        setSocials(newArr);
    };

    const handleSwap = (social) => {
        setSelect(socials.findIndex((x) => x === social));
        setValue(socials[socials.findIndex((x) => x === social)]?.url || "");
        setCustomIcon(
            socials[socials.findIndex((x) => x === social)]?.image || ""
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!getName(value)) {
            notification({
                content: <>Réseau social non disponible</>,
                status: "invalid",
            });
            return;
        }
        if (
            socials.filter(
                (social) =>
                    getName(value) === social?.name ||
                    socials.filter((social) => value.url === social?.url)
            ).length !== 1
        ) {
            setSelect(socials.length);
            setValue("");
            setCustomIcon("");
            socialLink.current.focus();
            notification({
                content: <>{getName(value)} enregistré</>,
                status: "valid",
            });
        } else {
            notification({
                content: <>Il existe déjà un réseau social {getName(value)}</>,
                status: "invalid",
            });
            return;
        }
        const req = {
            ...socials[select],
            organisation: JSON.parse(localStorage.getItem("user")).organisation,
        };

        if (socials[select]["@id"]) request.patch(socials[select]["@id"], req);
        else request.post("social_media_accounts", req);
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
        setCustomIcon("");
        setSelect(socials.length);
    };

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
                                    {social?.name ? renderSocial(social) : ""}
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
                    <Input
                        style={{ width: "12rem" }}
                        value={customIcon}
                        onChange={(e) => handleChangeIcon(e)}
                        type="text"
                        placeholder="Lien de l'icône"
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
