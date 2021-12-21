import parse from "html-react-parser"

export default function ReadOnlyPreview({ template, infos }) {
    console.log(infos?.event)
    const mapObj = {
        PLACEHOLDER_COMPANY_ICON: infos?.logo ? <img src="" /> : "https://via.placeholder.com/108",
        PLACEHOLDER_FIRST_NAME: infos?.firstName || "Prénom",
        PLACEHOLDER_LAST_NAME: infos?.lastName || "Nom",
        PLACEHOLDER_POSITION: infos?.jobName || "Poste",
        PLACEHOLDER_COMPANY: infos?.entity || "Société",
        PLACEHOLDER_ADDRESS: infos?.address || "Adresse",
        PLACEHOLDER_MOBILE: infos?.mobile || "mobile",
        PLACEHOLDER_PHONE: infos?.phone || "fixe",
        PLACEHOLDER_EVENT_BANNER: infos?.event || ""
    }
    return parse(
        template.replace(
            /\b(?:PLACEHOLDER_FIRST_NAME|PLACEHOLDER_COMPANY_ICON|PLACEHOLDER_LAST_NAME|PLACEHOLDER_POSITION|PLACEHOLDER_COMPANY|PLACEHOLDER_ADDRESS|PLACEHOLDER_MOBILE|PLACEHOLDER_PHONE|PLACEHOLDER_EVENT_BANNER)\b/gi,
            (matched) => mapObj[matched]
        )
    )
}