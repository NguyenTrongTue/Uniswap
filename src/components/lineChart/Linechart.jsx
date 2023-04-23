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
    name: "13",
    TVL: 2100,
  },
  {
    name: "14",
    TVL: 2150,
  },
  {
    name: "15",
    TVL: 2460,
  },
  {
    name: "16",
    TVL: 2780,
  },
  {
    name: "17",
    TVL: 3000,
  },
  {
    name: "18",
    TVL: 3100,
  },
  {
    name: "19",
    TVL: 3018,
  },
  {
    name: "20",
    TVL: 3320,
  },
  {
    name: "21",
    TVL: 3100,
  },
  {
    name: "22",
    TVL: 3500,
  },
  {
    name: "23",
    TVL: 3908,
  },
  {
    name: "24",
    TVL: 4122,
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
