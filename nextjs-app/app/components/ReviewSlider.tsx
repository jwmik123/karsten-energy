"use client";
import { useEffect, useRef } from "react";

const reviews = new Array(10).fill({
  name: "Ronald Bussel",
  text: `Wij hebben een laadpaal, thuisbatterij en zonnepanelen van Zonneplan en zijn klaar voor de toekomst. Alles werd heel duidelijk gecommuniceerd, het installeren werd door goede vakmensen gedaan en ziet er allemaal netjes en professioneel uit. Ik raad zonneplan zeker aan!`,
});

export default function ReviewSlider() {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = (el: HTMLDivElement | null, speed: number) => {
      if (!el) return;
      let offset = 0;
      const scroll = () => {
        offset += speed;
        el.scrollLeft = offset;
        if (offset >= el.scrollWidth / 2) {
          offset = 0;
        }
        requestAnimationFrame(scroll);
      };
      scroll();
    };

    animate(topRef.current, 0.5); // langzaam naar links
    animate(bottomRef.current, -0.5); // langzaam naar rechts
  }, []);

  return (
    <div className="space-y-10">
      <h2 className="text-center text-3xl font-bold">
        Wat onze klanten over ons zeggen
      </h2>

      {[topRef, bottomRef].map((ref, index) => (
        <div
          key={index}
          ref={ref}
          className="flex overflow-hidden whitespace-nowrap"
        >
          {[...reviews, ...reviews].map((r, i) => (
            <div
              key={i}
              className="w-[300px] p-4 m-2 rounded-lg bg-white shadow-md shrink-0"
            >
              <h3 className="font-bold">{r.name}</h3>
              <p className="text-sm mt-2">{r.text}</p>
              <div className="mt-4 flex items-center justify-between">
                <span>⭐️⭐️⭐️⭐️⭐️</span>
                <span className="text-xs text-green-600 font-bold">10</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
