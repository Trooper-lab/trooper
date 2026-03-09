"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * IndustrialButton Architecture
 * 
 * WHY: This component unifies site-wide CTAs into a single high-fidelity interaction model.
 * Instead of relying on Tailwind transitions which can feel 'mushy', it uses GSAP for deterministic,
 * physics-based feedback (expansion on hover, contraction on click).
 */

type ButtonVariant = "primary" | "secondary" | "ghost";

interface IndustrialButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    variant?: ButtonVariant;
}

export function IndustrialButton({
    children,
    href,
    onClick,
    className = "",
    variant = "primary"
}: IndustrialButtonProps) {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    // WHY: scope: buttonRef ensures that GSAP only selects elements within this instance,
    // preventing selector collisions during animations.
    const { contextSafe } = useGSAP({ scope: buttonRef });

    // Design Tokens - Linked to Theme Variables for automatic context-switching.
    const getVariantStyles = () => {
        switch (variant) {
            case "secondary":
                return {
                    bg: "transparent",
                    text: "var(--foreground)",
                    border: "border-foreground/20",
                    hoverBg: "var(--foreground)",
                    hoverText: "var(--background)"
                };
            case "ghost":
                return {
                    bg: "transparent",
                    text: "var(--foreground)",
                    border: "border-transparent",
                    hoverBg: "var(--foreground)", // subtle 5% opacity handled by tailwind in classes
                    hoverText: "var(--foreground)"
                };
            default: // primary
                return {
                    bg: "var(--foreground)",
                    text: "var(--background)",
                    border: "border-foreground",
                    hoverBg: "var(--accent)", // Use Ocean City / Red Accent on hover
                    hoverText: "var(--background)"
                };
        }
    };

    const styleTokens = getVariantStyles();

    /**
     * Interaction: Fluid Inversion
     * WHY: We use a timeline here to coordinate the background-color swap and text-scaling 
     * simultaneously. Using 'y: -1' on text creates a 'lifting' sensation that feels 
     * responsive and premium.
     */
    const handleMouseEnter = contextSafe(() => {
        const tl = gsap.timeline({ defaults: { duration: 0.4, ease: "expo.out" } });

        tl.to(buttonRef.current, {
            backgroundColor: styleTokens.hoverBg,
            scale: 1.05,
        }, 0);

        tl.to(textRef.current, {
            color: styleTokens.hoverText,
            scale: 1.05,
            y: -1,
        }, 0);
    });

    const handleMouseLeave = contextSafe(() => {
        const tl = gsap.timeline({ defaults: { duration: 0.4, ease: "expo.out" } });

        tl.to(buttonRef.current, {
            backgroundColor: styleTokens.bg,
            scale: 1,
        }, 0);

        tl.to(textRef.current, {
            color: styleTokens.text,
            scale: 1,
            y: 0,
        }, 0);
    });

    /**
     * Tactile Feedback: Contraction
     * WHY: Reducing scale onMouseDown mimics a physical button press, 
     * providing immediate psychological confirmation of the intent.
     */
    const handleMouseDown = contextSafe(() => {
        gsap.to(buttonRef.current, {
            scale: 0.95,
            duration: 0.2,
            ease: "power2.out",
        });
    });

    const handleMouseUp = contextSafe(() => {
        gsap.to(buttonRef.current, {
            scale: 1.05,
            duration: 0.4,
            ease: "expo.out",
        });
    });

    const sharedProps = {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        className: `font-sans font-medium inline-flex justify-center items-center px-10 py-[16px] text-[16px] transition-none outline-none border ${styleTokens.border} ${className}`,
        style: { backgroundColor: styleTokens.bg } // Override initial bg for GSAP consistency
    };

    const content = (
        <span
            ref={textRef}
            className="inline-block pointer-events-none will-change-transform"
            style={{ color: styleTokens.text }}
        >
            {children}
        </span>
    );

    if (href) {
        return (
            <a ref={buttonRef as any} href={href} {...sharedProps}>
                {content}
            </a>
        );
    }

    return (
        <button ref={buttonRef as any} onClick={onClick} {...sharedProps}>
            {content}
        </button>
    );
}
