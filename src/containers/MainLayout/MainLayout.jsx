import React, { useEffect, useState } from "react";
import { AppMenu, Header, Footer } from "components";
import classes from "./MainLayout.module.scss";
import { TokenService, request } from "utils";

export default function MainLayout({ path, children }) {
    const [user, setUser] = useState(TokenService.getUser);
    const [organisation, setOrganisation] = useState(null);

    useEffect(() => {
        TokenService.setOrganisation({ "@id": user.organisation });
        const sseUser = new EventSource(
            `${process.env.REACT_APP_HUB_URL}${user["@id"]}`
        );

        function getRealtimeDataUser(data) {
            setUser(data);
            TokenService.setUser({
                ...TokenService.getUser(),
                ...data,
            });
        }
        sseUser.onmessage = (e) => getRealtimeDataUser(JSON.parse(e.data));

        request
            .get(user.organisation)
            .then((r) => {
                const org = { ...r.data, "@id": user.organisation };
                setOrganisation(org);
                TokenService.setOrganisation(org);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={classes.desktop}>
            <div className={classes.desktopSubcontainer}>
                <Header page={path || ""} user={user} />
                <div className={classes.mainContent}>
                    <div className={classes.menuContainer}>
                        <div className={classes.userInfos}>
                            {organisation?.logo?.url ? (
                                <img
                                    src={organisation.logo.url}
                                    alt={organisation.name}
                                />
                            ) : (
                                <p className={classes.capitalize}>
                                    {organisation?.name}
                                </p>
                            )}
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
