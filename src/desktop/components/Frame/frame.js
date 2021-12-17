import Menu from "Desktop/components/Menu/Menu";
import Header from "Desktop/components/Header/Header";
import { useEffect, useState } from "react";
import Notifications from "Utils/Notifications/notifications";
import { UseOrganizationInfos } from "Utils/useOrganizationInfos/useOrganizationInfos";
import { UseUserInfos } from "Utils/useUserInfos/useUserInfos";
import classes from "./frame.module.scss";

export default function Frame(props) {
    const [user, setUser] = useState()
    const [organisation, setOrganisation] = useState()

    const message = { header: "Validé", content: "Signature créée avec succès", status: "valid" }

    useEffect(() => {
        const getUser = async () => {
            setUser(await UseUserInfos(localStorage.getItem("user_id")))
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
                            <img src={organisation?.logo?.path || 'https://dummyimage.com/108/f4eeef.png'} alt='' />
                            <p className={classes.capitalize}>{organisation?.name}</p>
                        </div>
                        <Menu className={classes.menu} page={props.path} />
                        {/* <Notifications msg={message} /> */}
                    </div>

                    <div className={classes.dashboardContainer}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    </>)
}