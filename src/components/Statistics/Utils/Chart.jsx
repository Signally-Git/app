import {
    ResponsiveContainer,
    CartesianGrid,
    Legend,
    Area,
    AreaChart,
    LineChart,
    Line,
    Bar,
    BarChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
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
                {/*<Area*/}
                {/*    type="monotone"*/}
                {/*    dataKey="uv"*/}
                {/*    stackId="1"*/}
                {/*    stroke="#8884d8"*/}
                {/*    fill="#8884d8"*/}
                {/*/>*/}
                <Line
                    type="monotone"
                    stackId={1}
                    dataKey="displayed"
                    stroke="#ff7954"
                    // fill="#ff7954"
                />
                <Line
                    type="monotone"
                    stackId={2}
                    dataKey="clicked"
                    stroke="#ffc300"
                    // fill="#ffc300"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Chart;
