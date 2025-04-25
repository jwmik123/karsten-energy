import LandingImage from "./components/LandingImage";
import HeroSection from "./components/HeroSection";
import StaggeringText from "./components/StaggeringText";
import ServicesSection from "./components/ServicesSection";
import HomepageFaq from "./components/HomepageFaq";

export default function Page() {
  return (
    <>
      <LandingImage />
      <StaggeringText />
      <HeroSection />
      <ServicesSection />
      <HomepageFaq />
    </>
  );
}
