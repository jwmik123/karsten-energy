import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { cache } from "react";

// Extend the client creation to include config
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-03-30",
  useCdn: process.env.NODE_ENV === "production",
});

// Setup the image URL builder
const builder = imageUrlBuilder(client);

// Helper function to get image URL from a reference
export function urlFor(source: any) {
  return builder.image(source);
}

// Fetch settings data including hero slider
export const getSettings = cache(async () => {
  return await client.fetch(`
    *[_type == "settings"][0]{
      title,
      description,
      heroSlider {
        slides[] {
          _key,
          title,
          description,
          image {
            asset->{
              _ref,
              url
            }
          },
          button {
            text,
            link
          }
        },
        slideDuration
      },
      ogImage
    }
  `);
});

// Fetch homepage data with hero slider - deprecated, use getSettings instead
export const getHomepage = cache(async () => {
  return await client.fetch(`
    *[_type == "homepage"][0]{
      title,
      heroSlider {
        slides[] {
          _key,
          title,
          description,
          image {
            asset->{
              _ref,
              url
            }
          },
          button {
            text,
            link
          }
        },
        slideDuration
      },
      pageBuilder[]{
        _type,
        _key,
        ...
      }
    }
  `);
});
