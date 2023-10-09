import classes from "./AuthHomePage.module.css";
import { FormattedMessage } from "react-intl";
import PluginGmail from "assets/icons/gmail.svg";
import Apple from "assets/icons/appstore.svg";
import PluginsOutlook from "assets/img/Plugins-Outlook.png";
import React, { useContext } from "react";
import { ThemeContext } from "contexts/ThemeProvider";

export const WelcomeText = () => {
    const { name } = useContext(ThemeContext);
    return (
        <div className={classes.landingContainer}>
            <div className={classes.descriptionBeta}>
                <FormattedMessage
                    id="welcome.title"
                    tagName="h1"
                    values={{ brandName: name }}
                />
                <FormattedMessage id="welcome.intro" tagName="p" />
                <FormattedMessage
                    id="welcome.description1"
                    tagName="p"
                    values={{ brandName: name }}
                />
                <FormattedMessage id="welcome.description2" tagName="p" />
                <FormattedMessage id="welcome.thanks" tagName="p" />
                <FormattedMessage
                    id="welcome.signature"
                    tagName="p"
                    values={{ brandName: name }}
                />
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
