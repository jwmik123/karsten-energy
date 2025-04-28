import { dataAttr } from "@/sanity/lib/utils";

// Define the type for the Slogan props
interface SloganProps {
  block: {
    _key: string;
    _type: string;
    text?: string;
    size?: "small" | "medium" | "large";
    alignment?: "left" | "center" | "right";
    backgroundColor?: "none" | "light" | "dark" | "primary";
  };
  index: number;
}

export default function Slogan({ block, index }: SloganProps) {
  // Default values if not specified
  const size = block.size || "medium";
  const alignment = block.alignment || "center";
  const backgroundColor = block.backgroundColor || "none";

  // Determine text size based on the size prop
  const textSizeClass = {
    small: "text-2xl md:text-3xl",
    medium: "text-3xl md:text-4xl lg:text-5xl",
    large: "text-4xl md:text-5xl lg:text-6xl",
  }[size];

  // Determine text alignment
  const textAlignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[alignment];

  // Determine background color
  const bgColorClass = {
    none: "bg-transparent",
    light: "bg-gray-100",
    dark: "bg-gray-900 text-white",
    primary: "bg-blue-600 text-white",
  }[backgroundColor];

  return (
    <section className={`py-16 ${bgColorClass}`}>
      <div className="container mx-auto px-4">
        <h2
          className={`font-bold ${textSizeClass} ${textAlignClass} leading-tight italic`}
        >
          "{block.text || "Your compelling slogan here"}"
        </h2>
      </div>
    </section>
  );
}
