"use client";
import React, { useEffect, useState } from "react";
import { MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Nav from "@/components/Nav";
import axios from "axios";

type Market = {
  market_name: string;
  percentage_change: number;
};

type Wishlist = {
  current_price: number;
  number: number;
  previous_price: number;
  stock_name: string;
};

type Drop = {
  name: string;
  current_price: number;
};

const drop: Drop[] = [
  { name: "Apple", current_price: 120 },
  { name: "Tesla", current_price: 500 },
  { name: "Microsoft", current_price: 200 },
  { name: "Google", current_price: 300 },
  { name: "Amazon", current_price: 150 },
  { name: "Facebook", current_price: 100 },
  { name: "Twitter", current_price: 50 },
  { name: "Netflix", current_price: 70 },
  { name: "Uber", current_price: 30 },
  { name: "Lyft", current_price: 20 },
];

const gl = [
  { name: "Apple", percentage: 0.5 },
  { name: "Tesla", percentage: -0.7 },
  { name: "Microsoft", percentage: 0.3 },
  { name: "Google", percentage: -0.2 },
  { name: "Amazon", percentage: 0.1 },
  { name: "Facebook", percentage: 0.6 },
  { name: "Twitter", percentage: -0.5 },
  { name: "Netflix", percentage: 0.4 },
  { name: "Uber", percentage: -0.3 },
  { name: "Lyft", percentage: 0.2 },
];

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [markets, setMarkets] = useState<Market[]>([]);

  useEffect(() => {
    const fetchWishList = async () => {
      const res = await axios.get<Wishlist[]>(
        "http://127.0.0.1:5000/api/wishlist/all"
      );
      setWishlist(res.data);
    };
    fetchWishList();
  }, []);

  useEffect(() => {
    const fetchMarket = async () => {
      const res = await axios.get<Market[]>(
        "http://127.0.0.1:5000/api/markets"
      );
      setMarkets(res.data);
    };
    fetchMarket();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setDropdown(true);
  };

  const handleDropdownItemClick = (name: string) => {
    setSearch(name);
    setDropdown(false);
  };

  const handleInputBlur = () => {
    // Delay hiding the dropdown to allow for click events to be processed
    setTimeout(() => setDropdown(false), 200);
  };

  const filteredDrop = drop.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Nav />
      <div className="flex min-h-screen w-full flex-col mt-4">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {markets.map((market, index) => (
              <Card
                key={index}
                className={`border-2 ${
                  market.percentage_change > 0
                    ? "border-green-600"
                    : "border-red-600"
                }`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-medium">
                    {market.market_name}
                  </CardTitle>
                  <MoveUpRight color="gray" size={20} />
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-xl font-bold ${
                      market.percentage_change > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {market.percentage_change}%
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-col space-y-2">
                <CardTitle className="text-lg">Wish List</CardTitle>
                <div className="relative">
                  <Input
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search stocks"
                    onBlur={handleInputBlur}
                  />
                  {dropdown && filteredDrop.length > 0 && search.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {filteredDrop.map((stock, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between space-x-6 items-center"
                          onClick={() => handleDropdownItemClick(stock.name)}
                        >
                          <p className="font-medium">{stock.name}</p>
                          <p className="text-sm text-gray-600">
                            ${stock.current_price}
                          </p>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="mr-2 bg-blue-300 hover:bg-blue-500"
                          >
                            Add to wishlist
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Stock</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Percentage Change</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wishlist.map((stock, index) => (
                      <TableRow key={index}>
                        <TableCell>{stock.stock_name}</TableCell>
                        <TableCell>${stock.current_price.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={
                              stock.current_price - stock.previous_price > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {stock.current_price - stock.previous_price > 0
                              ? "+"
                              : ""}
                            {(
                              ((stock.current_price - stock.previous_price) /
                                stock.previous_price) *
                              100
                            ).toFixed(2)}
                            %
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="mr-2 bg-green-400 hover:text-green-700"
                          >
                            Buy
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="mr-2 bg-red-400 hover:text-red-700"
                          >
                            Sell
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="mr-2 text-red-500"
                          >
                            Delete
                          </Button>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <div>
              <Card className="border-green-500 bg-[#e6ffe6] border-b-0 rounded-none">
                <CardHeader className="flex flex-col space-y-2">
                  <CardTitle className="text-lg text-green-700">
                    Your Gainers
                  </CardTitle>
                </CardHeader>
                <CardContent></CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center text-2xl font-semibold text-black">
                        Stock
                      </TableHead>
                      <TableHead className="text-center text-2xl font-semibold text-black">
                        Percentage Change
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gl
                      .filter((stock) => stock.percentage > 0)
                      .map((stock, index) => (
                        <TableRow className="text-center" key={index}>
                          <TableCell className="text-center">
                            {stock.name}
                          </TableCell>
                          <TableCell className="text-green-500">
                            +{stock.percentage}%
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Card>
              <Card className="border-red-500 border-t-0 bg-[#ffe8e8] rounded-no">
                <CardHeader className="flex flex-col space-y-2">
                  <CardTitle className="text-lg text-red-500">
                    Your Losers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center text-2xl font-semibold text-black">
                          Stock
                        </TableHead>
                        <TableHead className="text-center text-2xl font-semibold text-black">
                          Percentage Change
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gl
                        .filter((stock) => stock.percentage < 0)
                        .map((stock, index) => (
                          <TableRow className="text-center text-xl" key={index}>
                            <TableCell className="text-center text-xl">
                              {stock.name}
                            </TableCell>
                            <TableCell className="text-red-500">
                              {stock.percentage}%
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;