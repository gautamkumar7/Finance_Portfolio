"use client";

import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define the TypeScript type for news data
type NewsItem = {
  headline: string;
  image_url: string;
  news_url: string;
  source: string;
  stock_name: string;
  summary: string;
};

const NewsCards: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const router = useRouter();

  // Function to fetch news data from API
  const fetchNews = async () => {
    try {
      const response = await fetch("https://finance-portfolio.onrender.com/api/news");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: NewsItem[] = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleReload = () => {
    fetchNews();
  };

  return (
    <>
      <Nav />
      <div className="w-full flex justify-around mt-10">
        <Button onClick={handleReload}>Reload</Button>
      </div>
      <div className="container mx-auto p-4">
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.slice(0, 9).map((news, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader>
                <img
                  src={news.image_url}
                  alt={news.headline}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="flex-grow">
                <CardTitle className="text-xl mb-2">{news.headline}</CardTitle>
                <CardDescription>{news.summary}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{news.source}</span>
                <span className="text-sm font-semibold">{news.stock_name}</span>
              </CardFooter>
              <CardFooter>
                <a
                  href={news.news_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewsCards;