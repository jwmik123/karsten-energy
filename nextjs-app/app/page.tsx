import LandingImage from "./components/LandingImage";
import HeroSection from "./components/HeroSection";
import StaggeringText from "./components/StaggeringText";
import ServicesSection from "./components/ServicesSection";
import EnergyCtaSection from "./components/EnergyCtaSection";
import HomepageFaq from "./components/HomepageFaq";
import ReviewsSection from "./components/ReviewsSection";

export default function Page() {
  return (
    <>
      <LandingImage />
      <StaggeringText />
      <HeroSection />
      <ServicesSection />
      <EnergyCtaSection />
      <ReviewsSection />
      <HomepageFaq />
    </>
  );
}
