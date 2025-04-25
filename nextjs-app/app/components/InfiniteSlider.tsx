"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

// Extend Window interface to include lenis
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

interface InfiniteSliderProps {
  slideWidth?: number;
  slideCount?: number;
  gap?: number;
  speed?: number;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
}

export default function InfiniteSlider({
  slideWidth = 150,
  slideCount = 10,
  gap = 20,
  speed = 50,
  className = "",
  backgroundColor = "#f3f4f6",
  textColor = "#374151",
  borderRadius = 8,
}: InfiniteSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderContentRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<number>(1); // 1: right, -1: left
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [animation, setAnimation] = useState<gsap.core.Tween | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useGSAP(() => {
    // Create initial animation
    const totalWidth = slideCount * (slideWidth + gap);
    const sliderContent = sliderContentRef.current;

    if (!sliderContent) return;

    // Set initial position to center the slider content
    // This ensures we can scroll in both directions from the start
    gsap.set(sliderContent, { x: -totalWidth });

    // Create animation with appropriate positioning for infinite loop
    const newAnimation = gsap.to(sliderContent, {
      x: direction === 1 ? -totalWidth * 2 : 0,
      duration: speed,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        // Reset position to allow infinite looping
        gsap.set(sliderContent, {
          x: direction === 1 ? -totalWidth : -totalWidth,
        });
      },
    });

    setAnimation(newAnimation);

    return () => {
      if (newAnimation) newAnimation.kill();
    };
  }, [direction, slideCount, slideWidth, gap, speed]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Get access to the Lenis instance
    const lenis = window.lenis;

    if (!lenis) return;

    // Handle scroll events from Lenis
    const onLenisScroll = ({
      direction: scrollDirection,
    }: {
      direction: number;
    }) => {
      // Convert to our direction format (1: right, -1: left)
      const normalizedDirection = scrollDirection > 0 ? 1 : -1;

      if (normalizedDirection !== direction) {
        setDirection(normalizedDirection);

        // Update animation direction and position
        if (animation) {
          const totalWidth = slideCount * (slideWidth + gap);

          // Kill existing animation
          animation.kill();

          // Create new animation going in the correct direction
          const newAnimation = gsap.to(sliderContentRef.current, {
            x: normalizedDirection === 1 ? -totalWidth * 2 : 0,
            duration: speed,
            ease: "none",
            repeat: -1,
            onRepeat: () => {
              gsap.set(sliderContentRef.current, {
                x: normalizedDirection === 1 ? -totalWidth : -totalWidth,
              });
            },
          });

          setAnimation(newAnimation);
        }
      }
    };

    // Subscribe to Lenis scroll events if available
    if (lenis && lenis.on) {
      lenis.on("scroll", onLenisScroll);
    }

    // Fallback to regular wheel events if Lenis is not available
    const handleWheel = (e: WheelEvent) => {
      if (window.lenis) return; // Skip if Lenis is handling scroll

      // Detect scroll direction
      const scrollDirection = e.deltaY > 0 ? 1 : -1;

      if (scrollDirection !== direction) {
        setDirection(scrollDirection);

        // Update animation direction and position
        if (animation) {
          const totalWidth = slideCount * (slideWidth + gap);

          // Kill existing animation
          animation.kill();

          // Create new animation going in the correct direction
          const newAnimation = gsap.to(sliderContentRef.current, {
            x: scrollDirection === 1 ? -totalWidth * 2 : 0,
            duration: speed,
            ease: "none",
            repeat: -1,
            onRepeat: () => {
              gsap.set(sliderContentRef.current, {
                x: scrollDirection === 1 ? -totalWidth : -totalWidth,
              });
            },
          });

          setAnimation(newAnimation);
        }
      }

      // Reset scroll timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      setIsScrolling(true);

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      // Unsubscribe from Lenis events
      if (lenis && lenis.off) {
        lenis.off("scroll", onLenisScroll);
      }

      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [animation, direction, slideCount, slideWidth, gap, speed]);

  // Generate colors for slides
  const getColor = (index: number) => {
    const colors = [
      "#f87171",
      "#fb923c",
      "#fbbf24",
      "#a3e635",
      "#34d399",
      "#22d3ee",
      "#60a5fa",
      "#a78bfa",
      "#e879f9",
    ];
    return colors[index % colors.length];
  };

  // Generate the slides with 3 sets: one for left scrolling, one in the middle, one for right scrolling
  const slides = Array.from({ length: slideCount * 3 }, (_, i) => {
    const slideIndex = i % slideCount;
    const slideColor = getColor(slideIndex);

    return (
      <div
        key={i}
        className="flex items-center justify-center shadow-md transition-all duration-300 hover:scale-105"
        style={{
          width: `${slideWidth}px`,
          height: `${slideWidth}px`,
          margin: `0 ${gap / 2}px`,
          backgroundColor: slideIndex === 0 ? backgroundColor : slideColor,
          color: textColor,
          borderRadius: `${borderRadius}px`,
        }}
      >
        <span className="font-bold text-2xl">{slideIndex + 1}</span>
      </div>
    );
  });

  return (
    <div
      ref={sliderRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height: `${slideWidth}px` }}
    >
      <div ref={sliderContentRef} className="flex absolute left-0 top-0">
        {slides}
      </div>
      <div className="absolute top-0 bottom-0 left-0 w-28 bg-gradient-to-r from-blue-100 to-transparent z-10"></div>
      <div className="absolute top-0 bottom-0 right-0 w-28 bg-gradient-to-l from-blue-100 to-transparent z-10"></div>
    </div>
  );
}
