import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#5CB3FF', '#ffb4b2', '#78C7C7', '#14A3C7', '#ffe5b4'];

function StockPieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://127.0.0.1:5000/api/entities')
      .then(response => {
        const fetchedData = response.data
          .filter((item: { type: string }) => item.type == 'stock') // Filter only stocks
          .map((item: { name: string; quantity: number; current_price: number }) => ({
            name: item.name,
            value: item.quantity * item.current_price, // Calculate value as quantity * current_price
          }));
        setData(fetchedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run once on mount

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default StockPieChart;
