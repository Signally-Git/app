import { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import classes from "./profile.module.css";
import ChevronRight from "Assets/icons/chevron-right.svg";
import Billing from "./Billing/billing";
import Informations from "./Informations/informations";

function Profile(props) {
    useEffect(() => {
        props.handleHeader("Compte");
        props.create("");
    }, []);

    return (
        <Switch>
            <Route
                path="/profile/informations/:tab"
                render={() => (
                    <>
                        {props.handleHeader("Informations")}
                        <Informations />
                    </>
                )}
            ></Route>
            <Route path="/profile/billing">
                <Billing handleHeader={props.handleHeader} />
            </Route>
            <Route
                path="/profile"
                render={() => (
                    <>
                        {props.handleHeader("Compte")}
                        <div className={classes.container}>
                            <div className={classes.userInfos}>
                                <span className={classes.userName}>
                                    {JSON.parse(localStorage.getItem("user"))
                                        .first_name +
                                        " " +
                                        JSON.parse(localStorage.getItem("user"))
                                            .last_name}
                                </span>
                                <span className={classes.userMail}>
                                    {
                                        JSON.parse(localStorage.getItem("user"))
                                            .email
                                    }
                                </span>
                            </div>
                            <ul>
                                <li>
                                    <Link to="/profile/informations/user">
                                        Informations{" "}
                                        <img
                                            className={classes.chevron}
                                            src={ChevronRight}
                                            alt="Informations"
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/payment">
                                        Paiement{" "}
                                        <img
                                            className={classes.chevron}
                                            src={ChevronRight}
                                            alt="Paiement"
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/billing">
                                        Abonnement{" "}
                                        <img
                                            className={classes.chevron}
                                            src={ChevronRight}
                                            alt="Abonnement"
                                        />
                                    </Link>
                                </li>
                            </ul>
                            <div className={classes.footer}>
                                <span>Mentions légales</span>
                            </div>
                        </div>
                    </>
                )}
            ></Route>
        </Switch>
    );
}

export default Profile;
