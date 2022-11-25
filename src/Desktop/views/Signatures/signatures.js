import classes from "./signatures.module.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FiTrash } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import Button from "Utils/Button/btn";
import { useNotification } from "Utils/Notifications/notifications";
import request from "Utils/Request/request";
import parse from "html-react-parser";
import Modal from "Utils/Modals/modal";
import { TokenService } from "Utils";

function Team() {
    const [templates, setTemplates] = useState([]);
    const notification = useNotification();
    const [deleted, setDeleted] = useState(false);
    const [selected, setSelected] = useState({});
    const [active, setActive] = useState("active");
    const user = TokenService.getUser();
    const [template, setTemplate] = useState();
    const [modal, setModal] = useState();
    const [signatureInfo, setSignatureInfo] = useState({});
    const [signatureOption, setSignatureOption] = useState({});
    const [defaultStyles, setDefaultStyles] = useState();
    const [data, setData] = useState({
        firstName: user?.first_name,
        lastName: user?.last_name,
        position: user?.position,
    });

    const [organisation, setOrganisation] = useState();
    const [preview, setPreview] = useState({});
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        const signatures = await request.get(`signatures`);

        await request
            .get(user?.organisation)
            .then((res) => setOrganisation(res.data));
        signatures.data["hydra:totalItems"] < 1
            ? history.push("/create-signature")
            : // : console.log(signatures.data["hydra:member"])
              setTemplates(signatures.data["hydra:member"]);
        signatures.data["hydra:member"].map((template, index) => {
            request.get(template["@id"]).then((r) => {
                signatures[index] = r.data;
            });
        });
        setLoading(false);
    };

    useEffect(() => {
        setSignatureInfo({
            logo: organisation?.logo,
            firstName: {
                value: user?.first_name,
                color: defaultStyles?.filter(
                    (style) =>
                        style.type === "firstName" && style.property === "color"
                )[0].value,
                style: {
                    fontWeight: defaultStyles?.filter(
                        (style) =>
                            style.type === "firstName" &&
                            style.property === "fontWeight"
                    )[0].value,
                    fontStyle: defaultStyles?.filter(
                        (style) =>
                            style.type === "firstName" &&
                            style.property === "fontStyle"
                    )[0].value,
                    textDecoration: defaultStyles?.filter(
                        (style) =>
                            style.type === "firstName" &&
                            style.property === "textDecoration"
                    )[0].value,
                },
            },
            lastName: {
                value: user?.first_name,
                color: defaultStyles?.filter(
                    (style) =>
                        style.type === "lastName" && style.property === "color"
                )[0].value,
                style: {
                    fontWeight: defaultStyles?.filter(
                        (style) =>
                            style.type === "lastName" &&
                            style.property === "fontWeight"
                    )[0].value,
                    fontStyle: defaultStyles?.filter(
                        (style) =>
                            style.type === "lastName" &&
                            style.property === "fontStyle"
                    )[0].value,
                    textDecoration: defaultStyles?.filter(
                        (style) =>
                            style.type === "lastName" &&
                            style.property === "textDecoration"
                    )[0].value,
                },
            },
            jobName: {
                value: user?.first_name,
                color: defaultStyles?.filter(
                    (style) =>
                        style.type === "jobName" && style.property === "color"
                )[0].value,
                style: {
                    fontWeight: defaultStyles?.filter(
                        (style) =>
                            style.type === "jobName" &&
                            style.property === "fontWeight"
                    )[0].value,
                    fontStyle: defaultStyles?.filter(
                        (style) =>
                            style.type === "jobName" &&
                            style.property === "fontStyle"
                    )[0].value,
                    textDecoration: defaultStyles?.filter(
                        (style) =>
                            style.type === "jobName" &&
                            style.property === "textDecoration"
                    )[0].value,
                },
            },
            company: {
                value: user?.first_name,
                color: defaultStyles?.filter(
                    (style) =>
                        style.type === "companyName" &&
                        style.property === "color"
                )[0].value,
                style: {
                    fontWeight: defaultStyles?.filter(
                        (style) =>
                            style.type === "companyName" &&
                            style.property === "fontWeight"
                    )[0].value,
                    fontStyle: defaultStyles?.filter(
                        (style) =>
                            style.type === "companyName" &&
                            style.property === "fontStyle"
                    )[0].value,
                    textDecoration: defaultStyles?.filter(
                        (style) =>
                            style.type === "companyName" &&
                            style.property === "textDecoration"
                    )[0].value,
                },
            },
            addressStreet: {
                value: user?.first_name,
                color: defaultStyles?.filter(
                    (style) =>
                        style.type === "addressStreet" &&
                        style.property === "color"
                )[0].value,
                style: {
                    fontWeight: defaultStyles?.filter(
                        (style) =>
                            style.type === "addressStreet" &&
                            style.property === "fontWeight"
                    )[0].value,
                    fontStyle: defaultStyles?.filter(
                        (style) =>
                            style.type === "addressStreet" &&
                            style.property === "fontStyle"
                    )[0].value,
                    textDecoration: defaultStyles?.filter(
                        (style) =>
                            style.type === "addressStreet" &&
                            style.property === "textDecoration"
                    )[0].value,
                },
            },
            addressInfo: {
                value: user?.first_name,
                color: defaultStyles?.filter(
                    (style) =>
                        style.type === "addressInfo" &&
                        style.property === "color"
                )[0].value,
                style: {
                    fontWeight: defaultStyles?.filter(
                        (style) =>
                            style.type === "addressInfo" &&
                            style.property === "fontWeight"
                    )[0].value,
                    fontStyle: defaultStyles?.filter(
                        (style) =>
                            style.type === "addressInfo" &&
                            style.property === "fontStyle"
                    )[0].value,
                    textDecoration: defaultStyles?.filter(
                        (style) =>
                            style.type === "addressInfo" &&
                            style.property === "textDecoration"
                    )[0].value,
                },
            },
            addressZipcode: {
                value: user?.first_name,
                color: defaultStyles?.filter(
                    (style) =>
                        style.type === "addressZipcode" &&
                        style.property === "color"
                )[0].value,
                style: {
                    fontWeight: defaultStyles?.filter(
                        (style) =>
                            style.type === "addressZipcode" &&
                            style.property === "fontWeight"
                    )[0].value,
                    fontStyle: defaultStyles?.filter(
                        (style) =>
                            style.type === "addressZipcode" &&
                            style.property === "fontStyle"
                    )[0].value,
                    textDecoration: defaultStyles?.filter(
                        (style) =>
                            style.type === "addressZipcode" &&
                            style.property === "textDecoration"
                    )[0].value,
                },
            },
            addressCity: {
                value: user?.first_name,
                color: defaultStyles?.filter(
                    (style) =>
                        style.type === "addressCity" &&
                        style.property === "color"
                )[0].value,
                style: {
                    fontWeight: defaultStyles?.filter(
                        (style) =>
                            style.type === "addressCity" &&
                            style.property === "fontWeight"
                    )[0].value,
                    fontStyle: defaultStyles?.filter(
                        (style) =>
                            style.type === "addressCity" &&
                            style.property === "fontStyle"
                    )[0].value,
                    textDecoration: defaultStyles?.filter(
                        (style) =>
                            style.type === "addressCity" &&
                            style.property === "textDecoration"
                    )[0].value,
                },
            },
            addressCountry: {
                value: user?.first_name,
                color: defaultStyles?.filter(
                    (style) =>
                        style.type === "addressCountry" &&
                        style.property === "color"
                )[0].value,
                style: {
                    fontWeight: defaultStyles?.filter(
                        (style) =>
                            style.type === "addressCountry" &&
                            style.property === "fontWeight"
                    )[0].value,
                    fontStyle: defaultStyles?.filter(
                        (style) =>
                            style.type === "addressCountry" &&
                            style.property === "fontStyle"
                    )[0].value,
                    textDecoration: defaultStyles?.filter(
                        (style) =>
                            style.type === "addressCountry" &&
                            style.property === "textDecoration"
                    )[0].value,
                },
            },
            mobile: {
                value: user?.first_name,
                color: defaultStyles?.filter(
                    (style) =>
                        style.type === "mobile" && style.property === "color"
                )[0].value,
                style: {
                    fontWeight: defaultStyles?.filter(
                        (style) =>
                            style.type === "mobile" &&
                            style.property === "fontWeight"
                    )[0].value,
                    fontStyle: defaultStyles?.filter(
                        (style) =>
                            style.type === "mobile" &&
                            style.property === "fontStyle"
                    )[0].value,
                    textDecoration: defaultStyles?.filter(
                        (style) =>
                            style.type === "mobile" &&
                            style.property === "textDecoration"
                    )[0].value,
                },
            },
            phone: {
                value: user?.first_name,
                color: defaultStyles?.filter(
                    (style) =>
                        style.type === "phone" && style.property === "color"
                )[0].value,
                style: {
                    fontWeight: defaultStyles?.filter(
                        (style) =>
                            style.type === "phone" &&
                            style.property === "fontWeight"
                    )[0].value,
                    fontStyle: defaultStyles?.filter(
                        (style) =>
                            style.type === "phone" &&
                            style.property === "fontStyle"
                    )[0].value,
                    textDecoration: defaultStyles?.filter(
                        (style) =>
                            style.type === "phone" &&
                            style.property === "textDecoration"
                    )[0].value,
                },
            },
            fontSize: [11],
            fontFamily: "Helvetica",
        });

        setSignatureOption({
            salutation: {
                value: "Cordialement,",
                enabled:
                    defaultStyles?.filter(
                        (style) => style.type === "greetings"
                    )[0].value === "false"
                        ? false
                        : true,
                padding: defaultStyles?.filter(
                    (style) => style.type === "greetingsPadding"
                )[0].value,
            },
            custom: { enabled: false },
            eco: { value: "Ecoresponsability", enabled: false },
            followUs: { value: "Follow us", enabled: false },
            bgColor: defaultStyles?.filter(
                (style) =>
                    style.type === "divColor" && style.property === "color"
            )[0].value,
            bannerTop: { url: "test", enabled: false, padding: 10 },
            event: {
                ...signatureOption.event,
                display: `${process.env.REACT_APP_API_URL}/${signatureOption.event?.selected?.imagePath}`,
                enabled:
                    defaultStyles?.filter((style) => style.type === "event")[0]
                        .value === "false"
                        ? false
                        : true,
                padding: defaultStyles?.filter(
                    (style) => style.type === "eventPadding"
                )[0].value,
            },
            socials: {
                enabled: false,
                bgColor: "#000",
                fill: "#FFF",
                items: [
                    "twitter",
                    "facebook",
                    "pinterest",
                    "snapchat",
                    "linkedin",
                    "instagram",
                ],
            },
            footer: {
                maxWidth: 380,
                value: `This e-mail, any attachments and the information contained therein ("this message") are confidential and intended solely for the use of the addressee(s). If you have received this message in error please send it back to the sender and delete it. Unauthorized publication, use, dissemination or disclosure of this message, either in whole or in part is strictly prohibited.
      
      Ce message electronique et tous les fichiers joints ainsi que les informations contenues dans ce message (ci apres "le message"), sont confidentiels et destines exclusivement a l'usage de la personne a laquelle ils sont adresses. Si vous avez recu ce message par erreur, merci de le renvoyer a son emetteur et de le detruire. Toute diffusion, publication, totale ou partielle ou divulgation sous quelque forme que ce soit non expressement autorisees de ce message, sont interdites.,`,
                enabled:
                    defaultStyles?.filter(
                        (style) => style.type === "disclaimer"
                    )[0].value === "false"
                        ? false
                        : true,
                padding: defaultStyles?.filter(
                    (style) => style.type === "disclaimerPadding"
                )[0].value,
                size: 7,
            },
        });
    }, []);

    useEffect(async () => {
        getData();
    }, [deleted]);

    useEffect(() => {
        setData({
            firstName: "Prénom",
            lastName: "Nom",
            poste: "Poste",
            company: organisation?.name,
            address: organisation?.address,
            mobile: "Mobile",
            phone: organisation?.phone_number,
            event: `https://fakeimg.pl/380x126?font=noto&amp;font_size=14`,
        });
    }, [template]);

    const handleModal = (id) => {
        setModal(
            <Modal
                title={
                    <span>
                        Vous allez supprimer <br />
                        <span>{preview.name}</span>
                    </span>
                }
                content={``}
                cancel="Annuler"
                validate="Supprimer"
                onCancel={() => setModal()}
                onConfirm={() => handleDelete(id)}
            />
        );
    };

    const handleDelete = async (id) => {
        await request
            .delete(`signatures/${id}`)
            .then((res) => {
                notification({
                    content: <>La signature a été supprimée avec succès</>,
                    status: "valid",
                });
                setPreview([]);
                setDeleted(id);
            })
            .catch(() =>
                notification({
                    content: (
                        <>
                            Impossible de supprimer{" "}
                            <span style={{ color: "#FF7954" }}>
                                {preview.name}
                            </span>
                        </>
                    ),
                    status: "invalid",
                })
            );
        setModal();
    };

    if (loading) return <div></div>;
    return (
        <div>
            <div className={classes.container}>
                <h1>Signatures</h1>
                <div className={classes.row}>
                    {modal ? (
                        <div className={classes.modalContainer}>{modal}</div>
                    ) : (
                        ""
                    )}
                    <div className={classes.teamsContainer}>
                        <ul className={classes.menu}>
                            <li
                                onClick={() => setActive("active")}
                                className={
                                    active === "active" ? classes.active : ""
                                }
                            >
                                Actives
                            </li>
                            {/* <li onClick={() => setActive("inactive")} className={`${active === "inactive" ? classes.active : ""}`}>Inactives</li> */}
                        </ul>
                        {active === "active" ? (
                            <div>
                                {user?.roles[1] !== "ROLE_RH" ? (
                                    <Button color="orange" arrow={true}>
                                        <Link to="create-signature">
                                            Ajouter une signature
                                        </Link>
                                    </Button>
                                ) : (
                                    ""
                                )}
                                <div className={classes.searchInput}>
                                    <HiOutlineSearch />
                                    <input
                                        className={classes.search}
                                        type="text"
                                        placeholder="Rechercher une signature"
                                    />
                                </div>
                                <span>{templates.length} signatures</span>
                                <ul className={classes.itemsList}>
                                    {templates.map((signature) => {
                                        return (
                                            <li
                                                onMouseEnter={() => {
                                                    setSelected(signature);
                                                    request
                                                        .get(signature["@id"])
                                                        .then((res) =>
                                                            setPreview(res.data)
                                                        );
                                                    setDefaultStyles(
                                                        signature.signatureStyles
                                                    );
                                                }}
                                                key={signature.id}
                                                className={
                                                    selected === signature
                                                        ? classes.selected
                                                        : ""
                                                }
                                            >
                                                <span
                                                    onClick={() =>
                                                        JSON.parse(
                                                            localStorage.getItem(
                                                                "user"
                                                            )
                                                        ).roles[1] !== "ROLE_RH"
                                                            ? history.push(
                                                                  "/edit-signature/" +
                                                                      signature.id
                                                              )
                                                            : ""
                                                    }
                                                >
                                                    {signature.name}
                                                </span>
                                                {user?.roles[1] !==
                                                "ROLE_RH" ? (
                                                    <div
                                                        className={
                                                            classes.actionsContainer
                                                        }
                                                    >
                                                        <AiOutlineEdit
                                                            onClick={() =>
                                                                JSON.parse(
                                                                    localStorage.getItem(
                                                                        "user"
                                                                    )
                                                                ).roles[1] !==
                                                                "ROLE_RH"
                                                                    ? history.push(
                                                                          "/edit-signature/" +
                                                                              signature.id
                                                                      )
                                                                    : ""
                                                            }
                                                        />
                                                        <FiTrash
                                                            onClick={() =>
                                                                handleModal(
                                                                    signature.id
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ) : active === "inactive" ? (
                            <div>
                                <Button color="orange" arrow={true}>
                                    <Link to="create-signature">
                                        Ajouter une signature
                                    </Link>
                                </Button>
                                {/* IF PAS DE SIGNATURE INACTIVE */}
                                {}
                                {/* <div className={classes.searchInput}>
                                        <HiOutlineSearch />
                                        <input className={classes.search} type="text" placeholder="Rechercher une signature" />
                                    </div>
                                    <span>0 signature</span>
                                    <ul className={classes.itemsList}> */}
                                {/* <li tabIndex="0">
                                            Design
                                        </li>
                                        <li tabIndex="0">Sales</li> */}
                                {/* </ul> */}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    {preview.html?.length > 0 ? (
                        <div className={classes.signaturePreview}>
                            {/* <h2>Design</h2> */}
                            <ul>
                                <li>
                                    <h5>
                                        Signature{" "}
                                        <span className={classes.orangeTxt}>
                                            {preview.name}
                                        </span>
                                    </h5>
                                    {/* {preview.signatureData?.length > 0 && parse(preview.signatureData)} */}
                                    {parse(preview.preview)}
                                    {/* <Preview infos={signatureInfo} options={signatureOption} template={preview.html} organisation={organisation} /> */}
                                    {/* <ReadOnlyPreview infos={data} template={preview.html} /> */}
                                    {/* <p className={classes.groupName}>Team Design</p>
                                    <span className={classes.groupName}>#Mama Los Angeles</span> */}
                                </li>
                            </ul>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}

export default Team;
