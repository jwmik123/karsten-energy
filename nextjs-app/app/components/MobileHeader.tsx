"use client";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { useState } from "react";

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`md:hidden fixed top-0 left-0 right-0 z-50 ${isMenuOpen ? "bg-blue-500" : "bg-transparent"} h-20 flex items-center px-6`}
    >
      <div className="flex items-center justify-between w-full">
        <Link className="flex items-center" href="/">
          <Image
            src="/karstenenergy-logo.png"
            alt="Karsten Energy"
            width={100}
            height={100}
            className={isMenuOpen ? "invert brightness-0" : ""}
          />
        </Link>
        <Link
          href="/contact"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium text-md py-2 px-4 rounded-md transition duration-300"
        >
          Advies aanvragen
        </Link>
        <MobileNav onMenuStateChange={setIsMenuOpen} />
      </div>
    </div>
  );
}
