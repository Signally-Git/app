import {
    CartesianGrid,
    Legend,
    Bar,
    BarChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const Chart = ({ data }) => {
    console.log(data);
    if (!data || !data.length) return <h2>Aucune donnée à afficher</h2>;

    return (
        <BarChart width={200} height={250} data={data}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#ff7954" />
        </BarChart>
    );
};

export default Chart;
