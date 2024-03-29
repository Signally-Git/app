import React, { useState } from "react";
import classes from "./dashboard.module.css";
import Tiles from "./Tiles/Tiles";
import Signatures from "../Signatures/signatures";
import Events from "../Events/events";
import CreateEvent from "../Events/CreateEvent/createEvent";
import Users from "../Teams/ManageTeams";
import News from "views/News/News";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import StatsPage from "views/Statistics/Stats.page";
import AccountSettings from "../AccountSettings/accountSettings";
import Studio from "../Signatures/Studio/Studio";
import { WhiteLabel } from "../WhiteLabel/WhiteLabel";
import { Deploy } from "../Deploy/Deploy";

const Dashboard = ({ page }) => {
    const [loadingTiles, setLoadingTiles] = useState(false);
    const [loadingNews, setLoadingNews] = useState(0);

    const componentMap = {
        home: (
            <>
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
                    <News loading={loadingNews} setLoading={setLoadingNews} />
                    <div className={classes.col}>
                        <div>
                            <Tiles
                                loading={loadingTiles}
                                setLoading={setLoadingTiles}
                            />
                        </div>
                    </div>
                </div>
            </>
        ),
        teams: <Users />,
        deploy: <Deploy />,
        whiteLabel: <WhiteLabel />,
        statistics: <StatsPage />,
        signatures: <Signatures />,
        "create-signature": <Studio />,
        events: <Events />,
        "create-event": <CreateEvent />,
        account: <AccountSettings />,
    };

    return componentMap[page] || null;
};

export default Dashboard;
