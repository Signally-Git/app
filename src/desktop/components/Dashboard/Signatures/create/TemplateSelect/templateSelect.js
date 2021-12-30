import classes from './templateSelect.module.css'
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useState } from 'react';
import Template from './template';

// Displaying the list of bought and free templates (Studio, Store) and allows to select one to create custom signature

const templateAPI = [{
    id: 1, alignment: "Horizontal", tags: ["studio"], html: `<!--[if mso]>
<style type="text/css">0
body, table, td {font-family: Helvetica, Arial sans-serif !important; mso-line-height: exactly; line-height: 1%; line-height: 1px; 0}
p {margin: 0; padding: 0; margin-block-start: 0; margin-block-end: 0}
p img {vertical-align: middle !important;}
</style>
<![endif]-->
<table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse; border:0">
    <tbody>
        <tr>
            <td valign="top" style="width:380px; height: 108px; border: none; padding: 0cm">
                <table class="x_MsoTableGrid" border="0" cellspacing="2" cellpadding="2"
                    style="border-collapse:collapse; border:none">
                    <tbody>
                        <tr>
                            <td valign="top" style="width:108px; border: none; padding: 0cm 8px 0 0; font-size: 8.5pt;">
                                <p class="x_MsoNormal" style="height: 108px; margin: 0; padding: 0;" height="108"
                                    valign="middle">
                                    <span style="height: 108px;" height="108">
                                        <img style="width: 108px; height: 108px; vertical-align: middle;" height="108"
                                            width="108" valign="middle" src='PLACEHOLDER_COMPANY_ICON'
                                            alt='PLACEHOLDER_COMPANY' />
                                    </span>

                                </p>
                            </td>
                            <td valign="middle" style="box-sizing: border-box; border: none; padding: 0;">
                                <table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0"
                                    style="border-collapse:collapse; border:none; border-color: PLACEHOLDER_DIV_COLOR;">
                                    <tbody>
                                        <tr>
                                            <td style="height: 4px">
                                                <img style="margin: 0!important;padding:0; display: block;" src="https://api.beta.signally.io/images//left-upper-corner-61cda11101146.png" />
                                            </td>
                                            <td style="background: PLACEHOLDER_DIV_COLOR; height: 4px;"></td>
                                            <td style="height: 4px">
                                                <img style="margin: 0!important;padding:0; display: block;" src="https://api.beta.signally.io/images//right-upper-corner-61cda36084494.png" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="background: PLACEHOLDER_DIV_COLOR; width: 12px;"></td>
                                            <td
                                                style="box-sizing: border-box; border: none; background: PLACEHOLDER_DIV_COLOR; font-size: 8pt; height: 94px; width: 272px">
                                                <table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0"
                                                    style="border-collapse:collapse; border:none; font-size: 8pt;">
                                                    <tbody>
                                                        <tr height="1">
                                                            <td style="font-size: 8pt;">
                                                                <b
                                                                    style="color:black; font-size: 8pt;font-family: Helvetica; font-size: 11px;">PLACEHOLDER_FIRST_NAME</b>
                                                                <b
                                                                    style="color:black;font-size: 8pt;font-family: Helvetica; font-size: 11px;">PLACEHOLDER_LAST_NAME</b>
                                                            </td>
                                                        </tr>
                                                        <tr style="height: 1px">
                                                            <td>
                                                                <span
                                                                    style="color:black; padding: 0cm;font-family: Helvetica; font-size: 11px;">PLACEHOLDER_POSITION</span>
                                                            </td>
                                                        </tr>
                                                        <tr height="5"></tr>
                                                        <tr>
                                                            <td>
                                                                <b
                                                                    style="color:black;font-family: Helvetica; font-size: 11px;">PLACEHOLDER_COMPANY</b>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <span
                                                                    style="color:black;font-family: Helvetica; font-size: 11px;">PLACEHOLDER_ADDRESS_STREET
                                                                    PLACEHOLDER_ADDRESS_INFO</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <span
                                                                    style="color:black;font-family: Helvetica; font-size: 11px;">
                                                                    PLACEHOLDER_ADDRESS_ZIPCODE PLACEHOLDER_ADDRESS_CITY
                                                                    PLACEHOLDER_ADDRESS_COUNTRY</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                PLACEHOLDER_MOBILE
                                                                PLACEHOLDER_PHONE
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td style="background: PLACEHOLDER_DIV_COLOR; width: 12px;"></td>
                                        </tr>
                                        <tr>
                                        <td style="height: 4px">
                                            <img style="margin: 0!important;padding:0; display: block;" src="https://api.beta.signally.io/images//left-lower-corner-61cda38fcfc1f.png" />
                                        </td>
                                        <td style="background: PLACEHOLDER_DIV_COLOR; height: 4px;"></td>
                                        <td style="height: 4px">
                                            <img style="margin: 0!important;padding:0; display: block;" src="https://api.beta.signally.io/images//right-lower-corner-61cda39a862b2.png" />
                                        </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p class="x_MsoNormal"></p>
            </td>
        </tr>
        <tr>
            <td style="border: none; padding: 12px 0">
                <img src="PLACEHOLDER_EVENT_BANNER" style="padding: 0cm; width: 380px; height: 126px;"/>
            </td>
        </tr>
        <tr>
            <td style="width:380px; box-sizing: border-box; border: none;">
                <table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0"
                    style="border:none; border-color:#000;">
                    <tbody>
                        <tr>
                            <td style="height: 8px;">
                                <img style="margin: 0!important;padding:0; display: block;" src="https://api.beta.signally.io/images//black-left-upper-corner-61cda63d6deba.png" />
                            </td>
                            <td style="background: #000; height: 8px;"></td>
                            <td style="height: 8px;">
                                <img style="margin: 0!important;padding:0; display: block;" src="https://api.beta.signally.io/images//black-right-upper-corner-61cda6991cee0.png" />
                            </td>
                        </tr>
                        <tr>
                            <td style="background: #000;width: 10px;"></td>
                            <td>
                                <table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td
                                                style="width:93px; border: none; background:black; padding: 0cm; font-size: 9.5pt;">
                                                <p class="x_MsoNormal"><b
                                                        style="color:white; font-family: Helvetica; font-size: 12px">Follow
                                                        us</b></p>
                                            </td>
                                            <td style="width:220px; border: none; background:black; padding: 0cm"
                                                valign="middle">
                                                <table class="x_MsoTableGrid" border="0" cellspacing="0"
                                                    cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="margin-right: 5px;">
                                                                <a href="https://facebook.com"><img height="24"
                                                                        width="24"
                                                                        style="vertical-align: middle; margin-right: 5px;"
                                                                        src='https://api.staging.signally.io/images//iconmonstr-facebook-4-48-1-61cc73165961b.png'
                                                                        alt='' /></a>
                                                            </td>
                                                            <td style="margin-right: 5px;">
                                                                <a href="https://linkedin.com"><img height="24"
                                                                        width="24"
                                                                        style="vertical-align: middle; margin-right: 5px;"
                                                                        src='https://api.staging.signally.io/images//iconmonstr-linkedin-4-48-61cc7336e67e8.png'
                                                                        alt='' /></a>
                                                            </td>
                                                            <td style="margin-right: 5px;">
                                                                <a href="https://twitter.com"><img height="24"
                                                                        width="24"
                                                                        style="vertical-align: middle; margin-right: 5px;"
                                                                        src='https://api.staging.signally.io/images//iconmonstr-twitter-4-48-61cc7355e7d05.png'
                                                                        alt='' /></a>
                                                            </td>
                                                            <td style="margin-right: 5px;">
                                                                <a href="https://instagram.com">
                                                                    <img src='https://api.staging.signally.io/images//iconmonstr-instagram-14-48-61cc732d0e0eb.png'
                                                                        style="vertical-align: middle; margin-right: 5px;"
                                                                        height="24" width="24" alt='' />
                                                                </a>
                                                            </td>
                                                            <td style="margin-right: 5px;">
                                                                <a href="https://snapchat.com">
                                                                    <img src='https://api.staging.signally.io/images//iconmonstr-snapchat-4-48-61cc734da01ca.png'
                                                                        style="vertical-align: middle; margin-right: 5px;"
                                                                        height="24" width="24" alt='' />
                                                                </a>
                                                            </td>
                                                            <td style="margin-right: 5px;">
                                                                <a href="https://pinterest.com">
                                                                    <img src='https://api.staging.signally.io/images//iconmonstr-pinterest-1-48-61cc73437269b.png'
                                                                        style="vertical-align: middle; margin-right: 5px;"
                                                                        height="24" width="24" alt='' />
                                                                </a>
                                                            </td>

                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td style="width:65px; border: none; background:black; padding: 0cm">
                                                <img height="24" style="vertical-align: middle;"
                                                    src="https://api.staging.signally.io/images//mama-61c0f1b6cbc19.png" />
                                            </td>
                                        </tr>
                                </table>
                            </td>
                            <td style="background: #000; width: 10px;"></td>
                        </tr>
                        <tr>
                            <td style="height: 8px;">
                                <img style="margin: 0!important;padding:0; display: block;" src="https://api.beta.signally.io/images//black-left-lower-corner-61cda6aae6ac8.png" />
                            </td>
                            <td style="background: #000; height: 8px;"></td>
                            <td style="height: 8px;">
                                <img style="margin: 0!important;padding:0; display: block;" src="https://api.beta.signally.io/images//black-right-lower-corner-61cda6baa640b.png" />
                            </td>
                        </tr>
                    </tbody>
            </td>
    </tbody>
</table>`}, {
    id: 0, alignment: "Horizontal", tags: ["classique"], html: `<div style="font-family:PLACEHOLDER_GENERAL_FONT;font-size:PLACEHOLDER_GENERAL_FONTSIZE;">
PLACEHOLDER_SALUTATION
PLACEHOLDER_BANNER
<table>
    <tr>
        <table style="box-sizing: border-box; margin-bottom: 12px; margin-top: 0;  border-collapse: collapse; border-spacing: 0;">
            <tbody>
                <tr>
                    <td style="line-height: 0"><img style="margin: 0 4px 0 0; padding: 0; width: 108px; height: 108px;" src='PLACEHOLDER_COMPANY_ICON'
                            alt='PLACEHOLDER_COMPANY' /></td>
                    <td
                        style="box-sizing: border-box; border-radius: 4px; width: 264px; height: 108px;  padding: 12px;">
                        <p
                            style="line-height: 0px; font-weight:600; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;">
                            <span style="PLACEHOLDER_FIRST_NAME_STYLE;">PLACEHOLDER_FIRST_NAME </span>
                            <span style="PLACEHOLDER_LAST_NAME_STYLE;">PLACEHOLDER_LAST_NAME</span>
                        </p>
                        <p
                            style="line-height: 0px;  font-weight:200; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;">
                            PLACEHOLDER_POSITION</p>
                        <p
                            style="line-height: 0px; margin: 0; margin-top: 7px;  font-weight:600; line-height:14px; padding: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;">
                            PLACEHOLDER_COMPANY</p>
                        <p
                            style="line-height: 0px;  font-weight:200; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;">
                            PLACEHOLDER_ADDRESS</p>
                        <p style="line-height: 0px; margin: 0; padding: 0;">
                            <span
                                style=" font-weight:600; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;">T</span>
                            <span
                                style=" font-weight:200; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;">
                                PLACEHOLDER_PHONE</span>
                            <span
                                style=" font-weight:600; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;">M</span>
                            <span
                                style=" font-weight:200; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;">
                                PLACEHOLDER_MOBILE</span>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </tr>
    <tr>
        <table style="margin-top: 0;  border-collapse: collapse; border-spacing: 0;">
            <tbody>
                <tr>
                    <td style="background-color: #000; border-radius: 4px; padding: 8px 12px; height: 38px; width: 380px; ">
                    <div style="padding-top: 3px; color: #FFF;" >
                        <span style="color: #FFF; font-size: 13px; font-weight: bold;vertical-align:super;margin-right: 4px;">PLACEHOLDER_FOLLOWUS</span>
                        PLACEHOLDER_SOCIALS
                        <a href="https://fr.mamashelter.com/"><img src="https://api.staging.signally.io/images//mama-61c0f1b6cbc19.png" alt="mama shelter" style="margin-left: 42px; height: 24px" /></a>
                      </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </tr>
</table>
PLACEHOLDER_DISCLAIMER
</div>`}]

export default function TemplateSelection(props) {
    const [orientation, setOrientation] = useState("Horizontal")
    const [tag, setTag] = useState(true)
    const handleForm = (e) => {
        props.setTemplate(e.target.value)
    }
    const handleAlignment = (e) => {
        setOrientation(e.target.id)
    }
    const handleStudio = (e) => {
        setTag(e.target.checked)
    }
    return (<div className={classes.modal}>
        <div className={classes.searchContainer}>
            <h1>Choisissez votre modèle de signature</h1>
            <div className={classes.tagsContainer}>
                <form onChange={handleStudio}>
                    <ul className={classes.studioStore}>
                        <li className={`${classes.studio} ${tag ? classes.activeStudio : ""}`}>
                            <input type="checkbox" checked={tag} id="studio" />My Studio
                        </li>
                        <li className={classes.store}>My Store</li>
                    </ul>
                </form>
                <div className={classes.otherTagsContainer}>
                    <ul className={classes.otherTags}>
                        <li>Classique</li>
                        <li>Élegant</li>
                        <li>Créatif</li>
                    </ul>
                </div>
            </div>
            <div className={classes.orientationContainer}>
                <form onChange={handleAlignment}>
                    <label className={classes.radioCtr} htmlFor="horizontal">Horizontal
                        <input type="radio" defaultChecked={true} id="horizontal" name="orientation" />
                        <span className={classes.checkmark}></span>
                    </label>
                    <label className={classes.radioCtr} htmlFor="panoramique">Panoramique
                        <input type="radio" id="panoramique" name="orientation" />
                        <span className={classes.checkmark}></span>
                    </label>
                    <label className={classes.radioCtr} htmlFor="vertical">Vertical
                        <input type="radio" id="vertical" name="orientation" />
                        <span className={classes.checkmark}></span>
                    </label>
                </form>
            </div>
        </div>
        <form onChange={handleForm}>
            <ul className={classes.templatesContainer}>
                {templateAPI.map((template) => {
                    if (template.alignment.toLowerCase() === orientation.toLowerCase())
                        if (tag) {
                            if (template.tags[0].toLowerCase() === "studio") {
                                return (<li key={template.id}>
                                    <input type="radio" name="template" value={template.html} />
                                    <Template template={template.html} socials={props.icons} />
                                </li>)
                            }
                        }
                        else
                            return (<li key={template.id}>
                                <input type="radio" name="template" value={template.html} />
                                <Template template={template.html} socials={props.icons} />
                            </li>)
                })}
                {!tag ? <li style={{ width: "412px", height: "220px" }}></li> : ""}
            </ul>
        </form>
    </div>)
}