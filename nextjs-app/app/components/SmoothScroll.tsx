"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  createContext,
  useContext,
  useState,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Create context for scroll initialization
export const ScrollContext = createContext<{ isInitialized: boolean }>({
  isInitialized: false,
});

// Extend Window interface to include lenis
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      autoResize: true,
    });

    // Store lenis instance
    lenisRef.current = lenis;

    // Make lenis globally available
    window.lenis = lenis;

    // Integrate with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Create a RAF (request animation frame) loop for Lenis
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Set initialized state after a small delay to ensure everything is ready
    setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    // Clean up on component unmount
    return () => {
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = undefined;
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ isInitialized }}>
      {children}
    </ScrollContext.Provider>
  );
}
