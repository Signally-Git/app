import React from "react";
import classes from "./news.module.css";
import OnBoarding from "./onBoarding/onBoarding";
import { Pagination, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import parse from "html-react-parser";
import request from "Utils/Request/request";
import moment from "moment";

import "swiper/swiper.min.css";
import { TokenService, useOrganisation } from "Utils";

function News({ loading, setLoading }) {
    const user = TokenService.getUser();
    const organisation = useOrganisation(user);
    const [slides, setSlides] = React.useState([""]);
    const [swipe, setSwipe] = React.useState();
    const [admin, setAdmin] = React.useState({
        signature: { name: "" },
        compiledSignature: "",
    });
    const [onboardingComplete, setOnboardingComplete] = React.useState(false);

    React.useEffect(() => {
        setAdmin(user);
        setLoading(loading + 1);
    }, [organisation]);

    React.useEffect(() => {
        if (!organisation) return;
        setSlides([]);
        const toPush = [];

        toPush.push(
            <>
                <OnBoarding
                    organisation={organisation}
                    completed={onboardingComplete}
                    setCompleted={setOnboardingComplete}
                />
            </>
        );
        setSlides(toPush);
    }, [onboardingComplete, admin, organisation]);

    React.useEffect(() => {
        setTimeout(() => {
            swipe?.updateAutoHeight();
        }, 10);
    }, [onboardingComplete]);

    return (
        <div className={classes.container}>
            <Swiper
                modules={[Pagination, A11y, Autoplay]}
                spaceBetween={50}
                className={classes.swiper}
                allowTouchMove={false}
                autoHeight={true}
                onInit={(e) => {
                    setSwipe(e);
                }}
                pagination={{ type: "bullets", clickable: true }}
            >
                {slides?.map((slide, index) => {
                    return <SwiperSlide key={index}>{slide}</SwiperSlide>;
                })}
            </Swiper>
        </div>
    );
}

export default News;
