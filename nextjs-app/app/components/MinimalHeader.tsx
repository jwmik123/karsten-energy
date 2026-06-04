"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

export default function MinimalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="relative">
      <div
        className={`fixed z-50 inset-x-0 top-0 flex items-center transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md text-black/80 h-20"
            : "bg-transparent text-white h-20 md:h-32"
        }`}
      >
        <div className="py-6 px-6 w-full">
          <div className="flex items-center justify-between gap-5">
            <Link className="flex items-center gap-2" href="/">
              <Image
                src="/karstenenergy-logo.png"
                alt="Karsten Energy"
                width={200}
                height={200}
                className="w-[120px] md:w-[200px] h-auto"
              />
            </Link>

            <div className="flex items-center gap-4 md:gap-8">
              <div className="relative group">
                <div className="p-2">
                  <Phone
                    size={24}
                    fill="currentColor"
                    strokeWidth={1}
                    className={isScrolled ? "text-black" : "text-white"}
                  />
                </div>
                <div className="absolute right-0 -top-5 mt-2 bg-white rounded-lg shadow-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-800 font-medium whitespace-nowrap text-xl">
                      085 8000 611
                    </span>
                    <span className="text-gray-800 whitespace-nowrap text-xs">
                      Bereikbaar tot 17:30
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium text-md md:text-lg py-2 px-4 md:px-6 rounded-md transition duration-300"
              >
                Advies aanvragen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
