import Image from "next/image";
import ContactFormClient from "./ContactFormClient";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative text-white py-20 md:pt-44">
        <div className="absolute inset-0 z-0">
          <Image
            src="/mannen.jpeg"
            alt="Contact background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/70"></div>
        </div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Neem contact met ons op
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl">
            Heeft u vragen of wilt u een afspraak maken? Neem direct contact met
            ons op.
          </p>
        </div>
      </section>

      {/* Contact Section with Form and Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
                Wij staan voor u klaar
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Bij Karsten Energy zijn we toegewijd aan het leveren van de
                beste energieoplossingen voor uw woning of bedrijf. Neem vandaag
                nog contact met ons op om te ontdekken hoe wij u kunnen helpen
                met duurzame energieoplossingen.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="mr-4 text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600">+31 (0) 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600">info@karstenenergy.nl</p>
                  </div>
                </div>

                {/* <div className="flex items-start">
                  <div className="mr-4 text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      Voorbeeldstraat 123, 1234 AB Amsterdam
                    </p>
                  </div>
                </div> */}
              </div>

              {/* Image now under the text */}
              {/* <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl mt-8">
                <Image
                  src="/team.webp"
                  alt="Karsten Energy Team"
                  fill
                  className="object-cover"
                />
              </div> */}
            </div>

            {/* Right Column - Contact Form */}
            <ContactFormClient />
          </div>
        </div>
      </section>
    </>
  );
}
