import classes from "./createSignature.module.css";
import { useRef, useState, useEffect } from "react";
import Options from "./Options/options";
import Infos from "./Infos/infos";
import TemplateSelection from "./TemplateSelect/templateSelect";
import Preview from "./Preview/creationCompile";
import { BsArrowRight } from "react-icons/bs";
import { Button } from "components";
import { Input } from "components";
import { useHistory } from "react-router";
import { TokenService, getEvents, useNotification } from "utils";
import {
    useDefaultOptions,
    defaultValues,
    getStyles,
    handleSave,
} from "./createSignature.utils";
import { FormattedMessage, useIntl } from "react-intl";
import Eye from "../../../components/EyeDropper/EyeDropper";

// Component handling the creation of signature, selection of template
function CreateSignatureComponent() {
    const [loading, setLoading] = useState(true);
    const defaultOptions = useDefaultOptions();
    const intl = useIntl();
    const user = TokenService.getUser();
    const company = TokenService.getOrganisation();
    const [selectedTemplate, setSelectedTemplate] = useState();
    const history = useHistory();
    const notification = useNotification();
    const [preview, setPreview] = useState("");

    const [templateRules] = useState({
        fontSize: { min: 9, max: 13, step: 1 },
    });

    const [signatureInfo, setSignatureInfo] = useState(
        defaultValues(company, user)
    );
    const [signatureOption, setSignatureOption] = useState(defaultOptions);

    const handlePopulate = () => {
        setSignatureInfo(defaultValues(company, user));
        setSignatureOption(defaultOptions);
    };

    useEffect(() => {
        const getUser = async () => {
            setSignatureInfo(defaultValues(company, user));
        };

        getUser();
    }, []);

    // AppMenu
    const [tab, setTab] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
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
    }, [signatureOption?.event.enabled]);

    // Used to handle transition
    const elem = useRef(null);
    const showTemplates = (isOpen, behavior) => {
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
                    behavior: behavior,
                });
            }, 10);
        } else {
            elem.current.scrollTo({
                top: 0,
                left: 0,
                behavior: behavior,
            });
            setTimeout(() => {
                setTemplates(false);
            }, 1000);
        }
    };

    useEffect(() => {
        if (selectedTemplate) showTemplates(false, "smooth");
    }, [selectedTemplate]);

    const [templates, setTemplates] = useState();

    useEffect(() => {
        showTemplates(true, "auto");
        setLoading(false);
    }, []);

    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [signatureName, setSignatureName] = useState("Signally");

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
        if (signatureInfo && signatureOption && selectedTemplate)
            setPreview(
                <Preview
                    id={selectedTemplate?.id}
                    styles={getStyles(
                        signatureInfo,
                        signatureOption,
                        company,
                        user
                    )}
                />
            );
    }, [signatureInfo, signatureOption, selectedTemplate]);

    if (loading) return <></>;
    return (
        <div className={classes.container} ref={elem}>
            {modal === true ? modalContent : ""}
            <div>
                <FormattedMessage id="signature.create" tagName="h1" />
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
                            <button onClick={() => handlePopulate()}>
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
                                    <Eye />
                                    {selectedTemplate && preview}
                                </div>
                            </div>
                            <div className={classes.CTAsContainer}>
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
                                <Button
                                    color="secondary"
                                    onClick={() =>
                                        showTemplates(true, "smooth")
                                    }
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

export default CreateSignatureComponent;
