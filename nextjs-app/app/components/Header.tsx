"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const useScrollDetection = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      // Initial check
      handleScroll();

      // Clean up
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return isScrolled;
  };

  const isScrolled = useScrollDetection();

  return (
    <header className="relative hidden md:block">
      <div
        className={`fixed z-50 inset-0 flex items-center transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md text-black/80 h-20"
            : "bg-transparent text-white h-32"
        }`}
      >
        <div className="py-6 sm:px-6 w-full">
          <div className="flex items-center justify-between gap-5">
            <Link className="flex items-center gap-2" href="/">
              <Image
                src="/karstenenergy-logo.png"
                alt="Karsten Energy"
                width={150}
                height={150}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul
                role="list"
                className="flex items-center gap-4 md:gap-8 leading-5  text-sm md:text-lg  font-normal"
              >
                <li className="relative group">
                  <Link
                    href="/thuis"
                    className={`flex items-center font-bold relative`}
                  >
                    Thuis
                    <span
                      className={`absolute -bottom-1 left-0 h-[1px] bg-current transition-all duration-300 ${
                        pathname === "/thuis"
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                  <div className="absolute text-black left-0 mt-2 w-48 rounded-md shadow-lg bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-1">
                      <Link
                        href="/thuis/optie-1"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Zonnepanelen
                      </Link>
                      <Link
                        href="/thuis/optie-2"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Thuisbatterij
                      </Link>
                      <Link
                        href="/thuis/optie-3"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Laadpaal
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="relative group">
                  <Link
                    href="/zakelijk"
                    className={`flex font-bold items-center relative`}
                  >
                    Zakelijk
                    <span
                      className={`absolute -bottom-1 left-0 h-[1px] bg-current transition-all duration-300 ${
                        pathname === "/zakelijk"
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-1">
                      <Link
                        href="/zakelijk/optie-1"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Zonnepanelen
                      </Link>
                      <Link
                        href="/zakelijk/optie-2"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Batterijopslag
                      </Link>
                      <Link
                        href="/zakelijk/optie-3"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Laadpalen
                      </Link>
                    </div>
                  </div>
                </li>
                <li>
                  <Link href="/thuisbatterij" className={`relative group`}>
                    Thuisbatterij
                    <span
                      className={`absolute -bottom-1 left-0 h-[1px] bg-current transition-all duration-300 ${
                        pathname === "/thuisbatterij"
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                </li>
                <li>
                  <Link href="/zonnepanelen" className={`relative group`}>
                    Zonnepanelen
                    <span
                      className={`absolute -bottom-1 left-0 h-[1px] bg-current transition-all duration-300 ${
                        pathname === "/zonnepanelen"
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                </li>
                <li>
                  <Link href="/laadpaal" className={`relative group`}>
                    Laadpaal
                    <span
                      className={`absolute -bottom-1 left-0 h-[1px] bg-current transition-all duration-300 ${
                        pathname === "/laadpaal"
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                </li>
                <li className="relative group">
                  <Link
                    href="/over-ons"
                    className={`flex items-center relative`}
                  >
                    Over ons
                    <span
                      className={`absolute -bottom-1 left-0 h-[1px] bg-current transition-all duration-300 ${
                        pathname === "/over-ons"
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-1">
                      <Link
                        href="/over-ons/team"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Team
                      </Link>
                      <Link
                        href="/over-ons/contact"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>

            {/* Desktop Contact Button */}
            <div className="hidden md:flex items-center gap-4 divide-white">
              <div className="flex items-center gap-2">
                <div className="p-2">
                  <Phone size={20} className="" />
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
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
