import type { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import ResolvedLink from "@/app/components/ResolvedLink";
import { Check } from "lucide-react";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageQuery, pagesSlugs } from "@/sanity/lib/queries";
import { GetPageQueryResult } from "@/sanity.types";
import { PageOnboarding } from "@/app/components/Onboarding";
import ContactForm from "@/app/components/ContactForm";

// Define the expected structure for headerButton and headerListItems
interface HeaderButton {
  text: string;
  link: {
    linkType?: string;
    href?: string;
    page?: string | null;
    post?: string | null;
    openInNewTab?: boolean;
  } | null;
}

type HeaderListItems = string[];

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const [{ data: page }] = await Promise.all([
    sanityFetch({ query: getPageQuery, params }),
  ]);

  if (!page?._id) {
    return (
      <div className="py-40">
        <PageOnboarding />
      </div>
    );
  }

  // Type assertions for Sanity data
  const headerButton = page.headerButton as HeaderButton | null;
  const headerListItems = page.headerListItems as HeaderListItems | null;

  return (
    <div>
      {page.headerImage && (
        <div className="relative w-full h-[50vh] md:h-[80vh] bg-gray-900">
          <Image
            src={
              urlForImage(page.headerImage)?.width(1920)?.height(1080)?.url() ||
              ""
            }
            alt={page.heading || "Header image"}
            fill
            priority
            className="object-cover opacity-80"
          />

          <div className="absolute bottom-10 md:left-[8%] left-0 flex items-center w-full md:w-1/2">
            <div className="text-left text-white p-4 rounded-lg">
              {page.subheading && (
                <h1 className="text-3xl md:text-[7vh] md:leading-[7vh] font-bold tracking-tight">
                  {page.subheading}
                </h1>
              )}
              {headerListItems && headerListItems.length > 0 && (
                <div className=" my-5 md:my-10 font-light">
                  <ul className="space-y-2">
                    {headerListItems.map((item: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-8 w-8 mr-4 flex-shrink-0 text-white" />
                        <span className="text-lg md:text-2xl">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {headerButton && headerButton.text && (
                <div className="">
                  <ResolvedLink
                    link={headerButton.link}
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium text-xl py-4 px-6 rounded-md transition duration-300"
                  >
                    {headerButton.text}
                  </ResolvedLink>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="">
        <Head>
          <title>{page.heading}</title>
        </Head>
        {!page.headerImage && (
          <div className="">
            <div className="container">
              <div className="pb-6 border-b border-gray-100">
                <div className="max-w-3xl">
                  <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                    {page.subheading}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <PageBuilderPage page={page as GetPageQueryResult} />
        <ContactForm />
      </div>
    </div>
  );
}
