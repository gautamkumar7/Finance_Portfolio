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
          .filter((item: { type: string }) => item.type == 'STOCK') // Filter only stocks
          .map((item: { name: string; quantity: number; current_price: number }) => ({
            name: item.name,
            value: item.quantity * item.current_price, // Calculate value as quantity * current_price
          }));
        setData(fetchedData);
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

export default StockPieChart;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';

// // Define the props type for the CustomLabel component
// interface CustomLabelProps {
//   x: number;
//   y: number;
//   value: string | number;
//   fill: string;
// }

// const COLORS = ['#5CB3FF', '#ffb4b2', '#78C7C7', '#14A3C7', '#ffe5b4'];

// // Custom label component to make text bold while preserving the color
// const CustomLabel: React.FC<CustomLabelProps> = ({ x, y, value, fill }) => (
//   <text x={x} y={y} dy={8} fontSize={14} fontWeight="bold" textAnchor="middle" fill={fill}>
//     {value}
//   </text>
// );

// function StockPieChart() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Fetch data from the API
//     axios.get('http://127.0.0.1:5000/api/entities')
//       .then(response => {
//         const fetchedData = response.data
//           .filter((item: { type: string }) => item.type === 'STOCK') // Filter only stocks
//           .map((item: { name: string; quantity: number; current_price: number }) => ({
//             name: item.name,
//             value: item.quantity * item.current_price, // Calculate value as quantity * current_price
//           }));
//         setData(fetchedData);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []); // Empty dependency array to run once on mount

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <PieChart>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           labelLine={false}
//           label={<CustomLabel />}
//           outerRadius={120}
//           fill="#8884d8"
//           dataKey="value"
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// }

// export default StockPieChart;

