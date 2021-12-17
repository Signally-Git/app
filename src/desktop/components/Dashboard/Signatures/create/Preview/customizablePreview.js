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
                return "https://images.signally.io/ee7a76d7b866f17a1205fc28b877ba8fbd46c385296"
            case "facebook":
                return "https://images.signally.io/ee7a7723b8c733fa0fb9ee2afcd40bb237b2f08427e"
            case "twitter":
                return "https://images.signally.io/ee7a76af9fb124784600544d36803f31287d0952bd2"
            case "instagram":
                return "https://images.signally.io/ee7a7552080bb0f59d5463fb68c803f22a3d7d769b9"
            case "linkedin":
                return "https://images.signally.io/ee7a769940e8bcca4a15d53b5ccb721fa17bb3a59a5"
            case "snapchat":
                return "https://images.signally.io/ee7a76c3412acbcf12f1d1fcbffb99cd7d98bc15feb"
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
        PLACEHOLDER_BANNER: props.options?.bannerTop.data ? `<img style="border-radius: 4px; margin-bottom: 12px;" src='${URL.createObjectURL(props.options.bannerTop.data)}'
    alt='banner' />` : "",
        PLACEHOLDER_SALUTATION: props.options?.salutation.enabled ? `<p style="padding-bottom: ${props.options?.salutation.padding}px;"}>${props.options?.salutation.value || "Cordialement,"}</p>` : "",
        PLACEHOLDER_DIV_COLOR: props.options?.bgColor || "#FCE750",
        PLACEHOLDER_FIRST_NAME: props.infos?.firstName.value || "Prénom",
        PLACEHOLDER_FIRST_NAME_STYLE: `color:${props.infos?.firstName?.color}; ${convertToHTML(props.infos?.firstName?.style)}` || "PLACEHOLDER_FIRST_NAME_STYLE",
        PLACEHOLDER_LAST_NAME: props.infos?.lastName?.value || "Nom",
        PLACEHOLDER_LAST_NAME_STYLE: `color:${props.infos?.lastName?.color};${convertToHTML(props.infos?.lastName?.style)}` || "PLACEHOLDER_LAST_NAME_STYLE",
        PLACEHOLDER_POSTE: props.infos?.jobName?.value || "Poste",
        PLACEHOLDER_POSTE_STYLE: `color:${props.infos?.jobName?.color};${convertToHTML(props.infos?.jobName?.style)}` || "PLACEHOLDER_POSTE_STYLE",
        PLACEHOLDER_COMPANY: props.infos?.company?.value || "Société",
        PLACEHOLDER_COMPANY_STYLE: `color:${props.infos?.company?.color};${convertToHTML(props.infos?.company?.style)}` || "PLACEHOLDER_COMPANY_STYLE",
        PLACEHOLDER_FOLLOWUS: props.options?.followUs?.value,
        PLACEHOLDER_SOCIALS: socialNetworks,
        PLACEHOLDER_ADDRESS: props.infos?.address?.value || "Adresse",
        PLACEHOLDER_ADDRESS_STYLE: `color:${props.infos?.address?.color};${convertToHTML(props.infos?.address?.style)}` || "PLACEHOLDER_ADDRESS_STYLE",
        PLACEHOLDER_MOBILE: props.infos?.mobile.value || "mobile",
        PLACEHOLDER_MOBILE_STYLE: `color:${props.infos?.mobile?.color};${convertToHTML(props.infos?.mobile?.style)}` || "PLACEHOLDER_MOBILE_STYLE",
        PLACEHOLDER_PHONE: props.infos?.phone?.value || "fixe",
        PLACEHOLDER_PHONE_STYLE: `color:${props.infos?.phone?.color};${convertToHTML(props.infos?.phone?.style)}` || "PLACEHOLDER_PHONE_STYLE",
        PLACEHOLDER_EVENT_BANNER: props.infos.event ? props.infos.event : (props.options?.event?.enabled ? props?.options?.event?.display : ""), 
        PLACEHOLDER_DISCLAIMER: props.options?.footer?.enabled ? `<p style="box-sizing: border-box; margin-top:${props.options?.footer?.padding}px; font-size:${props.options?.footer?.size}px; max-width: ${props.options?.footer?.maxWidth}px;">${props.options?.footer?.value.replace(/\n/g, "<br />")}</p>` : ""
    }
    const template = props.template.replace("<pre>(.*?)</pre>", "TEST")
    return parse(
        template.replace(
            /\b(?:PLACEHOLDER_GENERAL_FONT|PLACEHOLDER_GENERAL_FONTSIZE|PLACEHOLDER_BANNER|PLACEHOLDER_FOLLOWUS|PLACEHOLDER_SALUTATION|PLACEHOLDER_DIV_COLOR|PLACEHOLDER_FIRST_NAME|PLACEHOLDER_COMPANY_ICON|PLACEHOLDER_FIRST_NAME_STYLE|PLACEHOLDER_LAST_NAME|PLACEHOLDER_LAST_NAME_STYLE|PLACEHOLDER_POSTE|PLACEHOLDER_POSTE_STYLE|PLACEHOLDER_COMPANY|PLACEHOLDER_COMPANY_STYLE|PLACEHOLDER_ADDRESS|PLACEHOLDER_ADDRESS_STYLE|PLACEHOLDER_MOBILE|PLACEHOLDER_MOBILE_STYLE|PLACEHOLDER_PHONE|PLACEHOLDER_PHONE_STYLE|PLACEHOLDER_FACEBOOK|PLACEHOLDER_INSTAGRAM|PLACEHOLDER_TWITTER|PLACEHOLDER_LINKEDIN|PLACEHOLDER_SOCIALS|PLACEHOLDER_EVENT_BANNER|PLACEHOLDER_DISCLAIMER)\b/gi,
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