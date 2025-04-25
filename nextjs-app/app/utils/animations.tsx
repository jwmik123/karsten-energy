"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Text splitter helper - splits text into words or characters
export const splitText = (
  text: string,
  splitBy: "words" | "chars" = "words"
): string[] => {
  if (splitBy === "words") {
    return text.split(/\s+/);
  } else {
    return text.split("");
  }
};

// Text stagger animation hook
export const useTextStaggerAnimation = (
  containerRef: React.RefObject<HTMLElement>,
  options?: {
    delay?: number;
    staggerAmount?: number;
    fromY?: number;
    duration?: number;
    scrollTrigger?: boolean;
    start?: string;
    markers?: boolean;
  }
) => {
  const {
    delay = 0,
    staggerAmount = 0.1,
    fromY = 40,
    duration = 0.8,
    scrollTrigger = false,
    start = "top 80%",
    markers = false,
  } = options || {};

  useGSAP(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(".stagger-item");

    const animationConfig = {
      opacity: 0,
      y: fromY,
      duration,
      stagger: staggerAmount,
      ease: "power3.out",
    };

    if (scrollTrigger) {
      gsap.from(elements, {
        ...animationConfig,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          markers,
        },
      });
    } else {
      gsap.from(elements, {
        ...animationConfig,
        delay,
      });
    }
  }, [
    containerRef,
    delay,
    staggerAmount,
    fromY,
    duration,
    scrollTrigger,
    start,
    markers,
  ]);
};

// Wrap each word in a span with stagger-item class
export const StaggeredWords: React.FC<{ text: string }> = ({ text }) => {
  const words = splitText(text);

  return (
    <>
      {words.map((word, index) => (
        <span
          key={index}
          className="stagger-item"
          style={{ display: "inline-block" }}
        >
          {word}
          {index < words.length - 1 && <>&nbsp;</>}
        </span>
      ))}
    </>
  );
};

// Image reveal animation hook
export const useImageRevealAnimation = (
  containerRef: React.RefObject<HTMLElement>,
  options?: {
    duration?: number;
    ease?: string;
    start?: string;
    markers?: boolean;
    delay?: number;
  }
) => {
  const {
    duration = 1.2,
    ease = "power3.inOut",
    start = "top 80%",
    markers = false,
    delay = 0,
  } = options || {};

  useGSAP(() => {
    if (!containerRef.current) return;

    const imageWrappers = containerRef.current.querySelectorAll(
      ".image-reveal-wrapper"
    );

    imageWrappers.forEach((wrapper) => {
      const revealMask = wrapper.querySelector(".image-reveal-mask");
      const shadowTarget = wrapper.closest(".shadow-target") || wrapper;

      // Remove shadow class if it exists
      shadowTarget.classList.remove("shadow-lg");

      gsap.to(revealMask, {
        height: "100%",
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: wrapper,
          start,
          markers,
        },
        onComplete: () => {
          // Add shadow when animation completes
          shadowTarget.classList.add("shadow-lg");
        },
      });
    });
  }, [containerRef, duration, ease, start, markers, delay]);
};

// Image reveal component with proper structure for Next.js Image
export const RevealImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}> = ({ src, alt, className = "", imgClassName = "" }) => {
  return (
    <div
      className={`image-reveal-wrapper ${className}`}
      style={{ position: "relative", overflow: "hidden" }}
    >
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
        {/* Image that will be revealed */}
        <div className="relative w-full h-full">
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover ${imgClassName}`}
          />
        </div>
      </div>
      {/* Invisible image to maintain layout dimensions */}
      <div className="relative w-full h-full invisible" aria-hidden="true">
        <img
          src={src}
          alt=""
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      </div>
    </div>
  );
};
