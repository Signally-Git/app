import classes from "./signatures.module.css";
import { Link, useHistory } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FiTrash } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { Button, Modal } from "components";
import parse from "html-react-parser";
import { TokenService, useNotification, request } from "utils";
import { FormattedMessage, useIntl } from "react-intl";

function Signatures() {
    const intl = useIntl();
    const [templates, setTemplates] = useState([]);
    const notification = useNotification();
    const [deleted, setDeleted] = useState(false);
    const [selected, setSelected] = useState({});
    const [active] = useState("active");
    const user = TokenService.getUser();
    const [modal, setModal] = useState();
    const [signatureOption, setSignatureOption] = useState({});
    const [defaultStyles, setDefaultStyles] = useState();
    const [preview, setPreview] = useState({});
    const [search, setSearch] = useState("");
    const history = useHistory();

    const getData = async () => {
        const organisationSignatures =
            TokenService.getOrganisation().signatures;
        if (organisationSignatures && organisationSignatures.length > 0) {
            setTemplates(organisationSignatures);
        }

        try {
            const response = await request.get(`signatures`);
            const signatures = response.data["hydra:member"];

            if (signatures.length > 0) {
                setTemplates(signatures);
            } else {
                history.push("/create-signature");
            }

            const signaturePromises = signatures.map((template) => {
                request.get(`signatures`).then(() => {});
                return request.get(template["@id"]);
            });

            const signatureResponses = await Promise.all(signaturePromises);
            const signatureData = signatureResponses.map(
                (response) => response.data
            );

            setTemplates(signatureData);
        } catch (error) {
            console.error("Error fetching signatures:", error);
        }
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
                value: `Disclaimer`,
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
                            <span className={classes.primaryColor}>
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
                        {active === "active" ? (
                            <div>
                                {user?.roles[1] !== "ROLE_RH" ? (
                                    <Link to="create-signature">
                                        <Button color="primary" arrow={true}>
                                            <FormattedMessage id="add_signature" />
                                        </Button>
                                    </Link>
                                ) : (
                                    ""
                                )}
                                <div className={classes.searchInput}>
                                    <HiOutlineSearch />
                                    <FormattedMessage id="search_signature">
                                        {(placeholder) => (
                                            <input
                                                onChange={(e) =>
                                                    setSearch(e.target.value)
                                                }
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
                                    {templates.map((signature, index) => {
                                        if (
                                            signature.name.search(
                                                search.toLowerCase()
                                            ) !== -1
                                        )
                                            return (
                                                <li
                                                    onMouseEnter={() => {
                                                        setSelected(signature);
                                                        request
                                                            .get(
                                                                signature["@id"]
                                                            )
                                                            .then((res) =>
                                                                setPreview(
                                                                    res.data
                                                                )
                                                            );
                                                        setDefaultStyles(
                                                            signature.signatureStyles
                                                        );
                                                    }}
                                                    key={index}
                                                    className={
                                                        selected === signature
                                                            ? classes.selected
                                                            : ""
                                                    }
                                                >
                                                    <span
                                                        onClick={() =>
                                                            TokenService.getUser()
                                                                .roles[1] !==
                                                            "ROLE_RH"
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
                                                                    TokenService.getUser()
                                                                        .roles[1] !==
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
                                        else {
                                            return (
                                                <Fragment
                                                    key={index}
                                                ></Fragment>
                                            );
                                        }
                                    })}
                                </ul>
                            </div>
                        ) : active === "inactive" ? (
                            <div>
                                <Button color="primary" arrow={true}>
                                    <Link to="create-signature">
                                        <FormattedMessage id="add_signature" />
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    {preview.html?.length > 0 && (
                        <div className={classes.signaturePreview}>
                            <ul>
                                <li>
                                    <h5>
                                        <FormattedMessage id="signature.title" />{" "}
                                        <span className={classes.primaryTxt}>
                                            {preview.name}
                                        </span>
                                    </h5>
                                    {parse(preview.preview)}
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Signatures;
