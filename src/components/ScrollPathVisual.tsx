"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(MotionPathPlugin);
}

/**
 * ScrollPathVisual: Precision Path Edition
 * 
 * WHY: This component implements the 'Ready, Set, Scroll' aesthetic
 * specifically tailored for the Trooper identity. It's a precision-machined
 * red node that travels through a complex technical path as the user scrolls.
 */
function ScrollPathVisual({ activeIndex }: { activeIndex: number }) {
    const rootRef = useRef<SVGSVGElement>(null);
    const progressRef = useRef({ val: 0 });

    useGSAP(() => {
        // We calculate the target progress based on the active index (0 to 1)
        const targetProgress = (activeIndex / 3);

        // Animate the progress value smoothly
        gsap.to(progressRef.current, {
            val: targetProgress,
            duration: 1.2,
            ease: "power2.inOut",
            onUpdate: () => {
                // Apply the progress to the motion path
                gsap.set(".traveler", {
                    motionPath: {
                        path: "#main-path",
                        align: "#main-path",
                        alignOrigin: [0.5, 0.5],
                        autoRotate: true,
                        start: progressRef.current.val,
                        end: progressRef.current.val
                    }
                });

                // Update the 'trace' path (the part of the path we've traveled)
                const trace = document.querySelector(".path-trace") as SVGPathElement;
                if (trace) {
                    const totalLength = trace.getTotalLength();
                    trace.style.strokeDasharray = `${totalLength}`;
                    trace.style.strokeDashoffset = `${totalLength * (1 - progressRef.current.val)}`;
                }
            }
        });

    }, { dependencies: [activeIndex], scope: rootRef });

    return (
        <svg
            ref={rootRef}
            viewBox="0 0 400 800"
            className="w-full h-full max-h-[85vh] text-foreground overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff4742" />
                    <stop offset="100%" stopColor="#ff8a80" />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="15" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* The Background Path (The Guide) */}
            <path
                id="main-path"
                d="M200 50 C200 50 350 150 350 250 C350 350 50 450 50 550 C50 650 200 750 200 750"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.05"
                strokeLinecap="round"
            />

            {/* The Trace Path (The 'Worm' Effect) */}
            <path
                className="path-trace"
                d="M200 50 C200 50 350 150 350 250 C350 350 50 450 50 550 C50 650 200 750 200 750"
                stroke="#ff4742"
                strokeWidth="80"
                opacity="0.15"
                strokeLinecap="round"
                style={{ filter: 'blur(40px)' }}
            />

            {/* The Core Traveler (The Precision Node) */}
            <g className="traveler" style={{ filter: 'url(#glow)' }}>
                {/* Visualizing the "Capsule" or "Blob" */}
                <circle r="25" fill="url(#blob-gradient)" />
                <circle r="12" fill="white" opacity="0.3" />
                <circle r="6" fill="white" opacity="0.6" />

                {/* Peripheral Data Tags */}
                <circle r="40" stroke="#ff4742" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />
            </g>

            {/* Milestone Markers */}
            {[50, 250, 550, 750].map((y, i) => (
                <g key={y} transform={`translate(${i === 1 ? 350 : i === 2 ? 50 : 200}, ${y})`}>
                    <circle r="4" fill="currentColor" opacity="0.1" />
                    <text
                        y="20"
                        textAnchor="middle"
                        className="font-display text-[8px] fill-foreground opacity-20 tracking-widest uppercase"
                    >
                        Node_0{i + 1}
                    </text>
                </g>
            ))}

        </svg>
    );
}

export { ScrollPathVisual };
