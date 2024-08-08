import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { date: '2024-01-01', netWorth: 10000 },
  { date: '2024-02-01', netWorth: 12000 },
  { date: '2024-03-01', netWorth: 15000 },
  { date: '2024-04-01', netWorth: 18000 },
  { date: '2024-05-01', netWorth: 20000 },
  { date: '2024-06-01', netWorth: 25000 },
];

function NetWorthGraph() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="netWorth" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default NetWorthGraph;
