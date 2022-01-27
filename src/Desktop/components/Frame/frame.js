import Menu from "Desktop/components/Menu/Menu";
import Header from "Desktop/components/Header/Header";
import { useEffect, useMemo, useState } from "react";
import classes from "./frame.module.scss";
import request from "Utils/Request/request";
import { API } from "config";

export default function Frame(props) {
    const [user, setUser] = useState()
    const [organisation, setOrganisation] = useState()
    const [update, setUpdate] = useState()


    // const es = new EventSource(`https://hub.signally.io/.well-known/mercure?topic=https://api.beta.signally.io${JSON.parse(localStorage.getItem('user')).organisation}`)

    // es.onmessage = function (e) {
    //     setUpdate(JSON.parse(e.data))
    // }

    useEffect(async () => {
        const logUser = await request.get('whoami')
        setUser(logUser.data)
        const organisation = await request.get(logUser.data.organisation)

        console.log(organisation)
        setOrganisation(organisation.data)
    }, [])

    useEffect(() => {
        const sseUser = new EventSource(`https://hub.signally.io/.well-known/mercure?topic=https://api.beta.signally.io${JSON.parse(localStorage.getItem('user'))?.['@id']}`);
        const sse = new EventSource(`https://hub.signally.io/.well-known/mercure?topic=https://api.beta.signally.io${JSON.parse(localStorage.getItem('user'))?.organisation}`);
        function getRealtimeData(data) {
            setOrganisation(data)
        }
        sse.onmessage = e => getRealtimeData(JSON.parse(e.data));

        function getRealtimeData(data) {
            setUser(data)
        }
        sseUser.onmessage = e => getRealtimeData(JSON.parse(e.data));
        // sse.onerror = () => {
        //     sse.close();
        // }
        return () => {
            sse.close();
        };
    }, [update])

    return (<>
        <div className={classes.desktop}>
            <div className={classes.desktopSubcontainer}>
                <Header page={props.path || ""} user={user} />
                <div className={classes.mainContent}>
                    <div className={classes.menuContainer}>
                        <div className={classes.userInfos}>
                            <img src={organisation?.logo ? (API + organisation?.logo.path) : 'https://dummyimage.com/108/f4eeef.png'} alt='' />
                            <p className={classes.capitalize}>{organisation?.name}</p>
                        </div>
                        <Menu className={classes.menu} page={props.path} />
                    </div>

                    <div className={classes.dashboardContainer}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    </>)
}