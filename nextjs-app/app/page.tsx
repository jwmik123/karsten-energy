import LandingImage from "./components/LandingImage";
import HeroSection from "./components/HeroSection";
import StaggeringText from "./components/StaggeringText";
import ServicesSection from "./components/ServicesSection";
import EnergyCtaSection from "./components/EnergyCtaSection";
import HomepageFaq from "./components/HomepageFaq";
import ReviewsSection from "./components/ReviewsSection";
import { getSettings } from "./lib/sanity";

export default async function Page() {
  // Fetch settings data
  const settingsData = await getSettings();

  return (
    <>
      <LandingImage heroSlider={settingsData?.heroSlider} />
      {/* <StaggeringText /> */}
      <HeroSection />
      <ServicesSection layout="grid" />
      <EnergyCtaSection />
      <ReviewsSection />
      <HomepageFaq />
    </>
  );
}
