import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./Linechart.scss";

const data = [
  {
    name: "Page A",
    TVL: 2400,
  },
  {
    name: "Page B",
    TVL: 1398,
  },
  {
    name: "Page C",
    TVL: 9800,
  },
  {
    name: "Page A",
    TVL: 2400,
  },
  {
    name: "Page B",
    TVL: 1398,
  },
  {
    name: "Page C",
    TVL: 9800,
  },
  {
    name: "Page D",
    TVL: 3908,
  },
  {
    name: "Page E",
    TVL: 4800,
  },
  {
    name: "Page F",
    TVL: 3800,
  },
  {
    name: "Page C",
    TVL: 9800,
  },
  {
    name: "Page D",
    TVL: 3908,
  },
  {
    name: "Page E",
    TVL: 4800,
  },
];

export default function App() {
  return (
    <div className="linechart">
      <LineChart
        id="linechart"
        width={550}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="TVL"
          stroke="#FC077D"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}
