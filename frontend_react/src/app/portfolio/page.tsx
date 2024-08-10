"use client";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import axios from "axios";
import { DownloadIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Stocks = {
  date: string;
  stocks_invested: number;
};

type Bonds = {
  date: string;
  bonds_invested: number;
};

type BondsCurrent = {
  bonds_current: number;
  date: string;
};

type StocksCurrent = {
  stocks_current: number;
  date: string;
};

type Investment = {
  avg_buy_price: number;
  current_price: number;
  entity_id: number;
  name: string;
  quantity: number;
  sector: string;
  type: "stock" | "bond"; // Assuming 'type' can be either 'stock' or 'bond'
};

const Page = () => {
  const [stocks, setStock] = useState<Stocks>({} as Stocks);
  const [bonds, setBonds] = useState<Bonds>({} as Bonds);
  const [bondsCurrent, setbondsCurrent] = useState<BondsCurrent>(
    {} as BondsCurrent
  );
  const [stocksCurrent, setstocksCurrent] = useState<StocksCurrent>(
    {} as StocksCurrent
  );
  const [investments, setInvestments] = useState<Investment[] | []>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const res = await axios<Stocks>(
        "http://127.0.0.1:5000/api/stocks/invested"
      );
      const data = res.data;
      setStock(data);
    };

    fetchStocks();
  }, []);

  useEffect(() => {
    const fetchBonds = async () => {
      const res = await axios<Bonds>(
        "http://127.0.0.1:5000/api/bonds/invested"
      );
      const data = res.data;
      setBonds(data);
    };

    fetchBonds();
  }, []);

  useEffect(() => {
    const fetchBonds = async () => {
      const res = await axios<BondsCurrent>(
        "http://127.0.0.1:5000/api/bonds/current"
      );
      const data = res.data;
      setbondsCurrent(data);
    };

    fetchBonds();
  }, []);

  useEffect(() => {
    const fetchBonds = async () => {
      const res = await axios<StocksCurrent>(
        "http://127.0.0.1:5000/api/stocks/current"
      );
      const data = res.data;
      setstocksCurrent(data);
    };

    fetchBonds();
  }, []);

  useEffect(() => {
    const fetchEntties = async () => {
      const res = await axios<Investment[]>(
        "http://127.0.0.1:5000/api/entities"
      );
      const data = res.data;
      setInvestments(data);
      console.log("====================================");
      console.log(data);
      console.log("====================================");
    };

    fetchEntties();
  }, []);

  const total_invested = stocks.stocks_invested + bonds.bonds_invested;
  const total_current =
    stocksCurrent.stocks_current + bondsCurrent.bonds_current;

  const diff = total_current - total_invested;
  const percentage = (diff / total_invested) * 100;
  return (
    <>
      <Nav />
      <div className="p-4 mt-8">
        <header className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-600">
            Portfolio Performance
          </h1>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-sm text-gray-500">Total Investment</p>
              <p className="text-lg font-semibold">
                ${total_invested.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Value</p>
              <p className="text-lg font-semibold text-green-600">
                ${total_current.toFixed(2)}↑
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Portfolio Return</p>
              <p className="text-lg font-semibold text-green-600">
                {percentage.toFixed(2)}% ↑
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Profit/Loss</p>
              <p
                className={`text-lg font-semibold  ${
                  diff > 0 ? "text-green-600" : "text-red-600"
                } `}
              >
                ${diff.toFixed(2)}
                {diff > 0 ? "↑" : "↓"}
              </p>
            </div>
          </div>
        </header>
        <div className="flex w-full items-center justify-center">
          <div className=" shadow rounded-lg p-4 w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Holdings</h2>
              <Button
                variant="outline"
                className="text-slate-600 border-slate-900"
              >
                <DownloadIcon className="mr-2 h-4 w-4 text-slate-800" />
                Download Statement
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Buy / Sell</TableHead>
                  <TableHead>Inv. Amount</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead>Profit/Loss</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments?.map((investment) => (
                  <TableRow key={investment.entity_id}>
                    <TableCell className="font-medium">
                      {investment.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger className="w-8 h-8 text-xl hover:scale-110 transition-all duration-300 rounded-full text-white bg-green-700">
                            B
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <div className="grid gap-4 py-4">
                              <div className="grid items-center grid-cols-4 gap-4">
                                <Label htmlFor="stock" className="text-right">
                                  Stock
                                </Label>
                                <Input
                                  id="stock"
                                  placeholder="Enter stock name"
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid items-center grid-cols-4 gap-4">
                                <Label
                                  htmlFor="quantity"
                                  className="text-right"
                                >
                                  Quantity
                                </Label>
                                <Input
                                  id="quantity"
                                  type="number"
                                  placeholder="Enter quantity"
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid items-center grid-cols-4 gap-4">
                                <Label htmlFor="price" className="text-right">
                                  Price/Share
                                </Label>
                                <Input
                                  id="price"
                                  type="number"
                                  placeholder="Enter price"
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid items-center grid-cols-4 gap-4">
                                <Label
                                  htmlFor="total"
                                  className="text-right font-medium"
                                >
                                  Total
                                </Label>
                                <div
                                  id="total"
                                  className="col-span-3 font-medium"
                                >
                                  $0.00
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                type="submit"
                                className="bg-green-500 text-black hover:text-white"
                              >
                                Buy Stock
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger className="w-8 h-8 text-xl hover:scale-110 transition-all duration-300 rounded-full text-white bg-red-700">
                            S
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <div className="grid gap-4 py-4">
                              <div className="grid items-center grid-cols-4 gap-4">
                                <Label htmlFor="stock" className="text-right">
                                  Stock
                                </Label>
                                <Input
                                  id="stock"
                                  placeholder="Enter stock name"
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid items-center grid-cols-4 gap-4">
                                <Label
                                  htmlFor="quantity"
                                  className="text-right"
                                >
                                  Quantity
                                </Label>
                                <Input
                                  id="quantity"
                                  type="number"
                                  placeholder={`You have total ${investment.quantity} shares of ${investment.name}`}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid items-center grid-cols-4 gap-4">
                                <Label htmlFor="price" className="text-right">
                                  Price/Share
                                </Label>
                                <Input
                                  id="price"
                                  type="number"
                                  placeholder="Enter price"
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid items-center grid-cols-4 gap-4">
                                <Label
                                  htmlFor="total"
                                  className="text-right font-medium"
                                >
                                  Total
                                </Label>
                                <div
                                  id="total"
                                  className="col-span-3 font-medium"
                                >
                                  $0.00
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                type="submit"
                                className="bg-green-500 text-black hover:text-white"
                              >
                                Buy Stock
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                    <TableCell>
                      ${investment.avg_buy_price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-green-600">
                      ${investment.current_price.toFixed(2)}
                    </TableCell>
                    <TableCell
                      className={`${
                        investment.current_price - investment.avg_buy_price > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      $
                      {(
                        investment.current_price - investment.avg_buy_price
                      ).toFixed(3)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              {/* <p className="text-sm text-gray-500">Bank Details</p>
                <p className="text-sm text-gray-500">No mandate</p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;