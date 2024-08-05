import React from 'react';
import { BellDot } from 'lucide-react';
import Image from 'next/image';
import hero from '/public/hero.jpg';

const Nav = () => {
    return (
        <div className="relative">
            <div className='bg-[#5B73E8] w-full h-32 flex items-center justify-around p-4'>
                <div className='text-white font-bold text-2xl'>
                    Portfolio Management
                </div>
                <div className='flex space-x-3 items-center'>
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
                </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3/5 -bottom-6">
                <div className="bg-white rounded-md shadow-md px-6 py-3">
                    <ul className="flex space-x-6 text-gray-600">
                        <li className="font-medium text-[#5B73E8]">Investment Overview</li>
                        <li>Portfolio Insights</li>
                        <li>Recommendations</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Nav;