import React from "react";
import classes from "./onBoarding.module.css";
import { useHistory } from "react-router-dom";
import { Navigation, Pagination, A11y, HashNavigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImCheckmark } from "react-icons/im";
import Button from "Utils/Button/btn";

import "swiper/swiper.min.css";

function OnBoarding({ organisation, completed, setCompleted }) {
    const [swiper, setSwiper] = React.useState(null);
    const [slideIndex, setSlideIndex] = React.useState(0);
    const [missing, setMissing] = React.useState([]);
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
                link: <>Compte</>,
                title: (
                    <>
                        Bienvenue{" "}
                        <span className={classes.orangeTxt}>
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
                            Votre profil contient toutes les informations
                            nécessaires aux templates des signatures.
                            <div className={classes.btnsContainer}>
                                <Button
                                    color="brown"
                                    onClick={() => handleSkip()}
                                >
                                    Passer cette étape
                                </Button>
                                <Button
                                    color="orange"
                                    onClick={() =>
                                        history.push(
                                            "/profile/informations/organisation"
                                        )
                                    }
                                >
                                    Éditer mon profil
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            Vous n'avez pas renseigné toutes les informations
                            requises par certaines templates de signature (
                            {missing.join(", ")})
                            <div className={classes.btnsContainer}>
                                <Button
                                    color="brown"
                                    onClick={() => handleSkip()}
                                >
                                    Passer cette étape
                                </Button>
                                <Button
                                    color="orange"
                                    onClick={() =>
                                        history.push(
                                            "/profile/informations/organisation"
                                        )
                                    }
                                >
                                    Compléter mon profil
                                </Button>
                            </div>
                        </>
                    ),
            },
            {
                link: <>Signature</>,
                title: "Signature",
                done: organisation?.signatures?.length > 0,
                content: (
                    <>
                        {organisation?.signatures?.length > 0 ? (
                            <>
                                Vous avez déjà créé une première signature !
                                <br /> Vous pouvez y accéder dans l'onglet
                                "Signatures".
                                <Button
                                    color="orange"
                                    onClick={() => history.push("/signatures")}
                                >
                                    Gérer mes signatures
                                </Button>
                            </>
                        ) : (
                            <>
                                Vous n'avez pas encore créé de signature.
                                Cliquez ci-dessous pour en ajouter une !
                                <Button
                                    color="orange"
                                    onClick={() =>
                                        history.push(
                                            "/create-signature#onboarding"
                                        )
                                    }
                                >
                                    Créer ma première signature
                                </Button>
                            </>
                        )}
                    </>
                ),
            },
            {
                link: <>Collaborateurs</>,
                title: "Collaborateurs",
                done: organisation?.users?.length > 1,
                content: (
                    <>
                        {organisation?.users?.length > 1 ? (
                            <>
                                Vous avez déjà importé des collaborateurs.{" "}
                                <Button
                                    color="orange"
                                    onClick={() => history.push("/teams/users")}
                                >
                                    Gérer mes collaborateurs
                                </Button>
                            </>
                        ) : (
                            <>
                                Vous n'avez pas encore importé d'autres
                                collaborateurs. Cliquez ci-dessous pour en
                                ajouter et commencer à gérer vos équipes
                                <Button
                                    color="orange"
                                    onClick={() =>
                                        history.push(
                                            "/teams/create-user#onboarding"
                                        )
                                    }
                                >
                                    Ajouter des collaborateurs
                                </Button>
                            </>
                        )}
                    </>
                ),
            },
            {
                link: <>Events</>,
                title: "Events",
                done: organisation?.events?.length > 0,
                content: (
                    <>
                        {organisation?.events?.length > 0 ? (
                            <>
                                Vous avez actuellement créé{" "}
                                {organisation?.events?.length} event(s).
                                <div className={classes.btnsContainer}>
                                    <Button
                                        color="brown"
                                        onClick={() => handleSkip()}
                                    >
                                        Passer cette étape
                                    </Button>
                                    <Button
                                        color="orange"
                                        onClick={() => history.push("/events")}
                                    >
                                        Gérer les events
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                Vous n'avez pas encore créé d'event. Cliquez
                                ci-dessous pour en ajouter et programmer des
                                campagnes de promotion
                                <div className={classes.btnsContainer}>
                                    <Button
                                        color="brown"
                                        onClick={() => handleSkip()}
                                    >
                                        Passer cette étape
                                    </Button>
                                    <Button
                                        color="orange"
                                        onClick={() =>
                                            history.push("/events#onboarding")
                                        }
                                    >
                                        Ajouter un event
                                    </Button>
                                </div>
                            </>
                        )}
                    </>
                ),
            },
        ]);
    }, [swiper, organisation, completed]);

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
                <h5>Félicitations</h5>
                <p>Vous avez complété votre profil Signally avec succès.</p>
                <Button
                    color="orange"
                    style={{ marginRight: "auto", marginLeft: 0 }}
                    onClick={() => setCompleted("show")}
                >
                    Relancer l'onboarding
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
