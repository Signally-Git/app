import React from "react";
import classes from "./news.module.css";
import OnBoarding from "./onBoarding/onBoarding";
import { Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import parse from "html-react-parser";
import { API } from "config";
import request from "Utils/Request/request";
import moment from "moment";

import 'swiper/swiper.min.css';

function News({ organisation, loading, setLoading }) {
    const [org, setOrg] = React.useState(organisation)
    const [users, setUsers] = React.useState(organisation.users)
    const [events, setEvents] = React.useState(organisation.events)
    const [slides, setSlides] = React.useState(['']);
    const [swipe, setSwipe] = React.useState()
    const [admin, setAdmin] = React.useState({ signature: { name: "" }, compiledSignature: "test" })
    const [onboardingComplete, setOnboardingComplete] = React.useState(false)

    const refreshOrganisation = async () => {
        request.get('users').then((r) => {
            setUsers(r.data['hydra:member'])
        })
        request.get('events').then((r) => {
            setEvents(r.data['hydra:member'])
        })
        await request.get(organisation['@id']).then((res) => {
            setOrg({ ...res.data, users: users, events: events })
        })
    }

    React.useEffect(() => {
        setAdmin(localStorage.getItem('user'));
        refreshOrganisation()
        setLoading(loading + 1)
    }, [organisation])

    React.useEffect(() => {
        setSlides([])
        const toPush = []

        toPush.push(<><OnBoarding organisation={org} completed={onboardingComplete} setCompleted={setOnboardingComplete} /></>)

        if (admin?.compiledSignature)
            toPush.push(<>
                <h5>Signature active <span className={classes.orangeTxt}>{admin.signature.name}</span></h5>
                <br />
                {parse(admin.compiledSignature)}
            </>)

        if (admin.events?.[0]?.name)
            toPush.push(<>
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
                            <span>{`du ${moment.utc(admin.events[0]?.startAt).local(false).format('D MMM YYYY')}`}</span>
                            <span>{`au ${moment.utc(admin.events[0]?.endAt).local(false).format('D MMM YYYY')}`}</span>
                        </div>
                        <div className={classes.col}>
                            <span>{`${moment.utc(admin.events[0]?.startAt).local(false).format('HH:mm')}`}</span>
                            <span>{`${moment.utc(admin.events[0]?.endAt).local(false).format('HH:mm')}`}</span>
                        </div>
                    </span>
                </div>
            </>)
        setSlides(toPush)
    }, [onboardingComplete, organisation, admin, org])

    React.useEffect(() => {
        setTimeout(() => {
            swipe?.updateAutoHeight()
        }, 10);
    }, [onboardingComplete])

    return (<div className={classes.container}>
        <Swiper modules={[Pagination, A11y, Autoplay]}
            spaceBetween={50}
            className={classes.swiper}
            allowTouchMove={false}
            autoHeight={true}
            onInit={(e) => { refreshOrganisation(); setSwipe(e) }}
            pagination={{ type: 'bullets', clickable: true }}
            onSlideChange={(e) => console.log(e)}
        >

            {slides?.map((slide) => {
                return (<SwiperSlide>
                    {slide}
                </SwiperSlide>)
            })}
        </Swiper>

    </div>
    );
}

export default News;
