import React from "react";
import { Link } from "react-router-dom";
import MenuLinks from "./MenuLinks";
import classes from "./Menu.module.css";

const AppMenu = (props) => {
    const menuItems = MenuLinks(props);
    return (
        <ul className={classes.tabMenu}>
            {menuItems.map((link, index) => {
                if (link)
                    return (
                        <li key={index}>
                            {link.href ? (
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.icon}
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    to={link.to}
                                    className={`${
                                        link.isActive ? classes.active : ""
                                    }`}
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            )}
                        </li>
                    );
                return null;
            })}
        </ul>
    );
};

export default AppMenu;
