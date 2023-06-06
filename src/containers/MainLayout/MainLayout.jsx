import React, { useEffect, useState } from "react";
import { AppMenu, Header, Footer } from "components";
import classes from "./frame.module.scss";
import { TokenService, request } from "utils";

export default function MainLayout({ path, children }) {
    const [user, setUser] = useState(TokenService.getUser);
    const [organisation, setOrganisation] = useState(null);

    useEffect(() => {
        const sseUser = new EventSource(
            `${process.env.REACT_APP_HUB_URL}${user["@id"]}`
        );

        const fetchOrganisation = async () => {
            try {
                const response = await request.get(user.organisation);
                const org = { ...response.data, "@id": user.organisation };
                setOrganisation(org);
                TokenService.setOrganisation(org);
            } catch (error) {
                console.log(error);
            }
        };

        const handleRealtimeData = (data) => {
            setUser((prevUser) => ({ ...prevUser, ...data }));
            TokenService.setUser((prevUser) => ({ ...prevUser, ...data }));
        };

        sseUser.onmessage = (e) => handleRealtimeData(JSON.parse(e.data));

        fetchOrganisation();

        return () => {
            sseUser.close();
        };
    }, [user]);

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
