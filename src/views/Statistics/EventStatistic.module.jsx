import { useEffect, useState } from "react";
import { getStatisticsFromEntity, mergeArrays } from "./Utils/Stats.utils";
import Chart from "./Utils/Chart";
import { CustomSelect } from "components";
import classes from "./Stats.module.css";
import moment from "moment";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function EventStatistic({ eventType, entities, entityType, entityId }) {
    const [chartData, setChartData] = useState();
    const [selected, setSelected] = useState(entities?.[0]?.["id"]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const handleSwap = async () => {
            const data = await getStatisticsFromEntity(
                eventType,
                selected,
                entityType,
                entityId
            );

            const event_displayed = data.filter(
                (item) => item.type === "EVENT_IMAGE_DISPLAYED"
            );
            const renamedData = event_displayed.map(
                ({ totalItems: displayed, ...rest }) => ({
                    displayed,
                    ...rest,
                })
            );

            const event_clicked = data.filter(
                (item) => item.type === "EVENT_LINK_CLICK"
            );
            const renamedDataFinal = event_clicked.map(
                ({ totalItems: clicked, ...rest }) => ({
                    clicked,
                    ...rest,
                })
            );
            setChartData(
                mergeArrays(renamedData, renamedDataFinal).map((item) => {
                    return {
                        day_created_date: (item.day_created_date = moment(
                            item.day_created_date
                        ).format("DD.MM.YY")),
                        ...item,
                    };
                })
            );
            setLoading(false);
        };
        setLoading(true);
        handleSwap();
    }, [selected, eventType, entities, entityType, entityId]);

    return (
        <div className={classes.statisticContainer}>
            <CustomSelect
                items={entities}
                getValue={"id"}
                display={"name"}
                onChange={setSelected}
            />
            <div className={classes.singleStatContainer}>
                <div className={classes.chartContainer}>
                    {isLoading ? (
                        <div className={classes.loadingContainer}>
                            <AiOutlineLoading3Quarters />
                        </div>
                    ) : (
                        <Chart data={chartData} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default EventStatistic;
