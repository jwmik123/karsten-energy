"use client";

import Link from "next/link";
import { useRef } from "react";
import { StaggeredWords, useTextStaggerAnimation } from "../utils/animations";

export default function LandingImage() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Apply stagger animation to the h1 text (no scroll trigger)
  useTextStaggerAnimation(titleRef, {
    delay: 0.5,
    staggerAmount: 0.15,
    fromY: 40,
  });

  return (
    <div className="relative h-screen w-full bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/thuisbatterij-karsten.webp')",
          backgroundSize: "cover",
          filter: "brightness(0.7)",
        }}
      />

      {/* Content container */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="container mx-auto px-6 pb-16">
          <div className="flex flex-col md:flex-row justify-between items-end">
            <div className="mb-8 md:mb-0">
              <h1
                ref={titleRef}
                className="text-4xl md:text-8xl font-bold text-white uppercase tracking-tighter overflow-hidden"
              >
                <StaggeredWords text="Karsten" /> <br />
                <StaggeredWords text="Energy" />
              </h1>
            </div>

            {/* Text and button on bottom right */}
            <div className="max-w-lg">
              <Link
                href="/about"
                className="inline-block bg-transparent border border-white hover:bg-white hover:text-black text-white font-semibold py-3 px-8 rounded-md transition duration-300"
              >
                Ontdek de thuisbatterij
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
