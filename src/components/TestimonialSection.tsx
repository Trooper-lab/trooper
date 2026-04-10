"use client";

import { PixelGlyph } from "./PixelGlyph";

/**
 * TestimonialSection Architecture
 * 
 * WHY: This section grounds the 'Anti-Agency' brand in human verification. 
 * Industrial Aesthetic: We use a rigid 1px grid and technical labels (REF CONTENT_XX) 
 * to move away from the 'soft' look of typical agency testimonials.
 */

/**
 * Testimonial Data
 * WHY: Defined at module level because this is static content that never changes
 * at runtime. Keeping it here also makes it easy for a non-developer to find and
 * update client quotes without touching any logic or styling code.
 *
 * To add a new testimonial, copy one entry and change the text, name, and position.
 */
interface Testimonial {
    id: string;      // Display number shown in the 'REF CONTENT_XX' tag
    name: string;    // Client's full name (displayed in UPPERCASE)
    position: string; // Client's job title
    text: string;    // The quote shown as the main review body
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: "01",
        name: "Megan Pearson",
        position: "CERCOMS",
        text: "Trooper didn't just build a website — they built a presence. The team understood our brief from day one and the result speaks for itself.",
    },
    {
        id: "02",
        name: "Mark Coffie",
        position: "Magicalbutter.com",
        text: "Working with Trooper was one of the best decisions we made. They brought ideas to the table we hadn't considered and executed them flawlessly.",
    },
    {
        id: "03",
        name: "Bill Muhammed",
        position: "MyAMZTeam",
        text: "From strategy to launch, the process was seamless. Our platform looks world-class and our users feel the difference immediately.",
    },
];

export function TestimonialSection() {
    return (
        <section className="py-24 px-6 md:px-12 bg-[#E0E0E0] w-full border-t border-black/10">
            <div className="max-w-7xl mx-auto flex flex-col">

                {/* Header with technical data feel 
                    WHY: Pulse animation and tracking-[1em] create a 'live data feed' vibe. */}
                <div className="flex items-center gap-4 mb-24 opacity-40">
                    <div className="w-2 h-2 bg-foreground rounded-full animate-pulse"></div>
                    <h2 className="font-sans text-[10px] tracking-[1em] uppercase">
                        [ CLIENT LOGS / VERIFIED FEEDBACK ]
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3">
                    {TESTIMONIALS.map((client, i) => (
                        <div
                            key={i}
                            className={`flex flex-col p-12 border-black/10 transition-all group hover:bg-black/[0.02] 
                                ${i === 0 ? "border-l border-y" : "border-r border-y"} 
                                ${i === 1 ? "bg-black/[0.01]" : ""}`}
                        >
                            {/* Review Tag */}
                            <div className="font-display text-[9px] mb-8 opacity-30 group-hover:opacity-100 transition-opacity">
                                REF CONTENT_{client.id}
                            </div>

                            {/* Large Industrial Quote */}
                            <p className="font-sans text-[32px] font-medium leading-[1.15] tracking-tight mb-20 min-h-[160px]">
                                "{client.text}"
                            </p>

                            {/* Meta Data with Pixel Accent 
                                WHY: The deterministic seed (i + 42) ensures each testimonial 
                                has a unique, persistent brand mark without random flickering. */}
                            <div className="mt-auto pt-12 border-t border-black/10 flex items-center gap-6">
                                <div className="w-12 h-12 flex items-center justify-center border border-black/10 bg-white group-hover:scale-110 transition-transform">
                                    <PixelGlyph seed={i + 42} size={24} color="#000" />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <h3 className="font-display text-[10px] uppercase leading-none tracking-wider">
                                        {client.name}
                                    </h3>
                                    <p className="font-sans text-[10px] uppercase opacity-40 tracking-widest whitespace-nowrap">
                                        {client.position}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer status line 
                    WHY: Constant structural feedback reinforces the 'Superfluid' system identity. */}
                <div className="mt-24 flex justify-between items-center opacity-20 font-sans text-[8px] uppercase tracking-[0.5em]">
                    <span>STATUS: ALL NODES OK</span>
                    <span>©2025 TROOPER LABS</span>
                </div>
            </div>
        </section>
    );
}
