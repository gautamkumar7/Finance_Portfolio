"use client";

import Nav from '@/components/Nav';
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    // Fetch news data from API
    const fetchNews = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/news');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: NewsItem[] = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Nav />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Latest News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.slice(0, 9).map((news, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader>
                <img src={news.image_url} alt={news.headline} className="w-full h-48 object-cover rounded-t-lg" />
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
                <a href={news.news_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
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
