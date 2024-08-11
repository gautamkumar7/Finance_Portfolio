"use client";

import Nav from "@/components/Nav";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import StockPieChart from "../StockPieChart";
import SectorPieChart from "../SectorPieChart";
import { NetWorthGraph } from "../LineGraph";
import AssetDistribution from "../AssetDistribution";

const Page = () => {
    return (
        <>
          <Nav />
<div className="chart-wrapper mt-12 mx-20 flex flex-wrap items-start gap-6 p-6 sm:p-8">
  <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
    <Card x-chunk="charts-01-chunk-0">
      <CardHeader>
        <CardTitle><h1>Investement Growth over time</h1></CardTitle>
        <CardDescription>
          Variation of Portfolio value and total Invested amount over time
        </CardDescription>
      </CardHeader>
      <NetWorthGraph />
    </Card>
    
    <Card x-chunk="charts-01-chunk-2">
      <CardHeader>
        <CardTitle><h1>Stock Portfolio Distribution</h1></CardTitle>
        <CardDescription>
          Contribution of each stock to total income
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <StockPieChart />
      </CardContent>
    </Card>
  </div>
  <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
  <Card x-chunk="charts-01-chunk-0">
      <CardHeader>
        <CardTitle><h1>Sectorwise Distribution</h1></CardTitle>
        <CardDescription>
          Influence of different sectors on Portfolio value
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <SectorPieChart />
      </CardContent>
    </Card>

    <Card x-chunk="charts-01-chunk-2">
      <CardHeader>
        <CardTitle><h1>Asset Type Distribution</h1></CardTitle>
        <CardDescription>
          Contribution of different assets to portfolio value
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <AssetDistribution/>
      </CardContent>
    </Card>
    </div>
</div>
    </>
  );
 
};

export default Page;