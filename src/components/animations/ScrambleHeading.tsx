"use client";

import { useState, useEffect } from "react";

/**
 * ScrambleHeading — Reusable Reveal Animation Component
 *
 * WHY: Extracted from Hero.tsx so any page heading can use the same
 * 'machine decrypt' entrance animation without duplicating logic.
 *
 * Behaviour:
 *  1. On mount → characters cycle through noise chars, locking left-to-right
 *     until the full text is revealed (initial reveal).
 *  2. After reveal → 1-2 random characters flicker at low frequency,
 *     giving a 'live system' idle feel.
 *
 * Usage:
 *   <ScrambleHeading text="We do four things." className="font-sans text-[80px]" />
 */

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#_";

interface ScrambleHeadingProps {
    text: string;
    className?: string;
    /** ms between each step of the initial reveal — default 50 */
    revealSpeed?: number;
    /** ms between each idle flicker tick — default 150 */
    idleSpeed?: number;
    /** Set true to stop flickering once the initial reveal is complete */
    disableIdleFlicker?: boolean;
    as?: "h1" | "h2" | "h3";
}

export function ScrambleHeading({
    text,
    className = "",
    revealSpeed = 50,
    idleSpeed = 150,
    disableIdleFlicker = false,
    as: Tag = "h1",
}: ScrambleHeadingProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isRevealed, setIsRevealed] = useState(false);

    // ── Phase 1: Initial left-to-right character lock ────────────────────────
    useEffect(() => {
        let iteration = 0;

        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        // Preserve spaces — scrambling them looks broken
                        if (char === " ") return " ";
                        if (index < iteration) return text[index];
                        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
                setIsRevealed(true);
            }

            // WHY: 1/3 step size slows the lock speed relative to the tick rate,
            // giving larger headings enough time to feel dramatic without being slow.
            iteration += 1 / 3;
        }, revealSpeed);

        return () => clearInterval(interval);
    }, [text, revealSpeed]);

    // ── Phase 2: Low-frequency idle flicker ──────────────────────────────────
    // WHY: Guarded by disableIdleFlicker so callers that need static-after-reveal
    // text (e.g. long headings that are hard to read while flickering) can opt out
    // without affecting any other usage of this component.
    useEffect(() => {
        if (!isRevealed || disableIdleFlicker) return;

        const interval = setInterval(() => {
            setDisplayText((prev) => {
                const next = prev.split("");
                const indexes = [
                    Math.floor(Math.random() * text.length),
                    Math.floor(Math.random() * text.length),
                ];

                indexes.forEach((idx) => {
                    // Skip spaces — same reason as above
                    if (text[idx] === " ") return;
                    // WHY: 70/30 ratio keeps the text legible while feeling 'alive'
                    if (Math.random() > 0.7) {
                        next[idx] = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                    } else {
                        next[idx] = text[idx];
                    }
                });

                return next.join("");
            });
        }, idleSpeed);

        return () => clearInterval(interval);
    }, [isRevealed, text, idleSpeed]);

    return <Tag className={className}>{displayText}</Tag>;
}
