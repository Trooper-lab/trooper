"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode } from "react";

/**
 * GsapProvider Architecture
 * 
 * WHY: This utility serves as the animation backbone for the entire Superfluid application.
 * Centralized Registration: It ensures plugins like ScrollTrigger are only registered 
 * once at the root layout, preventing hydration mismatches or memory leaks from redundant 
 * registrations in child components.
 * 
 * WHY useGSAP is registered: @gsap/react requires it to be registered as a plugin so it can
 * properly manage GSAP contexts and clean up animations on component unmount.
 * WHY ModifiersPlugin: Required for InteractiveMarquee's gsap.utils.wrap() infinite loop.
 */

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface GsapProviderProps {
    children: ReactNode;
}

export function GsapProvider({ children }: GsapProviderProps) {
    /**
     * WHY: Wrapping in a dedicated context container (anti-gravity-context) 
     * allows us to target global scroll behaviors or apply app-wide smoothing 
     * configurations in a single locational source of truth.
     */
    return (
        <div className="anti-gravity-context w-full h-full min-h-screen">
            {children}
        </div>
    );
}
