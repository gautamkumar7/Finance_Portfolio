"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type BuyStock = {
  name: string;
  quantity: number;
  price: number;
};

type SellStock = {
  name: string;
  quantity: number;
  sell_price: number;
};

type Transaction = {
  action: "Buy" | "Sell";
  date: string;
  entity_name: string | null;
  id: number;
  price: number;
  quantity: number;
  total_value: number;
  type: string | null;
};

const ITEMS_PER_PAGE = 10;

const Page = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [cash, setCash] = useState(0);
  const [dopen, setDopen] = useState(false);
  const [sopen, setSopen] = useState(false);
  const [buyStock, setBuyStock] = useState<BuyStock | null>(null);
  const [sellStock, setSellStock] = useState<SellStock | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get<Transaction[]>(
          "https://finance-portfolio.onrender.com/api/transactions"
        );
        const data = response.data;
        setTransactions(data);
        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "https://finance-portfolio.onrender.com/api/addcash",
        { cash: cash }
      );
      if (response.status === 200) {
        toast.success("Cash added successfully");
      }
      console.log("Cash added successfully:", response);
    } catch (error) {
      if (error) {
        toast.error("Error adding cash");
      }
      console.error("Error adding cash:", error);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleBuyStock = async () => {
    if (buyStock) {
      try {
        const response = await axios.post(
          "https://finance-portfolio.onrender.com/api/entities/buy",
          buyStock
        );
        if (response.status === 200) {
          toast.success("Stock bought successfully");
        }
        setDopen(false);
        console.log("Stock bought successfully:", response);
        setBuyStock(null); // Clear buy stock state after successful purchase
      } catch (error: Error | any) {
        if (error) {
          toast.error("Error buying stock");
        }
        console.error("Error buying stock:", error);
      }
    }
  };

  const handleSellStock = async () => {
    if (sellStock) {
      try {
        const response = await axios.post(
          "https://finance-portfolio.onrender.com/api/entities/sell",
          sellStock
        );
        if (response.status === 200) {
          toast.success("Stock sold successfully");
        }
        setSopen(false);
        console.log("Stock sold successfully:", response);
        setSellStock(null);
      } catch (error) {
        if (error) {
          toast.error("Error selling stock");
        }
        console.error("Error selling stock:", error);
      }
    }
  };

  return (
    <>
      <Nav />
      <div className="p-4 mt-8">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-3/4 flex justify-right gap-5 mb-2">
            <div className="w-full gap-4 ml-60 justify-center items-end flex">
              <Dialog open={dopen}>
                <DialogTrigger
                  onClick={() => setDopen(true)}
                  className="mt-4 w-1/5 text-xl h-10 hover:scale-110 transition-all duration-300 rounded-full bg-green-700"
                >
                  Buy
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Buy Stock</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                      <Label htmlFor="stock" className="text-right">
                        Stock
                      </Label>
                      <Input
                        id="stock"
                        placeholder="Enter stock name"
                        className="col-span-3"
                        onChange={(e) =>
                          setBuyStock((prev) => ({
                            ...prev!,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Quantity
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="Enter quantity"
                        className="col-span-3"
                        onChange={(e) =>
                          setBuyStock((prev) => ({
                            ...prev!,
                            quantity: Number(e.target.value),
                          }))
                        }
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
                        onChange={(e) =>
                          setBuyStock((prev) => ({
                            ...prev!,
                            price: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                      <Label htmlFor="total" className="text-right font-medium">
                        Total
                      </Label>
                      <div id="total" className="col-span-3 font-medium">
                        $
                        {(
                          (buyStock?.quantity || 0) * (buyStock?.price || 0)
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      onClick={handleBuyStock}
                      className="bg-green-500 text-black hover:text-white"
                    >
                      Buy Stock
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={sopen}>
                <DialogTrigger
                  onClick={() => setSopen(true)}
                  className="mt-4 w-1/5 text-xl h-10 hover:scale-110 transition-all duration-300 rounded-full bg-red-700"
                >
                  Sell
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Sell Stock</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                      <Label htmlFor="name" className="text-right">
                        Stock
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter stock name"
                        className="col-span-3"
                        onChange={(e) =>
                          setSellStock((prev) => ({
                            ...prev!,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Quantity
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="Enter quantity"
                        className="col-span-3"
                        onChange={(e) =>
                          setSellStock((prev) => ({
                            ...prev!,
                            quantity: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                      <Label htmlFor="sell_price" className="text-right">
                        Sell Price
                      </Label>
                      <Input
                        id="sell_price"
                        type="number"
                        placeholder="Enter sell price"
                        className="col-span-3"
                        onChange={(e) =>
                          setSellStock((prev) => ({
                            ...prev!,
                            sell_price: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4 mt-10">
                      <Label htmlFor="total" className="text-right font-medium">
                        Total
                      </Label>
                      <div id="total" className="col-span-3 font-medium">
                        $
                        {(
                          (sellStock?.quantity || 0) *
                          (sellStock?.sell_price || 0)
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      onClick={handleSellStock}
                      className="text-black bg-red-500 hover:bg-red-500 hover:text-white"
                    >
                      Sell Stock
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="w-1/4 flex justify-end h-full">
              <Dialog>
                <DialogTrigger className="mt-4 w-1/5 ml-10 text-xl h-10 hover:scale-110 transition-all duration-300 rounded-full bg-purple-400 dark:bg-purple-800 border-purple-600">
                  +
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] border-purple-600 border-2">
                  <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                      <Label htmlFor="cash" className="text-right">
                        Amount
                      </Label>
                      <Input
                        onChange={(e) => setCash(Number(e.target.value))}
                        id="cash"
                        value={cash}
                        placeholder="$"
                        className="col-span-3 outline-none"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleClick}
                      type="button"
                      className="text-black bg-purple-500 hover:bg-purple-500 hover:text-white"
                    >
                      Add Cash
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="shadow rounded-lg p-4 w-3/4 border border-gray-400">
            <h1 className="text-2xl font-bold">Transactions</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Invested Amount</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transact) => (
                  <TableRow
                    className={`${
                      transact.action === "Sell"
                        ? ""
                        : "bg-slate-300 dark:bg-slate-800"
                    }`}
                    key={transact.id}
                  >
                    <TableCell className="font-medium">
                      {transact.date}
                    </TableCell>
                    <TableCell>{transact.entity_name}</TableCell>
                    <TableCell>${transact.total_value.toFixed(2)}</TableCell>
                    <TableCell>{transact.action}</TableCell>
                    <TableCell>{transact.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;