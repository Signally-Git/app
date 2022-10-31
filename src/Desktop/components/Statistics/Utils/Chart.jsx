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
        <BarChart width={400} height={250} data={data}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="display" fill="#ff7954" />
            <Bar dataKey="clicked" fill="#ffc300" />
        </BarChart>
    );
};

export default Chart;
