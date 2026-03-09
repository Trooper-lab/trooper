"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * PixelGlyph — Figma Shape with 4 Transform Variations
 *
 * One canonical shape (exported from Figma) displayed in 4 orientations:
 *   0 — Original        (as designed)
 *   1 — Mirror X        (flipped left ↔ right)
 *   2 — Rotate 180°     (upside down)
 *   3 — Mirror Y        (flipped top ↔ bottom)
 *
 * WHY transforms instead of 4 different path sets:
 *   All 4 forms are the same rune — visually consistent, clearly part of the
 *   same family. Using SVG transforms means the Figma source paths never change;
 *   updating the design only requires editing RUNE_PATHS below.
 *
 * seed={n} → always shows variant n % 4  (stable — services page)
 * no seed  → cycles through variants on hover  (dynamic — homepage)
 */

// ── Source shape (exact Figma export) ─────────────────────────────────────────
// Artboard: 195 × 192. To update, re-export from Figma and replace d= values.
const RUNE_PATHS: string[] = [
    /* horizontal bar, left-middle  */ "M84.4488 55.2756L84.4488 82.9134L1.53544 82.9134L1.53544 55.2756L84.4488 55.2756",
    /* top-right horizontal         */ "M195 4.83235e-06V27.6378L84.4488 27.6378V0L195 4.83235e-06",
    /* vertical connector, centre   */ "M112.087 55.2756H84.4488V0L112.087 4.21281e-07V55.2756",
    /* horizontal, right-centre     */ "M110.551 82.9134L110.551 55.2756L167.362 55.2756L167.362 82.9134L110.551 82.9134",
    /* right-side partial vertical  */ "M165.827 3.07087H195V55.2756H165.827V3.07087",
    /* left-side full vertical      */ "M27.6378 191.929H0L1.19466e-05 55.2756H27.6378L27.6378 191.929",
    /* lower full-width bar         */ "M195 109.016V136.654L1.53543 136.654L1.53543 109.016L195 109.016",
    /* bottom full-width bar        */ "M195 164.291V191.929L1.53543 191.929L1.53543 164.291H195",
];

// ── 4 transform variants ──────────────────────────────────────────────────────
// All four use the SAME 8 paths above — only the SVG group transform differs.
// Artboard centre point: cx = 195/2 = 97.5, cy = 192/2 = 96
const VARIANTS: Array<{ transform: string; label: string }> = [
    { transform: "", label: "Original" },
    { transform: "scale(-1 1) translate(-195 0)", label: "Mirror X" },
    { transform: "rotate(180 97.5 96)", label: "Rotate 180" },
    { transform: "scale(1 -1) translate(0 -192)", label: "Mirror Y" },
];

// ── Figma artboard dimensions ──────────────────────────────────────────────────
const VIEWBOX = "0 0 195 192";

// ── Component ─────────────────────────────────────────────────────────────────

interface PixelGlyphProps {
    className?: string;
    size?: number;
    color?: string;
    isHovered?: boolean;
    /** Locks to variant (seed % 4). Omit to cycle through all 4 on hover. */
    seed?: number;
    /**
     * WHY: Sets the starting variant for seedless (hover-cycling) instances.
     * Without this, every card starts at variant 0 → all look identical on load.
     * Pass the card index so each starts on a unique orientation.
     */
    initialVariant?: number;
}

export function PixelGlyph({
    className = "",
    size = 120,
    color = "currentColor",
    isHovered = false,
    seed,
    initialVariant = 0,
}: PixelGlyphProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    const [variantIndex, setVariantIndex] = useState<number>(
        seed !== undefined
            ? seed % VARIANTS.length
            : initialVariant % VARIANTS.length
    );

    const variant = VARIANTS[variantIndex];

    // ── Hover: cycle to next variant (seedless instances only) ────────────────
    useEffect(() => {
        if (!isHovered || seed !== undefined) return;
        setVariantIndex((prev) => (prev + 1) % VARIANTS.length);
    }, [isHovered, seed]);

    // ── GSAP: stagger-reveal each path element when variant changes ───────────
    // WHY: Each of the 8 paths pops in independently, creating the
    // 'piece-by-piece materialise' feel from the brand reference.
    useEffect(() => {
        if (!svgRef.current) return;

        const pathEls = svgRef.current.querySelectorAll<SVGPathElement>("path");

        gsap.fromTo(
            pathEls,
            { opacity: 0, scale: 0.5, transformOrigin: "center center" },
            {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                stagger: 0.05,
                ease: "back.out(1.8)",
            }
        );
    }, [variantIndex]);

    return (
        <svg
            ref={svgRef}
            viewBox={VIEWBOX}
            width={size}
            height={size}
            className={className}
            style={{ display: "block" }}
            aria-hidden="true"
        >
            {/* WHY: <g transform> applies the orientation variant to all 8 paths at once.
                Changing variant = changing this attribute, paths themselves never change. */}
            <g transform={variant.transform}>
                {RUNE_PATHS.map((d, i) => (
                    <path key={i} d={d} fill={color} />
                ))}
            </g>
        </svg>
    );
}
