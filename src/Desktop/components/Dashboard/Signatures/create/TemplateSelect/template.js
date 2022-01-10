// TEMPLATE RENDERING FOR SELECTION

import parse from "html-react-parser"
import { renderToStaticMarkup } from "react-dom/server"
import DetectSocialNetwork from "Utils/DetectSocialNetwork/DetectSocialNetwork"

export default function Template(props) {
    console.log(props.socials)
    const socialNetworks = renderToStaticMarkup(props.socials?.items.map((item) => <a href="https://twitter.com/" style={{ marginRight: "4px" }}><DetectSocialNetwork social={item} fill={"#FFF"} /></a>))
    const mapObj = {
        PLACEHOLDER_GENERAL_FONT: props.infos?.fontFamily || "Helvetica,Arial,sans-serif",
        PLACEHOLDER_GENERAL_FONTSIZE: "11px;",
        PLACEHOLDER_COMPANY_ICON: props.infos?.logo.path || "http://fakeimg.pl/108?font=noto&font_size=12",
        PLACEHOLDER_BANNER: props.options?.bannerTop.data ? `<img style="border-radius: 4px; margin-bottom: 12px; max-width: 380px;" src='${props.options.bannerTop.data}'
    alt='banner' />` : "",
        PLACEHOLDER_DIV_COLOR: "#FCE750",
        PLACEHOLDER_SALUTATION: props.options?.salutation.enabled ? `<p style="padding-bottom: ${props.options?.salutation.padding}px;"}>${props.options?.salutation.value || "Cordialement,"}</p>` : "",
        PLACEHOLDER_FIRST_NAME: props.infos?.firstName.value || "Prénom",
        PLACEHOLDER_FIRST_NAME_STYLE: "font-weight: bold;",
        PLACEHOLDER_LAST_NAME: props.infos?.lastName.value || "Nom",
        PLACEHOLDER_LAST_NAME_STYLE: "font-weight: bold;",
        PLACEHOLDER_POSITION: props.infos?.jobName.value || "Poste",
        PLACEHOLDER_POSTE_STYLE: "font-size: 11px;",
        PLACEHOLDER_COMPANY: props.infos?.company.value || "Société",
        PLACEHOLDER_COMPANY_STYLE: "font-weight: bold;",
        PLACEHOLDER_FOLLOWUS: "Follow us",
        PLACEHOLDER_SOCIALS: socialNetworks,
        PLACEHOLDER_ADDRESS_STREET: props.infos?.addressStreet || "Adresse",
        PLACEHOLDER_ADDRESS_INFO: props.infos?.addressInfo || "",
        PLACEHOLDER_ADDRESS_ZIPCODE: props.infos?.addressZipcode || "Code postal",
        PLACEHOLDER_ADDRESS_CITY: props.infos?.addressCity || "Ville",
        PLACEHOLDER_ADDRESS_COUNTRY: props.infos?.addressCountry || "Pays",
        PLACEHOLDER_ADDRESS_STYLE: "font-size: 11px;",
        PLACEHOLDER_MOBILE: props.infos?.mobile.value || "mobile",
        PLACEHOLDER_MOBILE_STYLE: "font-size: 11px;",
        PLACEHOLDER_PHONE: props.infos?.phone.value || "fixe",
        PLACEHOLDER_PHONE_STYLE: "font-size: 11px;",
        PLACEHOLDER_EVENT_BANNER: props.infos?.logo.path || `http://fakeimg.pl/380x126?font=noto&font_size=14`,
        PLACEHOLDER_DISCLAIMER: props.options?.footer?.enabled ? `<p style="box-sizing: border-box; margin-top:${props.options?.footer?.padding}px; font-size:${props.options?.footer?.size}px; max-width: ${props.options?.footer?.maxWidth}px;">${props.options?.footer?.value.replace(/\n/g, "<br />")}</p>` : ""
    }
    return parse(
        props.template.replace(
            /\b(?:PLACEHOLDER_GENERAL_FONT|PLACEHOLDER_DISCLAIMER|PLACEHOLDER_DIV_COLOR|PLACEHOLDER_GENERAL_FONTSIZE|PLACEHOLDER_FOLLOWUS|PLACEHOLDER_SOCIALS|PLACEHOLDER_BANNER|PLACEHOLDER_SALUTATION|PLACEHOLDER_FIRST_NAME|PLACEHOLDER_COMPANY_ICON|PLACEHOLDER_FIRST_NAME_STYLE|PLACEHOLDER_LAST_NAME|PLACEHOLDER_LAST_NAME_STYLE|PLACEHOLDER_POSITION|PLACEHOLDER_POSTE_STYLE|PLACEHOLDER_COMPANY|PLACEHOLDER_COMPANY_STYLE|PLACEHOLDER_ADDRESS_STREET|PLACEHOLDER_ADDRESS_INFO|PLACEHOLDER_ADDRESS_ZIPCODE|PLACEHOLDER_ADDRESS_CITY|PLACEHOLDER_ADDRESS_COUNTRY|PLACEHOLDER_ADDRESS_STYLE|PLACEHOLDER_MOBILE|PLACEHOLDER_MOBILE_STYLE|PLACEHOLDER_PHONE|PLACEHOLDER_PHONE_STYLE|PLACEHOLDER_FACEBOOK|PLACEHOLDER_INSTAGRAM|PLACEHOLDER_TWITTER|PLACEHOLDER_LINKEDIN|PLACEHOLDER_SOCIALS_STYLE|PLACEHOLDER_EVENT_BANNER)\b/gi,
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