import { useEffect, useState } from "react";
import { getEntities, getStatisticsFromEntity } from "./Stats.utils";
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

            const display = data.filter(
                (item) => item.type === "EVENT_IMAGE_DISPLAYED"
            );
            const clicked = data.filter(
                (item) => item.type === "EVENT_LINK_CLICK"
            );

            const dataTest = [
                {
                    id: "1ed56edb-401a-6db4-9964-cda3f6454c19",
                    createdAt: "2022-10-28",
                    display: 12,
                    clicked: 1,
                },
                {
                    id: "1ed56edb-401a-6db4-9964-cda3f6454c19",
                    createdAt: "2022-10-29",
                    display: 15,
                    clicked: 7,
                },
                {
                    id: "1ed56edb-401a-6db4-9964-cda3f6454c19",
                    createdAt: "2022-10-30",
                    display: 12,
                    clicked: 3,
                },
                {
                    id: "1ed56edb-401a-6db4-9964-cda3f6454c19",
                    createdAt: "2022-10-31",
                    display: 14,
                    clicked: 5,
                },
                {
                    id: "1ed56edb-401a-6db4-9964-cda3f6454c19",
                    createdAt: "2022-11-01",
                    display: 25,
                    clicked: 11,
                },
                {
                    id: "1ed56edb-401a-6db4-9964-cda3f6454c19",
                    createdAt: "2022-10-30",
                    display: 28,
                    clicked: 13,
                },
            ];

            // const dataTest = [
            //     {
            //         name: "Page A",
            //         display: 2000,
            //         clicked: 1100,
            //     },
            //     {
            //         name: "Page B",
            //         display: 3000,
            //         clicked: 1398,
            //     },
            //     {
            //         name: "Page A",
            //         display: 4000,
            //         clicked: 2400,
            //     },
            // ];
            setChartData(dataTest);
            // setChartData([
            //     {
            //         nameDisplay: "Affichages",
            //         display: display.length,
            //         nameClicked: "Ouvertures",
            //         clicked: clicked.length,
            //     },
            // ]);
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
