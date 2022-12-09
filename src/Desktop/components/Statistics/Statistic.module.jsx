import { useEffect, useState } from "react";
import { getStatisticsFromEntity } from "./Stats.utils";
import Chart from "./Utils/Chart";
import CustomSelect from "Utils/CustomSelect/customselect";
import classes from "./Stats.module.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import moment from "moment/moment";

function Statistic({
    statisticType,
    eventType,
    entities,
    entityType,
    entityId,
}) {
    const [chartData, setChartData] = useState();
    const [selected, setSelected] = useState(entities?.[0]?.["id"]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const handleSwap = async () => {
            const data = await getStatisticsFromEntity(
                statisticType,
                selected,
                entityType,
                entityId
            );

            const item = data.filter((item) => item.type === eventType);
            const renamedData = item.map(
                ({ totalItems: displayed, ...rest }) => ({
                    displayed,
                    ...rest,
                })
            );
            setChartData(
                renamedData.map((item) => {
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
    }, [selected, statisticType, entities, entityType, entityId]);

    return (
        <div className={classes.statisticContainer}>
            <CustomSelect
                items={entities}
                getValue={"@id"}
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

export default Statistic;
