import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-red-500 text-white font-light">
      <div className="container mx-auto px-4 pt-16 pb-6">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left Column with Logo */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <Image
              src="/karstenenergy-logo.png"
              alt="Karsten Energy"
              width={128}
              height={64}
              className="h-16 mb-6 w-auto"
            />
            {/* Team image */}
            <div className="flex flex-row overflow-hidden max-h-[250px] relative -ml-10">
              <Image
                src="/team2.webp"
                alt="Karsten Energy Team"
                width={320}
                height={240}
                className="w-full max-w-xs rounded-md object-cover object-top relative z-10"
              />
              <Image
                src="/team.webp"
                alt="Karsten Energy Team"
                width={320}
                height={240}
                className="w-full max-w-xs rounded-md object-cover object-top -ml-24"
              />
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:info@karstenenergy.nl"
                  className="hover:underline"
                >
                  info@karstenenergy.nl
                </a>
              </li>
              <li>
                <a href="tel:085-8000611" className="hover:underline">
                  085-8000 611
                </a>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-6">
              <Link
                href="https://www.instagram.com/karstenenergy?igshid=YjNmNGQ3MDY%3D"
                target="_blank"
                aria-label="Instagram"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=100091402505680"
                target="_blank"
                aria-label="Facebook"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              {/* <a href="#" aria-label="LinkedIn">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a> */}
            </div>
            <div className="flex space-x-4 mt-12 items-center">
              {/* <div className="">
                <Image src="/stek.png" alt="STEK" width={60} height={30} />
              </div>

           
              <div className="">
                <Image src="/kiwa.png" alt="KIWA" width={60} height={30} />
              </div>
            </div> */}
            </div>
          </div>

          {/* Thuis Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Thuis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/zonnepanelen" className="hover:underline">
                  Zonnepanelen
                </Link>
              </li>
              <li>
                <Link href="/thuisbatterij" className="hover:underline">
                  Thuisbatterij
                </Link>
              </li>
              <li>
                <Link
                  href="/energie-management-systeem"
                  className="hover:underline"
                >
                  EMS
                </Link>
              </li>
              <li>
                <Link href="/laadpaal" className="hover:underline">
                  Laadpaal
                </Link>
              </li>
              <li>
                <Link href="/airco" className="hover:underline">
                  Airco&apos;s
                </Link>
              </li>
              <li>
                <Link href="/groeno-energie" className="hover:underline">
                  Groeno energie
                </Link>
              </li>
            </ul>
          </div>

          {/* Zakelijk Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Zakelijk</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/zonnepanelen-zakelijk" className="hover:underline">
                  Zonnepanelen
                </Link>
              </li>
              <li>
                <Link
                  href="/lichtgewicht-onderconstructie"
                  className="hover:underline"
                >
                  Lichtgewicht onderconstructie
                </Link>
              </li>
              <li>
                <Link
                  href="/zakelijke-batterijopslag"
                  className="hover:underline"
                >
                  Zakelijke Batterijopslag
                </Link>
              </li>
              <li>
                <Link
                  href="/energie-management-systeem-zakelijk"
                  className="hover:underline"
                >
                  EMS
                </Link>
              </li>
              <li>
                <Link href="/laadpaal-zakelijk" className="hover:underline">
                  Laadpaal
                </Link>
              </li>
              <li>
                <Link href="/airco-zakelijk" className="hover:underline">
                  Airco&apos;s
                </Link>
              </li>
              <li>
                <Link href="/groeno-energie" className="hover:underline">
                  Groeno energie
                </Link>
              </li>
            </ul>
          </div>

          {/* Energie Column */}
          {/* <div>
            <h3 className="text-xl font-bold mb-4">Energie</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/groeno" className="hover:underline">
                  Groeno
                </Link>
              </li>
              <li>
                <Link href="/prijzen" className="hover:underline">
                  Prijzen
                </Link>
              </li>
              <li>
                <Link href="/advies" className="hover:underline">
                  Advies
                </Link>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Certification Logos */}

        {/* Copyright Section */}
        <div className="border-t border-red-500 border-t-red-400 pt-6 mt-6 text-xs flex flex-col md:flex-row items-center justify-between">
          <div>© {currentYear} Karsten Energy B.V.</div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/algemene-voorwaarden" className="hover:underline">
              Algemene voorwaarden
            </Link>
            <Link href="/garantie" className="hover:underline">
              Garantie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
