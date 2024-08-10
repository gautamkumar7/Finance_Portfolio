import React from "react";
import { BellDot } from "lucide-react";
import Image from "next/image";
import hero from "/public/hero.jpeg";
import landing from "/public/landing.jpeg";
import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Nav = () => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-black to bg-gray-500 w-full h-32 flex items-center justify-around p-4">
        <Link href="/" className="text-white font-bold text-4xl">
          PortfolioX
        </Link>
        <div className="flex space-x-3 items-center">
          <BellDot color="white" size={24} />
          <div className="relative w-10 h-10">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  className="rounded-full cursor-pointer"
                  src={hero}
                  layout="fill"
                  objectFit="cover"
                  alt="Gautam"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-4 mr-10">
                <DropdownMenuItem>
                  <Link href="/team">My Teamates</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link href="/SettingsP">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link href="#">Take a Tour</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ThemeToggleButton />
        </div>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 rounded-lg border-2  w-3/5 -bottom-6">
        <div className="bg-white dark:bg-[#0C0A09] text-gray-700  dark:text-white rounded-md shadow-md px-6 py-3">
          <ul className="flex space-x-6 justify-center">
            <Link className="btn" href="/portfolio" passHref>
              Portfolio
            </Link>
            <Link className="btn" href="/Market">
              Markets
            </Link>
            <Link className="btn" href="/News">
              News
            </Link>
            <Link className="btn" href="/Analytics">
              Analytics
            </Link>
            <Link className="btn" href="/Trade">
              Trades
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;