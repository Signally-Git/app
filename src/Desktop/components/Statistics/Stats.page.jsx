import { useEffect, useState } from "react";
import {
    getEntities,
    getStatisticsFromEntity,
    mergeArrays,
} from "./Stats.utils";
import Chart from "./Utils/Chart";
import CustomSelect from "../../../Utils/CustomSelect/customselect";
import classes from "./Stats.module.css";

function StatsPage() {
    const [chartData, setChartData] = useState();
    const [entity, setEntity] = useState(
        JSON.parse(localStorage.getItem("organisation")).name
    );
    const [entities, setEntities] = useState([
        JSON.parse(localStorage.getItem("organisation")),
    ]);
    const [fetchEvent, setFetchEvent] = useState(
        JSON.parse(localStorage.getItem("organisation")).events[0]["@id"]
    );
    const [displayedEvent, setDisplayedEvent] = useState();
    const events = JSON.parse(localStorage.getItem("organisation")).events;

    useEffect(() => {
        const handleSwap = async () => {
            const data = await getStatisticsFromEntity("event", fetchEvent);
            setEntities(await getEntities());

            const dataTest = data.filter(
                (item) => item.type === "EVENT_IMAGE_DISPLAYED"
            );

            setChartData(dataTest);
            setDisplayedEvent(data[0].event);
        };
        handleSwap();
    }, [fetchEvent]);

    return (
        <>
            <h1>Statistiques</h1>
            <h3>
                Event pour
                <span>
                    <CustomSelect
                        items={entities}
                        getValue={"@id"}
                        display={"name"}
                        onChange={setEntity}
                    />
                </span>
            </h3>
            <div className={classes.container}>
                <div className={classes.chartContainer}>
                    <Chart data={chartData} />
                </div>
                <div className={classes.eventSelection}>
                    <CustomSelect
                        items={events}
                        getValue={"@id"}
                        display={"name"}
                        onChange={setFetchEvent}
                    />
                    <img
                        src={displayedEvent?.imageUrl}
                        alt={displayedEvent?.name}
                    />
                </div>
            </div>
        </>
    );
}

export default StatsPage;
