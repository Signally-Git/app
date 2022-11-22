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

const Chart = ({ data }) => {
    if (!data || !data.length) return <h2>Aucune donnée à afficher</h2>;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={400} height={250} data={data}>
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
