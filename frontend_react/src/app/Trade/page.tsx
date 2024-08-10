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
import { DownloadIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

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

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get<Transaction[]>(
          "http://127.0.0.1:5000/api/transactions"
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

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <Nav />
      <div className="p-4 mt-8">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-3/4 flex justify-center gap-5 mb-2">
            <Button className="mt-4 text-xl h-10 w-1/5 rounded-full  hover:scale-110 transition-all duration-300 bg-green-700">
              Buy
            </Button>
            <Button className="mt-4 w-1/5 text-xl h-10 hover:scale-110 transition-all duration-300 rounded-full  bg-red-700">
              Sell
            </Button>
          </div>
          <div className="bg-white shadow rounded-lg p-4 w-3/4">
            <h1 className="text-2xl font-bold">Transactions</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Invested Amount</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transact) => (
                  <TableRow
                    className={`${
                      transact.action === "Sell" ? "" : "bg-slate-300"
                    } `}
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