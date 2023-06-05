import classes from "../components/Dashboard/dashboard.module.css";
import Tiles from "../components/Dashboard/tiles";
import Signatures from "../views/Signatures/signatures";
import Events from "../views/Events/events";
import CreateEvent from "../views/Events/CreateEvent/createEvent";
import { useState } from "react";
import Users from "../views/Users/users";
import CreateSignature from "../views/Signatures/create/createSignature";
import News from "components/News/news";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import StatsPage from "components/Statistics/Stats.page";
import { FormattedMessage } from "react-intl";
import AccountSettings from "../views/AccountSettings/accountSettings";

function Dashboard({ page }) {
    const [loadingTiles, setLoadingTiles] = useState(false);
    const [loadingNews, setLoadingNews] = useState(0);

    return (
        <>
            {page === "home" ? (
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
                                    loading={loadingTiles}
                                    setLoading={setLoadingTiles}
                                />
                            </div>
                        </div>
                    </div>
                </>
            ) : page === "teams" ? (
                <>
                    <Users />
                </>
            ) : page === "statistics" ? (
                <>
                    <StatsPage />
                </>
            ) : page === "signatures" ? (
                <>
                    <Signatures />
                </>
            ) : page === "create-signature" ? (
                <>
                    <CreateSignature />
                </>
            ) : page === "events" ? (
                <>
                    <Events />
                </>
            ) : page === "create-event" ? (
                <>
                    <CreateEvent />
                </>
            ) : page === "account" ? (
                <>
                    <AccountSettings />
                </>
            ) : null}
        </>
    );
}

export default Dashboard;
