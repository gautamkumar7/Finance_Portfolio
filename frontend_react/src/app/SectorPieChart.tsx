import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#5CB3FF', '#ffb4b2', '#78C7C7', '#14A3C7', '#ffe5b4'];

// Define the type for each data entry
interface SectorData {
  name: string;
  value: number;
}

function SectorPieChart() {
  // Use the SectorData type in the useState hook
  const [data, setData] = useState<SectorData[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/entities')
      .then(response => {
        const sectorData = response.data.reduce((acc: Record<string, number>, item: any) => {
          const sector = item.sector;
          const investedAmount = item.quantity * item.avg_buy_price;
          acc[sector] = (acc[sector] || 0) + investedAmount;
          return acc;
        }, {});

        const formattedData: SectorData[] = Object.keys(sectorData).map(sector => ({
          name: sector,
          value: sectorData[sector],
        }));

        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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

export default SectorPieChart;
