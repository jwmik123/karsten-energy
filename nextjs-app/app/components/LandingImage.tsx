import Link from "next/link";

export default function LandingImage() {
  return (
    <div className="relative h-screen w-full bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/thuisbatterij-karsten.webp')",
          backgroundSize: "cover",
          filter: "brightness(0.7)",
        }}
      />

      {/* Content container */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="container mx-auto px-6 pb-16">
          <div className="flex flex-col md:flex-row justify-between items-end">
            {/* Company name on bottom left */}
            <div className="mb-8 md:mb-0">
              <h1 className="text-4xl md:text-8xl font-bold text-white uppercase tracking-tighter">
                Karsten Energy
              </h1>
            </div>

            {/* Text and button on bottom right */}
            <div className="max-w-lg">
              <p className="text-white text-lg mb-6">
                <strong>Karsten Energy</strong> staat voor kwaliteit,
                betrouwbaarheid en goede communicatie. Wij nemen graag de tijd
                om u een realistisch, helder advies te geven.
              </p>
              <Link
                href="/about"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-md transition duration-300"
              >
                Ontdek de thuisbatterij
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
