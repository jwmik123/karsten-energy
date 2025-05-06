import { client } from "@/sanity/lib/client";
import { allServicesQuery } from "@/sanity/lib/queries";
import ServiceCarousel from "./ServiceCarousel";
import ServiceGrid from "./ServiceGrid";

// Fallback data in case Sanity fetch fails
const fallbackServices = [
  {
    _id: "fallback-groeno-energie",
    title: "Groeno Energie",
    description: "Duurzame energie oplossingen voor een groene toekomst.",
    image: "/team.jpg",
    slug: "groeno-energie",
  },
  {
    _id: "fallback-zonnepanelen",
    title: "Zonnepanelen",
    description: "Hoogwaardige zonnepanelen voor optimale energieopwekking.",
    image: "/zonnepanelen-thuis.jpg",
    slug: "zonnepanelen",
  },
  {
    _id: "fallback-airco",
    title: "Airco",
    description: "Energiezuinige airconditioning voor optimaal comfort.",
    image: "/thuisbatterij.jpg",
    slug: "airco",
  },
  {
    _id: "fallback-warmtepomp",
    title: "Warmtepomp",
    description: "Efficiënte warmtepompen voor een duurzame verwarming.",
    image: "/thuisbatterij-karsten.webp",
    slug: "warmtepomp",
  },
  {
    _id: "fallback-laadpaal",
    title: "Laadpaal",
    description: "Slimme laadpalen voor elektrische voertuigen.",
    image: "/laadpaal.jpeg",
    slug: "laadpaal",
  },
];

type ServicesSectionProps = {
  layout?: "carousel" | "grid";
};

// Define the custom order for specific services
const customOrder = [
  "groeno-energie",
  "zonnepanelen",
  "laadpalen",
  "thuisbatterij",
  "energiemanagement-systeem",
];

// Function to sort services based on custom order
const sortServices = (services: any[]) => {
  return [...services].sort((a, b) => {
    const aIndex = customOrder.indexOf(a.slug);
    const bIndex = customOrder.indexOf(b.slug);

    // If both items are in custom order, sort by their position in customOrder
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }

    // If only one item is in custom order, it should come first
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    // If neither item is in custom order, maintain original order
    return 0;
  });
};

export default async function ServicesSection({
  layout = "carousel",
}: ServicesSectionProps) {
  let services: any[] = [];

  try {
    if (client) {
      services = await client.fetch(allServicesQuery);
    }
  } catch (error) {
    console.error("Error fetching services from Sanity:", error);
  }

  // If services fetch failed or returned empty, use fallback data
  if (!services || !Array.isArray(services) || services.length === 0) {
    services = fallbackServices;
  }

  // Sort services according to custom order
  services = sortServices(services);

  return layout === "carousel" ? (
    <ServiceCarousel services={services} />
  ) : (
    <ServiceGrid services={services} />
  );
}
