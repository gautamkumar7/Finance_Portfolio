"use client";

import Nav from "@/components/Nav";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const Loading = () => {
  return (
    <>
      <Nav />
      <div className="p-4 mt-8">
        <header className="border-b pb-4 mb-4">
          <Skeleton className="h-8 w-64 mb-4" />
          <div className="flex justify-between mt-4">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <Skeleton className="h-4 w-28 mb-2" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>
        </header>
        <div className="flex w-full items-center justify-center">
          <div className="shadow rounded-lg p-4 w-3/4">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-32" />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  {['Name', 'Buy / Sell', 'Inv. Amount', 'Current Value', 'Profit/Loss'].map((header, index) => (
                    <TableHead key={index}>
                      <Skeleton className="h-4 w-20" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="w-8 h-8 rounded-full" />
                      </div>
                    </TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;