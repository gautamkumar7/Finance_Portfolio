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
  previous_price?: number;
  stock_name?: string;
  ticker?: string;
};

type Gl = {
  name: string;
  percentage_change: number;
  type: string;
};

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [drop, setDrop] = useState<Wishlist[]>([]);
  const [gl, setGl] = useState<Gl[]>([]);
  const [selectedStock, setSelectedStock] = useState<Wishlist | null>(null);

  useEffect(() => {
    const fetchWishList = async () => {
      const res = await axios.get<Wishlist[]>(
        "https://finance-portfolio.onrender.com/api/wishlist/all"
      );
      setWishlist(res.data);
    };
    fetchWishList();
  }, []);

  useEffect(() => {
    const fetchWishListDrop = async () => {
      const res = await axios.get<Wishlist[]>(
        "https://finance-portfolio.onrender.com/api/search"
      );
      setDrop(res.data);
    };
    fetchWishListDrop();
  }, []);

  useEffect(() => {
    const fetchMarket = async () => {
      const res = await axios.get<Market[]>(
        "https://finance-portfolio.onrender.com/api/markets"
      );
      setMarkets(res.data);
    };
    fetchMarket();
  }, []);

  useEffect(() => {
    const fetchGl = async () => {
      const res = await axios.get<Gl[]>("https://finance-portfolio.onrender.com/api/gl");
      setGl(res.data);
    };
    fetchGl();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setDropdown(true);
  };

  const handleDropdownItemClick = (stock: Wishlist) => {
    setSelectedStock(stock);
    setSearch(stock.stock_name || "");
    setDropdown(false);
  };

  const handleInputBlur = () => {
    setTimeout(() => setDropdown(false), 200);
  };

  const filteredDrop = drop.filter((d) =>
    d.stock_name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToWishlist = async () => {
    if (selectedStock) {
      try {
        const payload = {
          stock_name: selectedStock.stock_name,
          current_price: selectedStock.current_price,
          previous_price: selectedStock.previous_price,
          number: 1,
        };
        await axios.post("https://finance-portfolio.onrender.com/api/wishlist", payload);

        setWishlist([...wishlist, payload]);
        setSelectedStock(null);
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    }
  };

  const handleDeleteFromWishlist = async (stockName: string) => {
    try {
      await axios.delete("https://finance-portfolio.onrender.com/api/wishlist", {
        data: { stock_name: stockName },
      });

      setWishlist(wishlist.filter((stock) => stock.stock_name !== stockName));
    } catch (error) {
      console.error("Error deleting from wishlist:", error);
    }
  };

  const topGainers = gl
    .filter((stock) => stock.percentage_change > 0)
    .sort((a, b) => b.percentage_change - a.percentage_change)
    .slice(0, 4);

  const topLosers = gl
    .filter((stock) => stock.percentage_change < 0)
    .sort((a, b) => a.percentage_change - b.percentage_change)
    .slice(0, 4);

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
                    <div className="absolute dark:bg-[#1C1917] z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {filteredDrop.map((stock, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-[#312c28] cursor-pointer flex flex-row col-span-3 justify-between space-x-6 items-center"
                          onClick={() => handleDropdownItemClick(stock)}
                        >
                          <p className="font-medium text-center w-full h-full">
                            {stock.stock_name!}
                          </p>
                          <p className="text-sm w-full h-full text-gray-600 dark:text-gray-300">
                            ${stock.current_price}
                          </p>
                          <div className="w-full h-full">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="mr-2 bg-blue-300 text-black hover:bg-blue-500"
                              onClick={handleAddToWishlist}
                            >
                              Add to wishlist
                            </Button>
                          </div>
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
                              stock.current_price - stock.previous_price! > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {stock.current_price - stock.previous_price! > 0
                              ? "+"
                              : ""}
                            {(
                              ((stock.current_price - stock.previous_price!) /
                                stock.previous_price!) *
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
                            onClick={() =>
                              handleDeleteFromWishlist(stock.stock_name!)
                            }
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
              <Card className="border-green-500 dark:text-black dark:bg-green-200 bg-[#e6ffe6] border-b-0 rounded-b-none">
                <CardHeader className="flex flex-col space-y-2">
                  <CardTitle className="text-xl text-center text-green-600">
                    Your Gainers
                  </CardTitle>
                </CardHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center font-semibold text-black">
                        Stock
                      </TableHead>
                      <TableHead className="text-center font-semibold text-black">
                        Percentage Change
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topGainers.map((stock, index) => (
                      <TableRow className="text-center" key={index}>
                        <TableCell className="text-center">
                          {stock.name}
                        </TableCell>
                        <TableCell className="text-green-800">
                          +{stock.percentage_change.toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
              <Card className="border-red-500 border-t-0 dark:text-black dark:bg-red-300 bg-[#ffe8e8] rounded-t-none">
                <CardHeader className="flex flex-col space-y-2">
                  <CardTitle className="text-xl text-red-800 text-center">
                    Your Losers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center font-semibold text-black">
                          Stock
                        </TableHead>
                        <TableHead className="text-center font-semibold text-black">
                          Percentage Change
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topLosers.map((stock, index) => (
                        <TableRow className="text-center" key={index}>
                          <TableCell className="text-center">
                            {stock.name}
                          </TableCell>
                          <TableCell className="text-red-800">
                            {stock.percentage_change.toFixed(2)}%
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