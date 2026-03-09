"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export function LayeredPanels({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Target all immediate children
        const panels = gsap.utils.toArray(containerRef.current.children) as HTMLElement[];

        panels.forEach((panel, i) => {
            // Apply z-index stacking to ensure the newest panel overlaps the older ones
            gsap.set(panel, { zIndex: i, position: "relative" });

            // The last panel does not need to be pinned; it ends the scroll
            if (i === panels.length - 1) return;

            ScrollTrigger.create({
                trigger: panel,
                // Match the start position based on panel height vs viewport height
                start: () => panel.offsetHeight > window.innerHeight ? "bottom bottom" : "top top",
                pin: true,
                pinSpacing: false,
                id: `layered-panel-${i}`,
                invalidateOnRefresh: true, // Automatically recalculates trigger points on resize
            });
        });

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(t => t.vars.id?.startsWith('layered-panel') && t.kill());
        };
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full relative">
            {children}
        </div>
    );
}
