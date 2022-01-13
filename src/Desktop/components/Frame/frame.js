import Menu from "Desktop/components/Menu/Menu";
import Header from "Desktop/components/Header/Header";
import { useEffect, useState } from "react";
import classes from "./frame.module.scss";
import request from "Utils/Request/request";
import { API } from "config";

export default function Frame(props) {
    const [user, setUser] = useState()
    const [organisation, setOrganisation] = useState()

    useEffect(() => {
        const getUser = async () => {
            const logUser = await request.get('whoami')
            // console.log(logUser)
            setUser(logUser.data)
            const organisation = await request.get(logUser.data.organisation)
            setOrganisation(organisation.data)
        }

        getUser()
    }, [])

    return (<>
        <div className={classes.desktop}>
            <div className={classes.desktopSubcontainer}>
                <Header page={props.path || ""} user={user} />
                <div className={classes.mainContent}>
                    <div className={classes.menuContainer}>
                        <div className={classes.userInfos}>
                            {/* <img src={organisation?.logos[0]?.path ? (API + organisation?.logos[0]?.path) : 'https://dummyimage.com/108/f4eeef.png'} alt='' /> */}
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