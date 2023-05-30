import request from "Utils/Request/request";
import { FormattedMessage } from "react-intl";
import classes from "./createSignature.module.css";

async function getPreview(twig, styles) {
    return await request
        .post("signature_compile", { twig, styles })
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
}

function defaultValues(company, user) {
    return {
        logo: company?.logo,
        firstName: {
            value: user?.first_name,
            color: "#000",
            style: { fontWeight: "bold" },
        },
        lastName: {
            value: user?.last_name,
            color: "#000",
            style: { fontWeight: "bold" },
        },
        jobName: { value: user?.position, color: "#000", style: {} },
        company: {
            value: company?.name,
            color: "#000",
            style: { fontWeight: "bold" },
        },
        addressStreet: {
            value: company?.address?.street,
            color: "#000",
            style: {},
        },
        addressInfo: {
            value: company?.address?.streetInfo,
            color: "#000",
            style: {},
        },
        addressZipcode: {
            value: company?.address?.zipCode,
            color: "#000",
            style: {},
        },
        addressCity: {
            value: company?.address?.city,
            color: "#000",
            style: {},
        },
        addressCountry: {
            value: company?.address?.country,
            color: "#000",
            style: {},
        },
        mobile: { value: user?.phone_number, color: "#000", style: {} },
        phone: {
            value: company?.digitalAddress?.phone,
            color: "#000",
            style: {},
        },
        fontSize: [11],
        fontFamily: "Helvetica",
    };
}

function defaultOptions() {
    return {
        salutation: {
            value: <FormattedMessage id="signature.default_greetings" />,
            enabled: false,
            padding: 10,
        },
        custom: { enabled: false },
        eco: { value: "Ecoresponsability", enabled: false },
        followUs: { value: "Follow us", enabled: false, disabled: true },
        bgColor: "#ff7954",
        bannerTop: { url: "test", enabled: false, padding: 10 },
        event: { list: [], selected: [], enabled: false, padding: 12 },
        vcard: { enabled: false },
        calendar: { enabled: false },
        socials: {
            enabled: true,
            bgColor: "#000",
            fill: "#FFF",
            items: [
                "facebook",
                "linkedin",
                "twitter",
                "instagram",
                "snapchat",
                "pinterest",
            ],
        },
        footer: {
            maxWidth: 380,
            value: `Disclaimer`,
            enabled: false,
            padding: 10,
            color: "#000",
            fontSize: 7,
        },
    };
}

const getStyles = (signatureInfo, signatureOption, company, user) => {
    if (!signatureInfo) signatureInfo = defaultValues(company, user);
    return [
        // COLOR FOR EACH TXT
        {
            property: "color",
            value: signatureInfo.firstName.color,
            type: "firstName",
        },
        {
            property: "color",
            value: signatureInfo.lastName.color,
            type: "lastName",
        },
        {
            property: "color",
            value: signatureInfo.jobName.color,
            type: "jobName",
        },
        {
            property: "color",
            value: signatureInfo.company.color,
            type: "companyName",
        },
        {
            property: "color",
            value: signatureInfo.mobile.color,
            type: "mobile",
        },
        {
            property: "color",
            value: signatureInfo.addressStreet.color,
            type: "addressStreet",
        },
        {
            property: "color",
            value: signatureInfo.addressInfo.color,
            type: "addressInfo",
        },
        {
            property: "color",
            value: signatureInfo.addressZipcode.color,
            type: "addressZipcode",
        },
        {
            property: "color",
            value: signatureInfo.addressCity.color,
            type: "addressCity",
        },
        {
            property: "color",
            value: signatureInfo.addressCountry.color,
            type: "addressCountry",
        },
        {
            property: "color",
            value: signatureInfo.phone.color,
            type: "phone",
        },
        // FONT WEIGHT FOR EACH TXT
        {
            property: "fontWeight",
            value: signatureInfo.firstName.style.fontWeight || "normal",
            type: "firstName",
        },
        {
            property: "fontWeight",
            value: signatureInfo.lastName.style.fontWeight || "normal",
            type: "lastName",
        },
        {
            property: "fontWeight",
            value: signatureInfo.jobName.style.fontWeight || "normal",
            type: "jobName",
        },
        {
            property: "fontWeight",
            value: signatureInfo.company.style.fontWeight || "normal",
            type: "companyName",
        },
        {
            property: "fontWeight",
            value: signatureInfo.mobile.style.fontWeight || "normal",
            type: "mobile",
        },
        {
            property: "fontWeight",
            value: signatureInfo.addressStreet.style.fontWeight || "normal",
            type: "addressStreet",
        },
        {
            property: "fontWeight",
            value: signatureInfo.addressInfo.style.fontWeight || "normal",
            type: "addressInfo",
        },
        {
            property: "fontWeight",
            value: signatureInfo.addressZipcode.style.fontWeight || "normal",
            type: "addressZipcode",
        },
        {
            property: "fontWeight",
            value: signatureInfo.addressCity.style.fontWeight || "normal",
            type: "addressCity",
        },
        {
            property: "fontWeight",
            value: signatureInfo.addressCountry.style.fontWeight || "normal",
            type: "addressCountry",
        },
        {
            property: "fontWeight",
            value: signatureInfo.phone.style.fontWeight || "normal",
            type: "phone",
        },
        // TEXT DECORATION FOR EACH TXT
        {
            property: "textDecoration",
            value: signatureInfo.firstName.style.textDecoration || "none",
            type: "firstName",
        },
        {
            property: "textDecoration",
            value: signatureInfo.lastName.style.textDecoration || "none",
            type: "lastName",
        },
        {
            property: "textDecoration",
            value: signatureInfo.jobName.style.textDecoration || "none",
            type: "jobName",
        },
        {
            property: "textDecoration",
            value: signatureInfo.company.style.textDecoration || "none",
            type: "companyName",
        },
        {
            property: "textDecoration",
            value: signatureInfo.mobile.style.textDecoration || "none",
            type: "mobile",
        },
        {
            property: "textDecoration",
            value: signatureInfo.addressStreet.style.textDecoration || "none",
            type: "addressStreet",
        },
        {
            property: "textDecoration",
            value: signatureInfo.addressInfo.style.textDecoration || "none",
            type: "addressInfo",
        },
        {
            property: "textDecoration",
            value: signatureInfo.addressZipcode.style.textDecoration || "none",
            type: "addressZipcode",
        },
        {
            property: "textDecoration",
            value: signatureInfo.addressCity.style.textDecoration || "none",
            type: "addressCity",
        },
        {
            property: "textDecoration",
            value: signatureInfo.addressCountry.style.textDecoration || "none",
            type: "addressCountry",
        },
        {
            property: "textDecoration",
            value: signatureInfo.phone.style.textDecoration || "none",
            type: "phone",
        },
        // FONT STYLE FOR EACH TXT
        {
            property: "fontStyle",
            value: signatureInfo.firstName.style.fontStyle || "normal",
            type: "firstName",
        },
        {
            property: "fontStyle",
            value: signatureInfo.lastName.style.fontStyle || "normal",
            type: "lastName",
        },
        {
            property: "fontStyle",
            value: signatureInfo.jobName.style.fontStyle || "normal",
            type: "jobName",
        },
        {
            property: "fontStyle",
            value: signatureInfo.company.style.fontStyle || "none",
            type: "companyName",
        },
        {
            property: "fontStyle",
            value: signatureInfo.mobile.style.fontStyle || "normal",
            type: "mobile",
        },
        {
            property: "fontStyle",
            value: signatureInfo.addressStreet.style.fontStyle || "normal",
            type: "addressStreet",
        },
        {
            property: "fontStyle",
            value: signatureInfo.addressInfo.style.fontStyle || "normal",
            type: "addressInfo",
        },
        {
            property: "fontStyle",
            value: signatureInfo.addressZipcode.style.fontStyle || "normal",
            type: "addressZipcode",
        },
        {
            property: "fontStyle",
            value: signatureInfo.addressCity.style.fontStyle || "normal",
            type: "addressCity",
        },
        {
            property: "fontStyle",
            value: signatureInfo.addressCountry.style.fontStyle || "normal",
            type: "addressCountry",
        },
        {
            property: "fontStyle",
            value: signatureInfo.phone.style.fontStyle || "normal",
            type: "phone",
        },
        // FONT GENERAL STYLE
        {
            property: "fontFamily",
            value: signatureInfo.fontFamily,
            type: "generalFontFamily",
        },
        {
            property: "fontSize",
            value: signatureInfo.fontSize[0]?.toString(),
            type: "generalFontSize",
        },
        // DIV COLOR,
        {
            property: "color",
            value: signatureOption.bgColor,
            type: "divColor",
        },
        // Greetings
        {
            property: "enabled",
            value: signatureOption.salutation.enabled?.toString() || "false",
            type: "greetingsEnabled",
        },
        {
            property: "value",
            value: signatureOption.salutation.value,
            type: "greetingsValue",
        },
        {
            property: "padding",
            value: signatureOption.salutation.padding?.toString() || "12",
            type: "greetingsPadding",
        },
        // Event
        {
            property: "enabled",
            value: signatureOption.event.enabled?.toString() || "false",
            type: "event",
        },
        {
            property: "padding",
            value: signatureOption.event.padding?.toString() || "12",
            type: "eventPadding",
        },
        // Disclaimer
        {
            property: "enabled",
            value: signatureOption.footer.enabled?.toString() || "false",
            type: "disclaimerEnabled",
        },
        {
            property: "value",
            value: signatureOption.footer.value,
            type: "disclaimerValue",
        },
        {
            property: "padding",
            value: signatureOption.footer.padding?.toString() || "12",
            type: "disclaimerPadding",
        },
        {
            property: "color",
            value: signatureOption.footer.color,
            type: "disclaimerColor",
        },
        {
            property: "fontSize",
            value: signatureOption.footer.fontSize?.toString() || "7",
            type: "disclaimerFontSize",
        },
        {
            property: "enabled",
            value: signatureOption.vcard.enabled?.toString() || false,
            type: "vCardEnabled",
        },
        {
            property: "enabled",
            value: signatureOption.calendar.enabled?.toString() || false,
            type: "calendarEnabled",
        },
    ];
};
const handleSave = async (
    signatureName,
    selectedTemplate,
    company,
    signatureInfo,
    signatureOption,
    history,
    notification
) => {
    await request
        .post(`signatures`, {
            name: signatureName,
            html: selectedTemplate.html,
            signatureTemplate: selectedTemplate["@id"],
            organisation: company["@id"],
        })
        .then(async (result) => {
            notification({
                content: (
                    <>
                        Votre signature{" "}
                        <span className={classes.primaryColor}>
                            {signatureName}
                        </span>{" "}
                        a été créée avec succès
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
                    signature: result?.data?.id,
                },
                {
                    property: "color",
                    value: signatureInfo.lastName.color,
                    type: "lastName",
                    signature: result?.data?.id,
                },
                {
                    property: "color",
                    value: signatureInfo.jobName.color,
                    type: "jobName",
                    signature: result?.data?.id,
                },
                {
                    property: "color",
                    value: signatureInfo.company.color,
                    type: "companyName",
                    signature: result?.data?.id,
                },
                {
                    property: "color",
                    value: signatureInfo.mobile.color,
                    type: "mobile",
                    signature: result?.data?.id,
                },
                {
                    property: "color",
                    value: signatureInfo.addressStreet.color,
                    type: "addressStreet",
                    signature: result?.data?.id,
                },
                {
                    property: "color",
                    value: signatureInfo.addressInfo.color,
                    type: "addressInfo",
                    signature: result?.data?.id,
                },
                {
                    property: "color",
                    value: signatureInfo.addressZipcode.color,
                    type: "addressZipcode",
                    signature: result?.data?.id,
                },
                {
                    property: "color",
                    value: signatureInfo.addressCity.color,
                    type: "addressCity",
                    signature: result?.data?.id,
                },
                {
                    property: "color",
                    value: signatureInfo.addressCountry.color,
                    type: "addressCountry",
                    signature: result?.data?.id,
                },
                {
                    property: "color",
                    value: signatureInfo.phone.color,
                    type: "phone",
                    signature: result?.data?.id,
                },
                // FONT WEIGHT FOR EACH TXT
                {
                    property: "fontWeight",
                    value: signatureInfo.firstName.style.fontWeight || "normal",
                    type: "firstName",
                    signature: result?.data?.id,
                },
                {
                    property: "fontWeight",
                    value: signatureInfo.lastName.style.fontWeight || "normal",
                    type: "lastName",
                    signature: result?.data?.id,
                },
                {
                    property: "fontWeight",
                    value: signatureInfo.jobName.style.fontWeight || "normal",
                    type: "jobName",
                    signature: result?.data?.id,
                },
                {
                    property: "fontWeight",
                    value: signatureInfo.company.style.fontWeight || "normal",
                    type: "companyName",
                    signature: result?.data?.id,
                },
                {
                    property: "fontWeight",
                    value: signatureInfo.mobile.style.fontWeight || "normal",
                    type: "mobile",
                    signature: result?.data?.id,
                },
                {
                    property: "fontWeight",
                    value:
                        signatureInfo.addressStreet.style.fontWeight ||
                        "normal",
                    type: "addressStreet",
                    signature: result?.data?.id,
                },
                {
                    property: "fontWeight",
                    value:
                        signatureInfo.addressInfo.style.fontWeight || "normal",
                    type: "addressInfo",
                    signature: result?.data?.id,
                },
                {
                    property: "fontWeight",
                    value:
                        signatureInfo.addressZipcode.style.fontWeight ||
                        "normal",
                    type: "addressZipcode",
                    signature: result?.data?.id,
                },
                {
                    property: "fontWeight",
                    value:
                        signatureInfo.addressCity.style.fontWeight || "normal",
                    type: "addressCity",
                    signature: result?.data?.id,
                },
                {
                    property: "fontWeight",
                    value:
                        signatureInfo.addressCountry.style.fontWeight ||
                        "normal",
                    type: "addressCountry",
                    signature: result?.data?.id,
                },
                {
                    property: "fontWeight",
                    value: signatureInfo.phone.style.fontWeight || "normal",
                    type: "phone",
                    signature: result?.data?.id,
                },
                // TEXT DECORATION FOR EACH TXT
                {
                    property: "textDecoration",
                    value:
                        signatureInfo.firstName.style.textDecoration || "none",
                    type: "firstName",
                    signature: result?.data?.id,
                },
                {
                    property: "textDecoration",
                    value:
                        signatureInfo.lastName.style.textDecoration || "none",
                    type: "lastName",
                    signature: result?.data?.id,
                },
                {
                    property: "textDecoration",
                    value: signatureInfo.jobName.style.textDecoration || "none",
                    type: "jobName",
                    signature: result?.data?.id,
                },
                {
                    property: "textDecoration",
                    value: signatureInfo.company.style.textDecoration || "none",
                    type: "companyName",
                    signature: result?.data?.id,
                },
                {
                    property: "textDecoration",
                    value: signatureInfo.mobile.style.textDecoration || "none",
                    type: "mobile",
                    signature: result?.data?.id,
                },
                {
                    property: "textDecoration",
                    value:
                        signatureInfo.addressStreet.style.textDecoration ||
                        "none",
                    type: "addressStreet",
                    signature: result?.data?.id,
                },
                {
                    property: "textDecoration",
                    value:
                        signatureInfo.addressInfo.style.textDecoration ||
                        "none",
                    type: "addressInfo",
                    signature: result?.data?.id,
                },
                {
                    property: "textDecoration",
                    value:
                        signatureInfo.addressZipcode.style.textDecoration ||
                        "none",
                    type: "addressZipcode",
                    signature: result?.data?.id,
                },
                {
                    property: "textDecoration",
                    value:
                        signatureInfo.addressCity.style.textDecoration ||
                        "none",
                    type: "addressCity",
                    signature: result?.data?.id,
                },
                {
                    property: "textDecoration",
                    value:
                        signatureInfo.addressCountry.style.textDecoration ||
                        "none",
                    type: "addressCountry",
                    signature: result?.data?.id,
                },
                {
                    property: "textDecoration",
                    value: signatureInfo.phone.style.textDecoration || "none",
                    type: "phone",
                    signature: result?.data?.id,
                },
                // FONT STYLE FOR EACH TXT
                {
                    property: "fontStyle",
                    value: signatureInfo.firstName.style.fontStyle || "normal",
                    type: "firstName",
                    signature: result?.data?.id,
                },
                {
                    property: "fontStyle",
                    value: signatureInfo.lastName.style.fontStyle || "normal",
                    type: "lastName",
                    signature: result?.data?.id,
                },
                {
                    property: "fontStyle",
                    value: signatureInfo.jobName.style.fontStyle || "normal",
                    type: "jobName",
                    signature: result?.data?.id,
                },
                {
                    property: "fontStyle",
                    value: signatureInfo.company.style.fontStyle || "none",
                    type: "companyName",
                    signature: result?.data?.id,
                },
                {
                    property: "fontStyle",
                    value: signatureInfo.mobile.style.fontStyle || "normal",
                    type: "mobile",
                    signature: result?.data?.id,
                },
                {
                    property: "fontStyle",
                    value:
                        signatureInfo.addressStreet.style.fontStyle || "normal",
                    type: "addressStreet",
                    signature: result?.data?.id,
                },
                {
                    property: "fontStyle",
                    value:
                        signatureInfo.addressInfo.style.fontStyle || "normal",
                    type: "addressInfo",
                    signature: result?.data?.id,
                },
                {
                    property: "fontStyle",
                    value:
                        signatureInfo.addressZipcode.style.fontStyle ||
                        "normal",
                    type: "addressZipcode",
                    signature: result?.data?.id,
                },
                {
                    property: "fontStyle",
                    value:
                        signatureInfo.addressCity.style.fontStyle || "normal",
                    type: "addressCity",
                    signature: result?.data?.id,
                },
                {
                    property: "fontStyle",
                    value:
                        signatureInfo.addressCountry.style.fontStyle ||
                        "normal",
                    type: "addressCountry",
                    signature: result?.data?.id,
                },
                {
                    property: "fontStyle",
                    value: signatureInfo.phone.style.fontStyle || "normal",
                    type: "phone",
                    signature: result?.data?.id,
                },
                // FONT GENERAL STYLE
                {
                    property: "fontFamily",
                    value: signatureInfo.fontFamily,
                    type: "generalFontFamily",
                    signature: result?.data?.id,
                },
                {
                    property: "fontSize",
                    value: signatureInfo.fontSize[0]?.toString(),
                    type: "generalFontSize",
                    signature: result?.data?.id,
                },
                // DIV COLOR,
                {
                    property: "color",
                    value: signatureOption.bgColor,
                    type: "divColor",
                    signature: result?.data?.id,
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
                        signatureOption.salutation.padding?.toString() || "12",
                    type: "greetingsPadding",
                    signature: result?.data?.id,
                },
                // Event
                {
                    property: "enabled",
                    value: signatureOption.event.enabled?.toString() || "false",
                    type: "event",
                    signature: result?.data?.id,
                },
                {
                    property: "padding",
                    value: signatureOption.event.padding?.toString() || "12",
                    type: "eventPadding",
                    signature: result?.data?.id,
                },
                // Disclaimer
                {
                    property: "enabled",
                    value:
                        signatureOption.footer.enabled?.toString() || "false",
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
                    property: "padding",
                    value: signatureOption.footer.padding?.toString() || "12",
                    type: "disclaimerPadding",
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
                    value: signatureOption.footer.fontSize?.toString() || "7",
                    type: "disclaimerFontSize",
                    signature: result?.data?.id,
                },
                {
                    property: "enabled",
                    value: signatureOption.vcard.enabled?.toString() || false,
                    type: "vCardEnabled",
                    signature: result?.data?.id,
                },
                {
                    property: "enabled",
                    value:
                        signatureOption.calendar.enabled?.toString() || false,
                    type: "calendarEnabled",
                    signature: result?.data?.id,
                },
            ];

            request.post("signature_styles/batch", styles).then(() => {
                if (window.location.hash === "#onboarding") history.goBack();
                else history.push("/signatures");
            });
        })
        .catch((err) => {
            console.log(err);
            notification({
                content: <>Une erreur s'est produite. Veuillez réessayer</>,
                status: "invalid",
            });
        });
};

export { getPreview, defaultValues, getStyles, defaultOptions, handleSave };
