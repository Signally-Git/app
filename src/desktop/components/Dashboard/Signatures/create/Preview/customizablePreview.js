import parse from "html-react-parser"
import { renderToStaticMarkup } from "react-dom/server"
import DetectSocialNetwork from "Utils/DetectSocialNetwork/DetectSocialNetwork"

export default function Preview(props) {
    // Converts JSX camel Case attributes to dashed classics HTML
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
    const mapObj = {
        PLACEHOLDER_GENERAL_FONT: props.infos?.fontFamily || "Helvetica,Arial,sans-serif",
        PLACEHOLDER_GENERAL_FONTSIZE: `${props.infos?.fontSize[0]}px` || "11px",
        PLACEHOLDER_COMPANY_ICON: props.infos?.logo?.path || "https://via.placeholder.com/108",
        PLACEHOLDER_BANNER: props.options?.bannerTop.data ? `<img style="border-radius: 4px; margin-bottom: 12px; max-width: 380px" src='${URL.createObjectURL(props.options.bannerTop.data)}'
    alt='banner' />` : "",
        PLACEHOLDER_SALUTATION: props.options?.salutation.enabled ? `<p style="padding-bottom: ${props.options?.salutation.padding}px;"}>${props.options?.salutation.value || "Cordialement,"}</p>` : "",
        PLACEHOLDER_DIV_COLOR: props.options?.bgColor || "#FCE750",
        PLACEHOLDER_FIRST_NAME: props.infos?.firstName.value || "Prénom",
        PLACEHOLDER_FIRST_NAME_STYLE: `color:${props.infos?.firstName?.color}; ${convertToHTML(props.infos?.firstName?.style)}` || "PLACEHOLDER_FIRST_NAME_STYLE",
        PLACEHOLDER_LAST_NAME: props.infos?.lastName?.value || "Nom",
        PLACEHOLDER_LAST_NAME_STYLE: `color:${props.infos?.lastName?.color};${convertToHTML(props.infos?.lastName?.style)}` || "PLACEHOLDER_LAST_NAME_STYLE",
        PLACEHOLDER_POSITION: props.infos?.jobName?.value || "Poste",
        PLACEHOLDER_POSTE_STYLE: `color:${props.infos?.jobName?.color};${convertToHTML(props.infos?.jobName?.style)}` || "PLACEHOLDER_POSTE_STYLE",
        PLACEHOLDER_COMPANY: props.infos?.company?.value || "Société",
        PLACEHOLDER_COMPANY_STYLE: `color:${props.infos?.company?.color};${convertToHTML(props.infos?.company?.style)}` || "PLACEHOLDER_COMPANY_STYLE",
        PLACEHOLDER_ADDRESS_STREET: props.infos?.addressStreet?.value || "Adresse",
        PLACEHOLDER_ADDRESS_INFO: props.infos?.addressInfo?.value || "",
        PLACEHOLDER_ADDRESS_ZIPCODE: props.infos?.addressZipcode?.value || "Code postal",
        PLACEHOLDER_ADDRESS_CITY: props.infos?.addressCity?.value || "Ville",
        PLACEHOLDER_ADDRESS_COUNTRY: props.infos?.addressCountry?.value || "Pays",
        PLACEHOLDER_FOLLOWUS: props.options?.followUs?.value,
        PLACEHOLDER_SOCIALS: socialNetworks,
        PLACEHOLDER_ADDRESS_STYLE: `color:${props.infos?.addressStreet?.color};` || "PLACEHOLDER_ADDRESS_STYLE",
        PLACEHOLDER_MOBILE: props.infos?.mobile.value || "mobile",
        PLACEHOLDER_MOBILE_STYLE: `color:${props.infos?.mobile?.color};${convertToHTML(props.infos?.mobile?.style)}` || "PLACEHOLDER_MOBILE_STYLE",
        PLACEHOLDER_PHONE: props.infos?.phone?.value || "fixe",
        PLACEHOLDER_PHONE_STYLE: `color:${props.infos?.phone?.color};${convertToHTML(props.infos?.phone?.style)}` || "PLACEHOLDER_PHONE_STYLE",
        PLACEHOLDER_EVENT_BANNER: props.infos.event ? props.infos.event : (props.options?.event?.enabled ? props?.options?.event?.display : ""), 
        PLACEHOLDER_DISCLAIMER: props.options?.footer?.enabled ? `<p style="box-sizing: border-box; margin-top:${props.options?.footer?.padding}px; font-size:${props.options?.footer?.size}px; max-width: ${props.options?.footer?.maxWidth}px;">${props.options?.footer?.value.replace(/\n/g, "<br />")}</p>` : ""
    }

    return parse(
        props.template.replace(
            /\b(?:PLACEHOLDER_GENERAL_FONT|PLACEHOLDER_GENERAL_FONTSIZE|PLACEHOLDER_BANNER|PLACEHOLDER_FOLLOWUS|PLACEHOLDER_SALUTATION|PLACEHOLDER_DIV_COLOR|PLACEHOLDER_FIRST_NAME|PLACEHOLDER_COMPANY_ICON|PLACEHOLDER_FIRST_NAME_STYLE|PLACEHOLDER_LAST_NAME|PLACEHOLDER_LAST_NAME_STYLE|PLACEHOLDER_POSITION|PLACEHOLDER_POSTE_STYLE|PLACEHOLDER_COMPANY|PLACEHOLDER_COMPANY_STYLE|PLACEHOLDER_ADDRESS_STREET|PLACEHOLDER_ADDRESS_INFO|PLACEHOLDER_ADDRESS_ZIPCODE|PLACEHOLDER_ADDRESS_CITY|PLACEHOLDER_ADDRESS_COUNTRY|PLACEHOLDER_ADDRESS_STYLE|PLACEHOLDER_MOBILE|PLACEHOLDER_MOBILE_STYLE|PLACEHOLDER_PHONE|PLACEHOLDER_PHONE_STYLE|PLACEHOLDER_FACEBOOK|PLACEHOLDER_INSTAGRAM|PLACEHOLDER_TWITTER|PLACEHOLDER_LINKEDIN|PLACEHOLDER_SOCIALS|PLACEHOLDER_EVENT_BANNER|PLACEHOLDER_DISCLAIMER)\b/gi,
            (matched) => mapObj[matched]
        )
    )
    // console.log(props.infos?.firstName.style, props.infos?.lastName.style)
    // return (<>
    //     <div style={{ fontFamily: `${props.infos?.fontFamily}` }}>
    //         {props.options?.salutation.enabled ? <p style={{paddingBottom: `${props.options?.salutation.padding}px`}}>{props.options?.salutation.value}</p> : ""}
    //         {props.options?.bannerTop.enabled && props.options?.bannerTop.data ? <img src={URL.createObjectURL(props.options?.bannerTop.data)}  style={{paddingBottom: `${props.options?.bannerTop.padding}px`}} /> : ""}
    //         <p style={{ ...props.infos?.firstName.style, color: props.infos?.firstName.color, fontSize: `${props.infos?.fontSize}px` }}>{props.infos?.firstName.value}</p>
    //         <p style={{ ...props.infos?.lastName.style, color: props.infos?.lastName.color, fontSize: `${props.infos?.fontSize}px` }}>{props.infos?.lastName.value}</p>
    //         <p style={{ ...props.infos?.jobName.style, color: props.infos?.jobName.color, fontSize: `${props.infos?.fontSize}px` }}>{props.infos?.jobName.value}</p>
    //         <p style={{ ...props.infos?.company.style, color: props.infos?.company.color, fontSize: `${props.infos?.fontSize}px` }}>{props.infos?.company.value}</p>
    //         <p style={{ ...props.infos?.address.style, color: props.infos?.address.color, fontSize: `${props.infos?.fontSize}px` }}>{props.infos?.address.value}</p>
    //         <p style={{ ...props.infos?.mobile.style, color: props.infos?.mobile.color, fontSize: `${props.infos?.fontSize}px` }}>{props.infos?.mobile.value}</p>
    //         <p style={{ ...props.infos?.phone.style, color: props.infos?.phone.color, fontSize: `${props.infos?.fontSize}px` }}>{props.infos?.phone.value}</p>
    //     </div>
    // </>)
}