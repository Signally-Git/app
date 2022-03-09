import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useHistory } from "react-router-dom";
import Button from "Utils/Button/btn";
import classes from "./news.module.css";
import parse from "html-react-parser";
import request from "Utils/Request/request";
import { API } from "config";

function News({ organisation, loading, setLoading }) {
    const [slide, setSlide] = React.useState(0);

    const [activeAcc, setActiveAcc] = React.useState(false);
    const [activeSignature, setActiveSignature] = React.useState(false);
    const [activeUsers, setActiveUsers] = React.useState(false);
    const [activeEvents, setActiveEvents] = React.useState(false);
    const [signatureIndex, setSignatureIndex] = React.useState(0);
    const [change, setChange] = React.useState(0);

    const [admin, setAdmin] = React.useState("");

    const [newsSlider, setNewsSlider] = React.useState([]);
    const [missing, setMissing] = React.useState([]);
    const [hide, setHide] = React.useState(false);
    const [height, setHeight] = React.useState(50);
    const slider = React.useRef(null);
    const sign = React.useRef(null);
    const history = useHistory();

    React.useEffect(() => {
        const missingArray = [];
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
    }, [organisation]);

    React.useEffect(() => {
        async function getAdminData() {
            await request.get("whoami").then((res) => {
                setAdmin(res.data);
            });
        }
        getAdminData();
    }, []);

    React.useEffect(() => {
        const array = [];
        if (!hide)
            array.push(
                <div className={classes.tab} ref={sign}>
                    {slide === 0 ? (
                        <h5>
                            Compte{" "}
                            <span className={classes.orangeTxt}>
                                {organisation?.name}
                            </span>
                        </h5>
                    ) : slide === 1 ? (
                        <h5>Signature</h5>
                    ) : slide === 2 ? (
                        <h5>Collaborateurs</h5>
                    ) : slide === 3 ? (
                        <h5>Events</h5>
                    ) : (
                        ""
                    )}
                    <div className={classes.row}>
                        <ul
                            className={classes.progress}
                            style={{ height: height }}
                        >
                            <li
                                className={`${activeAcc ? classes.done : ""} ${
                                    slide === 0 ? classes.isActive : ""
                                }`}
                                onClick={() => setSlide(0)}
                            >
                                Compte
                            </li>
                            <li
                                className={`${
                                    activeSignature ? classes.done : ""
                                } ${slide === 1 ? classes.isActive : ""}`}
                                onClick={() => setSlide(1)}
                            >
                                Signature
                            </li>

                            {!activeSignature ? (
                                <li
                                    className={classes.disabled}
                                    title={
                                        "Vous devez d'abord créer une signature"
                                    }
                                >
                                    Collaborateurs
                                </li>
                            ) : (
                                <li
                                    className={`${
                                        activeUsers ? classes.done : ""
                                    } ${slide === 2 ? classes.isActive : ""}`}
                                    onClick={() => setSlide(2)}
                                >
                                    Collaborateurs
                                </li>
                            )}

                            <li
                                className={`${
                                    activeEvents ? classes.done : ""
                                } ${slide === 3 ? classes.isActive : ""}`}
                                onClick={() => setSlide(3)}
                            >
                                Events
                            </li>
                        </ul>

                        <Carousel
                            showIndicators={false}
                            selectedItem={slide}
                            showArrows={false}
                            dynamicHeight={false}
                            showThumbs={true}
                        >
                            <div className={classes.slide} ref={slider}>
                                <p>
                                    {missing.length > 0 === true
                                        ? `Vous n'avez pas renseigné toutes les informations requises par certaines templates de signature (${missing.join(
                                              ", "
                                          )})`
                                        : "Votre profil contient toutes les informations nécessaires aux templates des signatures."}
                                </p>
                                <div className={classes.btnsContainer}>
                                    <Button
                                        color="brown"
                                        onClick={() => setSlide(1)}
                                    >
                                        Passer cette étape
                                    </Button>
                                    <Button
                                        color="orange"
                                        onClick={() =>
                                            history.push(
                                                "/profile/informations"
                                            )
                                        }
                                    >
                                        Compléter mon profil
                                    </Button>
                                </div>
                            </div>
                            <div className={classes.slide}>
                                <p>
                                    {activeSignature
                                        ? "Vous avez déjà créé une première signature ! Vous pouvez les voir dans l'onglet Signatures."
                                        : "Vous n'avez pas encore créé de signature. Cliquez ci-dessous pour en ajouter une !"}
                                </p>
                                <Button
                                    color="orange"
                                    onClick={() =>
                                        history.push("/create-signature")
                                    }
                                >
                                    Créer ma première signature
                                </Button>
                            </div>
                            <div className={classes.slide}>
                                <p>
                                    Vous n'avez pas encore importé de
                                    collaborateurs. Cliquez ci-dessous pour en
                                    ajouter et commencer à gérer vos équipes
                                </p>
                                <Button
                                    color="orange"
                                    onClick={() =>
                                        history.push("/teams/create-user")
                                    }
                                >
                                    Gérer les collaborateurs
                                </Button>
                            </div>
                            <div className={classes.slide}>
                                <p>
                                    Vous n'avez pas encore créé d'event. Cliquez
                                    ci-dessous pour en ajouter et programmer des
                                    campagnes de promotion
                                </p>
                                <div className={classes.btnsContainer}>
                                    <Button
                                        color="brown"
                                        onClick={() => {
                                            setHide(true);
                                            setSignatureIndex(50);
                                            setChange(0);
                                        }}
                                    >
                                        Passer cette étape
                                    </Button>
                                    <Button
                                        color="orange"
                                        onClick={() => history.push("/events")}
                                    >
                                        Ajouter des events
                                    </Button>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </div>
            );
        if (activeSignature && admin.compiledSignature) {
            const toPush = (
                <div className={classes.tab} style={{ height: "20rem" }}>
                    <h5>
                        Signature active{" "}
                        <span className={classes.orangeTxt}>
                            {admin.signature?.name}
                        </span>
                    </h5>
                    <div className={classes.previewSign}>
                        {parse(admin.compiledSignature)}
                    </div>
                </div>
            );
            array.push(toPush);
        }
        if (activeEvents && admin?.events[0]?.name) {
            array.push(
                <div className={classes.tab}>
                    <h5>
                        Event actif{" "}
                        <span className={classes.orangeTxt}>
                            {admin.events[0]?.name}
                        </span>
                    </h5>
                    <div className={classes.preview}>
                        <img src={API + admin.events[0]?.imagePath} />
                        <span className={classes.duration}>
                            <div className={`${classes.col} ${classes.bold}`}>
                                <span>{`du ${new Date(
                                    admin.events[0]?.startAt
                                ).toLocaleString([], {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}`}</span>
                                <span>{`au ${new Date(
                                    admin.events[0]?.endAt
                                ).toLocaleString([], {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}`}</span>
                            </div>
                            <div className={classes.col}>
                                <span>{`${new Date(
                                    admin.events[0]?.startAt
                                ).toLocaleString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}`}</span>
                                <span>{`${new Date(
                                    admin.events[0]?.endAt
                                ).toLocaleString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}`}</span>
                            </div>
                        </span>
                    </div>
                </div>
            );
        }
        array.map((slide, index) => {
            if (
                slide.ref?.current?.toString().search("Signature active") ===
                    -1 &&
                slide.ref?.current?.toString().search("Event actif") === -1
            ) {
                setSignatureIndex(index);
            }
        });
        setHeight(slider?.current?.offsetHeight);
        setNewsSlider(array);
    }, [height, slider, slide, admin, hide]);

    React.useEffect(() => {
        if (
            organisation?.address.street &&
            organisation?.websiteUrl?.length > 0 &&
            organisation?.digitalAddress?.phone?.length > 0
        ) {
            setSlide(1);
            setActiveAcc(true);
        }
        if (organisation?.signatures?.length > 0) {
            setSlide(2);
            setActiveSignature(true);
        }
        if (organisation?.users?.length > 1) {
            setSlide(3);
            setActiveUsers(true);
        }
        if (organisation?.events?.length > 0) {
            setActiveEvents(true);
            if (
                organisation?.address.street &&
                organisation?.websiteUrl?.length > 0 &&
                organisation?.digitalAddress?.phone?.length > 0 &&
                organisation?.signatures?.length > 0 &&
                organisation?.users?.length > 1
            ) {
                setHide(true);
                setSignatureIndex(50);
                setChange(0);
            }
        }
        if (organisation) setLoading(true);
    }, [slider, organisation]);

    React.useEffect(() => {
        if (change === newsSlider.length - 1)
            setTimeout(() => {
                setChange(0);
            }, 5000);
    }, [change]);

    return (
        <div className={`${classes.container}`}>
            <Carousel
                dynamicHeight={true}
                showThumbs={true}
                onChange={(e) => {
                    setChange(e);
                }}
                className={change !== signatureIndex ? classes.test : ""}
                autoPlay={hide}
                selectedItem={change}
                interval={5000}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    return (
                        <span
                            className={`${classes.indicator} ${
                                isSelected ? classes.selected : ""
                            }`}
                            onClick={onClickHandler}
                            onKeyDown={onClickHandler}
                            value={index}
                            key={index}
                            role="button"
                            tabIndex={0}
                            aria-label={`${label} ${index + 1}`}
                        ></span>
                    );
                }}
            >
                {newsSlider}
            </Carousel>
        </div>
    );
}

export default News;
