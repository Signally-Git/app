import parse from "html-react-parser";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

export default function Preview({
    infos,
    template,
    options,
    user,
    organisation,
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

    const socialNetworks = renderToStaticMarkup(
        socials.map((item, index) => (
            <td
                style={{
                    height: "18px",
                    width: "18px",
                }}
            >
                <a
                    href={item.url}
                    style={{ height: "18px", width: "18px" }}
                    title={item.name}
                >
                    <img
                        style={{
                            height: "18px",
                            width: "18px",
                        }}
                        src={item.image}
                        alt={item.name}
                    />
                </a>
                {index < socials.length - 1 && <td></td>}
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
        /{% if isPreview %}\s*Prénom\s*{% else %}\s*{{ user.firstName }}\s*{% endif %}/gis,
        user?.firstName || "Prénom"
    );

    replaced = replaced.replaceAll(
        /{% if isPreview %}\s*Nom\s*{% else %}\s*{{ user.lastName }}\s*{% endif %}/gis,
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
        /{% if isPreview %}\s*Poste\s*{% else %}\s*{{ user.position }}\s*{% endif %}/gis,
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
        /{{ company.name }}/gis,
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
        /{% if isPreview %}\s*0123456789\s*{% else %}\s*{{ user.phone }}\s*{% endif %}/gis,
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
        /\{\{ styles\['generalFontSize']\['fontSize'] }}/gis,
        `${infos?.fontSize[0].toString() || "11"}`
    );
    console.log(
        replaced.replaceAll(
            /\{\{ styles\['generalFontSize']\['fontSize'] }}/gis,
            `${infos?.fontSize[0].toString() || "11"}`
        )
    );
    //mail
    replaced = replaced.replaceAll(
        "{{ user.email }}",
        user?.email || "em@il.com"
    );

    let greeting = /{# START GREETINGS #}.*{# END GREETINGS #}/gis;
    replaced = replaced.replaceAll(
        greeting,
        options?.salutation?.enabled
            ? `<p style="padding-bottom: ${
                  options?.salutation?.padding
              }px;" }>${options?.salutation.value || "Cordialement,"}</p>`
            : ""
    );
    let disclaimer = /{# START DISCLAIMER #}.*{# END DISCLAIMER #}/gis;
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
    if (!options?.socials?.enabled)
        replaced = replaced.replaceAll(
            /{# START SOCIALS #}.*{# END SOCIALS #}/gis,
            ``
        );
    replaced = replaced.replaceAll(
        /{# START SOCIALSLIST #}.*{# END SOCIALSLIST #}/gis,
        socialNetworks
    );
    replaced = replaced.replaceAll(
        /{# START SOCIALS #}.*{% if socialMediaAccounts %}/gis,
        ``
    );
    replaced = replaced.replaceAll(/{% endif %}\s*{# END SOCIALS #}/gis, ``);

    replaced = replaced.replaceAll(
        /{{ company.websiteUrl\|trim\('https:\/\/'\)\|trim\('http:\/\/'\) }}/g,
        organisation?.websiteUrl.replace("https://", "").replace("http://", "")
    );

    // Calendar
    if (!options?.calendar?.enabled)
        replaced = replaced.replaceAll(
            /\{# START CALENDAR #}.*\{# END CALENDAR #}/gis,
            ""
        );

    replaced = replaced.replaceAll(/{# START CALENDAR #}/g, ``);

    replaced = replaced.replace(
        /{% if styles\['calendarEnabled']\['enabled'] is same as\('true'\) %}/,
        ``
    );
    replaced = replaced.replaceAll(/{% endif %}\s*{# END CALENDAR #}/gis, ``);

    // vCard
    if (!options?.vcard?.enabled)
        replaced = replaced.replaceAll(
            /{# START VCARD #}.*{# END VCARD #}/gis,
            ``
        );
    replaced = replaced.replaceAll(/{# START VCARD #}/g, ``);

    replaced = replaced.replace(
        /{% if styles\['vCardEnabled']\['enabled'] is same as\('true'\) %}/,
        ``
    );

    replaced = replaced.replaceAll(/{% endif %}\s*{# END VCARD #}/gis, ``);

    if (options?.event?.enabled) {
        replaced = replaced.replaceAll(/{% if event or isPreview %}/gi, "");
        replaced = replaced.replaceAll(/{% if event %}/gi, "");
        replaced = replaced.replaceAll(
            /{% if styles\['event']\['enabled'] is same as\( 'true' \) %}/gi,
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
