"use client";
import Image from "next/image";
import Link from "next/link";

export default function EnergyCtaSection() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/groene-energy.webp"
          alt="Solar panels and wind turbines"
          fill
          className="object-cover brightness-90"
          priority
        />
      </div>

      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent z-10"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center z-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tighter">
          Neem de regie over je eigen energie door Karsten Energy met Groeno
          Energie!
        </h2>

        <Link
          href="/energiecontract"
          className="mt-8 inline-block bg-transparent border border-white hover:bg-white hover:text-black text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
        >
          Meer over ons dynamische energiecontract
        </Link>

        {/* Groeno Logo - using Karsten logo as fallback */}
        <div className="absolute bottom-8 right-8">
          <Image
            src="/groeno-logo.png"
            alt="Groeno Energy Partner"
            width={150}
            height={50}
            className="object-contain p-2 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
