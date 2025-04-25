"use client";

import { useRef } from "react";
import Image from "next/image";
import { useImageRevealAnimation } from "../utils/animations";

interface AnimatedHeroImageProps {
  imageUrl: string;
  altText: string;
}

export default function AnimatedHeroImage({
  imageUrl,
  altText,
}: AnimatedHeroImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply the animation to the image
  useImageRevealAnimation(containerRef);

  return (
    <div ref={containerRef} className="h-full w-full">
      <div className="image-reveal-wrapper h-full w-full relative overflow-hidden">
        <div
          className="image-reveal-mask"
          style={{
            height: "0%",
            width: "100%",
            position: "absolute",
            bottom: 0,
            overflow: "hidden",
          }}
        >
          {/* The actual image that will be revealed */}
          <Image
            src={imageUrl}
            alt={altText}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Invisible placeholder image to maintain layout dimensions */}
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover invisible"
          aria-hidden="true"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
