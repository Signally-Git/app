import { useEffect, useState } from "react";
import classes from "./informations.module.css";
import { useHistory, useParams } from "react-router-dom";
import Hello from "Assets/img/hi.svg";
import Input from "Utils/Input/input";
import UploadFile from "Utils/Upload/uploadFile";
import request from "Utils/Request/request";
import { useNotification } from "Utils/Notifications/notifications";
import DefineSocials from "Desktop/components/defineSocials/defineSocials";
import Buttons from "Utils/Btns/buttons";
import CompanyCustomization from "./Customization/customization";
import { TokenService } from "Utils/index";

function Informations() {
    const [active, setActive] = useState("company");
    const [organisation, setOrganisation] = useState({});
    const [organisationIRI, setOrganisationIRI] = useState();
    const [uploadedMedia, setUploadedMedia] = useState();
    const [companyName, setCompanyName] = useState("");
    const [website, setWebsite] = useState("");
    const [phone, setPhone] = useState("");
    const [urlAgenda, setUrlAgenda] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [position, setPosition] = useState("");
    const [mobile, setMobile] = useState("");
    const [socialsList, setSocialsList] = useState([]);
    const [preview, setPreview] = useState();

    const notification = useNotification();

    let history = useHistory();
    const { tab } = useParams();

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

    useEffect(() => {
        const getData = async () => {
            const user = TokenService.getUser();
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setPosition(user.position);
            setMobile(user.phone);
            setUrlAgenda(user.urlAgenda);
        };
        getData();
        setActive(tab === "user" ? "company" : "personal");
    }, []);

    const handleSaveCompany = async () => {
        const img = new FormData();
        img.append("file", uploadedMedia);
        if (uploadedMedia)
            await request
                .post(`import/file`, img)
                .then(async (res) => {
                    const requestLogo = {
                        name: uploadedMedia.name,
                        path: res.data.path,
                        organisation: organisationIRI,
                    };
                    setTimeout(async () => {
                        await request.post("logos", requestLogo).catch(() =>
                            notification({
                                content: <>Erreur lors de l'import du logo.</>,
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
                        },
                        socialMediaAccounts: socialsList,
                    };
                    await request
                        .patch(organisationIRI, req, {
                            headers: {
                                "Content-Type": "application/merge-patch+json",
                            },
                        })
                        .then(() => {
                            notification({
                                content: (
                                    <>
                                        <span style={{ color: "#FF7954" }}>
                                            {companyName}
                                        </span>{" "}
                                        édité avec succès
                                    </>
                                ),
                                status: "valid",
                            });
                            history.goBack();
                        })
                        .catch(() =>
                            notification({
                                content: (
                                    <>
                                        Impossible de modifier{" "}
                                        <span style={{ color: "#FF7954" }}>
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
                        content: <>Erreur lors de l'import du logo.</>,
                        status: "invalid",
                    })
                );
        else {
            const req = {
                name: companyName,
                websiteUrl: website,
                address: {
                    ...organisation.address,
                },
                digitalAddress: {
                    phone: phone,
                },
                socialMediaAccounts: socialsList,
            };
            await request
                .patch(organisationIRI, req, {
                    headers: { "Content-Type": "application/merge-patch+json" },
                })
                .then(() => {
                    notification({
                        content: (
                            <>
                                <span style={{ color: "#FF7954" }}>
                                    {companyName}
                                </span>{" "}
                                édité avec succès
                            </>
                        ),
                        status: "valid",
                    });
                    history.goBack();
                });
        }
    };

    const handleSavePersonal = async () => {
        const req = {
            firstName: firstName,
            lastName: lastName,
            position: position,
            phone: mobile,
            urlAgenda: urlAgenda,
        };
        await request
            .patch(
                `users/${JSON.parse(localStorage.getItem("user")).id}`,
                req,
                {
                    headers: { "Content-Type": "application/merge-patch+json" },
                }
            )
            .then(() => {
                // notification({ content: <><span style={{ color: "#FF7954" }}>{firstName} {lastName}</span> édité avec succès</>, status: "valid" })
                // history.goBack()
            })
            .catch(() => {
                notification({
                    content: (
                        <>
                            <span style={{ color: "#FF7954" }}>
                                {firstName} {lastName}
                            </span>{" "}
                            n'a pas pu être modifié
                        </>
                    ),
                    status: "invalid",
                });
            });
    };

    const getValue = (search) => {
        return JSON.parse(localStorage.getItem("configuration")).filter(
            (item) => item.key === search
        )[0].value;
    };

    const [wpName, setWpName] = useState(getValue("WORKPLACE_NAME"));
    const [teamName, setTeamName] = useState(getValue("TEAM_NAME"));
    const [userName, setUserName] = useState(getValue("USER_NAME"));

    const handleSaveCustomization = async () => {
        const data = {
            ConfigurationKeys: [
                { WORKPLACE_NAME: wpName },
                { TEAM_NAME: teamName },
                { USER_NAME: userName },
            ],
        };
        request
            .post("configurations", data)
            .then(() =>
                request("configurations").then((result) =>
                    TokenService.setConfig(result.data["hydra:member"])
                )
            );
    };

    useEffect(() => {
        request
            .get(TokenService.getOrganisation()["@id"])
            .then((organisation) => {
                organisation = organisation.data;
                setOrganisation(organisation);
                setPreview(organisation?.logo?.url);
                setOrganisationIRI(organisation["@id"]);
                setCompanyName(organisation.name);
                setWebsite(organisation.websiteUrl);
                setPhone(organisation.digitalAddress.phone);
                setSocialsList(organisation.socialMediaAccounts);
            });
    }, []);

    return (
        <div className={classes.container}>
            <h1>Compte</h1>
            <div className={classes.tabContainer}>
                <ul className={classes.menu}>
                    <li
                        onClick={() => setActive("company")}
                        className={active === "company" ? classes.active : ""}
                    >
                        Profil
                    </li>
                    <li
                        onClick={() => setActive("personal")}
                        className={active === "personal" ? classes.active : ""}
                    >
                        {companyName || "Société"}
                    </li>
                </ul>
                {active === "personal" ? (
                    <>
                        <div className={classes.inputsContainer}>
                            <div className={classes.row}>
                                <div className={classes.inputContainer}>
                                    <label>Nom société</label>
                                    <Input
                                        type="text"
                                        value={companyName}
                                        onChange={(e) =>
                                            setCompanyName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className={classes.inputContainer}>
                                    <label>Logo de l'entreprise</label>
                                    <div className={classes.logoCompanyDiv}>
                                        {preview && (
                                            <img
                                                className={classes.logoPreview}
                                                src={preview}
                                            />
                                        )}
                                        <UploadFile
                                            file={uploadedMedia}
                                            setFile={(e) => setUploadedMedia(e)}
                                            placeholder="Importer une image"
                                            style={{
                                                paddingTop: ".8rem",
                                                paddingBottom: ".8rem",
                                            }}
                                            type="image/*"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.inputContainer}>
                                <label>Adresse</label>
                                <Input
                                    type="text"
                                    value={organisation.address?.street}
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
                                    <label>Code postal</label>
                                    <Input
                                        type="text"
                                        value={organisation.address?.zipCode}
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
                                    <label>Ville</label>
                                    <Input
                                        type="text"
                                        value={organisation.address?.city}
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
                                    <label>Pays</label>
                                    <Input
                                        type="text"
                                        value={organisation.address?.country}
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
                                    <label>Téléphone fixe</label>
                                    <Input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                </div>
                                <div
                                    className={classes.inputContainer}
                                    style={{ width: "65%", maxWidth: "65%" }}
                                >
                                    <label>Site web</label>
                                    <Input
                                        type="text"
                                        value={website}
                                        onChange={(e) =>
                                            setWebsite(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className={classes.socialsContainer}>
                                <CompanyCustomization
                                    wpName={wpName}
                                    setWP={setWpName}
                                    teamName={teamName}
                                    setTeam={setTeamName}
                                    userName={userName}
                                    setUser={setUserName}
                                />
                            </div>
                            <div className={classes.socialsContainer}>
                                <DefineSocials
                                    defaultValue={socialsList}
                                    setList={setSocialsList}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={classes.inputsContainer}>
                            <div>
                                <div className={classes.row}>
                                    <div className={classes.inputContainer}>
                                        <label>Prénom</label>
                                        <Input
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            type="text"
                                        />
                                    </div>
                                    <div className={classes.inputContainer}>
                                        <label>Nom</label>
                                        <Input
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.inputContainer}>
                                        <label>Poste / Fonction</label>
                                        <Input
                                            value={position}
                                            onChange={(e) =>
                                                setPosition(e.target.value)
                                            }
                                            type="text"
                                        />
                                    </div>
                                    <div className={classes.inputContainer}>
                                        <label>Téléphone mobile</label>
                                        <Input
                                            value={mobile}
                                            onChange={(e) =>
                                                setMobile(e.target.value)
                                            }
                                            type="tel"
                                        />
                                    </div>
                                </div>
                                <div className={classes.inputContainer}>
                                    <label>Lien de prise de rendez-vous</label>
                                    <Input
                                        value={urlAgenda}
                                        onChange={(e) =>
                                            setUrlAgenda(e.target.value)
                                        }
                                        type="text"
                                        placeholder="https://calendly.com/"
                                    />
                                </div>
                                <div className={classes.inputContainer}>
                                    <label>Email</label>
                                    <Input
                                        disabled
                                        defaultValue={
                                            JSON.parse(
                                                localStorage.getItem("user")
                                            )?.email
                                        }
                                        type="mail"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Buttons
                onCancel={() => {
                    history.goBack();
                }}
                confirmTxt="Sauvegarder"
                onConfirm={(e) => {
                    e.preventDefault();
                    handleSavePersonal();
                    handleSaveCompany();
                    handleSaveCustomization();
                }}
            />
            <img src={Hello} />
        </div>
    );
}

export default Informations;
