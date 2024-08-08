import React from 'react';
import { BellDot } from 'lucide-react';
import Image from 'next/image';
import hero from '/public/hero.jpeg';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { Card, CardHeader, CardContent } from './ui/card';
import Link from 'next/link';
  
  
  

const Nav = () => {
    return (
        <div className="relative ">
            <div className='bg-[#708090] w-full h-32 flex items-center justify-around p-4'>
                <div className='text-white font-bold text-2xl'>
                   FINANCE PORTFOLIO
                </div>
                {/* <div className='flex space-x-3 items-center'>
                    <BellDot color="white" size={24} />
                    <div className='relative w-10 h-10'>
                        <Image
                            className='rounded-full'
                            src={hero}
                            layout='fill' 
                            objectFit='cover' 
                            alt='Gautam'
                        />
                    </div>
                    <span className='text-white font-semibold text-lg'>Gautam</span>
                </div> */}
            </div>
            
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3/5 -bottom-6 ">
            {/* <div className="bg-white rounded-md shadow-md px-6 py-3">  */}
            <Card>
            <CardHeader className="p-4 pb-0"></CardHeader>
            <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href= "/portfolio" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Portfolio Insights
                        </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href= "/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Market Overview
                        </NavigationMenuLink>
                        </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                        <NavigationMenuTrigger>Trade</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[100px] ">
                               <li>Buy</li>
                               <li>Sell</li>
                            </ul>
                        </NavigationMenuContent>
                        </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            </CardContent>
            </Card>
            </div>
            </div>
        // </div>
    );
};

export default Nav;