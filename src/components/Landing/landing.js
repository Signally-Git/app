import React, { useEffect, useMemo, useState } from "react";
import classes from "./landing.module.css";
import { Route, useHistory, useLocation } from "react-router-dom";
import request from "Utils/Request/request";
import axios from "axios";
import { TokenService } from "Utils";
import { LandingText } from "./LandingText";
import { SignIn } from "./SignIn/SignIn";
import Signup from "./SignUp/SignUp";

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const LandingPage = () => {
    const [error, setError] = useState({ content: "", disappear: false });

    const history = useHistory();
    const query = useQuery();

    useEffect(() => {
        if (TokenService.getLocalToken()) history.push("/dashboard");
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setError((prevError) => ({ ...prevError, disappear: true }));
        }, 5500);

        return () => clearTimeout(timeout);
    }, [error]);

    useEffect(() => {
        async function redirectIfLogged() {
            if (query.get("user")) {
                const magicLink = await request.get(
                    `sign_in${window.location.search}`
                );
                axios
                    .get(`${process.env.REACT_APP_API_URL}/whoami`, {
                        headers: {
                            Authorization: `Bearer ${magicLink.data.token}`,
                        },
                    })
                    .then((result) => {
                        TokenService.setUser({
                            ...magicLink.data,
                            ...result.data,
                        });
                        history.push("/dashboard");
                    });
            }
        }
        redirectIfLogged();
    }, []);

    if (query.get("user")) return <></>;

    return (
        <div
            style={{ background: "#FFF", overflow: "hidden", height: "100vh" }}
        >
            <div className={classes.container}>
                <div className={classes.logInContainer}>
                    <LandingText />
                    <Route exact path={["/", "/sign-in"]}>
                        <SignIn />
                    </Route>
                    <Route path="/sign-up">
                        <Signup />
                    </Route>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
