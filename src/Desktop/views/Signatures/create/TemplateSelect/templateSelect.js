import classes from './templateSelect.module.css'
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useState } from 'react';
import Template from './template';
import Button from 'Utils/Button/btn';

// Displaying the list of bought and free templates (Studio, Store) and allows to select one to create custom signature

const templateAPI = [{
    id: 1, alignment: "Horizontal", tags: ["studio"], html: `<!--[if mso]>
    <style type="text/css">
    body, table, td {font-family: Helvetica, Arial sans-serif !important; mso-line-height: exactly; line-height: 1%; line-height: 1px; 0; border-collapse: collapse; }
    p {margin: 0!important; padding: 0!important; margin-block-start: 0; margin-block-end: 0}
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
                                                width="108" valign="middle"
                                                src='PLACEHOLDER_COMPANY_ICON'
                                                alt='PLACEHOLDER_COMPANY' />
                                        </span>
    
                                    </p>
                                </td>
                                <td valign="middle" style="box-sizing: border-box; border: none; padding: 0;">
                                    <table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0"
                                        style="border-collapse:collapse; border:none; border-color: #fce750;">
                                        <tbody>
                                            <tr>
                                                <td style="background: #fce750; width: 12px;">
                                                    <img style="margin: 0!important;padding:0; display: block;" src="https://api.staging.signally.io/images//yellow-left-61d32efd2cec8.png" />
                                                </td>
                                                <td
                                                    style="box-sizing: border-box; border: none; background: #fce750; font-size: 8pt; height: 94px; width: 240px">
                                                    <table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0"
                                                        style="border-collapse:collapse; border:none; font-size: 8pt;">
                                                        <tbody>
                                                            <tr height="1">
                                                                <td style="font-size: 8pt;">
                                                                    <b style="color:black; font-size: 8pt;font-family: Helvetica; font-size: 11px;">PLACEHOLDER_FIRST_NAME</b>
                                                                    <b style="color:black;font-size: 8pt;font-family: Helvetica; font-size: 11px;">PLACEHOLDER_LAST_NAME</b>
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
                                                                    <b style="color:black;font-family: Helvetica; font-size: 11px;">PLACEHOLDER_COMPANY</b>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span style="color:black;font-family: Helvetica; font-size: 11px;">PLACEHOLDER_ADDRESS_STREET PLACEHOLDER_ADDRESS_INFO</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span style="color:black;font-family: Helvetica; font-size: 11px;">
                                                                        PLACEHOLDER_ADDRESS_ZIPCODE PLACEHOLDER_ADDRESS_CITY PLACEHOLDER_ADDRESS_COUNTRY</span>
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
                                                <td style="background: #fce750; width: 12px;">
                                                <img style="margin: 0!important;padding:0; display: block;" src="https://api.staging.signally.io/images//yellow-right-61d32f319d093.png" />
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
                    <img style="padding: 0cm; width: 380px; height: 126px;" height="126" width="380"
                        src="PLACEHOLDER_EVENT_BANNER" alt='Event' />
                </td>
            </tr>
            <tr>
                <td style="width:380px; box-sizing: border-box; border: none;">
                    <table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0"
                        style="border:none; ">
                        <tbody>
                            <tr>
                                <td style="border-collapse:collapse; background: #000">
                                    <img height="49" style="height: 49px; display:block" src="https://api.staging.signally.io/images//black-left-61d32b6ec2709.png" />
                                </td>
                                <td style="background: black">
                                    <table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td width="360"  style="width:360px; border: none; background:black; padding: 0cm"
                                                    valign="middle">
                                                    <table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                nowrap
                                                                    style="width:65px; border: none; background:black; padding: 0cm; font-size: 9.5pt;">
                                                                    <p class="x_MsoNormal" style="vertical-align: middle;margin: 0"><b
                                                                            style="color:white; font-family: Helvetica; font-size: 12px; vertical-align: text-top;" nowrap>Follow
                                                                            us</b></p>
                                                                </td>
                                                                <td style="width:230px; border: none; background:black; padding: 0cm; height: 24px;"
                                                                height="24"
                                                                    valign="middle" nowrap>
                                                                    <table class="x_MsoTableGrid" border="0" cellspacing="0"
                                                                        cellpadding="0" height="24">
                                                                        <tbody height="24">
                                                                            <tr height="24">
                                                                                <td height="24" width="24" style="height:24px; width:24px; margin: 0 auto; text-align: left; padding: 0 2px;" valign="top">
                                                                                    <a href="https://www.facebook.com/MamaShelterOfficial/" height="24" width="24" style="height:24px; width:24px">
                                                                                    <img height="24"
                                                                                            width="24"
                                                                                            style="vertical-align: middle; display: block; height:24px; width:24px; line-height:24px;"
                                                                                            src='https://api.staging.signally.io/images//iconmonstr-facebook-4-48-1-61cc73165961b.png'
                                                                                            alt='' />
                                                                                    </a>
                                                                                </td>
                                                                                <td height="24" width="24" style="height:24px; width:24px; margin: 0 auto; text-align: left; padding: 0 2px;" valign="top">
                                                                                <a href="https://www.linkedin.com/company/mama-shelter" height="24" width="24" style="height:24px; width:24px">
                                                                                <img height="24"
                                                                                        width="24"
                                                                                        style="vertical-align: middle; display: block; height:24px; width:24px; line-height:24px;"
                                                                                        src='https://api.staging.signally.io/images//iconmonstr-linkedin-4-48-61cc7336e67e8.png'
                                                                                        alt='' />
                                                                                </a>
                                                                            </td>
                                                                            <td height="24" width="24" style="height:24px; width:24px; margin: 0 auto; text-align: left; padding: 0 2px;" valign="top">
                                                                            <a href="https://twitter.com/mama_shelter/" height="24" width="24" style="height:24px; width:24px">
                                                                            <img height="24"
                                                                                    width="24"
                                                                                    style="vertical-align: middle; display: block; height:24px; width:24px; line-height:24px;"
                                                                                    src='https://api.staging.signally.io/images//iconmonstr-twitter-4-48-61cc7355e7d05.png'
                                                                                    alt='' />
                                                                            </a>
                                                                        </td>
                                                                        <td height="24" width="24" style="height:24px; width:24px; margin: 0 auto; text-align: left; padding: 0 2px;" valign="top">
                                                                        <a href="https://www.instagram.com/mamashelter/" height="24" width="24" style="height:24px; width:24px">
                                                                        <img height="24"
                                                                                width="24"
                                                                                style="vertical-align: middle; display: block; height:24px; width:24px; line-height:24px;"
                                                                                src='https://api.staging.signally.io/images//iconmonstr-instagram-14-48-61cc732d0e0eb.png'
                                                                                alt='' />
                                                                        </a>
                                                                    </td>
                                                                    <td height="24" width="24" style="height:24px; width:24px; margin: 0 auto; text-align: left; padding: 0 2px;" valign="top">
                                                                    <a href="https://www.snapchat.com/add/mamashelter" height="24" width="24" style="height:24px; width:24px">
                                                                    <img height="24"
                                                                            width="24"
                                                                            style="vertical-align: middle; display: block; height:24px; width:24px; line-height:24px;"
                                                                            src='https://api.staging.signally.io/images//iconmonstr-snapchat-4-48-61cc734da01ca.png'
                                                                            alt='' />
                                                                    </a>
                                                                </td>
                                                                <td height="24" width="24" style="height:24px; width:24px; margin: 0 auto; text-align: left; padding: 0 2px;" valign="top">
                                                                <a href="https://www.pinterest.fr/mamashelter/" height="24" width="24" style="height:24px; width:24px">
                                                                <img height="24"
                                                                        width="24"
                                                                        style="vertical-align: middle; display: block; height:24px; width:24px; line-height:24px;"
                                                                        src='https://api.staging.signally.io/images//iconmonstr-pinterest-1-48-61cc73437269b.png'
                                                                        alt='' />
                                                                </a>
                                                            </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                                <td style="width:55px; border: none; background:black; padding: 0cm; height: 24px" height="24">
                                                                    <img height="24" style="vertical-align: middle; height: 24px;"
                                                                        src="https://api.staging.signally.io/images//mama-61c0f1b6cbc19.png" />
                                                                </td>
                                                            </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                    </table>
                                </td>
                                <td>
                                    <img height="49" style="height: 49px; display:block" src="https://api.staging.signally.io/images//black-right-61d32791caeb7.png" />
                                </td>
                            </tr>
                        </tbody>
                </td>
        </tbody>
    </table>`}]

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
            <div className={classes.btnContainer}>
                <Button color="orange" width={'5rem'} onClick={(e) => { e.preventDefault(); props.showFunction() }}>Annuler</Button>
            </div>
        </form>
    </div>)
}