"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * IndustrialEcosystem: High-Resolution Blueprint Edition
 * 
 * WHY: This version moves away from 'illustrations' into 'pure architecture'.
 * It uses a minimalist data-grid with massive, high-fidelity numbers that 
 * shift as the user scrolls. It feels like a premium technical terminal 
 * rather than a drawing.
 */
function IndustrialEcosystem({ activeIndex }: { activeIndex: number }) {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Simple, clean transition for the active ID
        gsap.to(".data-id", {
            y: -activeIndex * 100 + "%",
            duration: 0.8,
            ease: "expo.out"
        });

        // Focal point (red dot) moves on the grid
        const positions = [
            { x: "10%", y: "10%" },
            { x: "90%", y: "20%" },
            { x: "10%", y: "80%" },
            { x: "90%", y: "90%" }
        ];

        gsap.to(".focal-point", {
            left: positions[activeIndex].x,
            top: positions[activeIndex].y,
            duration: 1,
            ease: "power3.inOut"
        });

    }, { dependencies: [activeIndex], scope: rootRef });

    return (
        <div ref={rootRef} className="relative w-full h-full bg-white/50 overflow-hidden font-sans select-none">

            {/* The Technical Grid Background */}
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-[0.03]">
                {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-black" />
                ))}
            </div>

            {/* Massive Active Index Number (The "Core") */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[200px] overflow-hidden">
                    <div className="data-id flex flex-col items-center">
                        {["01", "02", "03", "04"].map((num) => (
                            <span key={num} className="text-[200px] leading-none font-medium tracking-tighter opacity-10">
                                {num}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Focal Data Tracking (Red Dot + Crosshair) */}
            <div className="focal-point absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300">
                <div className="absolute inset-0 border border-accent/20 rounded-full animate-ping" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-accent/20" />
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-accent/20" />
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 bg-accent rounded-full shadow-[0_0_10px_#ff4742]" />
            </div>

            {/* Corner Data Tags */}
            <div className="absolute top-8 left-8 flex flex-col gap-1">
                <span className="font-display text-[8px] tracking-[0.4em] opacity-30 uppercase">System Identity</span>
                <span className="font-display text-[9px] tracking-[0.1em] font-bold uppercase">TROOPER_PROCESS_v2.0</span>
            </div>

            <div className="absolute bottom-8 right-8 text-right flex flex-col gap-1">
                <span className="font-display text-[8px] tracking-[0.4em] opacity-30 uppercase">Status Node</span>
                <span className="font-display text-[9px] tracking-[0.1em] font-bold uppercase text-accent">Active Node: 0{activeIndex + 1}</span>
            </div>

            <div className="absolute bottom-8 left-8 flex flex-col gap-1">
                <span className="font-display text-[8px] tracking-[0.4em] opacity-30 uppercase">Coordination</span>
                <span className="font-display text-[9px] tracking-[0.1em] font-bold uppercase opacity-40">AXIS_Y: {activeIndex + 1}0% / AXIS_X: {activeIndex % 2 === 0 ? "10%" : "90%"}</span>
            </div>

        </div>
    );
}

export { IndustrialEcosystem };
