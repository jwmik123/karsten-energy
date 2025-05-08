"use client";

import Image from "next/image";
import React from "react";

const WhyKarsten = () => {
  const points = [
    "Gratis en vrijblijvende schouwing op locatie.",
    "Duidelijke afspraken, geen verrassingen achteraf.",
    "Gratis offerte met persoonlijk rendementsplan.",
    "Persoonlijk contact met duidelijk aanspreekpunt.",
    "Eigen ervaren installateurs in vaste teams.",
    "Wij werken uitsluitend met A kwaliteit producten.",
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex md:flex-col lg:flex-row gap-12 flex-col-reverse">
        {/* Right section - Scrollable */}
        <div className="lg:w-2/5">
          <div className="space-y-4 md:space-y-8">
            {points.map((point, index) => (
              <div
                key={index}
                className="bg-red-500 rounded-lg p-5 md:p-10 text-left shadow-lg flex items-center gap-12"
              >
                <span className="text-6xl font-bold text-red-100/40 select-none min-w-[70px] text-right">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-white text-xl md:text-2xl font-bold max-w-xl">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Left section - Sticky */}
        <div className="lg:w-3/5 lg:sticky lg:top-44 flex flex-col justify-center h-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight tracking-tighter">
            Waarom Karsten Energy
          </h1>
          <p className="text-lg text-gray-600 mt-4 mb-8">
            Karsten Energy staat voor kwaliteit, betrouwbaarheid en goede
            communicatie. Wij nemen graag de tijd om u een realistisch, helder
            advies te geven. <br /> <br /> Wij werken met onze eigen
            gecertificeerde monteurs die er voor zorgen dat u 100 procent
            tevreden bent!
          </p>
          <div className="flex gap-4">
            <div className="w-2/3 h-[300px] relative">
              <Image
                src="/eigenaren.webp"
                alt="Karsten Energy Logo"
                className="object-cover rounded-lg"
                fill
                style={{ objectPosition: "center" }}
              />
            </div>
            <div className="flex w-1/3 h-[300px] relative">
              <p className="text-gray-800 text-sm  font-bold max-w-xl self-end">
                De 4 eigenaren – rechts voor Peter Karsten, links voor Pieter
                Beerepoot, rechts achter Jan Reus, links achter Niels Koster
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyKarsten;
