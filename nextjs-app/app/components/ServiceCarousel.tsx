"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import gsap from "gsap";
import { Flip } from "gsap/dist/Flip";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Register GSAP plugins
gsap.registerPlugin(Flip);

type Service = {
  _id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
};

type ServiceCarouselProps = {
  services: Service[];
};

export default function ServiceCarousel({
  services = [],
}: ServiceCarouselProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const slideRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const titleRefs = useRef<Map<string, HTMLHeadingElement>>(new Map());
  const containerRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // If services is undefined or empty, don't render the component
  if (!services || services.length === 0) {
    return null;
  }

  const handleMouseEnter = (serviceId: string) => {
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
    <div className="relative bg-blue-600 py-24 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-row items-center justify-between pb-12">
          <h2 className="text-4xl font-light mb-8 max-w-lg tracking-tighter">
            De beste oplossingen voor maximale energiebesparing
          </h2>
          <p className="mb-12 max-w-lg text-blue-300 text-lg">
            Van zonnepanelen en laadpalen tot slimme isolatie en
            warmtepompen—elke dienst is zorgvuldig ontworpen voor een duurzamer
            en voordeliger huis.
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="pb-14"
          >
            {services.map((service) => (
              <SwiperSlide key={service._id || `service-${service.slug}`}>
                <div
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
                  >
                    <span className="sr-only">View {service.title}</span>
                  </Link>

                  {/* White container for title and description */}
                  <div
                    className="absolute bottom-4 mx-4 bg-white p-6 z-20 pointer-events-none flex flex-col rounded-xl"
                    style={{ transform: "translateY(100%)", opacity: 0 }}
                    ref={(el) => {
                      if (el) containerRefs.current.set(service._id, el);
                    }}
                  >
                    {/* The title will be moved here on hover via GSAP */}
                    {/* Description below where title will be placed */}
                    <p className="text-black text-left font-light">
                      {service.description}
                    </p>
                  </div>

                  {/* Original title container */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10 gradient-overlay">
                    <h3
                      className="text-white text-2xl font-light tracking-tighter"
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
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation buttons */}
          <div className="swiper-button-prev !text-black !-left-8 !w-16 !h-8 rounded-full bg-white !after:text-lg"></div>
          <div className="swiper-button-next !text-black !right-4 !w-16 !h-8 rounded-full bg-white !after:text-lg"></div>
        </div>
      </div>

      {/* Add CSS for custom Swiper styling */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: white;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 16px;
        }
        .swiper-button-prev,
        .swiper-button-next {
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  );
}
