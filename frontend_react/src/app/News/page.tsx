import Nav from '@/components/Nav';
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Separator } from '@radix-ui/react-separator';
import { BarChart, LineChart, AreaChart } from 'lucide-react';
import React from 'react';
import { Bar, Rectangle, XAxis, ReferenceLine, Label, CartesianGrid, YAxis, Line, LabelList, RadialBarChart, PolarAngleAxis, RadialBar, Area } from 'recharts';
type News = {
    ticker: string;
    company_name: string;
    headline: string;
    source: string;
    url: string;
    publishedAt: string;
  };
const news: News = {
    ticker: "MSFT",
    company_name: "Microsoft Corporation",
    headline: "Digital Insurance Platforms Market Analysis and Growth Forecasts to 2029: Uncover the Regional Shares for North America, Europe, Asia-Pacific, Latin America, and the Middle East & Africa",
    source: "GlobeNewswire",
    url: "https://www.globenewswire.com/news-release/2024/08/08/2926739/28124/en/Digital-Insurance-Platforms-Market-Analysis-and-Growth-Forecasts-to-2029-Uncover-the-Regional-Shares-for-North-America-Europe-Asia-Pacific-Latin-America-and-the-Middle-East-Africa.html",
    publishedAt: "2024-08-08T10:50:00Z"
  };


const NewsCard = () => {
  return (
    <>
    <Nav />
    <div>
        

  





    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        
        
        
        {/* <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0" >
          <CardHeader className="space-y-0 pb-2">
            <CardDescription></CardDescription>
            <CardTitle className="text-4xl tabular-nums">
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            
          </CardContent>
          <CardFooter className="flex-col items-start gap-1">
            <CardDescription>
              
            </CardDescription>
            <CardDescription>
             
            </CardDescription>
          </CardFooter>
        </Card> */}


<Card className="lg:max-w-md">
  <CardHeader className="space-y-0 pb-2">
    <CardDescription>{news.company_name}</CardDescription>
    <CardTitle className="text-4xl tabular-nums">
      <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
        {news.ticker}
      </span>
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p>{news.headline}</p>
  </CardContent>
  <CardFooter className="flex-col items-start gap-1">
    <CardDescription>
      Source: {news.source}
    </CardDescription>
    <CardDescription>
      <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
        Read more
      </a>
    </CardDescription>
  </CardFooter>
</Card>






            <Card className="flex flex-col lg:max-w-md" x-chunk="charts-01-chunk-1" >
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
                    <div>
                    <CardDescription>Resting HR</CardDescription>
                    <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                        62
                        <span className="text-sm font-normal tracking-normal text-muted-foreground">
                        bpm
                        </span>
                    </CardTitle>
                    </div>
                    <div>
                    <CardDescription>Variability</CardDescription>
                    <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                        35
                        <span className="text-sm font-normal tracking-normal text-muted-foreground">
                        ms
                        </span>
                    </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-1 items-center"></CardContent>
            </Card>
        </div>
      
      
      <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
        <Card className="max-w-xs" x-chunk="charts-01-chunk-2">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription>
              You're average more steps a day this year than last year.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
                <div className="grid auto-rows-min gap-2">
                    <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                        12,453
                        <span className="text-sm font-normal text-muted-foreground">
                            steps/day
                        </span>
                    </div>
                </div>
            
        <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    10,103
                    <span className="text-sm font-normal text-muted-foreground">
                    steps/day
                    </span>
              </div>
        </div>
       

          </CardContent>
        </Card>
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-4"
        >
          <CardContent className="flex gap-4 p-4 pb-2">

          </CardContent>
          <CardFooter className="flex flex-row border-t p-4">
            <div className="flex w-full items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Move</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  562
                  <span className="text-sm font-normal text-muted-foreground">
                    kcal
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Exercise</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  73
                  <span className="text-sm font-normal text-muted-foreground">
                    min
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Stand</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  14
                  <span className="text-sm font-normal text-muted-foreground">
                    hr
                  </span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="grid w-full flex-1 gap-6">
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-5"
        >
          <CardContent className="flex gap-4 p-4">
            <div className="grid items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Move</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  562/600
                  <span className="text-sm font-normal text-muted-foreground">
                    kcal
                  </span>
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Exercise</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  73/120
                  <span className="text-sm font-normal text-muted-foreground">
                    min
                  </span>
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Stand</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  8/12
                  <span className="text-sm font-normal text-muted-foreground">
                    hr
                  </span>
                </div>
              </div>
            </div>
            
          </CardContent>
        </Card>
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-6"
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle>Active Energy</CardTitle>
            <CardDescription>
              You're burning an average of 754 calories per day. Good job!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
            <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
              1,254
              <span className="text-sm font-normal text-muted-foreground">
                kcal/day
              </span>
            </div>
            
          </CardContent>
        </Card>
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-7"
        >
          <CardHeader className="space-y-0 pb-0">
            <CardDescription>Time in Bed</CardDescription>
            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
              8
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                hr
              </span>
              35
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                min
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            
          </CardContent>
        </Card>
      </div>
    </div>













</div>
    </>
  );
};

export default NewsCard;

