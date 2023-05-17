import React from "react";
import classes from "./onBoarding.module.css";
import { useHistory } from "react-router-dom";
import { Navigation, Pagination, A11y, HashNavigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImCheckmark } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import Button from "Utils/Button/btn";

import "swiper/swiper.min.css";
import request from "Utils/Request/request";
import Outlook from "Assets/icons/outlook.svg";
import { FormattedMessage } from "react-intl";

function OnBoarding({ organisation, completed, setCompleted }) {
    const [swiper, setSwiper] = React.useState(null);
    const [slideIndex, setSlideIndex] = React.useState(0);
    const [missing, setMissing] = React.useState([]);
    const [events, setEvents] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const history = useHistory();

    const [menu, setMenu] = React.useState([]);

    const handleSkip = () => {
        const missingTabs = menu.filter((element) => element.done === false);
        if (missingTabs.length === 0) setCompleted(true);

        missingTabs[1] && menu.indexOf(missingTabs[1]) > slideIndex
            ? swiper?.slideTo(menu.indexOf(missingTabs[1]))
            : menu.indexOf(missingTabs[0]) > slideIndex
            ? swiper?.slideTo(menu.indexOf(missingTabs[0]))
            : setCompleted(true);
    };

    React.useEffect(() => {
        const getData = () => {
            request.get("events").then((r) => {
                setEvents(r.data["hydra:member"]);
            });
            request.get("users").then((r) => {
                setUsers(r.data["hydra:member"]);
            });
        };
        getData();
    }, []);

    React.useEffect(() => {
        const missingTabs = menu.filter((element) => element.done === false);

        if (missingTabs.length === 0 && completed !== "show")
            setCompleted(true);
        else setCompleted("show");

        const missingArray = [];
        if (!organisation?.logo?.path) {
            missingArray.push(["logo"]);
        }
        if (!organisation?.websiteUrl) {
            missingArray.push(["site Internet"]);
        }
        if (!organisation?.digitalAddress?.phone) {
            missingArray.push(["fixe"]);
        }
        if (!organisation?.address?.street) {
            missingArray.push(["adresse"]);
        }
        setMissing(missingArray);
        setMenu([
            {
                link: <FormattedMessage id="account" />,
                title: (
                    <>
                        <FormattedMessage id="welcome" />
                        <span className={classes.orangeTxt}>
                            {" "}
                            {organisation.name}
                        </span>
                    </>
                ),
                done:
                    organisation.address?.street?.length > 0 &&
                    organisation.websiteUrl?.length > 0 &&
                    organisation.logo?.path?.length > 0,
                content:
                    organisation.address?.street?.length > 0 &&
                    organisation.websiteUrl?.length > 0 &&
                    organisation.logo?.path?.length > 0 ? (
                        <>
                            <FormattedMessage id="onboarding.complete" />
                            <div className={classes.btnsContainer}>
                                <Button
                                    color="brown"
                                    onClick={() => handleSkip()}
                                >
                                    <FormattedMessage id="buttons.placeholder.skip" />
                                </Button>
                                <Button
                                    color="orange"
                                    onClick={() =>
                                        history.push(
                                            "/profile/informations/organisation"
                                        )
                                    }
                                >
                                    <FormattedMessage id="buttons.placeholder.edit_profile" />
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <FormattedMessage id="onboarding.missing_informations" />
                            ({missing.join(", ")})
                            <div className={classes.btnsContainer}>
                                <Button
                                    color="brown"
                                    onClick={() => handleSkip()}
                                >
                                    <FormattedMessage id="buttons.placeholder.skip" />
                                </Button>
                                <Button
                                    color="orange"
                                    onClick={() =>
                                        history.push(
                                            "/profile/informations/organisation"
                                        )
                                    }
                                >
                                    <FormattedMessage id="buttons.placeholder.complete_profile" />
                                </Button>
                            </div>
                        </>
                    ),
            },
            {
                link: <FormattedMessage id="signature.title" />,
                title: <FormattedMessage id="signature.title" />,
                done: organisation?.signatures?.length > 0,
                content: (
                    <>
                        {organisation?.signatures?.length > 0 ? (
                            <>
                                <FormattedMessage id="onboarding.completed.signature" />
                                <Button
                                    color="orange"
                                    onClick={() => history.push("/signatures")}
                                >
                                    <FormattedMessage id="buttons.placeholder.edit_signatures" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <FormattedMessage id="onboarding.missing.signature" />
                                <Button
                                    color="orange"
                                    onClick={() =>
                                        history.push(
                                            "/create-signature#onboarding"
                                        )
                                    }
                                >
                                    <FormattedMessage id="buttons.placeholder.create_signatures" />
                                </Button>
                            </>
                        )}
                    </>
                ),
            },
            {
                link: <FormattedMessage id="employees" />,
                title: <FormattedMessage id="employees" />,
                done: users?.length > 1,
                content: (
                    <>
                        {users?.length > 1 ? (
                            <>
                                <FormattedMessage id="onboarding.completed.employees" />
                                <Button
                                    color="orange"
                                    onClick={() => history.push("/teams/users")}
                                >
                                    <FormattedMessage id="buttons.placeholder.edit_employees" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <FormattedMessage id="onboarding.missing.employees" />
                                <Button
                                    color="orange"
                                    onClick={() =>
                                        history.push(
                                            "/teams/create-user#onboarding"
                                        )
                                    }
                                >
                                    <FormattedMessage id="buttons.placeholder.edit_employees" />
                                </Button>
                            </>
                        )}
                    </>
                ),
            },
            {
                link: <FormattedMessage id="events" />,
                title: <FormattedMessage id="events" />,
                done: events?.length > 0,
                content: (
                    <>
                        {events?.length > 0 ? (
                            <>
                                <FormattedMessage
                                    id="onboarding.completed.events"
                                    values={{ events: events?.length }}
                                />
                                <div className={classes.btnsContainer}>
                                    <Button
                                        color="brown"
                                        onClick={() => handleSkip()}
                                    >
                                        <FormattedMessage id="buttons.placeholder.skip" />
                                    </Button>
                                    <Button
                                        color="orange"
                                        onClick={() => history.push("/events")}
                                    >
                                        <FormattedMessage id="buttons.placeholder.edit_events" />
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <FormattedMessage id="onboarding.missing.events" />
                                <div className={classes.btnsContainer}>
                                    <Button
                                        color="brown"
                                        onClick={() => handleSkip()}
                                    >
                                        <FormattedMessage id="buttons.placeholder.skip" />
                                    </Button>
                                    <Button
                                        color="orange"
                                        onClick={() =>
                                            history.push("/events#onboarding")
                                        }
                                    >
                                        <FormattedMessage id="buttons.placeholder.create_events" />
                                    </Button>
                                </div>
                            </>
                        )}
                    </>
                ),
            },
            {
                link: <FormattedMessage id="sign_in" />,
                title: <FormattedMessage id="sign_in" />,
                done:
                    organisation.google === true ||
                    organisation.office365 === true,
                content: (
                    <>
                        {organisation.google !== true &&
                        organisation.office365 !== true ? (
                            <>
                                <FormattedMessage id="onboarding.missing.plugins.generic" />
                                <div className={classes.btnsContainer}>
                                    <a
                                        target="_blank"
                                        href={`${process.env.REACT_APP_API_URL}/azure/downloadapp`}
                                    >
                                        <Button color="orange">
                                            <img
                                                style={{
                                                    width: "15px",
                                                    marginRight: ".5rem",
                                                }}
                                                alt="Microsoft Outlook"
                                                src={Outlook}
                                            />{" "}
                                            Office 365
                                        </Button>
                                    </a>
                                    <a
                                        target="_blank"
                                        href={`${process.env.REACT_APP_API_URL}/google/downloadapp`}
                                    >
                                        <Button color="orange">
                                            <FcGoogle
                                                style={{ marginRight: ".5rem" }}
                                            />{" "}
                                            Google
                                        </Button>
                                    </a>
                                </div>
                            </>
                        ) : organisation.google === true ? (
                            <FormattedMessage id="onboarding.completed.plugins.google" />
                        ) : organisation.office365 === true ? (
                            <FormattedMessage id="onboarding.completed.plugins.office365" />
                        ) : (
                            <FormattedMessage id="onboarding.completed.plugins.generic" />
                        )}
                    </>
                ),
            },
        ]);
    }, [swiper, organisation, completed, events, users]);

    React.useEffect(() => {
        const missingTabs = menu.filter((element) => element.done === false);
        if (swiper) {
            swiper?.slideTo(menu.indexOf(missingTabs[0]), 100);
            if (
                missingTabs.length === 0 &&
                completed !== "show" &&
                completed !== false
            )
                setCompleted(true);
        }
    }, [swiper, organisation, missing, menu]);

    if (completed === true)
        return (
            <div className={classes.container}>
                <FormattedMessage
                    id="onboarding.congratulations"
                    tagName="h5"
                />
                <FormattedMessage
                    id="onboarding.congratulations_description"
                    tagName="p"
                />
                <Button
                    color="orange"
                    style={{ marginRight: "auto", marginLeft: 0 }}
                    onClick={() => setCompleted("show")}
                >
                    <FormattedMessage id="buttons.placeholder.restart_onboarding" />
                </Button>
            </div>
        );
    return (
        <div className={classes.container}>
            <h5>{menu[slideIndex]?.title}</h5>
            <div className={classes.swiperContainer}>
                <ul className={classes.menuLinks}>
                    {menu.map((element, index) => {
                        return (
                            <li
                                onClick={() => swiper?.slideTo(index)}
                                key={index}
                                className={`${
                                    slideIndex === index ? classes.active : ""
                                } ${
                                    element.done
                                        ? classes.disabled
                                        : classes.enabled
                                }`}
                            >
                                {element.link}{" "}
                                {element.done ? <ImCheckmark /> : ""}
                            </li>
                        );
                    })}
                </ul>
                <Swiper
                    className={classes.swiper}
                    modules={[Navigation, Pagination, A11y, HashNavigation]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    // onInit={() => refreshOrganisation()}
                    direction="vertical"
                    pagination={{ clickable: true }}
                    allowTouchMove={false}
                    onSwiper={(s) => setSwiper(s)}
                    onSlideChange={(e) => setSlideIndex(e.realIndex)}
                >
                    {menu.map((element, index) => {
                        return (
                            <SwiperSlide
                                key={index}
                                className={classes.content}
                            >
                                {element.content}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}

export default OnBoarding;
