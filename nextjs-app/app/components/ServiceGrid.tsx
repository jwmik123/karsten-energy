"use client";
import { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Flip } from "gsap/dist/Flip";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollContext } from "./SmoothScroll";

// Register GSAP plugins
gsap.registerPlugin(Flip, ScrollTrigger);

type Service = {
  _id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
};

type ServiceGridProps = {
  services: Service[];
};

export default function ServiceGrid({ services = [] }: ServiceGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const slideRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const titleRefs = useRef<Map<string, HTMLHeadingElement>>(new Map());
  const containerRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const gridRef = useRef<HTMLDivElement>(null);
  const { isInitialized } = useContext(ScrollContext);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    // Check on initial load
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!gridRef.current || !isInitialized) return;

    const gridItems = Array.from(gridRef.current.children);

    gsap.fromTo(
      gridItems,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: {
          amount: 1.5,
          from: "start",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [services, isInitialized]);

  // If services is undefined or empty, don't render the component
  if (!services || services.length === 0) {
    return null;
  }

  const handleMouseEnter = (serviceId: string) => {
    if (isMobile) return;

    setHoveredId(serviceId);

    const slide = slideRefs.current.get(serviceId);
    const titleEl = titleRefs.current.get(serviceId);
    const containerEl = containerRefs.current.get(serviceId);

    if (slide && titleEl && containerEl) {
      // Save current state for FLIP animation
      const state = Flip.getState(titleEl);

      // Move title to the container, positioning it as the first child
      const firstChild = containerEl.firstChild;
      containerEl.insertBefore(titleEl, firstChild);

      // Apply style changes
      titleEl.classList.remove("text-white");
      titleEl.classList.add("text-black", "mb-3");

      // Animate container from bottom
      gsap.fromTo(
        containerEl,
        {
          y: "100%",
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        }
      );

      // Animate the title with FLIP
      Flip.from(state, {
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  const handleMouseLeave = (serviceId: string) => {
    if (isMobile) return;

    setHoveredId(null);

    const slide = slideRefs.current.get(serviceId);
    const titleEl = titleRefs.current.get(serviceId);
    const containerEl = containerRefs.current.get(serviceId);

    if (slide && titleEl && containerEl) {
      // Save current state for FLIP animation
      const state = Flip.getState(titleEl);

      // Move title back to original container
      const gradientEl = slide.querySelector(".gradient-overlay");
      if (gradientEl) {
        gradientEl.appendChild(titleEl);
      }

      // Reset title styles
      titleEl.classList.add("text-white");
      titleEl.classList.remove("text-black", "mb-3");

      // Animate the title with FLIP
      Flip.from(state, {
        duration: 0.5,
        ease: "power3.out",
      });

      // Animate container back down
      gsap.to(containerEl, {
        y: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  return (
    <div id="services" className="relative bg-blue-600 py-24 text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tighter">
          Wat wij bieden
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-between md:pb-12">
          <h2 className="text-4xl font-light mb-8 max-w-xl tracking-tighter">
            De beste oplossingen voor maximale energiebesparing
          </h2>
          <p className="mb-12 max-w-lg text-blue-200 text-lg">
            Van zonnepanelen en laadpalen tot slimme isolatie en
            warmtepompen—elke dienst is zorgvuldig ontworpen voor een duurzamer
            en voordeliger huis.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <div
              key={service._id || `service-${service.slug}`}
              className="relative group rounded-xl overflow-hidden aspect-[3/4] bg-white/10"
              ref={(el) => {
                if (el) slideRefs.current.set(service._id, el);
              }}
            >
              <Link
                href={`/${service.slug}`}
                className="block absolute inset-0 z-30"
                onMouseEnter={() => handleMouseEnter(service._id)}
                onMouseLeave={() => handleMouseLeave(service._id)}
                aria-label={`View details about ${service.title}`}
              >
                <span className="sr-only">View {service.title}</span>
              </Link>

              {/* White container for title and description */}
              <div
                className="absolute bottom-2 mx-2 bg-white p-4 z-20 pointer-events-none flex flex-col rounded-xl"
                style={{ transform: "translateY(100%)", opacity: 0 }}
                ref={(el) => {
                  if (el) containerRefs.current.set(service._id, el);
                }}
              >
                {/* The title will be moved here on hover */}
                <p className="text-black text-left text-md font-light">
                  {service.description}
                </p>
              </div>

              {/* Original title container */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 md:px-6 py-4 md:py-6 z-10 gradient-overlay">
                <h3
                  className="text-white text-xl md:text-2xl font-light tracking-tighter"
                  ref={(el) => {
                    if (el) titleRefs.current.set(service._id, el);
                  }}
                >
                  {service.title}
                </h3>
              </div>

              <div className="absolute inset-0">
                {service.image && (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
