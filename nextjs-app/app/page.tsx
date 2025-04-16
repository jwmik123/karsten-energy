import { Suspense } from "react";
import Link from "next/link";

import { AllPosts } from "@/app/components/Posts";
import GetStartedCode from "@/app/components/GetStartedCode";
import Header from "./components/Header";
import LandingImage from "./components/LandingImage";

export default async function Page() {
  return (
    <>
      <LandingImage />
    </>
  );
}
