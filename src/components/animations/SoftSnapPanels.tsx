"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * SoftSnap — GSAP Bidirectional Snap with Pin-Aware Passthrough
 *
 * WHY: A single global snap that works across all sections, but is smart
 * enough to yield control to children that have their own ScrollTrigger
 * pin+snap (like ProjectGallery).
 *
 * HOW: When the scroll position falls within a child's active pin range,
 * we return the current progress unchanged — letting the child's own
 * snap handle things. Outside pin ranges, we snap to the nearest
 * section boundary.
 */
export function SoftSnap({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        /**
         * WHY 600ms delay: Child ScrollTriggers (ProjectGallery's pin)
         * need time to initialize and register their pin spacers.
         * Once they're set up, maxScroll(window) reflects the true
         * total scroll distance including pin-injected space.
         */
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();

            const panels = Array.from(containerRef.current!.children) as HTMLElement[];

            ScrollTrigger.create({
                snap: {
                    snapTo: (progress: number) => {
                        const totalScroll = ScrollTrigger.maxScroll(window);
                        if (totalScroll <= 0) return progress;

                        /**
                         * Check if we're inside any child's active pin range.
                         * If so, DON'T snap — let the child's own snap handle it.
                         */
                        const allTriggers = ScrollTrigger.getAll();
                        for (const st of allTriggers) {
                            if (st.vars.id === "soft-snap-global") continue;
                            if (!st.pin) continue;

                            const pinStart = st.start / totalScroll;
                            const pinEnd = st.end / totalScroll;

                            if (progress >= pinStart && progress <= pinEnd) {
                                // Inside a pinned section — pass through, don't fight it
                                return progress;
                            }
                        }

                        /**
                         * Outside any pin range — snap to nearest panel top.
                         * Also include snap points for just-after-pin-end so
                         * exiting the gallery snaps cleanly to the next section.
                         */
                        let closest = 0;
                        let minDist = Infinity;

                        panels.forEach((panel) => {
                            const normalized = panel.offsetTop / totalScroll;
                            const dist = Math.abs(progress - normalized);
                            if (dist < minDist) {
                                minDist = dist;
                                closest = normalized;
                            }
                        });

                        return closest;
                    },
                    duration: { min: 0.2, max: 0.5 },
                    delay: 0.15,
                    ease: "power1.inOut",
                    inertia: false,
                },
                id: "soft-snap-global",
            });
        }, 600);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getById("soft-snap-global")?.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full">
            {children}
        </div>
    );
}
