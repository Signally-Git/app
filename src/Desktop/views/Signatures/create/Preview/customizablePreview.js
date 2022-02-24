import parse from "html-react-parser"
import { renderToStaticMarkup } from "react-dom/server"
import DetectSocialNetwork from "Utils/DetectSocialNetwork/DetectSocialNetwork"

export default function Preview({ infos, template, options, ...props }) {
    // Converts JSX camel Case attributes to dashed classics HTML
    // console.log(props?.options?.event?.display)
    // console.log(infos?.firstName?.color)
    const convertToHTML = (object) => {
        return JSON.stringify(object).replace(/[,]+/g, ';').replace(/[{}]+/g, '').replace(/["]+/g, '').replace(/[A-Z]/g, m => "-" + m.toLowerCase())
    }
    const handleLink = (item) => {
        switch (item) {
            case "pinterest":
                return "https://www.pinterest.fr/mamashelter/"
            case "facebook":
                return "https://www.facebook.com/MamaShelterOfficial/"
            case "twitter":
                return "https://twitter.com/mama_shelter/"
            case "instagram":
                return "https://www.instagram.com/mamashelter/"
            case "linkedin":
                return "https://www.linkedin.com/company/mama-shelter"
            case "snapchat":
                return "https://www.snapchat.com/add/mamashelter"
            default:
                break;
        }
    }

    const handleImg = (item) => {
        switch (item) {
            case "pinterest":
                return "https://api.staging.signally.io/images//iconmonstr-pinterest-1-48-61cc73437269b.png"
            case "facebook":
                return "https://api.staging.signally.io/images//iconmonstr-facebook-4-48-1-61cc73165961b.png"
            case "twitter":
                return "https://api.staging.signally.io/images//iconmonstr-twitter-4-48-61cc7355e7d05.png"
            case "instagram":
                return "https://api.staging.signally.io/images//iconmonstr-instagram-14-48-61cc732d0e0eb.png"
            case "linkedin":
                return "https://api.staging.signally.io/images//iconmonstr-linkedin-4-48-61cc7336e67e8.png"
            case "snapchat":
                return "https://api.staging.signally.io/images//iconmonstr-snapchat-4-48-61cc734da01ca.png"
            default:
                break;
        }
    }
    const socialNetworks = renderToStaticMarkup(props.options?.socials?.items.map((item) => <a target="_blank" href={handleLink(item)} style={{ marginRight: "5px" }}>
        <img src={handleImg(item)} alt={item} />
    </a>))
    let replaced;

    replaced = template.replaceAll("{{ styles['firstName']['color'] }}", `${infos?.firstName?.color};`)
    replaced = replaced.replaceAll("{{ styles['firstName']['textDecoration'] }}", `${infos?.firstName?.style?.textDecoration || "none"};`)
    replaced = replaced.replaceAll("{{ styles['firstName']['fontWeight'] }}", `${infos?.firstName?.style?.fontWeight || "normal"};`)
    replaced = replaced.replaceAll("{{ styles['firstName']['fontStyle'] }}", `${infos?.firstName?.style?.fontStyle || "normal"};`)
    replaced = replaced.replaceAll('{{ user.firstName }}', 'Prénom')

    replaced = replaced.replaceAll('{{ user.lastName }}', infos?.lastName?.value || 'Nom')
    replaced = replaced.replaceAll("{{ styles['lastName']['color'] }}", `${infos?.lastName?.color};`)
    replaced = replaced.replaceAll("{{ styles['lastName']['textDecoration'] }}", `${infos?.lastName?.style?.textDecoration || "none"};`)
    replaced = replaced.replaceAll("{{ styles['lastName']['fontWeight'] }}", `${infos?.lastName?.style?.fontWeight || "normal"};`)
    replaced = replaced.replaceAll("{{ styles['lastName']['fontStyle'] }}", `${infos?.lastName?.style?.fontStyle || "normal"};`)

    replaced = replaced.replaceAll('{{ user.position }}', 'Poste')
    replaced = replaced.replaceAll("{{ styles['jobName']['color'] }}", `${infos?.jobName?.color};`)
    replaced = replaced.replaceAll("{{ styles['jobName']['textDecoration'] }}", `${infos?.jobName?.style?.textDecoration || "none"};`)
    replaced = replaced.replaceAll("{{ styles['jobName']['fontWeight'] }}", `${infos?.jobName?.style?.fontWeight || "normal"};`)
    replaced = replaced.replaceAll("{{ styles['jobName']['fontStyle'] }}", `${infos?.jobName?.style?.fontStyle || "normal"};`)
    
    replaced = replaced.replaceAll('{{ absolute_url(asset(logo)) }}', infos?.logo?.path || "http://fakeimg.pl/108?font=noto&font_size=12")

    replaced = replaced.replaceAll('{{ company.name }}', 'Société')
    replaced = replaced.replaceAll("{{ styles['companyName']['color'] }}", `${infos?.company?.color};`)
    replaced = replaced.replaceAll("{{ styles['companyName']['textDecoration'] }}", `${infos?.company?.style.textDecoration || "none"};`)
    replaced = replaced.replaceAll("{{ styles['companyName']['fontWeight'] }}", `${infos?.company?.style?.fontWeight || "normal"};`)
    replaced = replaced.replaceAll("{{ styles['companyName']['fontStyle'] }}", `${infos?.company?.style?.fontStyle || "normal"};`)

    replaced = replaced.replaceAll('{{ address.street }}', 'Adresse')
    replaced = replaced.replaceAll("{{ styles['addressStreet']['color'] }}", `${infos?.addressStreet?.color};`)
    replaced = replaced.replaceAll("{{ styles['addressStreet']['textDecoration'] }}", `${infos?.addressStreet?.style.textDecoration || "none"};`)
    replaced = replaced.replaceAll("{{ styles['addressStreet']['fontWeight'] }}", `${infos?.addressStreet?.style?.fontWeight || "normal"};`)
    replaced = replaced.replaceAll("{{ styles['addressStreet']['fontStyle'] }}", `${infos?.addressStreet?.style?.fontStyle || "normal"};`)
    replaced = replaced.replaceAll('{{ address.streetInfo }}', 'Adresse 2')

    replaced = replaced.replaceAll('{{ address.zipCode }}', 'Code postal')
    replaced = replaced.replaceAll("{{ styles['addressZipcode']['color'] }}", `${infos?.addressZipcode?.color};`)
    replaced = replaced.replaceAll("{{ styles['addressZipcode']['textDecoration'] }}", `${infos?.addressZipcode?.style.textDecoration || "none"};`)
    replaced = replaced.replaceAll("{{ styles['addressZipcode']['fontWeight'] }}", `${infos?.addressZipcode?.style?.fontWeight || "normal"};`)
    replaced = replaced.replaceAll("{{ styles['addressZipcode']['fontStyle'] }}", `${infos?.addressZipcode?.style?.fontStyle || "normal"};`)

    replaced = replaced.replaceAll('{{ address.city }}', 'Ville')
    replaced = replaced.replaceAll('{{ address.country }}', 'Pays')
    
    replaced = replaced.replaceAll('{{ user.mobilePhone }}', 'Mobile')
    replaced = replaced.replaceAll("{{ styles['mobile']['color'] }}", `${infos?.mobile?.color};`)
    replaced = replaced.replaceAll("{{ styles['mobile']['textDecoration'] }}", `${infos?.mobile?.style.textDecoration || "none"};`)
    replaced = replaced.replaceAll("{{ styles['mobile']['fontWeight'] }}", `${infos?.mobile?.style?.fontWeight || "normal"};`)
    replaced = replaced.replaceAll("{{ styles['phone']['fontStyle'] }}", `${infos?.mobile?.style?.fontStyle || "normal"};`)

    replaced = replaced.replaceAll('{{ user.phone }}', 'Fixe')
    replaced = replaced.replaceAll("{{ styles['phone']['color'] }}", `${infos?.phone?.color};`)
    replaced = replaced.replaceAll("{{ styles['phone']['textDecoration'] }}", `${infos?.phone?.style.textDecoration || "none"};`)
    replaced = replaced.replaceAll("{{ styles['phone']['fontWeight'] }}", `${infos?.phone?.style?.fontWeight || "normal"};`)
    replaced = replaced.replaceAll("{{ styles['phone']['fontStyle'] }}", `${infos?.phone?.style?.fontStyle || "normal"};`)

    replaced = replaced.replaceAll("{{ styles['generalFontFamily']['fontFamily'] }}", `${infos?.fontFamily || "Helvetica"};`)
    replaced = replaced.replaceAll("{{ styles['generalFontSize']['fontSize'] }}", `${infos?.fontSize+'px' || "11"};`)

    var greeting = /{% if greeting %}\s*{{.*}}\s*{% endif %}/ig;
    replaced = replaced.replaceAll(greeting, options?.salutation.enabled ? `<p style="padding-bottom: ${options?.salutation.padding}px;"}>${options?.salutation.value || "Cordialement,"}</p>` : "")
    var disclaimer = /{% if disclaimer %}\s*{{.*}}\s*{% endif %}/ig;
    replaced = replaced.replaceAll(disclaimer, options?.footer?.enabled ? `<p style="box-sizing: border-box; margin-top:${options?.footer?.padding}px; font-size:${options?.footer?.size}px; max-width: ${options?.footer?.maxWidth}px;">${options?.footer?.value.replace(/\n/g, "<br />")}</p>` : "")

    if (options?.event?.enabled) {
        replaced = replaced.replaceAll(/{% if event %}/gi, "")
        replaced = replaced.replaceAll(/{% endif %}/gi, "")
        replaced = replaced.replaceAll('{{ event.imagePath }}', options?.event?.display || `http://fakeimg.pl/380x126?font=noto&font_size=14`)
    }
    else {
        var event = /{% if event %}[^]*{% endif %}/gim;
        replaced = replaced.replaceAll(event, "")
    }


    // OPTIONS
    replaced = replaced.replaceAll("{{ styles['greetingsPadding']['padding'] }}", options?.event.padding || 12)
    replaced = replaced.replaceAll("{{ styles['divColor']['color'] }}", options?.bgColor || "#FCE750")
    replaced = replaced.replaceAll("{{ styles['eventPadding']['padding'] }}", options?.event.padding || 12)

    return parse(replaced)
}