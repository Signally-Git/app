import classes from "../components/Dashboard/dashboard.module.css";
import Tiles from "../components/Dashboard/tiles";
import Signatures from "../views/Signatures/signatures";
import Events from "../views/Events/events";
import CreateEvent from "../views/Events/CreateEvent/createEvent";
import { useEffect, useState } from "react";
import Profile from "../views/Profile/profile";
import Users from "../views/Users/users";
import CreateSignature from "../views/Signatures/create/createSignature";
import News from "components/News/news";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TokenService, useOrganisation } from "Utils";
import StatsPage from "components/Statistics/Stats.page";
import { FormattedMessage } from "react-intl";

function Dashboard(props) {
    const [isHeader, setIsHeader] = useState("");
    const user = TokenService.getUser();
    const organisation = useOrganisation(user);
    const [loadingTiles, setLoadingTiles] = useState(false);
    const [loadingNews, setLoadingNews] = useState(0);

    useEffect(() => {}, [organisation]);

    return (
        <>
            {props.page === "home" ? (
                <>
                    <h1 className={classes.title}>
                        <FormattedMessage id="dashboard" />{" "}
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
                        <News
                            loading={loadingNews}
                            setLoading={setLoadingNews}
                        />
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
                    <Profile handleHeader={setIsHeader} header={isHeader} />
                </>
            ) : null}
        </>
    );
}

export default Dashboard;
