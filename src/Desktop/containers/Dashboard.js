import classes from "../components/Dashboard/dashboard.module.css";
import Tiles from "../components/Dashboard/tiles";
import Signatures from "../views/Signatures/signatures";
import Events from "../views/Events/events";
import CreateEvent from "../views/Events/CreateEvent/createEvent";
import { useEffect, useState } from "react";
import Profile from "../views/Profile/profile";
import Users from "../views/Users/users";
import CreateSignature from "../views/Signatures/create/createSignature";
import { UseEvents } from "Utils/useEvents/useEvents";
import request from "Utils/Request/request";
import News from "Desktop/components/News/news";
import { useHistory } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import StatsPage from "../components/Statistics/Stats.page";

let count = 0;

function Dashboard(props) {
    const [isHeader, setIsHeader] = useState("");
    const [createEvent, setCreateEvent] = useState(null);
    const [user, setUser] = useState();
    // const [template, setTemplate] = useState()
    // const [templateName, setTemplateName] = useState()
    const [data, setData] = useState([]);
    const [organisation, setOrganisation] = useState();
    const [loadingTiles, setLoadingTiles] = useState(false);
    const [loadingNews, setLoadingNews] = useState(false);

    useEffect(() => {
        request.get(`whoami`).then(async (res) => {
            let users;
            setUser(res.data);
            // setTemplate(res.data?.compiledSignature)
            // setTemplateName(res.data?.signature?.name)
            await request.get("users").then((r) => (users = r.data));
            await request.get(res.data?.organisation).then((r) => {
                setOrganisation({
                    ...r.data,
                    ...organisation,
                    users: users["hydra:member"],
                });
            });
        });
        setOrganisation(JSON.parse(localStorage.getItem("organisation")));
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(() => {
        setLoadingNews(false);
        setLoadingTiles(false);
    }, []);

    useEffect(() => {
        const getEvents = async () => {
            const eventAPI = await UseEvents(
                localStorage.getItem("organisation_id"),
                "active"
            );
            // setActiveEvents(eventAPI)
        };
        getEvents();
        count = 0;
    }, []);

    useEffect(() => {
        setData({
            logo: organisation?.logo?.path,
            firstName: user?.first_name,
            lastName: user?.last_name,
            jobName: user?.position,
            entity: organisation?.name,
            address: organisation?.address,
            mobile: user?.phone_number,
            phone: organisation?.phone_number,
        });
    }, []);

    return (
        <>
            {props.page === "home" ? (
                <>
                    {/* <h1 className={classes.h1}>Bonjour {JSON.parse(localStorage.getItem('user'))?.first_name}</h1> */}
                    <h1 className={classes.title}>
                        Dashboard{" "}
                        {!loadingNews || !loadingTiles ? (
                            <AiOutlineLoading3Quarters />
                        ) : (
                            ""
                        )}
                    </h1>

                    <div
                        className={`${classes.row} ${
                            !loadingNews || !loadingTiles ? classes.load : ""
                        }`}
                    >
                        {organisation ? (
                            <News
                                organisation={organisation}
                                loading={loadingNews}
                                setLoading={setLoadingNews}
                            />
                        ) : null}
                        <div className={classes.col}>
                            <div className={classes.tilesContainer}>
                                <Tiles
                                    handleHeader={setIsHeader}
                                    loading={loadingTiles}
                                    setLoading={setLoadingTiles}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className={classes.spacer}></div> */}
                </>
            ) : props.page === "teams" ? (
                <>
                    <Users />
                </>
            ) : props.page === "statistics" ? (
                <>
                    <StatsPage />
                </>
            ) : props.page === "signatures" ? (
                <>
                    <Signatures />
                </>
            ) : props.page === "create-signature" ? (
                <>
                    <CreateSignature />
                </>
            ) : props.page === "events" ? (
                <>
                    <Events />
                </>
            ) : props.page === "create-event" ? (
                <>
                    <CreateEvent handleHeader={setIsHeader} />
                </>
            ) : props.page === "profile" ? (
                <>
                    <Profile
                        handleHeader={setIsHeader}
                        header={isHeader}
                        create={setCreateEvent}
                    />
                </>
            ) : null}
        </>
    );
}

export default Dashboard;
