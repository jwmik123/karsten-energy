"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ReviewCard from "./ReviewCard";
import Lenis from "lenis";

// Extend Window interface to include lenis if not already extended
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

interface ReviewData {
  id: number;
  reviewerName: string;
  reviewerImg?: string;
  rating: number;
  reviewText: string;
  date: string;
}

interface ReviewSliderProps {
  reviews: ReviewData[];
  cardWidth?: number;
  gap?: number;
  speed?: number;
  className?: string;
  reverse?: boolean;
  reverseScroll?: boolean;
}

export default function ReviewSlider({
  reviews,
  cardWidth = 320,
  gap = 24,
  speed = 50,
  className = "",
  reverse = false,
  reverseScroll = false,
}: ReviewSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderContentRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<number>(reverse ? -1 : 1); // 1: right, -1: left
  const [animation, setAnimation] = useState<gsap.core.Tween | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useGSAP(() => {
    const totalWidth = reviews.length * (cardWidth + gap);
    const sliderContent = sliderContentRef.current;

    if (!sliderContent) return;

    // Set initial position to center the slider content
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
  }, [direction, reviews.length, cardWidth, gap, speed]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Get access to the Lenis instance
    const lenis = window.lenis;

    // Handle scroll events from Lenis if available
    const onLenisScroll = ({
      direction: scrollDirection,
    }: {
      direction: number;
    }) => {
      // Apply reverseScroll logic if needed
      const normalScrollDirection = scrollDirection > 0 ? 1 : -1;
      const adjustedDirection = reverseScroll
        ? -normalScrollDirection
        : normalScrollDirection;

      if (adjustedDirection !== direction) {
        setDirection(adjustedDirection);

        // Update animation direction and position
        if (animation) {
          const totalWidth = reviews.length * (cardWidth + gap);

          // Kill existing animation
          animation.kill();

          // Create new animation going in the correct direction
          const newAnimation = gsap.to(sliderContentRef.current, {
            x: adjustedDirection === 1 ? -totalWidth * 2 : 0,
            duration: speed,
            ease: "none",
            repeat: -1,
            onRepeat: () => {
              gsap.set(sliderContentRef.current, {
                x: adjustedDirection === 1 ? -totalWidth : -totalWidth,
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

    // Fallback to wheel events if Lenis is not available
    const handleWheel = (e: WheelEvent) => {
      if (window.lenis) return; // Skip if Lenis is handling scroll

      // Detect scroll direction with reverseScroll logic applied
      const normalScrollDirection = e.deltaY > 0 ? 1 : -1;
      const scrollDirection = reverseScroll
        ? -normalScrollDirection
        : normalScrollDirection;

      if (scrollDirection !== direction) {
        setDirection(scrollDirection);

        // Update animation direction and position
        if (animation) {
          const totalWidth = reviews.length * (cardWidth + gap);

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

      scrollTimeout.current = setTimeout(() => {
        // Nothing needed here
      }, 150);
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      // Unsubscribe from Lenis events if applicable
      if (lenis && lenis.off) {
        lenis.off("scroll", onLenisScroll);
      }

      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [
    animation,
    direction,
    reviews.length,
    cardWidth,
    gap,
    speed,
    reverseScroll,
  ]);

  // Generate the review cards with 3 sets for true infinite scrolling
  const reviewCards = Array.from({ length: reviews.length * 3 }).map((_, i) => {
    const reviewIndex = i % reviews.length;
    const review = reviews[reviewIndex];

    return (
      <div
        key={`review-${i}`}
        style={{
          minWidth: `${cardWidth}px`,
          margin: `0 ${gap / 2}px`,
        }}
      >
        <ReviewCard
          reviewerName={review.reviewerName}
          reviewerImg={review.reviewerImg}
          rating={review.rating}
          reviewText={review.reviewText}
          date={review.date}
          width={cardWidth}
        />
      </div>
    );
  });

  return (
    <div
      ref={sliderRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height: `${cardWidth * 0.8}px` }}
    >
      <div ref={sliderContentRef} className="flex absolute left-0 top-0">
        {reviewCards}
      </div>
      <div
        className="absolute top-0 bottom-0 left-0 w-40 z-10 blur-xl"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          maskImage: "linear-gradient(90deg, #000, rgba(0, 0, 0, 0) 100%)",
        }}
      ></div>
      <div
        className="absolute top-0 bottom-0 right-0 w-40 z-10 blur-xl"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          maskImage: "linear-gradient(-90deg, #000, rgba(0, 0, 0, 0) 100%)",
        }}
      ></div>
    </div>
  );
}
