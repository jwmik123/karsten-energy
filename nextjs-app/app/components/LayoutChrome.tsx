"use client";
import { usePathname } from "next/navigation";
import MinimalHeader from "./MinimalHeader";

// Routes that render with a stripped-down navbar (logo + phone + advies button)
// and no footer.
const MINIMAL_ROUTES = ["/batterij-zakelijk-agrarisch"];

export default function LayoutChrome({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMinimal = MINIMAL_ROUTES.includes(pathname);

  return (
    <>
      {isMinimal ? <MinimalHeader /> : header}
      <main className="">{children}</main>
      {!isMinimal && footer}
    </>
  );
}
