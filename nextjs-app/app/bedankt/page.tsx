import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bedankt voor uw aanvraag",
  description:
    "Bedankt voor uw aanvraag bij Karsten Energy. We nemen zo snel mogelijk contact met u op.",
  robots: { index: false, follow: false },
};

export default function BedanktPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-blue-50 px-4 py-20">
      <div className="bg-white rounded-lg shadow-md max-w-xl w-full text-center px-8 py-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-blue-900 mb-4">
          Bedankt voor uw aanvraag!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We hebben uw aanvraag ontvangen en nemen zo snel mogelijk contact met
          u op.
        </p>

        <Link
          href="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-medium transition-colors duration-300"
        >
          Terug naar home
        </Link>
      </div>
    </section>
  );
}
