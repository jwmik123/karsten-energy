"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, ChevronRight } from "lucide-react";

interface MobileNavProps {
  onMenuStateChange: (isOpen: boolean) => void;
}

interface NavItem {
  heading?: string;
  href?: string;
  label?: string;
  links?: Array<{ href: string; label: string }>;
  viewAllHref?: string;
}

export default function MobileNav({ onMenuStateChange }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Handle overflow state whenever isOpen changes
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onMenuStateChange(newState);
  };

  const navItems: NavItem[] = [
    {
      heading: "Thuis",
      links: [
        { href: "/zonnepanelen", label: "Zonnepanelen" },
        { href: "/thuisbatterij", label: "Thuisbatterij" },
        { href: "/laadpaal", label: "Laadpaal" },
      ],
      viewAllHref: "/thuis",
    },
    {
      heading: "Zakelijk",
      links: [
        { href: "/zonnepanelen-zakelijk", label: "Zonnepanelen" },
        { href: "/batterij-zakelijk", label: "Zakelijke batterij" },
        { href: "/laadpaal-zakelijk", label: "laadpalen" },
      ],
      viewAllHref: "/zakelijk",
    },
  ];

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="relative z-50 w-8 h-8 focus:outline-none text-white"
        aria-label="Toggle menu"
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          <span
            className={`absolute h-0.5 w-8 bg-current transform transition duration-300 ease-in-out ${
              isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-0.5 w-8 bg-current transform transition duration-300 ease-in-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-8 bg-current transform transition duration-300 ease-in-out ${
              isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
            }`}
          />
        </div>
      </button>

      {/* Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-40 bg-blue-500 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-[110%]"
        }`}
      >
        <div className="flex flex-col h-full pt-12 px-6">
          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-8">
              {navItems.map((item) => (
                <li key={item.heading || item.href}>
                  {item.heading ? (
                    <div className="space-y-4 mb-4">
                      <h3 className="text-sm font-medium text-white/60 uppercase">
                        {item.heading}
                      </h3>
                      <ul className="space-y-4">
                        {item.links?.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className={`text-2xl tracking-tight font-medium text-white ${
                                pathname === link.href
                                  ? "opacity-100"
                                  : "opacity-80"
                              }`}
                              onClick={() => {
                                setIsOpen(false);
                                onMenuStateChange(false);
                              }}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                        {item.viewAllHref && (
                          <li>
                            <Link
                              href="https://karstenenergy.eu/#services"
                              className="flex items-center gap-1 text-lg text-white/60 hover:text-white transition-colors"
                              onClick={() => {
                                setIsOpen(false);
                                onMenuStateChange(false);
                              }}
                            >
                              Bekijk alle diensten
                              <ChevronRight size={16} />
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={item.href || ""}
                      className={`text-4xl tracking-tight font-medium text-white ${
                        pathname === item.href ? "opacity-100" : "opacity-80"
                      }`}
                      onClick={() => {
                        setIsOpen(false);
                        onMenuStateChange(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="py-8 pb-16 border-t border-white/20">
            <div className="flex items-center gap-2 mb-6">
              <Phone size={24} className="text-white" />
              <span className="text-lg font-semibold text-white">
                <Link href="tel:+310858000611">+31 085 8000 611</Link>
              </span>
            </div>
            <Link
              href="/contact"
              className="block w-full bg-white hover:bg-white/90 text-blue-500 font-semibold py-3 px-4 rounded-md text-center transition duration-300"
              onClick={() => {
                setIsOpen(false);
                onMenuStateChange(false);
              }}
            >
              Advies aanvragen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
