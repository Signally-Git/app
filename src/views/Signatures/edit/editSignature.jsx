import classes from "../create/createSignature.module.css";
import { useRef, useState, useEffect, useMemo } from "react";
import Options from "../create/Options/options";
import Infos from "../create/Infos/infos";
import TemplateSelection from "../create/TemplateSelect/templateSelect";
import Preview from "../create/Preview/customizablePreview";
import { BsArrowRight } from "react-icons/bs";
import Button from "Utils/Button/btn";
import Input from "Utils/Input/input";
import { useHistory, useParams } from "react-router-dom";
import { UseEvents } from "Utils/useEvents/useEvents";
import { useNotification } from "Utils/Notifications/notifications";
import request from "Utils/Request/request";
import { TokenService } from "Utils";
import { useDefaultOptions, getStyles } from "../create/createSignature.utils";
import { FormattedMessage, useIntl } from "react-intl";
import { extractStyle, extractValue } from "./editSignature.utils";

// Component handling the modification of signature, selection of template

function EditSignatureComponent() {
    const { signatureId } = useParams();
    const user = TokenService.getUser();
    const company = TokenService.getOrganisation();
    const [loading, setLoading] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState();
    const [defaultStyles, setDefaultStyles] = useState();
    const history = useHistory();
    const notification = useNotification();
    const [preview, setPreview] = useState("");
    const intl = useIntl();

    // Used to handle transition
    const elem = useRef(null);
    const [templates, setTemplates] = useState(false);
    const [signatureInfo, setSignatureInfo] = useState();
    const [signatureOption, setSignatureOption] = useState(useDefaultOptions());
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
                ...signatureOption.event,
                display: signatureOption.event?.selected?.imageUrl,
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
                    handlePopulate(data.signatureStyles);
                    setSelectedTemplate(data.signatureTemplate);
                    setDefaultStyles(data.signatureStyles);
                    setSignatureName(data.name);
                });
        };
        setLoading(true);
        getSignatureFromId().then(() => setLoading(false));
    }, []);

    const [templateRules] = useState({
        fontSize: { min: 9, max: 13, step: 1 },
    });

    // useEffect(() => {
    //     if (defaultStyles) handlePopulate();
    // }, [defaultStyles, selectedTemplate]);

    // Menu
    const [tab, setTab] = useState(true);

    useEffect(() => {
        const getEvents = async () => {
            const eventAPI = await UseEvents(company.id);
            setSignatureOption(
                {
                    ...signatureOption,
                    event: {
                        ...signatureOption.event,
                        selected: eventAPI[0],
                        list: eventAPI,
                    },
                },
                "active"
            );
        };
        getEvents();
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
                                        selectedTemplate,
                                        company,
                                        signatureInfo,
                                        signatureOption,
                                        history,
                                        notification
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

    const handleSave = async () => {
        await request
            .patch(
                `signatures/` + signatureId,
                {
                    name: signatureName,
                    signatureTemplate: selectedTemplate["@id"],
                },
                {
                    headers: { "Content-Type": "application/merge-patch+json" },
                }
            )
            .then(async (result) => {
                notification({
                    content: (
                        <>
                            <FormattedMessage id="message.success.signature.edit_part1" />
                            <span style={{ color: "#FF7954" }}>
                                {" "}
                                {signatureName}{" "}
                            </span>
                            <FormattedMessage id="message.success.signature.edit_part2" />
                        </>
                    ),
                    status: "valid",
                });
                const styles = [
                    // COLOR FOR EACH TXT
                    {
                        property: "color",
                        value: signatureInfo.firstName.color,
                        type: "firstName",
                        signature: result.data.id,
                    },
                    {
                        property: "color",
                        value: signatureInfo.lastName.color,
                        type: "lastName",
                        signature: result.data.id,
                    },
                    {
                        property: "color",
                        value: signatureInfo.jobName.color,
                        type: "jobName",
                        signature: result.data.id,
                    },
                    {
                        property: "color",
                        value: signatureInfo.company.color,
                        type: "companyName",
                        signature: result.data.id,
                    },
                    {
                        property: "color",
                        value: signatureInfo.mobile.color,
                        type: "mobile",
                        signature: result.data.id,
                    },
                    {
                        property: "color",
                        value: signatureInfo.addressStreet.color,
                        type: "addressStreet",
                        signature: result.data.id,
                    },
                    {
                        property: "color",
                        value: signatureInfo.addressInfo.color,
                        type: "addressInfo",
                        signature: result.data.id,
                    },
                    {
                        property: "color",
                        value: signatureInfo.addressZipcode.color,
                        type: "addressZipcode",
                        signature: result.data.id,
                    },
                    {
                        property: "color",
                        value: signatureInfo.addressCity.color,
                        type: "addressCity",
                        signature: result.data.id,
                    },
                    {
                        property: "color",
                        value: signatureInfo.addressCountry.color,
                        type: "addressCountry",
                        signature: result.data.id,
                    },
                    {
                        property: "color",
                        value: signatureInfo.phone.color,
                        type: "phone",
                        signature: result.data.id,
                    },
                    // FONT WEIGHT FOR EACH TXT
                    {
                        property: "fontWeight",
                        value:
                            signatureInfo.firstName.style.fontWeight ||
                            "normal",
                        type: "firstName",
                        signature: result.data.id,
                    },
                    {
                        property: "fontWeight",
                        value:
                            signatureInfo.lastName.style.fontWeight || "normal",
                        type: "lastName",
                        signature: result.data.id,
                    },
                    {
                        property: "fontWeight",
                        value:
                            signatureInfo.jobName.style.fontWeight || "normal",
                        type: "jobName",
                        signature: result.data.id,
                    },
                    {
                        property: "fontWeight",
                        value:
                            signatureInfo.company.style.fontWeight || "normal",
                        type: "companyName",
                        signature: result.data.id,
                    },
                    {
                        property: "fontWeight",
                        value:
                            signatureInfo.mobile.style.fontWeight || "normal",
                        type: "mobile",
                        signature: result.data.id,
                    },
                    {
                        property: "fontWeight",
                        value:
                            signatureInfo.addressStreet.style.fontWeight ||
                            "normal",
                        type: "addressStreet",
                        signature: result.data.id,
                    },
                    {
                        property: "fontWeight",
                        value:
                            signatureInfo.addressInfo.style.fontWeight ||
                            "normal",
                        type: "addressInfo",
                        signature: result.data.id,
                    },
                    {
                        property: "fontWeight",
                        value:
                            signatureInfo.addressZipcode.style.fontWeight ||
                            "normal",
                        type: "addressZipcode",
                        signature: result.data.id,
                    },
                    {
                        property: "fontWeight",
                        value:
                            signatureInfo.addressCity.style.fontWeight ||
                            "normal",
                        type: "addressCity",
                        signature: result.data.id,
                    },
                    {
                        property: "fontWeight",
                        value:
                            signatureInfo.addressCountry.style.fontWeight ||
                            "normal",
                        type: "addressCountry",
                        signature: result.data.id,
                    },
                    {
                        property: "fontWeight",
                        value: signatureInfo.phone.style.fontWeight || "normal",
                        type: "phone",
                        signature: result.data.id,
                    },
                    // TEXT DECORATION FOR EACH TXT
                    {
                        property: "textDecoration",
                        value:
                            signatureInfo.firstName.style.textDecoration ||
                            "none",
                        type: "firstName",
                        signature: result.data.id,
                    },
                    {
                        property: "textDecoration",
                        value:
                            signatureInfo.lastName.style.textDecoration ||
                            "none",
                        type: "lastName",
                        signature: result.data.id,
                    },
                    {
                        property: "textDecoration",
                        value:
                            signatureInfo.jobName.style.textDecoration ||
                            "none",
                        type: "jobName",
                        signature: result.data.id,
                    },
                    {
                        property: "textDecoration",
                        value:
                            signatureInfo.company.style.textDecoration ||
                            "none",
                        type: "companyName",
                        signature: result.data.id,
                    },
                    {
                        property: "textDecoration",
                        value:
                            signatureInfo.mobile.style.textDecoration || "none",
                        type: "mobile",
                        signature: result.data.id,
                    },
                    {
                        property: "textDecoration",
                        value:
                            signatureInfo.addressStreet.style.textDecoration ||
                            "none",
                        type: "addressStreet",
                        signature: result.data.id,
                    },
                    {
                        property: "textDecoration",
                        value:
                            signatureInfo.addressInfo.style.textDecoration ||
                            "none",
                        type: "addressInfo",
                        signature: result.data.id,
                    },
                    {
                        property: "textDecoration",
                        value:
                            signatureInfo.addressZipcode.style.textDecoration ||
                            "none",
                        type: "addressZipcode",
                        signature: result.data.id,
                    },
                    {
                        property: "textDecoration",
                        value:
                            signatureInfo.addressCity.style.textDecoration ||
                            "none",
                        type: "addressCity",
                        signature: result.data.id,
                    },
                    {
                        property: "textDecoration",
                        value:
                            signatureInfo.addressCountry.style.textDecoration ||
                            "none",
                        type: "addressCountry",
                        signature: result.data.id,
                    },
                    {
                        property: "textDecoration",
                        value:
                            signatureInfo.phone.style.textDecoration || "none",
                        type: "phone",
                        signature: result.data.id,
                    },
                    // FONT STYLE FOR EACH TXT
                    {
                        property: "fontStyle",
                        value:
                            signatureInfo.firstName.style.fontStyle || "normal",
                        type: "firstName",
                        signature: result.data.id,
                    },
                    {
                        property: "fontStyle",
                        value:
                            signatureInfo.lastName.style.fontStyle || "normal",
                        type: "lastName",
                        signature: result.data.id,
                    },
                    {
                        property: "fontStyle",
                        value:
                            signatureInfo.jobName.style.fontStyle || "normal",
                        type: "jobName",
                        signature: result.data.id,
                    },
                    {
                        property: "fontStyle",
                        value: signatureInfo.company.style.fontStyle || "none",
                        type: "companyName",
                        signature: result.data.id,
                    },
                    {
                        property: "fontStyle",
                        value: signatureInfo.mobile.style.fontStyle || "normal",
                        type: "mobile",
                        signature: result.data.id,
                    },
                    {
                        property: "fontStyle",
                        value:
                            signatureInfo.addressStreet.style.fontStyle ||
                            "normal",
                        type: "addressStreet",
                        signature: result.data.id,
                    },
                    {
                        property: "fontStyle",
                        value:
                            signatureInfo.addressInfo.style.fontStyle ||
                            "normal",
                        type: "addressInfo",
                        signature: result.data.id,
                    },
                    {
                        property: "fontStyle",
                        value:
                            signatureInfo.addressZipcode.style.fontStyle ||
                            "normal",
                        type: "addressZipcode",
                        signature: result.data.id,
                    },
                    {
                        property: "fontStyle",
                        value:
                            signatureInfo.addressCity.style.fontStyle ||
                            "normal",
                        type: "addressCity",
                        signature: result.data.id,
                    },
                    {
                        property: "fontStyle",
                        value:
                            signatureInfo.addressCountry.style.fontStyle ||
                            "normal",
                        type: "addressCountry",
                        signature: result.data.id,
                    },
                    {
                        property: "fontStyle",
                        value: signatureInfo.phone.style.fontStyle || "normal",
                        type: "phone",
                        signature: result.data.id,
                    },
                    // FONT GENERAL STYLE
                    {
                        property: "fontFamily",
                        value: signatureInfo.fontFamily,
                        type: "generalFontFamily",
                        signature: result.data.id,
                    },
                    {
                        property: "fontSize",
                        value: signatureInfo.fontSize[0]?.toString(),
                        type: "generalFontSize",
                        signature: result.data.id,
                    },
                    // DIV COLOR,
                    {
                        property: "color",
                        value: signatureOption.bgColor,
                        type: "divColor",
                        signature: result.data.id,
                    },
                    // Greetings
                    {
                        property: "enabled",
                        value:
                            signatureOption.salutation.enabled?.toString() ||
                            "false",
                        type: "greetingsEnabled",
                        signature: result?.data?.id,
                    },
                    {
                        property: "value",
                        value: signatureOption.salutation.value,
                        type: "greetingsValue",
                        signature: result?.data?.id,
                    },
                    {
                        property: "padding",
                        value:
                            signatureOption.salutation.padding?.toString() ||
                            "12",
                        type: "greetingsPadding",
                        signature: result?.data?.id,
                    },
                    // vCard
                    {
                        property: "enabled",
                        value:
                            signatureOption.vcard.enabled?.toString() || false,
                        type: "vCardEnabled",
                        signature: result?.data?.id,
                    },
                    // Calendar
                    {
                        property: "enabled",
                        value:
                            signatureOption.calendar.enabled?.toString() ||
                            false,
                        type: "calendarEnabled",
                        signature: result?.data?.id,
                    },
                    // Event
                    {
                        property: "enabled",
                        value:
                            signatureOption.event.enabled?.toString() ||
                            "false",
                        type: "event",
                        signature: result.data.id,
                    },
                    {
                        property: "padding",
                        value:
                            signatureOption.event.padding?.toString() || "12",
                        type: "eventPadding",
                        signature: result.data.id,
                    },
                    // Disclaimer
                    {
                        property: "enabled",
                        value:
                            signatureOption.footer.enabled?.toString() ||
                            "false",
                        type: "disclaimerEnabled",
                        signature: result?.data?.id,
                    },
                    {
                        property: "value",
                        value: signatureOption.footer.value,
                        type: "disclaimerValue",
                        signature: result?.data?.id,
                    },
                    {
                        property: "color",
                        value: signatureOption.footer.color,
                        type: "disclaimerColor",
                        signature: result?.data?.id,
                    },
                    {
                        property: "fontSize",
                        value:
                            signatureOption.footer.fontSize?.toString() || "7",
                        type: "disclaimerFontSize",
                        signature: result?.data?.id,
                    },
                    {
                        property: "padding",
                        value:
                            signatureOption.footer.padding?.toString() || "12",
                        type: "disclaimerPadding",
                        signature: result?.data?.id,
                    },
                ];
                request.post("signature_styles/batch", styles);

                history.push("/signatures");
            })
            .catch(() => {
                notification({
                    content: <FormattedMessage id="message.error.generic" />,
                    status: "invalid",
                });
            });
    };

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

    useMemo(() => {
        if (loading) setPreview(<h3>Loading</h3>);
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
