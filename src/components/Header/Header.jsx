import { SwitchLang } from "components";
import { IoPower } from "react-icons/io5";
import classes from "./header.module.css";
import { Link, useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { TokenService } from "utils";
import { FormattedMessage, useIntl } from "react-intl";
import { ThemeContext } from "contexts/ThemeProvider";

function Header(props) {
    const [hover, setHover] = useState(false);
    const intl = useIntl();
    const { logo } = useContext(ThemeContext);

    let history = useHistory();

    return (
        <div
            className={`${classes.dashboardContainer} ${
                props.landing ? classes.landing : ""
            }`}
        >
            <img className={classes.logo} src={logo} />
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
                                    <Link to="/account/user">
                                        <FormattedMessage id="account" />
                                    </Link>
                                </li>
                            </ul>
                            <IoPower
                                title={intl.formatMessage({ id: "logout" })}
                                className={classes.logout}
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
                    </ul>
                </>
            )}
        </div>
    );
}

export default Header;
