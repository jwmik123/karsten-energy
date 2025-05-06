"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { StaggeredWords } from "../utils/animations";
import gsap from "gsap";
import { HeroSlide, HeroSlider } from "../types/hero";

interface LandingImageProps {
  heroSlider?: HeroSlider;
}

export default function LandingImage({ heroSlider }: LandingImageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const currentBgRef = useRef<HTMLDivElement>(null);
  const nextBgRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const slides = heroSlider?.slides || [];
  const slideDuration = (heroSlider?.slideDuration || 5) * 1000;

  const updateBackgroundImage = (imageUrl: string) => {
    if (!nextBgRef.current || !currentBgRef.current || !imageUrl) return;

    nextBgRef.current.style.backgroundImage = `url('${imageUrl}')`;

    gsap.to(nextBgRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        currentBgRef.current!.style.backgroundImage = `url('${imageUrl}')`;
        gsap.set(currentBgRef.current, { opacity: 1 });
        gsap.set(nextBgRef.current, { opacity: 0 });
      },
    });
  };

  const nextSlide = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        setCurrentSlide((prevIndex) => {
          const nextIndex = (prevIndex + 1) % slides.length;
          const nextSlideData = slides[nextIndex];
          const nextImageUrl = nextSlideData.image?.asset?.url || "";

          updateBackgroundImage(nextImageUrl);

          requestAnimationFrame(() => {
            gsap.to(contentRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          });

          if (progressRef.current) {
            gsap.set(progressRef.current, { width: "0%" });
          }

          return nextIndex;
        });
      },
    });
  };

  useEffect(() => {
    if (slides.length <= 1) return;

    const firstSlideImage = slides[0]?.image?.asset?.url;
    if (currentBgRef.current && firstSlideImage) {
      currentBgRef.current.style.backgroundImage = `url('${firstSlideImage}')`;
      gsap.set(currentBgRef.current, { opacity: 1 });
    }

    gsap.set(nextBgRef.current, { opacity: 0 });

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, slideDuration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slideDuration, slides]);

  useEffect(() => {
    if (!progressRef.current || slides.length <= 1) return;

    gsap.killTweensOf(progressRef.current);
    gsap.set(progressRef.current, { width: "0%" });
    gsap.to(progressRef.current, {
      width: "100%",
      duration: slideDuration / 1000,
      ease: "none",
    });
  }, [currentSlide, slideDuration]);

  const currentSlideData = slides[currentSlide];
  if (!currentSlideData) return null;

  return (
    <div className="relative h-[100vh] w-full bg-gray-900 overflow-hidden">
      <div ref={slidesContainerRef} className="absolute inset-0">
        <div
          ref={currentBgRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundSize: "cover",
            filter: "brightness(0.8)",
            zIndex: 1,
          }}
        />
        <div
          ref={nextBgRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundSize: "cover",
            filter: "brightness(0.8)",
            opacity: 0,
            zIndex: 2,
          }}
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end z-10">
        <div className="container mx-auto px-6 pb-16">
          <div className="flex flex-col md:flex-row justify-between items-end">
            <div
              ref={contentRef}
              className="slide-content mb-8 md:mb-0 max-w-2xl  text-white px-10 py-8 rounded-xl"
            >
              <span className=" text-md uppercase">Karsten Energy</span>
              <h1 className="text-4xl md:text-7xl font-bold  tracking-tight overflow-hidden pb-2 my-4">
                <StaggeredWords text={currentSlideData.title} />
              </h1>

              {currentSlideData.description && (
                <p className="text-lg md:text-xl mb-6 font-light">
                  {currentSlideData.description}
                </p>
              )}

              {currentSlideData.button && (
                <Link
                  href={currentSlideData.button.link}
                  className="inline-block bg-transparent border border-white hover:bg-white hover:text-black text-white font-semibold py-3 px-8 rounded-md transition duration-300"
                >
                  {currentSlideData.button.text}
                </Link>
              )}
            </div>
          </div>
        </div>

        {slides.length > 1 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
            <div
              ref={progressRef}
              className="h-full bg-blue-500"
              style={{ width: "0%" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
