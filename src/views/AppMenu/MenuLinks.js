import { FormattedMessage } from "react-intl";
import { IoStatsChart } from "react-icons/io5";
import classes from "./Menu.module.css";
import { MdHelpOutline, MdOutlineAccountCircle } from "react-icons/md";
import React from "react";

const MenuLinks = (props) => {
    const page = props.page || "";
    const today = new Date();

    return [
        {
            to: "/dashboard",
            icon: (
                <svg
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.5 20.5V16C9.5 14.619 10.619 13.5 12 13.5V13.5C13.381 13.5 14.5 14.619 14.5 16V20.5H20V11.914C20 11.384 19.789 10.875 19.414 10.5L12.707 3.79301C12.316 3.40201 11.683 3.40201 11.293 3.79301L4.586 10.5C4.211 10.875 4 11.384 4 11.914V20.5H9.5Z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
            label: <FormattedMessage tagName="label" id="dashboard" />,
            isActive: page.search("/dashboard") !== -1,
        },
        {
            to: "/statistics",
            icon: <IoStatsChart />,
            label: <FormattedMessage tagName="label" id="statistics" />,
            isActive: page.search("/statistics") !== -1,
        },
        {
            to: "/signatures",
            icon: (
                <svg
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18 8H19C20.105 8 21 8.895 21 10V17C21 18.105 20.105 19 19 19H8C6.895 19 6 18.105 6 17V16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.083 15.417H15.916C17.067 15.417 17.999 14.484 17.999 13.334V7.084C18 5.933 17.067 5 15.917 5H5.083C3.933 5 3 5.933 3 7.083V13.333C3 14.484 3.933 15.417 5.083 15.417Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <rect
                        x="6"
                        y="8"
                        width="9"
                        height="3"
                        fill="currentColor"
                    />
                    <line
                        x1="6"
                        y1="12.5"
                        x2="13"
                        y2="12.5"
                        stroke="currentColor"
                    />
                </svg>
            ),
            label: <FormattedMessage tagName="label" id="signatures" />,
            isActive: page.search("signature") !== -1,
        },
        {
            to: "/teams/users",
            icon: (
                <svg
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M20.7925 9.52352C21.5825 10.3136 21.5825 11.5944 20.7925 12.3845C20.0025 13.1745 18.7216 13.1745 17.9315 12.3845C17.1415 11.5944 17.1415 10.3136 17.9315 9.52352C18.7216 8.73349 20.0025 8.73349 20.7925 9.52352"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M14.2026 5.91236C15.4191 7.12884 15.4191 9.10115 14.2026 10.3176C12.9861 11.5341 11.0138 11.5341 9.79732 10.3176C8.58084 9.10116 8.58084 7.12885 9.79732 5.91236C11.0138 4.69588 12.9861 4.69588 14.2026 5.91236"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6.06848 9.52352C6.85851 10.3136 6.85851 11.5944 6.06848 12.3845C5.27845 13.1745 3.99756 13.1745 3.20753 12.3845C2.4175 11.5944 2.4175 10.3136 3.20753 9.52352C3.99756 8.73349 5.27845 8.73349 6.06848 9.52352"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M23 19V17.904C23 16.523 21.881 15.404 20.5 15.404H19.699"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M1 19V17.904C1 16.523 2.119 15.404 3.5 15.404H4.301"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M17.339 19V17.399C17.339 15.466 15.772 13.899 13.839 13.899H10.16C8.227 13.899 6.66 15.466 6.66 17.399V19"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
            label: <FormattedMessage tagName="label" id="teams" />,
            isActive: page.search("team") !== -1,
        },
        {
            to: "/events",
            icon: (
                <div className={classes.event}>
                    <svg
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="2.99625"
                            y="2.99625"
                            width="18.0075"
                            height="18.0075"
                            rx="3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7.99833 6.99792H16.0017"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>{String(today.getDate()).padStart(2, "0")}</span>
                </div>
            ),
            label: <FormattedMessage tagName="label" id="events" />,
            isActive: page.search("event") !== -1,
        },
        {
            to: "/account/company",
            icon: <MdOutlineAccountCircle />,
            label: <FormattedMessage tagName="label" id="account" />,
            isActive: page.search("account") !== -1,
        },
        {
            to: "/help",
            href: "https://support.signally.io/",
            icon: <MdHelpOutline />,
            label: <FormattedMessage tagName="label" id="help" />,
            isActive: page.search("help") !== -1,
        },
    ];
};
export default MenuLinks;
