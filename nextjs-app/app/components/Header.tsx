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
            <div className="flex items-center gap-12">
              <Link className="flex items-center gap-2" href="/">
                <Image
                  src="/karstenenergy-logo.png"
                  alt="Karsten Energy"
                  width={200}
                  height={200}
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:block">
                <ul
                  role="list"
                  className="flex items-center gap-4 md:gap-8 leading-5 text-md md:text-xl font-normal"
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
                    <div className="absolute text-black  w-64 left-0 mt-2 rounded-md shadow-lg bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="p-2">
                        <Link
                          href="/zonnepanelen"
                          className="block px-4 py-2 text-md  hover:font-bold transition-all duration-300"
                        >
                          Zonnepanelen
                        </Link>
                        <Link
                          href="/thuisbatterij"
                          className="block px-4 py-2 text-md  hover:font-bold  transition-all duration-300"
                        >
                          Thuisbatterij
                        </Link>
                        <Link
                          href="/energie-management-systeem"
                          className="block px-4 py-2 text-md  hover:font-bold  transition-all duration-300"
                        >
                          EMS
                        </Link>
                        <Link
                          href="/thuis/optie-3"
                          className="block px-4 py-2 text-md  hover:font-bold  transition-all duration-300"
                        >
                          Laadpaal
                        </Link>
                        <Link
                          href="/airco"
                          className="block px-4 py-2 text-md  hover:font-bold  transition-all duration-300"
                        >
                          Airco&apos;s
                        </Link>
                        <Link
                          href="/airco"
                          className="block px-4 py-2 text-md  hover:font-bold  transition-all duration-300"
                        >
                          Groeno energie
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
                    <div className="absolute text-black w-64 left-0 mt-2 rounded-md shadow-lg bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="p-2">
                        <Link
                          href="/zonnepanelen-zakelijk"
                          className="block px-4 py-2 text-md  hover:font-bold transition-all duration-300"
                        >
                          Zonnepanelen
                        </Link>
                        <Link
                          href="/lichtgewicht-onderconstructie"
                          className="block px-4 py-2 text-md  hover:font-bold transition-all duration-300"
                        >
                          Lichtgewicht onderconstructie
                        </Link>
                        <Link
                          href="/zakelijke-batterijopslag"
                          className="block px-4 py-2 text-md  hover:font-bold transition-all duration-300"
                        >
                          Zakelijke Batterijopslag
                        </Link>
                        <Link
                          href="/energie-management-systeem-zakelijk"
                          className="block px-4 py-2 text-md  hover:font-bold transition-all duration-300"
                        >
                          EMS
                        </Link>
                        <Link
                          href="/laadpaal-zakelijk"
                          className="block px-4 py-2 text-md  hover:font-bold transition-all duration-300"
                        >
                          Laadpaal
                        </Link>
                        <Link
                          href="/airco-zakelijk"
                          className="block px-4 py-2 text-md  hover:font-bold hover:text-blue-500 transition-all duration-300"
                        >
                          Airco&apos;s
                        </Link>
                        <Link
                          href="/groeno-energie-zakelijk"
                          className="block px-4 py-2 text-md  hover:font-bold hover:text-blue-500 transition-all duration-300"
                        >
                          Groeno energie
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
                  <li>
                    <Link href="/airco" className={`relative group`}>
                      Airco&apos;s
                      <span
                        className={`absolute -bottom-1 left-0 h-[1px] bg-current transition-all duration-300 ${
                          pathname === "/airco"
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </Link>
                  </li>
                  {/* <li className="relative group">
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
                  </li> */}
                </ul>
              </nav>
            </div>

            {/* Desktop Contact Button */}
            <div className="hidden md:flex items-center gap-8 divide-white">
              <div className="flex items-center gap-2">
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
              </div>
              <Link
                href="/contact"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium text-lg py-2 px-6 rounded-md transition duration-300"
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
