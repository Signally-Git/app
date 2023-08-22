import { request } from "../../../utils";
import { FormattedMessage } from "react-intl";
import classes from "../signatures.module.scss";

export function extractValue(items, type, property) {
    return items?.filter(
        (style) => style.type === type && style.property === property
    )[0]?.value;
}

const extractStyle = (items, type) => {
    if (!items) return;
    return {
        fontWeight: items.filter(
            (style) => style.type === type && style.property === "fontWeight"
        )[0]?.value,
        fontStyle: items.filter(
            (style) => style.type === type && style.property === "fontStyle"
        )[0]?.value,
        textDecoration: items.filter(
            (style) =>
                style.type === type && style.property === "textDecoration"
        )[0]?.value,
    };
};

const handleSave = async (
    signatureName,
    signatureId,
    signatureInfo,
    signatureOption,
    selectedTemplate,
    notification,
    history
) => {
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
                        <span className={classes.primaryColor}>
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
                    value: signatureInfo.firstName.style.fontWeight || "normal",
                    type: "firstName",
                    signature: result.data.id,
                },
                {
                    property: "fontWeight",
                    value: signatureInfo.lastName.style.fontWeight || "normal",
                    type: "lastName",
                    signature: result.data.id,
                },
                {
                    property: "fontWeight",
                    value: signatureInfo.jobName.style.fontWeight || "normal",
                    type: "jobName",
                    signature: result.data.id,
                },
                {
                    property: "fontWeight",
                    value: signatureInfo.company.style.fontWeight || "normal",
                    type: "companyName",
                    signature: result.data.id,
                },
                {
                    property: "fontWeight",
                    value: signatureInfo.mobile.style.fontWeight || "normal",
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
                        signatureInfo.addressInfo.style.fontWeight || "normal",
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
                        signatureInfo.addressCity.style.fontWeight || "normal",
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
                        signatureInfo.firstName.style.textDecoration || "none",
                    type: "firstName",
                    signature: result.data.id,
                },
                {
                    property: "textDecoration",
                    value:
                        signatureInfo.lastName.style.textDecoration || "none",
                    type: "lastName",
                    signature: result.data.id,
                },
                {
                    property: "textDecoration",
                    value: signatureInfo.jobName.style.textDecoration || "none",
                    type: "jobName",
                    signature: result.data.id,
                },
                {
                    property: "textDecoration",
                    value: signatureInfo.company.style.textDecoration || "none",
                    type: "companyName",
                    signature: result.data.id,
                },
                {
                    property: "textDecoration",
                    value: signatureInfo.mobile.style.textDecoration || "none",
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
                    value: signatureInfo.phone.style.textDecoration || "none",
                    type: "phone",
                    signature: result.data.id,
                },
                // FONT STYLE FOR EACH TXT
                {
                    property: "fontStyle",
                    value: signatureInfo.firstName.style.fontStyle || "normal",
                    type: "firstName",
                    signature: result.data.id,
                },
                {
                    property: "fontStyle",
                    value: signatureInfo.lastName.style.fontStyle || "normal",
                    type: "lastName",
                    signature: result.data.id,
                },
                {
                    property: "fontStyle",
                    value: signatureInfo.jobName.style.fontStyle || "normal",
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
                        signatureInfo.addressStreet.style.fontStyle || "normal",
                    type: "addressStreet",
                    signature: result.data.id,
                },
                {
                    property: "fontStyle",
                    value:
                        signatureInfo.addressInfo.style.fontStyle || "normal",
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
                        signatureInfo.addressCity.style.fontStyle || "normal",
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
                        signatureOption.salutation.padding?.toString() || "12",
                    type: "greetingsPadding",
                    signature: result?.data?.id,
                },
                {
                    property: "fontSize",
                    value:
                        signatureOption.salutation.fontSize?.toString() || "12",
                    type: "greetingsFontSize",
                    signature: result?.data?.id,
                },
                {
                    property: "color",
                    value:
                        signatureOption.salutation.color?.toString() || "12",
                    type: "greetingsColor",
                    signature: result?.data?.id,
                },
                // vCard
                {
                    property: "enabled",
                    value: signatureOption.vcard.enabled?.toString() || false,
                    type: "vCardEnabled",
                    signature: result?.data?.id,
                },
                // Calendar
                {
                    property: "enabled",
                    value:
                        signatureOption.calendar.enabled?.toString() || false,
                    type: "calendarEnabled",
                    signature: result?.data?.id,
                },
                // Event
                {
                    property: "enabled",
                    value: signatureOption.event.enabled?.toString() || "false",
                    type: "event",
                    signature: result.data.id,
                },
                {
                    property: "padding",
                    value: signatureOption.event.padding?.toString() || "12",
                    type: "eventPadding",
                    signature: result.data.id,
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
                    property: "padding",
                    value: signatureOption.footer.padding?.toString() || "12",
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

export { extractStyle, handleSave };
