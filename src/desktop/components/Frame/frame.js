import Menu from "Desktop/components/Menu/Menu";
import Header from "Desktop/components/Header/Header";
import { useEffect, useState } from "react";
import { UseOrganizationInfos } from "Utils/useOrganizationInfos/useOrganizationInfos";
import { UseUserInfos } from "Utils/useUserInfos/useUserInfos";
import classes from "./frame.module.scss";
import request from "Utils/Request/request";

export default function Frame(props) {
    const [user, setUser] = useState()
    const [organisation, setOrganisation] = useState()

    useEffect(() => {
        const getUser = async () => {
            const logUser = await request.get('whoami')
            setUser(logUser.data)
            setOrganisation(await UseOrganizationInfos(localStorage.getItem("organisation_id")))
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
                            <img src={organisation?.logos[0] || 'https://dummyimage.com/108/f4eeef.png'} alt='' />
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