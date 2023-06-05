import classes from "./landing.module.css";
import { FormattedMessage } from "react-intl";
import PluginGmail from "Assets/icons/gmail.svg";
import Apple from "Assets/icons/appstore.svg";
import PluginsOutlook from "Assets/img/Plugins-Outlook.png";
import React from "react";

export const LandingText = () => {
    return (
        <div className={classes.landingContainer}>
            <div className={classes.descriptionBeta}>
                <FormattedMessage id="welcome.title" tagName="h1" />
                <FormattedMessage id="welcome.intro" tagName="p" />
                <FormattedMessage id="welcome.description1" tagName="p" />
                <FormattedMessage id="welcome.description2" tagName="p" />
                <FormattedMessage id="welcome.thanks" tagName="p" />
                <FormattedMessage id="welcome.signature" tagName="p" />
                <br />
                <ul>
                    <li>
                        <img
                            alt="Gmail"
                            className={classes.plugins}
                            src={PluginGmail}
                        />
                    </li>
                    <li>
                        <img
                            alt="Apple"
                            className={classes.plugins}
                            src={Apple}
                        />
                    </li>
                    <li>
                        <img
                            alt="Outlook"
                            className={classes.plugins}
                            src={PluginsOutlook}
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
};
