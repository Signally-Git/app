import Menu from "Desktop/components/Menu/Menu";
import Header from "Desktop/components/Header/Header";
import { Suspense, useEffect, useMemo, useState } from "react";
import classes from "./frame.module.scss";
import request from "Utils/Request/request";
import { API } from "config";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from 'react-router-dom';

export default function Frame(props) {
    const [user, setUser] = useState()
    const [organisation, setOrganisation] = useState()


    // const es = new EventSource(`https://hub.signally.io/.well-known/mercure?topic=https://api.beta.signally.io${JSON.parse(localStorage.getItem('user')).organisation}`)

    // es.onmessage = function (e) {
    //     setUpdate(JSON.parse(e.data))
    // }

    useEffect(() => {
        request.get('whoami').then((res) => {
            setUser(res.data)
            request.get(res.data.organisation).then((r) => {
                setOrganisation(r.data)
            }).catch((err) => console.log(err))
        }).catch((err) => { console.log(err) })


    }, [])

    useEffect(() => {

        const sseUser = new EventSource(`https://hub.signally.io/.well-known/mercure?topic=https://api.beta.signally.io${user?.['@id']}`);

        const sse = new EventSource(`https://hub.signally.io/.well-known/mercure?topic=https://api.beta.signally.io${organisation?.['@id']}`);
        function getRealtimeData(data) {
            setOrganisation(data)
        }
        sse.onmessage = e => getRealtimeData(JSON.parse(e.data));

        function getRealtimeDataUser(data) {
            setUser(data)
        }
        sseUser.onmessage = e => getRealtimeDataUser(JSON.parse(e.data));
        // sse.onerror = () => {
        //     sse.close();
        // }
        return () => {
            sse.close();
            sseUser.close();
        };
    }, [user, organisation])

    return (<>
        {user ?
            <div className={classes.desktop}>
                <div className={classes.desktopSubcontainer}>
                    <Header page={props.path || ""} user={user} />
                    <div className={classes.mainContent}>
                        <div className={classes.menuContainer}>
                            <Link to="/profile/informations/company">
                                <div className={classes.userInfos}>
                                    <img src={organisation?.logo ? (API + organisation?.logo.path) : 'https://dummyimage.com/108/f4eeef.png'} alt='' />
                                    <p className={classes.capitalize}>{organisation?.name}</p>
                                </div>
                            </Link>
                            <Menu className={classes.menu} page={props.path} />
                        </div>

                        <div className={classes.dashboardContainer}>
                            <Suspense fallback={<div>Chargement</div>}>
                                {props.children}
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
            : <div className={classes.loading}><AiOutlineLoading3Quarters /></div>
        }
    </>)
}