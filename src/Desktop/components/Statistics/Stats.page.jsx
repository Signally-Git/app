import { useEffect, useState } from "react";
import {
    getStatisticsFromEvent,
    getStatisticsFromOrganisation,
} from "./Stats.utils";
import Chart from "./Utils/Chart";

function StatsPage() {
    const [chartData, setChartData] = useState();
    const events = JSON.parse(localStorage.getItem("organisation")).events;

    const handleClick = async (e) => {
        const data = await getStatisticsFromEvent(e.target.id);

        const xAxis = data.filter(
            (item) => item.type === "EVENT_IMAGE_DISPLAYED"
        );
        const yAxis = data.filter((item) => item.type === "EVENT_LINK_CLICK");
        setChartData([
            { name: "Event affiché", value: xAxis.length },
            { name: "Ouverture d'event", value: yAxis.length },
        ]);
    };

    return (
        <>
            <h1>Statistiques</h1>
            <div>
                <h3>Event</h3>
                <h4>{chartData?.[0]?.event?.name}</h4>
                <img src={chartData?.[0]?.event?.imageUrl} />
                <Chart data={chartData} />
                <ul>
                    {events.map((event) => {
                        return (
                            <li
                                id={event.id}
                                key={event.id}
                                onClick={handleClick}
                            >
                                {event.id}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default StatsPage;
