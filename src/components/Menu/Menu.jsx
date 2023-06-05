import React from "react";
import { Link } from "react-router-dom";
import classes from "./Menu.module.css";
import MenuLinks from "./MenuLinks";

const Menu = (props) => {
    const menuItems = MenuLinks(props);
    return (
        <ul className={classes.tabMenu}>
            {menuItems.map((link, index) => (
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
                            className={`${link.isActive ? classes.active : ""}`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default Menu;
