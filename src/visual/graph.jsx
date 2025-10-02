import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { fetchCounts, fetchHistory } from "./count";

export default function DarkGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      await fetchCounts(); // updates localStorage with today's counts
      const history = fetchHistory(); // get full history
      setData(history);
      console.log(history); // check if data exists
    }

    loadData();
  }, []);

  return (
    <div style={{ width: "100%", height: 400, backgroundColor: "#1e1e2f", padding: "1rem", borderRadius: "10px" }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#ccc" tick={{ fill: "#ccc" }} />
          <YAxis stroke="#ccc" tick={{ fill: "#ccc" }} />
          <Tooltip contentStyle={{ backgroundColor: "#2a2a40", border: "none", color: "#fff" }} />
          <Legend verticalAlign="top" wrapperStyle={{ color: "#ccc" }} />
          <Line type="monotone" dataKey="totalProjects" stroke="#5eead4" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="totalResearch" stroke="#a78bfa" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="totalSkills" stroke="#f472b6" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
