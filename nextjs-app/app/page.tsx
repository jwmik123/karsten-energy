import LandingImage from "./components/LandingImage";
import HeroSection from "./components/HeroSection";
import StaggeringText from "./components/StaggeringText";
import ServicesSection from "./components/ServicesSection";
import EnergyCtaSection from "./components/EnergyCtaSection";
import HomepageFaq from "./components/HomepageFaq";
import ReviewsSection from "./components/ReviewsSection";
import { getSettings } from "./lib/sanity";
import WhyKarsten from "./components/WhyKarsten";

export default async function Page() {
  // Fetch settings data
  const settingsData = await getSettings();

  return (
    <>
      <LandingImage heroSlider={settingsData?.heroSlider} />
      {/* <StaggeringText /> */}
      <HeroSection />
      <WhyKarsten />
      <ServicesSection layout="grid" />
      <EnergyCtaSection />
      <ReviewsSection />
      <HomepageFaq />
      {/* Full-width Image Section */}
      <section className="py-4 bg-white">
        <div className="">
          <div className="relative w-full overflow-hidden h-[420px]">
            <img
              src="/bussen.webp"
              alt="Karsten Energy Solar Installation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
