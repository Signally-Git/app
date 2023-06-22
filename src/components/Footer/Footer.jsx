import { useIntl } from "react-intl";
import classes from "./Footer.module.css";
const Footer = () => {
    const intl = useIntl();

    return (
        <ul className={classes.footer}>
            <li>
                <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href="https://uploads-ssl.webflow.com/63a0947d3cde593dde044145/6475c9864b866ca5ce658ca8_Mentions%20le%CC%81gales%20(2)%20Signally%20(1).pdf"
                >
                    {intl.formatMessage({ id: "buttons.placeholder.legals" })}
                </a>
            </li>
            <li>-</li>
            <li>
                <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href="https://uploads-ssl.webflow.com/63a0947d3cde593dde044145/6475c95aa0ad83b27788fe36_2023%2005%2023%20-%20Politique%20de%20confidentialite%CC%81%20SIGNALLY%20_%20Projet%20V2%20PINT%20clean.pdf"
                >
                    {intl.formatMessage({ id: "buttons.placeholder.tos" })}
                </a>
            </li>
        </ul>
    );
};

export default Footer;
