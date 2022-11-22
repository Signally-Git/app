import { useEffect, useState } from "react";
import {
    getEntities,
    getStatisticsFromEntity,
    mergeArrays,
} from "./Stats.utils";
import Chart from "./Utils/Chart";
import { TokenService } from "Utils/index";
import CustomSelect from "Utils/CustomSelect/customselect";
import classes from "./Stats.module.css";
import moment from "moment";

function StatsPage() {
    const organisation = TokenService.getOrganisation();
    const [chartData, setChartData] = useState();
    const [entity, setEntity] = useState(organisation.name);
    const [entities, setEntities] = useState([organisation]);
    const [fetchEvent, setFetchEvent] = useState(organisation.events[0]["@id"]);
    const [displayedEvent, setDisplayedEvent] = useState();
    const events = organisation.events;

    useEffect(() => {
        const handleSwap = async () => {
            const data = await getStatisticsFromEntity("event", fetchEvent);
            setEntities(await getEntities());

            const event_displayed = data.filter(
                (item) => item.type === "EVENT_IMAGE_DISPLAYED"
            );
            // console.log(event_displayed);
            const renamedData = event_displayed.map(
                ({ totalItems: displayed, ...rest }) => ({
                    displayed,
                    ...rest,
                })
            );
            // console.log(renamedData);

            const event_clicked = data.filter(
                (item) => item.type === "EVENT_LINK_CLICK"
            );
            const renamedDataFinal = event_clicked.map(
                ({ totalItems: clicked, ...rest }) => ({
                    clicked,
                    ...rest,
                })
            );
            console.log(mergeArrays(renamedData, renamedDataFinal));
            setChartData(
                mergeArrays(renamedData, renamedDataFinal).map((item) => {
                    return {
                        day_created_date: (item.day_created_date = moment(
                            item.day_created_date
                        ).format("D MMMM")),
                        ...item,
                    };
                })
            );
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
