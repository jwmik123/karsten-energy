import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileText,
  Handshake,
  HardHat,
  Headset,
} from "lucide-react";

const points = [
  {
    icon: ClipboardCheck,
    title: "Gratis schouwing",
    text: "Gratis en vrijblijvende schouwing op locatie.",
  },
  {
    icon: Handshake,
    title: "Heldere afspraken",
    text: "Duidelijke afspraken, geen verrassingen achteraf.",
  },
  {
    icon: FileText,
    title: "Persoonlijk rendementsplan",
    text: "Gratis offerte met persoonlijk rendementsplan.",
  },
  {
    icon: Headset,
    title: "Vast aanspreekpunt",
    text: "Persoonlijk contact met duidelijk aanspreekpunt.",
  },
  {
    icon: HardHat,
    title: "Eigen installateurs",
    text: "Eigen ervaren installateurs in vaste teams.",
  },
  {
    icon: BadgeCheck,
    title: "A-kwaliteit producten",
    text: "Wij werken uitsluitend met A kwaliteit producten.",
  },
];

const WhyKarsten = () => {
  return (
    <section className="bg-blue-100 py-20 md:py-28">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 xl:col-span-5">
            <h2 className="text-blue-900 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter">
              Waarom Karsten Energy
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Karsten Energy staat voor kwaliteit, betrouwbaarheid en goede
              communicatie. Wij nemen graag de tijd om u een realistisch,
              helder advies te geven.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              Wij werken met onze eigen gecertificeerde monteurs die er voor
              zorgen dat u 100 procent tevreden bent!
            </p>
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-3 rounded-md bg-red-500 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-red-600"
            >
              Plan een gratis schouwing
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <figure className="lg:col-span-6 lg:col-start-7 w-full max-w-xl mx-auto lg:mr-0">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-layer">
              <Image
                src="/eigenaren.webp"
                alt="De vier eigenaren van Karsten Energy"
                fill
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-sm text-gray-600">
              <span className="font-semibold text-gray-900">De 4 eigenaren</span>{" "}
              — rechts voor Peter Karsten, links voor Pieter Beerepoot, rechts
              achter Jan Reus, links achter Niels Koster
            </figcaption>
          </figure>
        </div>

        <ul className="mt-20 md:mt-24 grid gap-px overflow-hidden rounded-2xl bg-blue-900/10 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
          {points.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              className="bg-white p-8 md:p-10 transition-colors hover:bg-blue-50"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-500 ring-1 ring-inset ring-red-500/20">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <span className="text-sm font-semibold tabular-nums text-gray-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-blue-900">{title}</h3>
              <p className="mt-2 text-gray-600">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyKarsten;
