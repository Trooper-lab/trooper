"use client";

import Link from "next/link";
import { useState, useCallback, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Navbar Architecture
 * 
 * WHY: The navigation bar serves as a consistent brand anchor.
 * It uses a character-scramble effect on hover to reinforce the site's digital edge.
 * Internalized GSAP: We moved fluid animations directly into ScrambleLink (rather than wrapping in IndustrialButton)
 * to prevent layout bloating and maintain ultra-precise spacing.
 */

const SCRAMBLE_CHARS = "!@#$%&*?<>0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface ScrambleLinkProps {
    href: string;
    text: string;
    className?: string;
}

function ScrambleLink({ href, text, className = "" }: ScrambleLinkProps) {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);

    const { contextSafe } = useGSAP({ scope: linkRef });

    /**
     * Scramble Engine
     * WHY: This creates a 'glitch' effect where characters cycle rapidly through symbols 
     * before settling on their true value, mimicking a data-decryption visual.
     */
    const scramble = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        let iteration = 0;
        const totalIterations = 12;

        intervalRef.current = setInterval(() => {
            const scrambled = text
                .split("")
                .map((char, index) => {
                    if (char === " ") return " ";
                    if (index < iteration * (text.length / totalIterations)) {
                        return text[index];
                    }
                    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                })
                .join("");

            setDisplayText(scrambled);
            if (iteration >= totalIterations) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(text);
            }
            iteration++;
        }, 60);
    }, [text]);

    const reset = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
    }, [text]);

    /**
     * Interaction: Fluid Scramble
     * WHY: On hover, we simultaneously trigger the scramble and a subtle scale 
     * using GSAP's expo easing for a smooth, premium feel.
     */
    const handleMouseEnter = contextSafe(() => {
        scramble();
        gsap.to(linkRef.current, {
            scale: 1.05,
            duration: 0.4,
            ease: "expo.out"
        });
    });

    const handleMouseLeave = contextSafe(() => {
        reset();
        gsap.to(linkRef.current, {
            scale: 1,
            duration: 0.4,
            ease: "expo.out"
        });
    });

    return (
        <Link
            ref={linkRef}
            href={href}
            className={`font-sans font-normal text-[21px] uppercase tracking-widest transition-none block text-[#121212] hover:opacity-70 ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {displayText}
        </Link>
    );
}

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isMenuOpen) {
            gsap.to(menuRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "expo.out",
                visibility: "visible"
            });
            // Animate links in
            gsap.fromTo(".mobile-link",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.2 }
            );
        } else {
            gsap.to(menuRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.4,
                ease: "expo.in",
                onComplete: () => {
                    gsap.set(menuRef.current, { visibility: "hidden" });
                }
            });
        }
    }, [isMenuOpen]);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[100] bg-[#f8f9fa]/80 backdrop-blur-md border-b border-black/5 py-6 px-6 md:px-12 flex items-center justify-between text-[#121212]">
                <Link href="/" className="font-display text-[21px] tracking-tighter hover:opacity-70 transition-opacity">
                    TROOPER
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-12">
                    <ScrambleLink href="/" text="Home" />
                    <ScrambleLink href="/projects" text="Projects" />
                    <ScrambleLink href="/services" text="Services" />
                    <ScrambleLink href="/contact" text="Contact" />
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden flex flex-col gap-1.5 z-[110] relative p-2"
                    aria-label="Toggle Menu"
                >
                    <span className={`w-8 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                    <span className={`w-8 h-0.5 bg-black transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
                    <span className={`w-8 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                ref={menuRef}
                className="fixed inset-0 bg-[#f8f9fa] z-[105] md:hidden flex flex-col justify-center px-8 invisible opacity-0 text-[#121212]"
            >
                <div className="flex flex-col gap-8">
                    <Link onClick={() => setIsMenuOpen(false)} href="/" className="mobile-link font-sans text-4xl uppercase tracking-tighter font-medium border-b border-black/5 pb-4">Home</Link>
                    <Link onClick={() => setIsMenuOpen(false)} href="/projects" className="mobile-link font-sans text-4xl uppercase tracking-tighter font-medium border-b border-black/5 pb-4">Projects</Link>
                    <Link onClick={() => setIsMenuOpen(false)} href="/services" className="mobile-link font-sans text-4xl uppercase tracking-tighter font-medium border-b border-black/5 pb-4">Services</Link>
                    <Link onClick={() => setIsMenuOpen(false)} href="/contact" className="mobile-link font-sans text-4xl uppercase tracking-tighter font-medium border-b border-black/5 pb-4">Contact</Link>
                </div>

                <div className="absolute bottom-12 left-8 mobile-link">
                    <p className="font-sans text-sm opacity-40 uppercase tracking-widest mb-2">Socials</p>
                    <div className="flex gap-6">
                        <span className="text-sm font-medium">IG</span>
                        <span className="text-sm font-medium">TW</span>
                        <span className="text-sm font-medium">LI</span>
                    </div>
                </div>
            </div>
        </>
    );
}
