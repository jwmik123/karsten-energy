import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/utils";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import Link from "next/link";
import Image from "next/image";
import { dataAttr } from "@/sanity/lib/utils";

// Define the type for the TextImageSection props
interface TextImageSectionProps {
  block: {
    _key: string;
    _type: string;
    title?: string;
    text?: PortableTextBlock[];
    image?: any;
    imagePosition?: "left" | "right";
    button?: {
      text?: string;
      link?: string;
    };
  };
  index: number;
}

export default function TextImageSection({
  block,
  index,
}: TextImageSectionProps) {
  // Build the image URL safely
  const imageBuilderInstance = block.image ? urlForImage(block.image) : null;
  const imageUrl = imageBuilderInstance
    ? imageBuilderInstance.width(1000).height(800).url()
    : null;

  // Ensure we have a valid image position value
  // If it's not explicitly "left", default to "right" (matching schema default)
  const imagePosition = block.imagePosition === "left" ? "left" : "right";

  // Create the image and content columns
  const imageColumn = (
    <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden">
      {imageUrl ? (
        <div className="h-full w-full relative">
          <Image
            src={imageUrl}
            alt={block.title || "Section image"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>
      ) : (
        <div className="bg-gray-200 h-full w-full flex items-center justify-center">
          <span className="text-gray-500">Image not found</span>
        </div>
      )}
    </div>
  );

  const contentColumn = (
    <div className="flex flex-col justify-center">
      {block.title && (
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {block.title}
        </h2>
      )}
      <div className="prose prose-lg text-gray-600 mb-6">
        {block.text && <PortableText value={block.text} />}
      </div>
      {block.button?.text && (
        <Link
          href={block.button.link || "#"}
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out shadow-md max-w-max"
        >
          {block.button.text}
        </Link>
      )}
    </div>
  );

  // Determine the background color based on index
  const bgColor = index % 2 === 0 ? "bg-white" : "bg-blue-50";

  return (
    <section className={`${bgColor} py-12 md:py-20`}>
      <div
        className="container mx-auto px-4 grid md:grid-cols-2 gap-8 lg:gap-16 items-center"
        data-image-position={imagePosition}
      >
        {imagePosition === "right" ? (
          <>
            {contentColumn}
            {imageColumn}
          </>
        ) : (
          <>
            {imageColumn}
            {contentColumn}
          </>
        )}
      </div>
    </section>
  );
}
