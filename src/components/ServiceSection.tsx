"use client";

import { useState } from "react";
import { PixelGlyph } from "./PixelGlyph";
import { IndustrialButton } from "./IndustrialButton";

/**
 * ServiceSection Architecture
 * 
 * WHY: This section defines the core value props of the 'Anti-Agency'.
 * Layout: Large focus on the left-side 'designed' glyphs and right-side copy 
 * to create a professional, architectural balance.
 */

/**
 * Service Data
 * WHY: Defined at module level (outside the component) because this list is static —
 * it never changes at runtime. If it were inside the component function, React would
 * re-create the array on every render, wasting memory unnecessarily.
 *
 * To add or remove a service, edit only this block.
 */
interface Service {
    title: string;
    desc: string;
}

const SERVICES: Service[] = [
    {
        title: "Design & Development",
        desc: "We build high-fidelity, 'Anti-Gravity' experiences that feel like the future but still work on a cracked iPhone screen.",
    },
    {
        title: "SEO & Advertising",
        desc: "It's not magic; it's just making sure Google likes you as much as we do.",
    },
    {
        title: "Automation",
        desc: "We build custom workflows that handle the repetitive grunt work so you can focus on the big ideas—or just leave the office at 4 PM.",
    },
    {
        title: "AI Integration",
        desc: "We integrate a custom AI layer that understands your brand. Want to change a headline? Just tell the site.",
    },
];

export function ServiceSection() {
    return (
        <section className="py-20 md:py-32 px-6 md:px-12 bg-[#E9E9E9] w-full overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col">

                <h2 className="font-sans font-medium text-[28px] md:text-[48px] mb-16 md:mb-32 max-w-4xl leading-[1.1] tracking-tight">
                    A full-stack digital studio that combines
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16 md:gap-y-24 mb-20 md:mb-32">
                    {SERVICES.map((service, index) => (
                        <ServiceItem key={index} service={service} index={index} />
                    ))}
                </div>


            </div>
        </section>
    );
}


function ServiceItem({ service, index }: { service: Service; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="flex flex-col md:flex-row gap-6 md:gap-8 items-start group cursor-default"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glyph on the left */}
            <div className="w-16 md:w-24 shrink-0 pt-2 flex justify-start scale-75 md:scale-100 origin-left">
                <PixelGlyph isHovered={isHovered} size={80} initialVariant={index} />
            </div>

            <div className="flex flex-col">
                <h3 className="font-sans text-[24px] md:text-[32px] font-medium mb-3 md:mb-4 tracking-tight md:group-hover:translate-x-2 transition-transform duration-500">
                    {service.title}
                </h3>
                <p className="font-sans text-[15px] md:text-[18px] opacity-60 leading-relaxed max-w-sm md:group-hover:opacity-100 transition-opacity duration-500">
                    {service.desc}
                </p>
            </div>
        </div>
    );
}
