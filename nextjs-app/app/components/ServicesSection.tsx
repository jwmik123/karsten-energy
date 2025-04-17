import { draftMode } from "next/headers";
import { client } from "@/sanity/lib/client";
import { allServicesQuery } from "@/sanity/lib/queries";
import ServiceCarousel from "./ServiceCarousel";

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

export default async function ServicesSection() {
  let services = [];

  try {
    if (client) {
      services = await client.fetch(allServicesQuery);
    }
  } catch (error) {
    console.error("Error fetching services from Sanity:", error);
  }

  // If services fetch failed or returned empty, use fallback data
  if (!services || !Array.isArray(services) || services.length === 0) {
    return <ServiceCarousel services={fallbackServices} />;
  }

  return <ServiceCarousel services={services} />;
}
