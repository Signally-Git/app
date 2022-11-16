import Menu from "Desktop/components/Menu/Menu";
import Header from "Desktop/components/Header/Header";
import { Suspense, useEffect, useState } from "react";
import classes from "./frame.module.scss";
import request from "Utils/Request/request";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Frame(props) {
    const [user, setUser] = useState();
    const [organisation, setOrganisation] = useState();

    useEffect(() => {
        request
            .get("whoami")
            .then((res) => {
                setUser(res.data);
                const sseUser = new EventSource(
                    `${process.env.REACT_APP_HUB_URL}${res.data["@id"]}`
                );
                const sse = new EventSource(
                    `${process.env.REACT_APP_HUB_URL}${res.data["organisation"]}`
                );

                function getRealtimeData(data) {
                    setOrganisation(data);
                    localStorage.setItem("organisation", JSON.stringify(data));
                }
                sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));

                function getRealtimeDataUser(data) {
                    setUser(data);
                }
                sseUser.onmessage = (e) =>
                    getRealtimeDataUser(JSON.parse(e.data));

                // return () => {
                //     sse.close();
                //     sseUser.close();
                // };
                request
                    .get(res.data.organisation)
                    .then((r) => {
                        setOrganisation(r.data);
                        localStorage.setItem(
                            "organisation",
                            JSON.stringify(r.data)
                        );
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                console.log(err);
            });
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
                                <Menu
                                    className={classes.menu}
                                    page={props.path}
                                />
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
