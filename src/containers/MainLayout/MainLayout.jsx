import React, { useEffect, useState } from "react";
import { AppMenu, Header, Footer } from "components";
import classes from "./MainLayout.module.scss";
import { TokenService, request } from "utils";

export default function MainLayout({ path, children }) {
    const [user, setUser] = useState(TokenService.getUser());
    const [organisation, setOrganisation] = useState(null);

    useEffect(() => {
        const sseUser = new EventSource(
            `${process.env.REACT_APP_HUB_URL}${user["@id"]}`
        );
        const sseOrganisation = new EventSource(
            `${process.env.REACT_APP_HUB_URL}${user.organisation}`
        );

        const getRealtimeDataOrganisation = (data) => {
            setOrganisation((prevOrganisation) => ({
                ...prevOrganisation,
                ...data,
            }));
            TokenService.setOrganisation((prevOrganisation) => ({
                ...prevOrganisation,
                ...data,
            }));
        };

        sseOrganisation.onmessage = (e) => {
            const data = JSON.parse(e.data);
            getRealtimeDataOrganisation(data);
        };

        const getRealtimeDataUser = (data) => {
            setUser((prevUser) => ({
                ...prevUser,
                ...data,
            }));
            TokenService.setUser((prevUser) => ({
                ...prevUser,
                ...data,
            }));
        };

        sseUser.onmessage = (e) => {
            const data = JSON.parse(e.data);
            getRealtimeDataUser(data);
        };

        request
            .get(user.organisation)
            .then((response) => {
                const org = { ...response.data, "@id": user.organisation };
                setOrganisation(org);
                TokenService.setOrganisation(org);
            })
            .catch((err) => console.log(err));
    }, []);

    const renderOrganisationLogo = () => {
        if (organisation?.logo?.url) {
            return <img src={organisation.logo.url} alt={organisation.name} />;
        }
        return <p className={classes.capitalize}>{organisation?.name}</p>;
    };

    return (
        <div className={classes.desktop}>
            <div className={classes.desktopSubcontainer}>
                <Header page={path || ""} user={user} />
                <div className={classes.mainContent}>
                    <div className={classes.menuContainer}>
                        <div className={classes.userInfos}>
                            {renderOrganisationLogo()}
                        </div>
                        <AppMenu page={path} />
                    </div>
                    <div className={classes.dashboardContainer}>{children}</div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
