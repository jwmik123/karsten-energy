import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-light tracking-tighter text-blue-600 md:text-9xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-light tracking-tighter text-black md:text-3xl">
        Deze pagina bestaat niet
      </h1>
      <p className="mt-4 max-w-md text-base text-gray-600">
        De pagina die je zoekt is verplaatst, verwijderd of heeft nooit
        bestaan.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded-md bg-blue-500 px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-600"
      >
        Terug naar de homepage
      </Link>
    </section>
  );
}
