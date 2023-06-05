import Menu from "components/Menu/Menu";
import Header from "components/Header/Header";
import { Suspense, useEffect, useState } from "react";
import classes from "./frame.module.scss";
import request from "Utils/Request/request";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TokenService } from "Utils";
import { FormattedMessage } from "react-intl";
import { Footer } from "../Footer/Footer";

export default function Frame(props) {
    const [user, setUser] = useState(TokenService.getUser);
    const [organisation, setOrganisation] = useState();

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
                                <Suspense
                                    fallback={
                                        <div>
                                            <FormattedMessage id="loading" />
                                        </div>
                                    }
                                >
                                    {props.children}
                                </Suspense>
                            </div>
                            <Footer />
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
