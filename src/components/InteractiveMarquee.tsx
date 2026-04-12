"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * InteractiveMarquee Architecture
 * 
 * WHY: This component creates a 'constant shipping' kinetic energy for the brand.
 * Kinetic Feedback: Speed increases based on scroll velocity, giving the site
 * a reactive, 'machine-in-motion' feel that rewards user interaction.
 * Loop Logic: We use the modifiers plugin to wrap xPercent from -100 to 0, 
 * creating a mathematically perfect infinite loop without element flashing.
 */

export function InteractiveMarquee() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const textRef2 = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            let direction = 1; // 1 = right to left, -1 = left to right
            const xPercentModifier = gsap.utils.wrap(-100, 0);

            // Infinite Scroll Timeline
            gsap.to([textRef.current, textRef2.current], {
                xPercent: "-=100",
                repeat: -1,
                duration: 10,
                ease: "none",
                modifiers: {
                    xPercent: xPercentModifier,
                },
            });

            /**
             * Scroll Acceleration Engine
             * WHY: Linking marquee speed to scroll velocity creates a physical 
             * connection between the user's action and the site's kinetic state.
             */
            ScrollTrigger.create({
                onUpdate: (self) => {
                    const t1 = textRef.current;
                    const t2 = textRef2.current;
                    if (!t1 || !t2) return;

                    direction = self.direction;
                    const velocity = Math.abs(self.getVelocity() / 100);
                    const speed = Math.max(1, velocity);

                    gsap.to([t1, t2], {
                        timeScale: direction * speed,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: true,
                        onComplete: () => {
                            // WHY: Guarded return to normal speed.
                            if (textRef.current && textRef2.current) {
                                gsap.to([textRef.current, textRef2.current], {
                                    timeScale: direction,
                                    duration: 1,
                                    overwrite: "auto"
                                });
                            }
                        }
                    });
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden bg-[#D2D2D2] py-8 flex items-center"
        >
            <div className="flex whitespace-nowrap w-max">
                <div ref={textRef} className="font-display text-base md:text-2xl lg:text-3xl uppercase px-2 md:px-4 shrink-0 text-foreground tracking-widest flex items-center gap-4">
                    <span>SHIPPING GOOD STUFF</span><span>•</span>
                    <span>SHIPPING GOOD STUFF</span><span>•</span>
                    <span>SHIPPING GOOD STUFF</span><span>•</span>
                    <span>SHIPPING GOOD STUFF</span><span>•</span>
                </div>
                <div ref={textRef2} className="font-display text-base md:text-2xl lg:text-3xl uppercase px-2 md:px-4 shrink-0 text-foreground tracking-widest flex items-center gap-4">
                    <span>SHIPPING GOOD STUFF</span><span>•</span>
                    <span>SHIPPING GOOD STUFF</span><span>•</span>
                    <span>SHIPPING GOOD STUFF</span><span>•</span>
                    <span>SHIPPING GOOD STUFF</span><span>•</span>
                </div>
            </div>
        </div>
    );
}
