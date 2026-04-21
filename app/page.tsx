import { CtaStrip } from "@/components/cta-strip";
import { StructuredData } from "@/components/structured-data";
import {
  buildFaqSchema,
  buildBusinessSchema,
  buildMetadata,
} from "@/lib/metadata";
import { siteCopyContent } from "@/lib/site-data";

// Extracted Home Components
import { HeroSection } from "@/components/home/hero-section";
import { AtmosphereSection } from "@/components/home/atmosphere-section";
import { RoomsSection } from "@/components/home/rooms-section";
import { IncludedServicesSection } from "@/components/home/services-section";
import { HomeGallerySection } from "@/components/home/gallery-section";
import { ExperiencesSection } from "@/components/home/experiences-section";
import { TestimonialsVibeSection } from "@/components/home/testimonials-vibe-section";
import { GuestRatingsSection } from "@/components/home/guest-ratings";

export const metadata = buildMetadata({
  title: siteCopyContent.home.metadata.title,
  description: siteCopyContent.home.metadata.description,
  path: "/",
  image: siteCopyContent.home.metadata.image,
});

export default function Home() {
  return (
    <>
      <StructuredData data={[buildBusinessSchema(), buildFaqSchema()]} />

      <HeroSection />

      <AtmosphereSection />

      <RoomsSection />

      <IncludedServicesSection />

      <HomeGallerySection />

      <ExperiencesSection />

      <TestimonialsVibeSection />

      <GuestRatingsSection />

      <section className="py-8 sm:py-16">
        <div className="shell-container">
          <CtaStrip
            eyebrow={siteCopyContent.home.cta.eyebrow}
            title={siteCopyContent.home.cta.title}
            description={siteCopyContent.home.cta.description}
            image={siteCopyContent.home.cta.image}
            alt={siteCopyContent.home.cta.alt}
          />
        </div>
      </section>
    </>
  );
}
