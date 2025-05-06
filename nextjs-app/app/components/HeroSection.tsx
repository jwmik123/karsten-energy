import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/utils";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import Link from "next/link";
import { groq } from "next-sanity";
import AnimatedHeroImage from "./AnimatedHeroImage";

// Define the GROQ query to fetch all hero section data
const HERO_SECTION_QUERY = groq`*[_type == "heroSection"] {
  _id,
  enabled,
  imagePosition,
  image,
  subtitle,
  title,
  text,
  button
}`;

// Define the type for the fetched data (consider generating this with sanity-typegen)
interface HeroSectionData {
  _id: string;
  enabled: boolean;
  imagePosition: "left" | "right";
  image: any; // Replace 'any' with a more specific type if available from sanity-typegen
  subtitle?: string;
  title: string;
  text: PortableTextBlock[]; // Replace 'any' with PortableTextBlock[] or similar
  button: {
    text: string;
    link?: string;
    // internalLink?: any; // Add if using internal links
  };
}

// Component to render a single hero section
function HeroSectionItem({ data }: { data: HeroSectionData }) {
  // Build the image URL safely
  const imageBuilderInstance = data.image ? urlForImage(data.image) : null;
  const imageUrl = imageBuilderInstance
    ? imageBuilderInstance.width(1000).height(800).url()
    : null;

  // Create the image and content columns with the correct order
  const imageColumn = (
    <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden shadow-target">
      {imageUrl ? (
        <div className="h-full w-full">
          <AnimatedHeroImage
            imageUrl={imageUrl}
            altText={data.title || "Hero image"}
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
    <div className="flex flex-col justify-center text-sm">
      {data.subtitle && (
        <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-2">
          {data.subtitle}
        </p>
      )}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight tracking-tighter">
        {data.title}
      </h1>
      <div className="prose prose-lg text-gray-600 mb-6">
        {data.text && <PortableText value={data.text} />}
      </div>
      {data.button?.text && (
        <Link
          href={data.button.link || "#"} // Default to '#' if no link provided
          className="inline-block bg-transparent border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 font-semibold py-3 px-6 rounded-md transition-colors duration-300 ease-in-out max-w-max"
        >
          {data.button.text}
        </Link>
      )}
      {/* Add placeholder data-sanity attribute for Visual Editing */}
      <div data-sanity={`*[_id == "${data._id}"]`}></div>
    </div>
  );

  return (
    <section className="bg-blue-50 py-12 md:py-20 lg:py-24" key={data._id}>
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
        {data.imagePosition === "right" ? (
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

export default async function HeroSection() {
  // Fetch all hero sections data in a server component
  const heroSections =
    await client.fetch<HeroSectionData[]>(HERO_SECTION_QUERY);

  if (!heroSections || heroSections.length === 0) {
    // Handle the case where no hero section data is found
    console.warn("No hero sections found in Sanity.");
    return null;
  }

  // Filter out disabled hero sections
  const enabledHeroSections = heroSections.filter(
    (section) => section.enabled !== false
  );

  if (enabledHeroSections.length === 0) {
    // If there are hero sections but all are disabled
    console.info("All hero sections are currently disabled.");
    return null;
  }

  return (
    <>
      {enabledHeroSections.map((section) => (
        <HeroSectionItem key={section._id} data={section} />
      ))}
    </>
  );
}
