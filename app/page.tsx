import { CtaStrip } from "@/components/cta-strip";
import { StructuredData } from "@/components/structured-data";
import {
  buildFaqSchema,
  buildBusinessSchema,
  buildMetadata,
} from "@/lib/metadata";
import { siteCopyContent } from "@/lib/site-data";

// Extracted Home Components
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/hero-section";
import { AtmosphereSection } from "@/components/home/atmosphere-section";

const RoomsSection = dynamic(() => import("@/components/home/rooms-section").then(mod => mod.RoomsSection), { ssr: true });
const IncludedServicesSection = dynamic(() => import("@/components/home/services-section").then(mod => mod.IncludedServicesSection), { ssr: true });
const HomeGallerySection = dynamic(() => import("@/components/home/gallery-section").then(mod => mod.HomeGallerySection), { ssr: true });
const ExperiencesSection = dynamic(() => import("@/components/home/experiences-section").then(mod => mod.ExperiencesSection), { ssr: true });
const TestimonialsVibeSection = dynamic(() => import("@/components/home/testimonials-vibe-section").then(mod => mod.TestimonialsVibeSection), { ssr: true });
const GuestRatingsSection = dynamic(() => import("@/components/home/guest-ratings").then(mod => mod.GuestRatingsSection), { ssr: true });

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
