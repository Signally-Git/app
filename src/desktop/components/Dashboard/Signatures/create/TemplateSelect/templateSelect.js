import classes from './templateSelect.module.css'
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useState } from 'react';
import Template from './template';

// Displaying the list of bought and free templates (Studio, Store) and allows to select one to create custom signature

const templateAPI = [{
    id: 1, alignment: "Horizontal", tags: ["studio"], html: `<div style="font-family:PLACEHOLDER_GENERAL_FONT; width: 380px;">
    PLACEHOLDER_SALUTATION
    PLACEHOLDER_BANNER
<table>
    <tr>
        <table style="margin-bottom: 12px; margin-top: 0;  border-collapse: collapse; border-spacing: 0;">
            <tbody>
                <tr>
                    <td style="line-height: 0">
                        <img style="margin: 0 4px 0 0; padding: 0; width: 108px; height: 108px;" src='PLACEHOLDER_COMPANY_ICON'
                            alt='PLACEHOLDER_COMPANY' />
                    </td>
                    <td
                        style="box-sizing: border-box; border-radius: 4px; width: 264px; height: 108px;  padding: 12px;background-color: PLACEHOLDER_DIV_COLOR; ">
                        <p
                            style="line-height: 0px; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;">
                            <span style="PLACEHOLDER_FIRST_NAME_STYLE;">PLACEHOLDER_FIRST_NAME</span>
                            <span style="PLACEHOLDER_LAST_NAME_STYLE;">PLACEHOLDER_LAST_NAME</span>
                        </p>
                        <p
                            style="line-height: 0px;  font-weight:200; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;PLACEHOLDER_POSTE_STYLE;">
                            PLACEHOLDER_POSITION</p>
                        <p
                            style="line-height: 0px; margin: 0; margin-top: 7px; line-height:14px; padding: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;PLACEHOLDER_COMPANY_STYLE;">
                            PLACEHOLDER_COMPANY</p>
                        <p
                            style="line-height: 0px;  font-weight:200; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;PLACEHOLDER_ADDRESS_STYLE;">
                            PLACEHOLDER_ADDRESS</p>
                        <p style="line-height: 0px; margin: 0; padding: 0;">
                            <span
                                style=" font-weight:600; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;">T</span>
                            <span
                                style=" font-weight:200; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;PLACEHOLDER_PHONE_STYLE;">
                                PLACEHOLDER_MOBILE</span>
                            <span
                                style=" font-weight:600; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;">M</span>
                            <span
                                style=" font-weight:200; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;font-size:PLACEHOLDER_GENERAL_FONTSIZE;PLACEHOLDER_MOBILE_STYLE;">
                                PLACEHOLDER_PHONE</span>
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
                    <td style="line-height: 0">
                    PLACEHOLDER_EVENT_BANNER
                </tr>
                <tr>
                    <td style="box-sizing: border-box; background-color: #000; border-radius: 4px; padding: 8px 12px; height: 38px; width: 380px; ">
                    <div style="padding-top: 3px">
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
</div>`}, {
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