import Logo from "Utils/Logo/logo";
import { IoPower } from "react-icons/io5";
import classes from "./header.module.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { TokenService } from "Utils";
import { FormattedMessage, useIntl } from "react-intl";
import SwitchLang from "../../views/Profile/Informations/SwitchLang";

// DATA ATTRIBUTES

// Desktop header
// containing font logo
// studio / store buttons
// profile & log out btn

function Header(props) {
    const [hover, setHover] = useState(false);
    const intl = useIntl();

    let history = useHistory();

    return (
        <div
            className={`${classes.dashboardContainer} ${
                props.landing ? classes.landing : ""
            }`}
        >
            <div className={classes.logoContainer}>
                <Logo />
                {!props.landing ? (
                    <Link to="/report" className={classes.reportContainer}>
                        <div>
                            <span
                                title={intl.formatMessage({ id: "report.bug" })}
                                className={classes.beta}
                            >
                                <FormattedMessage id="report.private_beta" />
                            </span>
                            {props.landing !== true && (
                                <button>
                                    <FormattedMessage id="buttons.placeholder.report_bug" />
                                </button>
                            )}
                        </div>
                    </Link>
                ) : (
                    ""
                )}
            </div>
            {props.landing !== true ? (
                <>
                    <div className={classes.rightSide}>
                        <div className={classes.name}>
                            <div className={classes.nameSize}>
                                {props.user?.firstName}{" "}
                                {props.user?.lastName || (
                                    <FormattedMessage id="profile.title" />
                                )}
                            </div>
                            <ul
                                className={hover ? classes.animateMenu : ""}
                                onMouseOver={() => setHover(true)}
                                onMouseLeave={() =>
                                    setTimeout(() => {
                                        setHover(false);
                                    }, 300)
                                }
                            >
                                <li className={classes.UserName}>
                                    <span>
                                        {props.user?.firstName}{" "}
                                        {props.user?.lastName || (
                                            <FormattedMessage id="profile.title" />
                                        )}
                                    </span>
                                    <FaUser />
                                </li>
                                <li>
                                    <Link to="/profile/informations/user">
                                        <FormattedMessage id="account" />
                                    </Link>
                                </li>
                                {/*<li title={soon}>*/}
                                {/*    <Link to="/billing" className="disabled">*/}
                                {/*        Abonnement*/}
                                {/*    </Link>*/}
                                {/*</li>*/}
                            </ul>
                            <IoPower
                                title={intl.formatMessage({ id: "logout" })}
                                color={"#66433e"}
                                size={"1.2rem"}
                                stroke={"#66433e"}
                                strokeWidth={"15px"}
                                onClick={() => {
                                    TokenService.clearLocalStorage();
                                    history.push("/");
                                }}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <ul className={`${classes.nonLogged}`}>
                        <li>
                            <SwitchLang />
                        </li>
                        <li>
                            <Link to="/dashboard">
                                <FormattedMessage id="sign_in" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/sign-up">
                                <FormattedMessage id="sign_up" />
                            </Link>
                        </li>
                    </ul>
                </>
            )}
        </div>
    );
}

export default Header;
