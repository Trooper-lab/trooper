"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Circle, Square, Triangle, Hexagon, Octagon, Diamond } from "lucide-react";

/**
 * ClientTicker Architecture
 * 
 * WHY: This component creates a 'world-class agency' vibe by showcasing ongoing 
 * client relationships with a seamless, infinite horizontal scroll.
 * Infinite Loop: We duplicate the icon set and use 'xPercent: -50' to ensure 
 * the transition between the end of the first set and the start of the second is invisible.
 */

export function ClientTicker() {
    const tickerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(tickerRef.current, {
            xPercent: -50,
            repeat: -1,
            duration: 15,
            ease: "none",
        });
    });

    return (
        <section className="w-full py-16 md:py-24 overflow-hidden border-t border-black/10 bg-[#F2F2F2]">
            <h3 className="font-sans text-[16px] font-medium mb-[16px] px-6 md:px-12 uppercase tracking-widest">
                Top clients
            </h3>

            {/* WHY: border-y creates a 'machine belt' look that isolates the ticker from the rest of the layout. */}
            <div className="relative w-full flex h-24 md:h-32 mt-8 items-center border-y border-black/5">
                <div ref={tickerRef} className="flex gap-24 md:gap-32 items-center px-12 md:px-16 w-max">
                    {/* First Set */}
                    <Circle className="w-16 h-16 md:w-20 md:h-20 text-black/20 shrink-0" strokeWidth={1.5} />
                    <Square className="w-16 h-16 md:w-20 md:h-20 text-black/20 shrink-0" strokeWidth={1.5} />
                    <Triangle className="w-16 h-16 md:w-20 md:h-20 text-black/20 shrink-0" strokeWidth={1.5} />
                    <Hexagon className="w-16 h-16 md:w-20 md:h-20 text-black/20 shrink-0" strokeWidth={1.5} />
                    <Octagon className="w-16 h-16 md:w-20 md:h-20 text-black/20 shrink-0" strokeWidth={1.5} />
                    <Diamond className="w-16 h-16 md:w-20 md:h-20 text-black/20 shrink-0" strokeWidth={1.5} />

                    {/* Duplicated Set for Seamless Loop */}
                    <Circle className="w-16 h-16 md:w-20 md:h-20 text-black/20 shrink-0" strokeWidth={1.5} />
                    <Square className="w-16 h-16 md:w-20 md:h-20 text-black/20 shrink-0" strokeWidth={1.5} />
                    <Triangle className="w-16 h-16 md:w-20 md:h-20 text-black/20 shrink-0" strokeWidth={1.5} />
                    <Hexagon className="w-16 h-16 md:w-20 md:h-20 text-black/20 shrink-0" strokeWidth={1.5} />
                    <Octagon className="w-16 h-16 md:w-20 md:h-20 text-black/20 shrink-0" strokeWidth={1.5} />
                    <Diamond className="w-16 h-16 md:w-20 md:h-20 text-black/20 shrink-0" strokeWidth={1.5} />
                </div>
            </div>
        </section>
    );
}
