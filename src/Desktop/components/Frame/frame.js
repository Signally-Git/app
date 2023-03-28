import Menu from "Desktop/components/Menu/Menu";
import Header from "Desktop/components/Header/Header";
import { Suspense, useEffect, useState } from "react";
import classes from "./frame.module.scss";
import request from "Utils/Request/request";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TokenService } from "Utils/index";

export default function Frame(props) {
    const [user, setUser] = useState(TokenService.getUser);
    const [organisation, setOrganisation] = useState();

    useEffect(() => {
        TokenService.setOrganisation({ "@id": user.organisation });
        const sseUser = new EventSource(
            `${process.env.REACT_APP_HUB_URL}${user["@id"]}`
        );
        const sse = new EventSource(
            `${process.env.REACT_APP_HUB_URL}${user["organisation"]}`
        );
        const sseSocials = new EventSource(
            `${process.env.REACT_APP_HUB_URL}/social_media_accounts`
        );

        function getRealtimeData(data) {
            setOrganisation(data);
            TokenService.setOrganisation(data);
        }
        sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));

        function getRealtimeDataUser(data) {
            setUser(data);
            TokenService.setUser({
                ...TokenService.getUser(),
                ...data,
            });
        }
        sseUser.onmessage = (e) => getRealtimeDataUser(JSON.parse(e.data));

        function getRealtimeDataSocials(data) {
            setOrganisation({ ...organisation, socialMediaAccounts: data });
            TokenService.setOrganisation({ ...organisation, socialMediaAccounts: data });
        }
        sseSocials.onmessage = (e) => getRealtimeDataSocials(JSON.parse(e.data));
        request
            .get(user.organisation)
            .then((r) => {
                setOrganisation(r.data);
                TokenService.setOrganisation(r.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            {user ? (
                <div className={classes.desktop}>
                    <div className={classes.desktopSubcontainer}>
                        <Header page={props.path || ""} user={user} />
                        <div className={classes.mainContent}>
                            <div className={classes.menuContainer}>
                                <div className={classes.userInfos}>
                                    {organisation?.logo?.url ? (
                                        <img
                                            src={organisation?.logo?.url}
                                            alt={organisation?.name}
                                        />
                                    ) : (
                                        <p className={classes.capitalize}>
                                            {organisation?.name}
                                        </p>
                                    )}
                                </div>
                                <Menu page={props.path} />
                            </div>

                            <div className={classes.dashboardContainer}>
                                <Suspense fallback={<div>Chargement</div>}>
                                    {props.children}
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={classes.loading}>
                    <AiOutlineLoading3Quarters />
                </div>
            )}
        </>
    );
}
