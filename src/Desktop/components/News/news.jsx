import React from "react";
import classes from "./news.module.css";
import { BiHelpCircle } from "react-icons/bi";
import OnBoarding from "./onBoarding/onBoarding";
import { Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import parse from "html-react-parser";
import { API } from "config";
import request from "Utils/Request/request";
import 'swiper/swiper.min.css';

function News({ organisation, loading, setLoading }) {
    const [slides, setSlides] = React.useState(['']);
    const [admin, setAdmin] = React.useState({ signature: { name: "" }, compiledSignature: "test" })
    const [onboardingComplete, setOnboardingComplete] = React.useState(false)

    React.useEffect(() => {
        async function getAdminData() {
            await request.get("whoami").then((res) => {
                setAdmin(res.data);
            });
        }
        getAdminData();

        setLoading(loading + 1)
    }, [organisation])

    React.useEffect(() => {
        const toPush = []

        // if (onboardingComplete !== true){
            toPush.push(<><OnBoarding organisation={organisation} completed={onboardingComplete} setCompleted={setOnboardingComplete} /></>)
        // }

        if (admin?.compiledSignature)
            toPush.push(<>
                {/* {onboardingComplete ? <BiHelpCircle onClick={() => setOnboardingComplete('show')} title="Onboarding" /> : ""} */}
                <h5>Signature active <span className={classes.orangeTxt}>{admin.signature.name}</span></h5>
                <br />
                {parse(admin.compiledSignature)}
            </>)

        if (admin.events?.[0]?.name)
            toPush.push(<>
                {/* {onboardingComplete ? <BiHelpCircle onClick={() => setOnboardingComplete(false)} title="Onboarding" /> : ""} */}
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
            </>)
        setSlides(toPush)
    }, [onboardingComplete, organisation, admin])

    return (<div className={classes.container}>
        <Swiper modules={[Pagination, A11y, Autoplay]}
            spaceBetween={50}
            className={classes.swiper}
            // autoplay={true}
            // allowTouchMove={false}
            autoHeight
            pagination={{ type: 'bullets', clickable: true }}
            onSlideChange={(e) => console.log(e)}
        >

            {slides?.map((slide) => {
                return (<SwiperSlide>
                    {slide}
                </SwiperSlide>)
            })}
            {/* OnBoarding module with conditions */}
            {/* {!onboardingComplete ? <BiHelpCircle onClick={() => setOnboardingComplete(false)} title="Onboarding" />} */}

            {/* Active admin signature slide if any */}

            {/* Active admin event slide if any */}
            {/* {admin.events?.[0]?.name &&
                <SwiperSlide>
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
                </SwiperSlide>} */}
        </Swiper>

    </div>
    );
}

export default News;
