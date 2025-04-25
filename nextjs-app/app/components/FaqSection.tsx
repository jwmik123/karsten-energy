"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { type PortableTextBlock } from "next-sanity";

import PortableText from "@/app/components/PortableText";

// Define inline type instead of importing from sanity.types
type FaqSectionSchema = {
  _type: "faqSection";
  title?: string;
  faqItems?: Array<{
    question: string;
    answer: Array<PortableTextBlock>;
  }>;
};

type FaqProps = {
  block: FaqSectionSchema;
  index: number;
};

type FaqItemProps = {
  question: string;
  answer: PortableTextBlock[];
  isOpen: boolean;
  onClick: () => void;
};

const FaqItem = ({ question, answer, isOpen, onClick }: FaqItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const plusRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        gsap.to(contentRef.current, {
          height: "auto",
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(faqRef.current, {
          paddingBottom: "1rem",
        });

        // Rotate plus to X
        if (plusRef.current) {
          gsap.to(plusRef.current.querySelector(".horizontal"), {
            rotate: 135,
            duration: 0.3,
          });
          gsap.to(plusRef.current.querySelector(".vertical"), {
            rotate: 135,
            duration: 0.3,
          });
        }
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(faqRef.current, {
          paddingBottom: ".5rem",
        });

        // Reset plus
        if (plusRef.current) {
          gsap.to(plusRef.current.querySelector(".horizontal"), {
            rotate: 0,
            duration: 0.3,
          });
          gsap.to(plusRef.current.querySelector(".vertical"), {
            rotate: 0,
            duration: 0.3,
          });
        }
      }
    }
  }, [isOpen]);

  return (
    <div className="bg-blue-100 py-2 px-6 rounded-lg" ref={faqRef}>
      <div
        className="py-4 cursor-pointer flex justify-between items-center"
        onClick={onClick}
      >
        <h3 className="text-xl font-base tracking-tighter text-gray-900">
          {question}
        </h3>
        <div
          ref={plusRef}
          className="relative w-6 h-6 flex items-center justify-center bg-white rounded-full"
        >
          <div className="horizontal absolute w-3 h-0.5 bg-black rounded-full"></div>
          <div className="vertical absolute w-0.5 h-3 bg-black rounded-full"></div>
        </div>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden h-0 bg-white rounded-lg font-light"
      >
        <div className="p-4">
          <PortableText value={answer} />
        </div>
      </div>
    </div>
  );
};

export default function FaqSection({ block }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Split items into two columns to prevent shifting
  const splitFaqItems = () => {
    if (!block?.faqItems) return { leftColumn: [], rightColumn: [] };

    const midpoint = Math.ceil(block.faqItems.length / 2);
    return {
      leftColumn: block.faqItems.slice(0, midpoint),
      rightColumn: block.faqItems.slice(midpoint),
    };
  };

  const { leftColumn, rightColumn } = splitFaqItems();

  return (
    <div className="container my-12">
      <div className="mx-auto">
        {block?.title && (
          <h2 className="text-4xl font-light mb-8 max-w-lg tracking-tighter">
            {block.title}
          </h2>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Left Column */}
          <div className="flex flex-col gap-2">
            {leftColumn.map((item: any, origIndex: number) => {
              const index = origIndex;
              return (
                <FaqItem
                  key={index}
                  question={item.question}
                  answer={item.answer as PortableTextBlock[]}
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                />
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-2">
            {rightColumn.map((item: any, origIndex: number) => {
              const index = origIndex + leftColumn.length;
              return (
                <FaqItem
                  key={index}
                  question={item.question}
                  answer={item.answer as PortableTextBlock[]}
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
