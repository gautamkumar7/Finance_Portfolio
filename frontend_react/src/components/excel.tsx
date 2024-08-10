import { DownloadIcon } from 'lucide-react';
import React from 'react';
import { CSVLink } from 'react-csv';
import { Button } from './ui/button';

const PortfolioToCSV = ({ data } : {data :any}) => {
  const currentDate = new Date().toLocaleDateString();
  
  const csvData = data.map((item:any) => {
    const investedAmount = item.avg_buy_price * item.quantity;
    const currentAmount = item.current_price * item.quantity;
    const percentageChange = ((currentAmount - investedAmount) / investedAmount) * 100;
    
    return {
      'Date': currentDate,
      'Entity Name': item.name,
      'Invested Amount': investedAmount.toFixed(2),
      'Current Amount': currentAmount.toFixed(2),
      'Percentage Change': percentageChange.toFixed(2) + '%',
      'Sector': item.sector
    };
  });

  const headers = [
    { label: "Date", key: "Date" },
    { label: "Entity Name", key: "Entity Name" },
    { label: "Invested Amount", key: "Invested Amount" },
    { label: "Current Amount", key: "Current Amount" },
    { label: "Percentage Change", key: "Percentage Change" },
    { label: "Sector", key: "Sector" }
  ];

  return (
    <CSVLink 
      data={csvData} 
      headers={headers} 
      filename={`Portfolio_${currentDate}.csv`}
      className="text-slate-600 border-slate-900 font-bold py-2 px-4 rounded"
    >
        <Button className="text-slate-600 border-slate-900" variant="outline">
        <DownloadIcon className="mr-2 h-4 w-4 text-slate-800" />
      Download Statement
      </Button>
    </CSVLink>
  );
};

export default PortfolioToCSV;