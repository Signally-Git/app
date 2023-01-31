import parse from "html-react-parser";

export default function ReadOnlyPreview({ template, infos }) {
    const mapObj = {
        PLACEHOLDER_COMPANY_ICON: infos?.logo ? (
            <img src="" />
        ) : (
            "https://via.placeholder.com/108"
        ),
        PLACEHOLDER_FIRST_NAME: infos?.firstName || "Prénom",
        PLACEHOLDER_LAST_NAME: infos?.lastName || "Nom",
        PLACEHOLDER_POSITION: infos?.jobName || "Poste",
        PLACEHOLDER_EMAIL: infos?.email || "em@il.com",
        PLACEHOLDER_COMPANY: infos?.entity || "Société",
        PLACEHOLDER_ADDRESS_STREET: infos?.addressStreet?.value || "Adresse",
        PLACEHOLDER_ADDRESS_INFO: infos?.addressInfo?.value || "",
        PLACEHOLDER_ADDRESS_ZIPCODE:
            infos?.addressZipcode?.value || "Code postal",
        PLACEHOLDER_ADDRESS_CITY: infos?.addressCity?.value || "Ville",
        PLACEHOLDER_ADDRESS_COUNTRY: infos?.addressCountry?.value || "Pays",
        PLACEHOLDER_MOBILE: infos?.mobile || "fixe",
        PLACEHOLDER_PHONE: infos?.phone || "mobile",
        PLACEHOLDER_EVENT_BANNER: infos?.event || "",
    };
    return parse(
        template.replace(
            /\b(?:PLACEHOLDER_FIRST_NAME|PLACEHOLDER_COMPANY_ICON|PLACEHOLDER_LAST_NAME|PLACEHOLDER_POSITION|PLACEHOLDER_COMPANY|PLACEHOLDER_ADDRESS_STREET|PLACEHOLDER_ADDRESS_INFO|PLACEHOLDER_ADDRESS_ZIPCODE|PLACEHOLDER_ADDRESS_CITY|PLACEHOLDER_ADDRESS_COUNTRY|PLACEHOLDER_MOBILE|PLACEHOLDER_PHONE|PLACEHOLDER_EVENT_BANNER)\b/gi,
            (matched) => mapObj[matched]
        )
    );
}
