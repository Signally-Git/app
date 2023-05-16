import { useEffect, useState } from "react";
import classes from "./informations.module.css";
import { useHistory, useParams } from "react-router-dom";
import Hello from "Assets/img/hi.svg";
import Input from "Utils/Input/input";
import UploadFile from "Utils/Upload/uploadFile";
import request from "Utils/Request/request";
import { useNotification } from "Utils/Notifications/notifications";
import DefineSocials from "components/defineSocials/defineSocials";
import Buttons from "Utils/Btns/buttons";
import CompanyCustomization from "./Customization/customization";
import { TokenService } from "Utils";
import SwitchLang from "./SwitchLang";
import { FormattedMessage } from "react-intl";

function Informations() {
    const [active, setActive] = useState("company");
    const [organisation, setOrganisation] = useState(
        TokenService.getOrganisation()
    );
    const user = TokenService.getUser();
    const [uploadedMedia, setUploadedMedia] = useState();
    const [companyName, setCompanyName] = useState("");
    const [website, setWebsite] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [position, setPosition] = useState(user?.position);
    const [mobile, setMobile] = useState(user?.phone);
    const [language, setLanguage] = useState(user?.lang || "");
    const [urlAgenda, setUrlAgenda] = useState(user?.urlAgenda || "");
    const [socialsList, setSocialsList] = useState(
        organisation.socialMediaAccounts || []
    );
    const [preview, setPreview] = useState();

    const notification = useNotification();

    let history = useHistory();
    let { tab } = useParams();

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
                        organisation: organisation["@id"],
                    };
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
                        socialMediaAccounts: socialsList,
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
                                        <span style={{ color: "#FF7954" }}>
                                            {companyName}{" "}
                                        </span>
                                        <FormattedMessage id="message.success.edit" />
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
                                        <FormattedMessage id="message.error.edit" />
                                        <span style={{ color: "#FF7954" }}>
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
                    email: email,
                },
                socialMediaAccounts: socialsList,
            };
            await request
                .patch(organisation["@id"], req, {
                    headers: { "Content-Type": "application/merge-patch+json" },
                })
                .then(() => {
                    notification({
                        content: (
                            <>
                                <span style={{ color: "#FF7954" }}>
                                    {companyName}{" "}
                                </span>
                                <FormattedMessage id="message.success.edit" />
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
            lang: language,
        };
        await request
            .patch(`users/${user.id}`, req, {
                headers: { "Content-Type": "application/merge-patch+json" },
            })
            .catch(() => {
                notification({
                    content: (
                        <>
                            <FormattedMessage id="message.error.edit" />
                            <span style={{ color: "#FF7954" }}>
                                {" "}
                                {firstName} {lastName}
                            </span>
                        </>
                    ),
                    status: "invalid",
                });
            });
    };

    const getValue = (search) => {
        return TokenService?.getConfig()?.filter(
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
        request.get(organisation["@id"]).then((org) => {
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
        <div className={classes.container}>
            <FormattedMessage id="account" tagName="h1" />
            <div className={classes.tabContainer}>
                <ul className={classes.menu}>
                    <li
                        onClick={() => setActive("company")}
                        className={active === "company" ? classes.active : ""}
                    >
                        <FormattedMessage id="profile.title" />
                    </li>
                    <li
                        onClick={() => setActive("personal")}
                        className={active === "personal" ? classes.active : ""}
                    >
                        {companyName || (
                            <FormattedMessage id="profile.company.title" />
                        )}
                    </li>
                </ul>
                {active === "personal" ? (
                    <>
                        <div className={classes.inputsContainer}>
                            <div className={classes.row}>
                                <div className={classes.inputContainer}>
                                    <label>
                                        <FormattedMessage id="profile.company.name" />
                                    </label>
                                    <Input
                                        type="text"
                                        value={companyName}
                                        onChange={(e) =>
                                            setCompanyName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className={classes.inputContainer}>
                                    <label>
                                        <FormattedMessage id="logo" />
                                    </label>
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
                                            setFile={(e) => setUploadedMedia(e)}
                                            placeholder={
                                                <FormattedMessage id="buttons.placeholder.import.image" />
                                            }
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
                                <label>
                                    <FormattedMessage id="address" />
                                </label>
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
                                    <label>
                                        <FormattedMessage id="zipcode" />
                                    </label>
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
                                    <label>
                                        <FormattedMessage id="city" />
                                    </label>
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
                                    <label>
                                        <FormattedMessage id="country" />
                                    </label>
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
                                    <label>
                                        <FormattedMessage id="phone" />
                                    </label>
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
                                    <label>
                                        <FormattedMessage id="website" />
                                    </label>
                                    <Input
                                        type="text"
                                        value={website}
                                        onChange={(e) =>
                                            setWebsite(e.target.value)
                                        }
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
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                            )}
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
                                        <label>
                                            <FormattedMessage id="firstname" />
                                        </label>
                                        <Input
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            type="text"
                                        />
                                    </div>
                                    <div className={classes.inputContainer}>
                                        <label>
                                            <FormattedMessage id="lastname" />
                                        </label>
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
                                        <label>
                                            <FormattedMessage id="position" />
                                        </label>
                                        <Input
                                            value={position}
                                            onChange={(e) =>
                                                setPosition(e.target.value)
                                            }
                                            type="text"
                                        />
                                    </div>
                                    <div className={classes.inputContainer}>
                                        <label>
                                            <FormattedMessage id="mobile" />
                                        </label>
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
                                    <label>
                                        <FormattedMessage id="url_agenda" />
                                    </label>
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
                                    <label>
                                        <FormattedMessage id="email" />
                                    </label>
                                    <Input
                                        disabled
                                        value={user.email}
                                        type="mail"
                                    />
                                </div>
                            </div>
                            <div className={classes.inputContainer}>
                                <label>
                                    <FormattedMessage id="profile.informations.lang" />
                                </label>
                                <SwitchLang setUserLanguage={setLanguage} />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Buttons
                onCancel={() => {
                    history.goBack();
                }}
                confirmTxt=<FormattedMessage id="buttons.placeholder.save" />
                onConfirm={(e) => {
                    e.preventDefault();
                    handleSavePersonal();
                    handleSaveCompany();
                    handleSaveCustomization();
                }}
            />
            <img alt="Greetings" src={Hello} />
        </div>
    );
}

export default Informations;
