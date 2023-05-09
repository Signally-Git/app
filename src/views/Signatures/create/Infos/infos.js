import React, { useState } from "react";
import Input from "./Input";
import classes from "./infos.module.css";
import { Range } from "react-range";
import { FiChevronDown } from "react-icons/fi";
import CustomSelect from "Utils/CustomSelect/customselect";
import { TokenService } from "Utils";
import { FormattedMessage, useIntl } from "react-intl";

// Informations tab, allows to change texts to preview long or short ones
// Styles every text with color & decoration, and family + size for the whole template
// Change group's logo

export default function Infos(props) {
    // Template banner
    const [profile, setProfile] = useState(true);
    const [organisation, setOrganisation] = useState(false);
    const user = TokenService.getUser();
    const intl = useIntl();
    const organisationInfos = useState({});

    // Template informations
    const inputs = [
        {
            placeholder:
                user.firstName || intl.formatMessage({ id: "firstname" }),
            type: "text",
            toChange: "firstName",
            value: props.content.firstName,
            disabled: true,
        },
        {
            placeholder:
                user.lastName || intl.formatMessage({ id: "lastname" }),
            type: "text",
            toChange: "lastName",
            value: props.content.lastName,
            disabled: true,
        },
        {
            placeholder:
                user.position || intl.formatMessage({ id: "position" }),
            type: "text",
            toChange: "jobName",
            value: props.content.jobName,
            disabled: true,
        },
        {
            placeholder: user.phone || intl.formatMessage({ id: "mobile" }),
            type: "tel",
            toChange: "mobile",
            value: props.content.mobile,
            disabled: true,
        },
    ];

    const companyInputs = [
        {
            placeholder:
                organisationInfos.name || intl.formatMessage({ id: "company" }),
            type: "text",
            toChange: "company",
            value: props.content.company,
            disabled: true,
        },
        {
            placeholder:
                organisationInfos.address?.street ||
                intl.formatMessage({ id: "address" }),
            type: "text",
            toChange: "addressStreet",
            value: props.content.addressStreet,
            disabled: true,
        },
        {
            placeholder:
                organisationInfos.address?.zipCode ||
                intl.formatMessage({ id: "zipcode" }),
            type: "text",
            toChange: "addressZipcode",
            value: props.content.addressZipcode,
            disabled: true,
        },
        {
            placeholder:
                organisationInfos.address?.city ||
                intl.formatMessage({ id: "city" }),
            type: "text",
            toChange: "addressCity",
            value: props.content.addressCity,
            disabled: true,
        },
        {
            placeholder:
                organisationInfos.address?.country ||
                intl.formatMessage({ id: "country" }),
            type: "text",
            toChange: "addressCountry",
            value: props.content.addressCountry,
            disabled: true,
        },
        {
            placeholder:
                organisationInfos.digitalAddress?.phone ||
                intl.formatMessage({ id: "phone" }),
            type: "tel",
            toChange: "phone",
            value: props.content.phone,
            disabled: true,
        },
    ];

    // Styling the whole template's font
    // Listing websafe fonts to select font-family
    const webSafeFontList = [
        { name: "Arial", style: { fontFamily: "Arial" } },
        { name: "Arial Black", style: { fontFamily: "Arial Black" } },
        { name: "Calibri", style: { fontFamily: "Calibri" } },
        { name: "Comic Sans MS", style: { fontFamily: "Comic Sans MS" } },
        { name: "Courier New", style: { fontFamily: "Courier New" } },
        { name: "Georgia", style: { fontFamily: "Georgia" } },
        { name: "Helvetica", style: { fontFamily: "Helvetica" } },
        { name: "Impact", style: { fontFamily: "Impact" } },
        { name: "Lucida Console", style: { fontFamily: "Lucida Console" } },
        {
            name: "Lucida sans Unicode",
            style: { fontFamily: "Lucida sans Unicode" },
        },
        {
            name: "Palatino Linotype",
            style: { fontFamily: "Palatino Linotype" },
        },
        { name: "Tahoma", style: { fontFamily: "Tahoma" } },
        { name: "Times New Roman", style: { fontFamily: "Times New Roman" } },
        { name: "Trebuchet MS", style: { fontFamily: "Trebuchet MS" } },
        { name: "Verdana", style: { fontFamily: "Verdana" } },
    ];
    // Handling font-family selection
    const [selectedFont, setSelectedFont] = useState("Arial");
    const [showFonts, setShowFonts] = useState(false);

    const handleFont = (event) => {
        setSelectedFont(event);
        props.setContent({ ...props.content, fontFamily: event });
        setShowFonts(false);
    };
    // Choosing font-size
    const handleRange = (range) => {
        props.setContent({ ...props.content, fontSize: range });
    };

    return (
        <>
            <div className={classes.infosContainer}>
                <div className={classes.inputsContainer}>
                    <div
                        className={`${classes.expandTitle} ${
                            !profile ? classes.closed : ""
                        }`}
                    >
                        <h4
                            onClick={() => {
                                profile === false && setOrganisation(profile);
                                setProfile(!profile);
                            }}
                        >
                            <FormattedMessage id="profile.informations.title" />
                        </h4>
                        <FiChevronDown onClick={() => setProfile(!profile)} />
                    </div>
                    {profile ? (
                        <div className={classes.inputsFlex}>
                            {inputs.map((input) => {
                                return (
                                    <div
                                        className={classes.inputContainer}
                                        key={input.placeholder}
                                    >
                                        <Input
                                            value={input.value.value}
                                            type={input.type}
                                            placeholder={`${input?.placeholder?.substring(
                                                0,
                                                10
                                            )}${
                                                input?.placeholder?.length > 10
                                                    ? "..."
                                                    : ""
                                            }`}
                                            disabled={input.disabled}
                                            defaultColor={input.value.color}
                                            defaultStyle={input.value.style}
                                            toChange={input.toChange}
                                            content={props.content}
                                            setContent={props.setContent}
                                            title={input.placeholder}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className={classes.inputsContainer}>
                    <div
                        className={`${classes.expandTitle} ${
                            !organisation ? classes.closed : ""
                        }`}
                    >
                        <h4
                            onClick={() => {
                                organisation === false &&
                                    setProfile(organisation);
                                setOrganisation(!organisation);
                            }}
                        >
                            <FormattedMessage id="company_informations_title" />
                        </h4>
                        <FiChevronDown
                            onClick={() => setOrganisation(!organisation)}
                        />
                    </div>
                    {organisation ? (
                        <div className={classes.inputsFlex}>
                            {companyInputs.map((input) => {
                                return (
                                    <div
                                        className={classes.inputContainer}
                                        key={input.placeholder}
                                    >
                                        <Input
                                            value={input.value.value}
                                            type={input.type}
                                            placeholder={`${input.placeholder.substring(
                                                0,
                                                10
                                            )}${
                                                input.placeholder.length > 10
                                                    ? "..."
                                                    : ""
                                            }`}
                                            disabled={input.disabled}
                                            defaultColor={input.value.color}
                                            defaultStyle={input.value.style}
                                            toChange={input.toChange}
                                            content={props.content}
                                            setContent={props.setContent}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className={classes.inputContainer}>
                    <FormattedMessage id="style_size_text" tagName="h4" />
                </div>
                <div className={classes.styleContainer}>
                    <div className={classes.row}>
                        <CustomSelect
                            styleList={{ height: "10rem" }}
                            onChange={(e) => handleFont(e)}
                            items={webSafeFontList}
                            getValue={"name"}
                            display={"name"}
                        />
                        <div className={classes.selectSize}>
                            <div className={classes.row}>
                                <div>
                                    <span className={classes.fontSize}>
                                        {props.content.fontSize} px
                                    </span>
                                    <Range
                                        step={props.templateRules.fontSize.step}
                                        min={props.templateRules.fontSize.min}
                                        max={props.templateRules.fontSize.max}
                                        values={props.content.fontSize}
                                        onChange={(range) => handleRange(range)}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: "6px",
                                                    width: "100%",
                                                    backgroundColor: "#F1ECEA",
                                                    margin: "0",
                                                    borderRadius: "50px",
                                                }}
                                            >
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    transition: "0.2s",
                                                    height: "25px",
                                                    width: "25px",
                                                    backgroundColor: "#FF7954",
                                                    border: "3px solid #FFF",
                                                    borderRadius: "50%",
                                                    outline: "none",
                                                    boxShadow:
                                                        "1px 1px 3px #FF795488",
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}