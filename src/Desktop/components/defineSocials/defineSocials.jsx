import React, { useEffect } from "react";
import Input from "Utils/Input/input";
import classes from "./defineSocials.module.css";
import { useNotification } from "Utils/Notifications/notifications";
import { FiCheck, FiPlusCircle, FiTrash } from "react-icons/fi";
import request from "Utils/Request/request";
import UploadFile from "../../../Utils/Upload/uploadFile";
import { TokenService } from "../../../Utils";

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
            image: preview
        };
        setSocials(newArr);
        setValue(e.target.value || "");
    };
    
    const handleAdd = (e) => {
        e.preventDefault()
        setSelect(socials.length)
        setValue("")
    }

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
            image: image ||
                "https://s3.eu-west-3.amazonaws.com/files.signally.io/socials/default/" +
                getDomainName(value) +
                ".png",
            organisation: JSON.parse(localStorage.getItem("user")).organisation,
        };

        if (socials[select]["@id"])
            await request.patch(socials[select]["@id"], req);
        else 
            await request.post("social_media_accounts", req);
        setList(socials);
    };

    const handleRemove = () => {
        let index = select >= socials.length ? socials.length - 1 : select 
        request.delete(socials[index]["@id"]).then(() => {
            socials.splice(
                socials.findIndex((x) => x?.url === value),
                1
            );
            setValue("");
            // setImage("");
            setSelect(socials.length);
        }).catch(() =>
            notification({
                content: <>Impossible de supprimer {socials[index].name}</>,
                status: "invalid",
            })
        );
        
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

    useEffect(() => {
        const sse = new EventSource(
            `${process.env.REACT_APP_HUB_URL}${TokenService.getUser()["organisation"]}`
        )
        sse.onmessage = (e) => {
            const org = { ...JSON.parse(e.data), '@id': TokenService.getUser().organisation }
            TokenService.setOrganisation(org);
            setSocials(JSON.parse(e.data).socialMediaAccounts);
            setList(JSON.parse(e.data).socialMediaAccounts)
        };
    }, [])
    
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
                                            alt={social?.name?.toString()}
                                            src={social?.image}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                    <button className={classes.addSocials} type="button" onClick={handleAdd}>
                        <FiPlusCircle />
                    </button>
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
