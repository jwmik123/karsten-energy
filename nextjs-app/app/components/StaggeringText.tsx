"use client";

import React, { useRef } from "react";
import { StaggeredWords, useTextStaggerAnimation } from "../utils/animations";

interface StaggeringTextProps {
  text?: string;
  className?: string;
}

export default function StaggeringText({
  text = "Karsten Energy staat voor kwaliteit, betrouwbaarheid en goede communicatie. Wij nemen graag de tijd om u een realistisch, helder advies te geven.",
  className = "",
}: StaggeringTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);

  // Apply stagger animation with ScrollTrigger
  useTextStaggerAnimation(textRef, {
    staggerAmount: 0.05,
    fromY: 30,
    scrollTrigger: true,
    start: "top 80%", // Trigger when top of element reaches 80% from top of viewport
  });

  return (
    <div className="bg-white">
      <div className="container flex justify-end px-4 py-16">
        <p
          ref={textRef}
          className={`text-left text-3xl max-w-2xl font-light tracking-tighter overflow-hidden ${className}`}
        >
          <StaggeredWords text={text} />
        </p>
      </div>
    </div>
  );
}
