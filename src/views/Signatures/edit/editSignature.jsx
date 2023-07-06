import classes from "../create/createSignature.module.css";
import { useRef, useState, useEffect } from "react";
import Options from "../create/Options/options";
import Infos from "../create/Infos/infos";
import TemplateSelection from "../create/TemplateSelect/templateSelect";
import Preview from "../create/Preview/customizablePreview";
import { BsArrowRight } from "react-icons/bs";
import { Button, Input } from "components";
import { useHistory, useParams } from "react-router-dom";
import { TokenService, useNotification, request, getEvents } from "utils";
import { useDefaultOptions, getStyles } from "../create/createSignature.utils";
import { FormattedMessage, useIntl } from "react-intl";
import { extractStyle, extractValue, handleSave } from "./editSignature.utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Component handling the modification of signature, selection of template

function EditSignatureComponent() {
    const { signatureId } = useParams();
    const user = TokenService.getUser();
    const company = TokenService.getOrganisation();
    const [loading, setLoading] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [defaultStyles, setDefaultStyles] = useState(null);
    const history = useHistory();
    const notification = useNotification();
    const [preview, setPreview] = useState("");
    const intl = useIntl();

    // Used to handle transition
    const elem = useRef(null);
    const [templates, setTemplates] = useState(false);
    const [signatureInfo, setSignatureInfo] = useState(null);
    const [signatureOption, setSignatureOption] = useState(null);
    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [signatureName, setSignatureName] = useState("");

    const handlePopulate = (styles) => {
        setSignatureInfo({
            logo: company?.logo,
            firstName: {
                color: extractValue(styles, "firstName", "color"),
                style: extractStyle(styles, "firstName"),
            },
            lastName: {
                color: extractValue(styles, "lastName", "color"),
                style: extractStyle(styles, "lastName"),
            },
            jobName: {
                color: extractValue(styles, "jobName", "color"),
                style: extractStyle(styles, "jobName"),
            },
            company: {
                color: extractValue(styles, "companyName", "color"),
                style: extractStyle(styles, "companyName"),
            },
            addressStreet: {
                color: extractValue(styles, "addressStreet", "color"),
                style: extractStyle(styles, "addressStreet"),
            },
            addressInfo: {
                color: extractValue(styles, "addressInfo", "color"),
                style: extractStyle(styles, "addressInfo"),
            },
            addressZipcode: {
                color: extractValue(styles, "addressZipcode", "color"),
                style: extractStyle(styles, "addressZipcode"),
            },
            addressCity: {
                color: extractValue(styles, "addressCity", "color"),
                style: extractStyle(styles, "addressCity"),
            },
            addressCountry: {
                color: extractValue(styles, "addressCountry", "color"),
                style: extractStyle(styles, "addressCountry"),
            },
            mobile: {
                color: extractValue(styles, "mobile", "color"),
                style: extractStyle(styles, "mobile"),
            },
            phone: {
                color: extractValue(styles, "phone", "color"),
                style: extractStyle(styles, "phone"),
            },
            fontSize: [
                extractValue(styles, "generalFontSize", "fontSize") || 11,
            ],
            fontFamily: extractValue(styles, "generalFontFamily", "fontFamily"),
        });
        setSignatureOption({
            salutation: {
                value:
                    styles?.filter(
                        (style) => style.type === "greetingsValue"
                    )[0]?.value || "Cordialement,",
                enabled:
                    styles?.filter(
                        (style) => style.type === "greetingsEnabled"
                    )[0]?.value !== "false",
                padding: styles?.filter(
                    (style) => style.type === "greetingsPadding"
                )[0].value,
            },
            custom: { enabled: false },
            eco: { value: "Ecoresponsability", enabled: false },
            followUs: { value: "Follow us", enabled: false },
            bgColor: extractValue(styles, "divColor", "color"),
            bannerTop: { url: "test", enabled: false, padding: 10 },
            vcard: {
                enabled:
                    styles?.filter(
                        (style) => style.type === "vCardEnabled"
                    )?.[0]?.value !== "false",
            },
            calendar: {
                enabled:
                    styles?.filter(
                        (style) => style.type === "calendarEnabled"
                    )?.[0]?.value !== "false",
            },
            event: {
                ...signatureOption?.event,
                display: signatureOption?.event?.selected?.imageUrl,
                enabled:
                    styles?.filter((style) => style.type === "event")[0]
                        .value !== "false",
                padding: styles?.filter(
                    (style) => style.type === "eventPadding"
                )[0].value,
            },
            socials: {
                enabled: true,
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
                color:
                    styles?.filter(
                        (style) => style.type === "disclaimerColor"
                    )[0]?.value || "#000",
                value:
                    styles?.filter(
                        (style) => style.type === "disclaimerValue"
                    )[0]?.value || `Disclaimer`,
                enabled:
                    styles?.filter(
                        (style) => style.type === "disclaimerEnabled"
                    )[0]?.value !== "false",
                padding: styles?.filter(
                    (style) => style.type === "disclaimerPadding"
                )[0].value,
                fontSize: styles?.filter(
                    (style) => style.type === "disclaimerFontSize"
                )[0]?.value,
            },
        });
    };

    useEffect(() => {
        const getSignatureFromId = async () => {
            await request
                .get("signatures/" + signatureId)
                .then(async ({ data }) => {
                    setSelectedTemplate(data.signatureTemplate);
                    setDefaultStyles(data.signatureStyles);
                    setSignatureName(data.name);
                });
        };
        setLoading(true);
        getSignatureFromId().then(() => {
            setLoading(false);
        });
    }, []);

    const [templateRules] = useState({
        fontSize: { min: 9, max: 13, step: 1 },
    });

    useEffect(() => {
        if (defaultStyles && signatureOption && signatureInfo)
            handlePopulate(defaultStyles);
    }, [defaultStyles, selectedTemplate]);

    // AppMenu
    const [tab, setTab] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            console.log(company);
            const eventAPI = await getEvents(company.id);
            setSignatureOption(
                {
                    ...signatureOption,
                    event: {
                        ...signatureOption?.event,
                        selected: eventAPI[0],
                        list: eventAPI,
                    },
                },
                "active"
            );
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        const handleModal = () => {
            return (
                <span>
                    <div className={classes.modal}>
                        <div className={classes.slidesContainer}>
                            <form
                                onSubmit={() => {
                                    setModal(false);
                                    handleSave(
                                        signatureName,
                                        signatureId,
                                        signatureInfo,
                                        signatureOption,
                                        selectedTemplate,
                                        notification,
                                        history
                                    );
                                }}
                                className={classes.slide}
                            >
                                <FormattedMessage
                                    id="signature.name_signature"
                                    tagName="h4"
                                />
                                <Input
                                    autoFocus
                                    style={{ width: "75%" }}
                                    placeholder={intl.formatMessage({
                                        id: "signature.title",
                                    })}
                                    type="text"
                                    defaultValue={signatureName}
                                    onChange={(e) =>
                                        setSignatureName(e.target.value)
                                    }
                                />
                                <div>
                                    <Button
                                        width="40%"
                                        color="primary"
                                        type="submit"
                                    >
                                        <FormattedMessage id="buttons.placeholder.save" />
                                    </Button>
                                    <Button
                                        onClick={() => setModal(false)}
                                        width="30%"
                                        color="secondary"
                                    >
                                        <FormattedMessage id="buttons.placeholder.cancel" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </span>
            );
        };
        setModalContent(handleModal(modal));
    }, [modal, signatureName]);

    useEffect(() => {
        showTemplates(false);
    }, [selectedTemplate]);

    const showTemplates = (isOpen) => {
        if (isOpen) {
            setTemplates(
                <TemplateSelection
                    template={selectedTemplate}
                    showFunction={showTemplates}
                    setTemplate={setSelectedTemplate}
                    signatureOption={signatureOption}
                    signatureInfo={signatureInfo}
                    company={company}
                    user={user}
                />
            );
            setTimeout(() => {
                elem.current.scrollTo({
                    top: 0,
                    left: window.innerWidth,
                    behavior: "smooth",
                });
            }, 10);
        } else {
            elem.current.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
            setTimeout(() => {
                setTemplates(false);
            }, 1000);
        }
    };

    useEffect(() => {
        if (loading)
            setPreview(
                <AiOutlineLoading3Quarters className={classes.loading} />
            );
        if (signatureInfo && signatureOption && selectedTemplate?.html) {
            setPreview(
                <Preview
                    twig={selectedTemplate?.html}
                    styles={getStyles(
                        signatureInfo,
                        signatureOption,
                        company,
                        user
                    )}
                />
            );
        }
    }, [signatureInfo, signatureOption, selectedTemplate]);

    return (
        <div className={classes.container} ref={elem}>
            {modal === true ? modalContent : ""}
            <div>
                <h1>
                    <FormattedMessage id="signature.edit" />
                    <span className={classes.primaryTxt}> {signatureName}</span>
                </h1>
                <div className={classes.row}>
                    <div className={classes.options}>
                        <div className={classes.tabsContainer}>
                            <label className={classes.switchTabs}>
                                <div className={classes.tabTitles}>
                                    <FormattedMessage
                                        id="style"
                                        tagName="span"
                                    />
                                    <FormattedMessage
                                        id="options"
                                        tagName="span"
                                    />
                                </div>
                                <input
                                    type="checkbox"
                                    onChange={() => setTab(!tab)}
                                />
                                <div className={classes.sliderTabs}></div>
                            </label>
                            <button
                                onClick={() => handlePopulate(defaultStyles)}
                            >
                                <FormattedMessage id="buttons.placeholder.reset" />
                            </button>
                        </div>
                        <div className={classes.tabContent}>
                            {tab ? (
                                <Infos
                                    content={signatureInfo}
                                    setContent={setSignatureInfo}
                                    templateRules={templateRules}
                                />
                            ) : (
                                <Options
                                    data={signatureOption}
                                    setData={setSignatureOption}
                                />
                            )}
                        </div>
                    </div>
                    <div className={classes.col}>
                        <div className={classes.signatureContainer}>
                            <div className={classes.previewContainer}>
                                <div className={classes.browserHeader}>
                                    <ul className={classes.btnsContainer}>
                                        <li className={classes.close}></li>
                                        <li className={classes.reduce}></li>
                                        <li className={classes.fullscreen}></li>
                                    </ul>
                                </div>
                                <div className={classes.lazyLoadingLong}></div>
                                <div className={classes.lazyLoadingShort}></div>
                                <div
                                    className={classes.lazyLoadingMedium}
                                ></div>
                                <br />
                                <div className={classes.signaturePreview}>
                                    {selectedTemplate && preview}
                                </div>
                            </div>
                            <div className={classes.CTAsContainer}>
                                <div>
                                    <Button
                                        color="secondary"
                                        onClick={() => history.goBack()}
                                        style={{
                                            opacity: selectedTemplate ? 1 : 0,
                                            pointerEvents: selectedTemplate
                                                ? ""
                                                : "none",
                                        }}
                                    >
                                        <FormattedMessage id="buttons.placeholder.cancel" />
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={() => setModal(true)}
                                        style={{
                                            opacity: selectedTemplate ? 1 : 0,
                                            pointerEvents: selectedTemplate
                                                ? ""
                                                : "none",
                                        }}
                                    >
                                        <FormattedMessage id="buttons.placeholder.save" />
                                    </Button>
                                </div>
                                <Button
                                    color="secondary"
                                    onClick={() => showTemplates(true)}
                                >
                                    <FormattedMessage id="buttons.placeholder.choose_template" />
                                    <BsArrowRight
                                        style={{
                                            stroke: "black",
                                            strokeWidth: "1",
                                            marginLeft: ".5rem",
                                        }}
                                        className={`${
                                            selectedTemplate
                                                ? ""
                                                : classes.blinking
                                        } ${classes.arrow}`}
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {templates}
        </div>
    );
}

export default EditSignatureComponent;
