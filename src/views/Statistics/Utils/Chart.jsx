import {
    ResponsiveContainer,
    CartesianGrid,
    Legend,
    LineChart,
    Line,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
<<<<<<<< HEAD:src/components/Statistics/Utils/Chart.jsx
========
import classes from "../Stats.module.css";
>>>>>>>> staging:src/views/Statistics/Utils/Chart.jsx
import { FormattedMessage } from "react-intl";

const Chart = ({ data }) => {
    if (!data || !data.length)
        return <FormattedMessage tagName="h4" id="message.warning.no_data" />;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={200} height={150} data={data}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="day_created_date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    // stroke={classes["color-primary"]}
                    type="monotone"
                    stackId={1}
                    dataKey="displayed"
                />
                <Line type="monotone" stackId={2} dataKey="clicked" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Chart;
