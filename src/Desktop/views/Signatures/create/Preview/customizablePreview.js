import parse from "html-react-parser";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

export default function Preview({
    infos,
    template,
    options,
    user,
    organisation,
    ...props
}) {
    // Converts JSX camel Case attributes to dashed classics HTML
    const [socials, setSocials] = React.useState([
        { name: "facebook" },
        { name: "linkedin" },
        { name: "twitter" },
        { name: "instagram" },
        { name: "snapchat" },
        { name: "pinterest" },
    ]);
    React.useEffect(() => {
        if (organisation?.socialMediaAccounts?.length > 0) {
            setSocials(organisation?.socialMediaAccounts);
        }
    }, [organisation]);

    const handleLink = (item) => {
        switch (item) {
            case "pinterest":
                return "https://www.pinterest.fr/mamashelter/";
            case "facebook":
                return "https://www.facebook.com/MamaShelterOfficial/";
            case "twitter":
                return "https://twitter.com/mama_shelter/";
            case "instagram":
                return "https://www.instagram.com/mamashelter/";
            case "linkedin":
                return "https://www.linkedin.com/company/mama-shelter";
            case "snapchat":
                return "https://www.snapchat.com/add/mamashelter";
            default:
                break;
        }
    };

    const handleImg = (item) => {
        switch (item) {
            case "pinterest":
                return "https://s3.eu-west-3.amazonaws.com/files.signally.io/socials/iconmonstr-pinterest-1-48.png";
            case "facebook":
                return "https://s3.eu-west-3.amazonaws.com/files.signally.io/socials/iconmonstr-facebook-4-48.png";
            case "twitter":
                return "https://s3.eu-west-3.amazonaws.com/files.signally.io/socials/iconmonstr-twitter-4-48.png";
            case "instagram":
                return "https://s3.eu-west-3.amazonaws.com/files.signally.io/socials/iconmonstr-instagram-14-48.png";
            case "linkedin":
                return "https://s3.eu-west-3.amazonaws.com/files.signally.io/socials/iconmonstr-linkedin-4-48.png";
            case "snapchat":
                return "https://s3.eu-west-3.amazonaws.com/files.signally.io/socials/iconmonstr-snapchat-4-48.png";
            default:
                break;
        }
    };

    const socialNetworks = renderToStaticMarkup(
        socials.map((item) => (
            <td
                height="24"
                width="24"
                style={{
                    height: "24px",
                    width: "24px",
                    textAlign: "left",
                    padding: "0",
                }}
                valign="top"
            >
                <a
                    href={handleLink(item.name)}
                    height="24"
                    width="24"
                    style={{ height: "24px", width: "24px" }}
                    alt={item.name}
                >
                    <img
                        height="24"
                        width="24"
                        style={{
                            verticalAlign: "middle",
                            display: "block",
                            height: "24px",
                            width: "24px",
                            lineHeight: "24px",
                            margin: "0 3px",
                        }}
                        src={handleImg(item.name)}
                        alt=""
                    />
                </a>
            </td>
        ))
    );
    let replaced;

    replaced = template.replaceAll(
        "{{ styles['firstName']['color'] }}",
        `${infos?.firstName?.color};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['firstName']['textDecoration'] }}",
        `${infos?.firstName?.style?.textDecoration || "none"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['firstName']['fontWeight'] }}",
        `${infos?.firstName?.style?.fontWeight || "normal"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['firstName']['fontStyle'] }}",
        `${infos?.firstName?.style?.fontStyle || "normal"};`
    );
    replaced = replaced.replaceAll(
        "{% if isPreview %} Prénom {% else %} {{ user.firstName }} {% endif %}",
        user?.firstName || "Prénom"
    );

    replaced = replaced.replaceAll(
        "{% if isPreview %} Nom {% else %} {{ user.lastName }} {% endif %}",
        infos?.lastName?.value || user?.lastName || "Nom"
    );
    replaced = replaced.replaceAll(
        "{{ styles['lastName']['color'] }}",
        `${infos?.lastName?.color};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['lastName']['textDecoration'] }}",
        `${infos?.lastName?.style?.textDecoration || "none"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['lastName']['fontWeight'] }}",
        `${infos?.lastName?.style?.fontWeight || "normal"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['lastName']['fontStyle'] }}",
        `${infos?.lastName?.style?.fontStyle || "normal"};`
    );

    replaced = replaced.replaceAll(
        "{% if isPreview %} Poste {% else %} {{ user.position }} {% endif %}",
        user?.position || "Poste"
    );
    replaced = replaced.replaceAll(
        "{{ styles['jobName']['color'] }}",
        `${infos?.jobName?.color};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['jobName']['textDecoration'] }}",
        `${infos?.jobName?.style?.textDecoration || "none"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['jobName']['fontWeight'] }}",
        `${infos?.jobName?.style?.fontWeight || "normal"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['jobName']['fontStyle'] }}",
        `${infos?.jobName?.style?.fontStyle || "normal"};`
    );

    replaced = replaced.replaceAll(
        "{{ logo }}",
        infos?.logo?.path ||
            organisation?.logo?.url ||
            "https://fakeimg.pl/108?font=noto&font_size=12"
    );

    replaced = replaced.replaceAll(
        "{{ company.name }}",
        organisation?.name || "Société"
    );
    replaced = replaced.replaceAll(
        "{{ styles['companyName']['color'] }}",
        `${infos?.company?.color};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['companyName']['textDecoration'] }}",
        `${infos?.company?.style.textDecoration || "none"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['companyName']['fontWeight'] }}",
        `${infos?.company?.style?.fontWeight || "normal"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['companyName']['fontStyle'] }}",
        `${infos?.company?.style?.fontStyle || "normal"};`
    );

    replaced = replaced.replaceAll(
        "{{ address.street }}",
        organisation?.address?.street || "Adresse"
    );
    replaced = replaced.replaceAll(
        "{{ styles['addressStreet']['color'] }}",
        `${infos?.addressStreet?.color};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['addressStreet']['textDecoration'] }}",
        `${infos?.addressStreet?.style.textDecoration || "none"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['addressStreet']['fontWeight'] }}",
        `${infos?.addressStreet?.style?.fontWeight || "normal"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['addressStreet']['fontStyle'] }}",
        `${infos?.addressStreet?.style?.fontStyle || "normal"};`
    );
    replaced = replaced.replaceAll(
        "{{ address.streetInfo }}",
        organisation?.address?.streetInfo || ""
    );

    replaced = replaced.replaceAll(
        "{{ address.zipCode }}",
        organisation?.address?.zipCode || "Code postal"
    );
    replaced = replaced.replaceAll(
        "{{ styles['addressZipcode']['color'] }}",
        `${infos?.addressZipcode?.color};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['addressZipcode']['textDecoration'] }}",
        `${infos?.addressZipcode?.style.textDecoration || "none"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['addressZipcode']['fontWeight'] }}",
        `${infos?.addressZipcode?.style?.fontWeight || "normal"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['addressZipcode']['fontStyle'] }}",
        `${infos?.addressZipcode?.style?.fontStyle || "normal"};`
    );

    replaced = replaced.replaceAll(
        "{{ address.city }}",
        organisation?.address?.city || "Ville"
    );
    replaced = replaced.replaceAll(
        "{{ address.country }}",
        organisation?.address?.country || "Pays"
    );

    replaced = replaced.replaceAll("{{ user.mobilePhone }}", "Mobile");
    replaced = replaced.replaceAll(
        "{{ styles['mobile']['color'] }}",
        `${infos?.mobile?.color};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['mobile']['textDecoration'] }}",
        `${infos?.mobile?.style.textDecoration || "none"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['mobile']['fontWeight'] }}",
        `${infos?.mobile?.style?.fontWeight || "normal"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['phone']['fontStyle'] }}",
        `${infos?.mobile?.style?.fontStyle || "normal"};`
    );

    replaced = replaced.replaceAll(
        "{% if isPreview %} 0123456789 {% else %} {{ user.phone }} {% endif %}",
        "0102030405"
    );
    replaced = replaced.replaceAll(
        "{{ styles['phone']['color'] }}",
        `${infos?.phone?.color};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['phone']['textDecoration'] }}",
        `${infos?.phone?.style.textDecoration || "none"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['phone']['fontWeight'] }}",
        `${infos?.phone?.style?.fontWeight || "normal"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['phone']['fontStyle'] }}",
        `${infos?.phone?.style?.fontStyle || "normal"};`
    );

    replaced = replaced.replaceAll(
        "{{ styles['generalFontFamily']['fontFamily'] }}",
        `${infos?.fontFamily || "Helvetica"};`
    );
    replaced = replaced.replaceAll(
        "{{ styles['generalFontSize']['fontSize'] }}",
        `${infos?.fontSize + "px" || "11"};`
    );

    //mail
    replaced = replaced.replaceAll(
        "{{ user.email }}",
        user?.email || "em@il.com"
    );

    var greeting = /{# START GREETINGS #}.*{# END GREETINGS #}/gis;
    replaced = replaced.replaceAll(
        greeting,
        options?.salutation?.enabled
            ? `<p style="padding-bottom: ${options?.salutation?.padding}px;"}>${
                  options?.salutation.value || "Cordialement,"
              }</p>`
            : ""
    );
    var disclaimer = /{# START DISCLAIMERS #}.*{# END DISCLAIMERS #}/gis;
    replaced = replaced.replaceAll(
        disclaimer,
        options?.footer?.enabled
            ? `<p style="box-sizing: border-box; margin-top:${
                  options?.footer?.padding
              }px; font-size:${options?.footer?.size}px; max-width: ${
                  options?.footer?.maxWidth
              }px;">${options?.footer?.value.replace(/\n/g, "<br />")}</p>`
            : ""
    );

    // socials
    replaced = replaced.replaceAll(
        /{# START SOCIALS #}.*{# END SOCIALS #}/gis,
        `		<td style="width:230px; border: none; background:black; padding: 0cm; height: 24px;" height="24" valign="middle" nowrap>
    <table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0" height="24">
        <tbody height="24">
            <tr height="24">` +
            socialNetworks +
            `			</tr>
            </tbody>
        </table>
    </td>`
    );

    if (options?.event?.enabled) {
        replaced = replaced.replaceAll(/{% if event or isPreview %}/gi, "");
        replaced = replaced.replaceAll(/{% if event %}/gi, "");
        replaced = replaced.replaceAll(
            /{% if styles\['event'\]\['enabled'\] is same as\( 'true' \) %}/gi,
            ""
        );
        replaced = replaced.replaceAll(/{% endif %}/gi, "");
        replaced = replaced.replaceAll(/{# START EVENT #}/gi, "");
        replaced = replaced.replaceAll(/{# END EVENT #}/gi, "");
        replaced = replaced.replaceAll(
            `{{ API }}/event/token/{{ user.token }}/image`,
            options?.event?.display?.search("undefined") === -1
                ? options?.event?.display
                : `https://fakeimg.pl/380x126?font=noto&font_size=14`
        );
        replaced = replaced.replaceAll(
            /{# START ELSE #}.*{# END ELSE #}/gs,
            ""
        );
    } else {
        var event = /{# START EVENT #}.*{# END EVENT #}/gs;
        replaced = replaced.replaceAll(event, "");
    }

    // replaced = replaced.replace(/{# START PHONE #}.*{# END PHONE #}/igs, "T: 0102030405")
    replaced = replaced.replace(
        /{# START PHONE #}.*{% if user.phone %}.*{% if user.phone or isPreview %}/gis,
        ""
    );
    replaced = replaced.replace(/{% endif %}.*{# END PHONE #}/gis, "");
    replaced = replaced.replace(/{# END PHONE #}/gis, "");

    // OPTIONS
    replaced = replaced.replaceAll(
        "{{ styles['greetingsPadding']['padding'] }}",
        options?.event.padding || 12
    );
    replaced = replaced.replaceAll(
        "{{ styles['divColor']['color'] }}",
        options?.bgColor || "#FCE750"
    );
    replaced = replaced.replaceAll(
        "{{ styles['eventPadding']['padding'] }}",
        options?.event.padding || 12
    );

    return parse(replaced);
}
