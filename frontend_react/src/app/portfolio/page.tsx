 "use client";
 import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Nav from "@/components/Nav";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NetWorthGraph from "../linegraph";
import StockPieChart from "../StockPieChart";





const page = () => {
  return (
    <>
      <Nav />
      <div className=" justify-center mt-12 mx-20" >
        <Card>
          <CardTitle className="p-4 pb-4">Dashboard</CardTitle>
          <CardContent className="flex flex-row items-baseline p-4 pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">


      <div className="bg-background rounded-lg shadow-lg overflow-hidden">
        <div className="flex">
          <div className="w-1/2 bg-muted rounded-l-lg">
            <img
              src= "/investement.png"
              alt="Product 1"
              width="100"
              height="100"
              className="object-cover w-full h-full"
              style={{ aspectRatio: "100/100", objectFit: "cover" }}
            />
          </div>
          <div className="w-1/2 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Investement</h3>
              <p className="text-muted-foreground text-sm">213</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background rounded-lg shadow-lg overflow-hidden">
        <div className="flex">
          <div className="w-1/2 bg-muted rounded-l-lg">
            <img
              src="/portfolio copy.png"
              alt="Product 2"
              width="100"
              height="100"
              className="object-cover w-full h-full"
              style={{ aspectRatio: "100/100", objectFit: "cover" }}
            />
          </div>
          <div className="w-1/2 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold">Portfolio Value</h3>
              <p className="text-muted-foreground text-sm">34</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background rounded-lg shadow-lg overflow-hidden">
        <div className="flex">
          <div className="w-1/2 bg-muted rounded-l-lg">
            <img
              src="/pnl.png"
              alt="Product 3"
              width="100"
              height="100"
              className="object-cover w-full h-full"
              style={{ aspectRatio: "100/100", objectFit: "cover" }}
            />
          </div>
          <div className="w-1/2 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold">Profit or Loss</h3>
              <p className="text-muted-foreground text-sm">65</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background rounded-lg shadow-lg overflow-hidden">
        <div className="flex">
          <div className="w-1/2 bg-muted rounded-l-lg">
            <img
              src="/growth.png"
              alt="Product 3"
              width="100"
              height="100"
              className="object-cover w-full h-full"
              style={{ aspectRatio: "100/100", objectFit: "cover" }}
            />
          </div>
          <div className="w-1/2 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold">Growth Percentage</h3>
              <p className="text-muted-foreground text-sm">+12%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
          </CardContent>
        </Card>
      </div>
    
  
 
    <div className="chart-wrapper mt-12 mx-20 flex flex-wrap items-start gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
        <CardHeader className="space-y-0 pb-2">
        <CardDescription> Net Worth Over Time</CardDescription>
            
        </CardHeader>
            <NetWorthGraph />
        </Card>
      </div>
     <div className="grid w-full flex-1 ">
      < Card className="max-w-xs" x-chunk="charts-01-chunk-2">
    <CardHeader>
      <CardTitle>Stocks</CardTitle>
      <CardDescription>
        Contribution of each stock to total income
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-2">
      <div className="grid auto-rows-min ">
      <h1>Stock Portfolio Distribution</h1>
      <StockPieChart />
      </div>
  </CardContent>
  </Card>
  </div>
  </div>
 
   
  
        <div className="flex justify-center mt-12 mx-20" >
        <Table className="border border-grey">
  <TableCaption>Your investements</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead >Stock Name</TableHead>
      <TableHead >Share count</TableHead>
      <TableHead >Avg Cost</TableHead>
      <TableHead>Invested Amt</TableHead>
      <TableHead>Current price</TableHead>
      <TableHead >PnL</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
    </TableRow>
  </TableBody>
</Table>
</div>
<div className= "mt-12 mx-20 " >
<Button variant="secondary">Download</Button>
        </div>

    </>
  );
};
export default page;



