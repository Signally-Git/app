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
import { FormattedMessage, useIntl } from "react-intl";

function Team() {
    const intl = useIntl();
    const [templates, setTemplates] = useState([]);
    const notification = useNotification();
    const [deleted, setDeleted] = useState(false);
    const [selected, setSelected] = useState({});
    const [active, setActive] = useState("active");
    const user = TokenService.getUser();
    const [modal, setModal] = useState();
    const [signatureOption, setSignatureOption] = useState({});
    const [defaultStyles, setDefaultStyles] = useState();
    const [preview, setPreview] = useState({});
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        const signatures = await request.get(`signatures`);

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
        setSignatureOption({
            salutation: {
                value: intl.formatMessage({
                    id: "signature.default_greetings",
                }),
                enabled:
                    defaultStyles?.filter(
                        (style) => style.type === "greetings"
                    )[0].value !== "false",
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
                        .value !== "false",
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
                    )[0].value !== "false",
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

    const handleModal = (id) => {
        setModal(
            <Modal
                title={
                    <span>
                        <FormattedMessage id="message.warning.delete" /> <br />
                        <span>{preview.name}</span>
                    </span>
                }
                content={``}
                cancel={<FormattedMessage id="buttons.placeholder.cancel" />}
                validate={<FormattedMessage id="buttons.placeholder.delete" />}
                onCancel={() => setModal()}
                onConfirm={() => handleDelete(id)}
            />
        );
    };

    const handleDelete = async (id) => {
        await request
            .delete(`signatures/${id}`)
            .then(() => {
                notification({
                    content: (
                        <FormattedMessage id="message.success.signature.delete" />
                    ),
                    status: "valid",
                });
                setPreview([]);
                setDeleted(id);
            })
            .catch(() =>
                notification({
                    content: (
                        <>
                            <FormattedMessage id="message.error.delete" />
                            <span style={{ color: "#FF7954" }}>
                                {" "}
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
                <h1>
                    <FormattedMessage id="signatures" />
                </h1>
                <div className={classes.row}>
                    {modal ? (
                        <div className={classes.modalContainer}>{modal}</div>
                    ) : (
                        ""
                    )}
                    <div className={classes.teamsContainer}>
                        <ul className={classes.menu}>
                            {/*<li*/}
                            {/*    onClick={() => setActive("active")}*/}
                            {/*    className={*/}
                            {/*        active === "active" ? classes.active : ""*/}
                            {/*    }*/}
                            {/*>*/}
                            {/*    Actives*/}
                            {/*</li>*/}
                            {/* <li onClick={() => setActive("inactive")} className={`${active === "inactive" ? classes.active : ""}`}>Inactives</li> */}
                        </ul>
                        {active === "active" ? (
                            <div>
                                {user?.roles[1] !== "ROLE_RH" ? (
                                    <Button color="orange" arrow={true}>
                                        <Link to="create-signature">
                                            <FormattedMessage id="add_signature" />
                                        </Link>
                                    </Button>
                                ) : (
                                    ""
                                )}
                                <div className={classes.searchInput}>
                                    <HiOutlineSearch />
                                    <FormattedMessage id="search_signature">
                                        {(placeholder) => (
                                            <input
                                                className={classes.search}
                                                type="text"
                                                placeholder={placeholder}
                                            />
                                        )}
                                    </FormattedMessage>
                                </div>
                                <span>
                                    <FormattedMessage
                                        id="signature.number"
                                        values={{ count: templates.length }}
                                    />
                                </span>
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
                                        <FormattedMessage id="add_signature" />
                                    </Link>
                                </Button>
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
                                        <FormattedMessage id="signature.title" />{" "}
                                        <span className={classes.orangeTxt}>
                                            {preview.name}
                                        </span>
                                    </h5>
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
