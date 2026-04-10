import { Hero } from "@/components/Hero";
import { CopySection } from "@/components/CopySection";
import { ClientTicker } from "@/components/ClientTicker";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ServiceSection } from "@/components/ServiceSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { InteractiveMarquee } from "@/components/InteractiveMarquee";
import { SoftSnap } from "@/components/animations/SoftSnapPanels";

/**
 * Landing Page — Clean Soft Snap
 *
 * WHY this simple structure:
 * - Each section is a normal flow element at its natural height
 * - SoftSnap wraps everything and adds ONE global ScrollTrigger snap
 * - No pins, no stacking, no fighting with ProjectGallery's internal pin
 * - Each direct child of SoftSnap is a snap point
 * - Scroll stops gently ease to the nearest section boundary
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      <SoftSnap>
        {/* Snap point 1 */}
        <Hero />

        {/* Snap point 2 */}
        <CopySection />

        {/* Snap point 3 — ProjectGallery has its own internal pin+snap */}
        <ProjectGallery />

        {/* Snap point 4 */}
        <ServiceSection />

        {/* Snap point 5 */}
        <div>
          <TestimonialSection />
          <InteractiveMarquee />
        </div>
      </SoftSnap>
    </main>
  );
}
