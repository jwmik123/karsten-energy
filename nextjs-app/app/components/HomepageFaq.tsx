import { Suspense } from "react";

import FaqSection from "@/app/components/FaqSection";
import { client } from "@/sanity/lib/client";

// Query to fetch the homepage FAQ data
const homepageFaqQuery = `*[_type == "homepageFaq"][0] {
  title,
  faqItems[] {
    question,
    answer
  }
}`;

async function HomepageFaqContent() {
  // Fetch the homepage FAQ data
  const faqData = await client.fetch(homepageFaqQuery);

  // If there's no FAQ data or no FAQ items, don't render anything
  if (!faqData || !faqData.faqItems || faqData.faqItems.length === 0) {
    return null;
  }

  // Transform the data to match the format expected by FaqSection
  const transformedData = {
    _type: "faqSection" as const,
    title: faqData.title,
    faqItems: faqData.faqItems,
  };

  return <FaqSection block={transformedData} index={0} />;
}

export default function HomepageFaq() {
  return (
    <Suspense fallback={<div className="container my-12">Loading FAQ...</div>}>
      <HomepageFaqContent />
    </Suspense>
  );
}
