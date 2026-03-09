"use client";

import { useState, useEffect } from "react";

/**
 * Hero Architecture
 * 
 * WHY: The Hero section is the site's primary branding reveal.
 * It uses a deterministic scramble-to-reveal animation to create an 'industrial' entrance,
 * followed by a persistent 'idle' scramble that mimics a technological standby state,
 * ensuring the page never feels static.
 */

const TARGET_TEXT = "TROOPER";
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#_";

export function Hero() {
    const [scrambledText, setScrambledText] = useState(TARGET_TEXT);
    const [isRevealed, setIsRevealed] = useState(false);

    /**
     * Initial Reveal Animation
     * WHY: We use a stepped iteration (1/3) to slowly 'lock' the characters from left to right,
     * creating a calculated, machine-like build-up.
     */
    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setScrambledText(TARGET_TEXT.split("").map((letter, index) => {
                if (index < iteration) return TARGET_TEXT[index];
                return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            }).join(""));

            if (iteration >= TARGET_TEXT.length) {
                clearInterval(interval);
                setIsRevealed(true);
            }
            iteration += 1 / 3;
        }, 50);

        return () => clearInterval(interval);
    }, []);

    /**
     * Persistent Idle Scramble
     * WHY: To maintain the 'Anti-Agency' high-fidelity texture, we randomly flip
     * 1-2 characters after the initial reveal. This 'low-frequency' noise makes
     * the text feel like it's being managed by a live digital system.
     */
    useEffect(() => {
        if (!isRevealed) return;

        const interval = setInterval(() => {
            setScrambledText(prev => {
                const next = prev.split("");
                const charIndexes = [
                    Math.floor(Math.random() * TARGET_TEXT.length),
                    Math.floor(Math.random() * TARGET_TEXT.length)
                ];

                charIndexes.forEach(idx => {
                    // WHY: 70% chance to restore character, 30% to scramble.
                    // This ratio ensures the brand remains legible while appearing 'fluid'.
                    if (Math.random() > 0.7) {
                        next[idx] = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                    } else {
                        next[idx] = TARGET_TEXT[idx];
                    }
                });

                return next.join("");
            });
        }, 150);

        return () => clearInterval(interval);
    }, [isRevealed]);

    return (
        <section className="w-full bg-background flex flex-col">
            <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 md:px-12 relative pt-16 md:pt-0">
                <h1 className="font-display text-[120pt] leading-[1.1] md:leading-none text-foreground uppercase tracking-tighter w-full text-center header-trooper break-all whitespace-normal">
                    {scrambledText}
                </h1>

                <div
                    className={`absolute bottom-12 left-0 w-full text-center font-sans text-[14px] md:text-[16px] uppercase tracking-[0.5em] transition-all duration-1000 delay-1000 ${isRevealed ? 'opacity-30 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                    Design. Dev. Automation.
                </div>
            </div>
        </section>
    );
}
