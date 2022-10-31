import {
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const Chart = ({ data }) => {
    console.log(data);
    if (!data || !data.length) return <h2>Aucune donnée à afficher</h2>;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Chart;
