import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

function StatsPage() {
    const data = [
        { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 600, pv: 2600, amt: 2600 },
    ];
    return (
        <>
            <h1>Statistiques</h1>
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </>
    );
}

export default StatsPage;
