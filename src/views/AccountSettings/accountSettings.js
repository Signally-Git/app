import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import User from "./Tab/UserSettings";
import Company from "./Tab/CompanySettings";
import Custom from "./Tab/CustomSettings";
import classes from "./accountSettings.module.css";
import { FormattedMessage } from "react-intl";

function AccountSettings() {
    let { tab } = useParams();
    let history = useHistory();
    const [active, setActive] = useState(tab);

    useEffect(() => {
        setActive(tab);
    }, [tab]);

    const handleTabChange = (tab) => {
        setActive(tab);
        const newUrl =
            tab === "user"
                ? "/account/user"
                : tab === "company"
                ? "/account/company"
                : "/account/custom";
        history.push(newUrl);
    };

    return (
        <>
            <FormattedMessage tagName="h1" id="account" />
            <div className={classes.tabContainer}>
                <ul className={classes.menu}>
                    <li
                        onClick={() => handleTabChange("company")}
                        className={active === "company" ? classes.active : ""}
                    >
                        Company
                    </li>
                    <li
                        onClick={() => handleTabChange("user")}
                        className={active === "user" ? classes.active : ""}
                    >
                        User
                    </li>
                    <li
                        onClick={() => handleTabChange("custom")}
                        className={active === "custom" ? classes.active : ""}
                    >
                        Custom Settings
                    </li>
                </ul>
                {tab === "user" ? (
                    <User />
                ) : tab === "company" ? (
                    <Company />
                ) : (
                    <Custom />
                )}
            </div>
        </>
    );
}

export default AccountSettings;
