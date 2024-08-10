"use client";

import Nav from "@/components/Nav";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Loading = () => {
  return (
    <>
      <Nav />
      <div className="p-4 mt-8">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-3/4 flex justify-center gap-5 mb-2">
            <Skeleton className="mt-4 w-1/5 h-10 rounded-full" />
            <Skeleton className="mt-4 w-1/5 h-10 rounded-full" />
          </div>
          <div className="shadow rounded-lg w-3/4 border p-2 border-gray-400">
            <Skeleton className="h-8 w-40 mb-4" />
            <Table>
              <TableHeader>
                <TableRow>
                  {['Date', 'Name', 'Invested Amount', 'Action', 'Type'].map((header, index) => (
                    <TableHead key={index}>
                      <Skeleton className="h-4 w-20" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(10)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;