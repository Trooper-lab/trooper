"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ProjectCaseStudies } from "@/projects/case-studies";

/**
 * Floating Navbar Architecture: Industrial Pill
 * 
 * WHY: A floating navbar reduces peripheral noise and focuses the user on content.
 * It uses GSAP for high-performance scroll-aware visibility transitions.
 */

const SCRAMBLE_CHARS = "!@#$%&*?<>0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface NavLinkProps {
    href: string;
    text: string;
}

function ScrambleLink({ href, text }: NavLinkProps) {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);

    const scramble = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        let iteration = 0;
        const totalIterations = 10;

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
        }, 50);
    };

    const reset = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
    };

    return (
        <Link
            ref={linkRef}
            href={href}
            className="px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#121212] hover:text-black/50 transition-colors whitespace-nowrap"
            onMouseEnter={scramble}
            onMouseLeave={reset}
        >
            {displayText}
        </Link>
    );
}

export function FloatingNavbar() {
    return (
        <Suspense fallback={null}>
            <FloatingNavbarContent />
        </Suspense>
    );
}

function FloatingNavbarContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const projectSlug = pathname?.startsWith("/projects/") ? pathname.split("/")[2] : null;
    const isStudio = pathname?.startsWith("/studio") || searchParams.get("viewer") === "true";
    const isCaseStudy = !!(projectSlug && ProjectCaseStudies[projectSlug]);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);
    const [isHidden, setIsHidden] = useState(false);

    // Initial Reveal
    useGSAP(() => {
        gsap.from(containerRef.current, {
            y: -100,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            delay: 0.5
        });
    }, []);

    // Scroll Awareness
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Smooth Visibility Transition
    useGSAP(() => {
        gsap.to(containerRef.current, {
            y: isHidden ? -100 : 0,
            opacity: isHidden ? 0 : 1,
            duration: 0.6,
            ease: "power3.inOut"
        });
    }, [isHidden]);

    // Don't render the main navbar if we're in the studio
    if (isStudio) return null;

    return (
        <div className="fixed top-8 left-0 w-full flex justify-center z-[150] pointer-events-none">
            <nav 
                ref={containerRef}
                className="pointer-events-auto bg-white/70 backdrop-blur-xl border border-black/5 px-6 py-2 rounded-full flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
            >
                <Link href="/" className="font-display text-[14px] tracking-tighter mr-6 hover:opacity-50 transition-opacity">
                    TROOPER
                </Link>

                <div className="hidden md:flex items-center">
                    <ScrambleLink href="/projects" text="Projects" />
                    <ScrambleLink href="/services" text="Services" />
                    <ScrambleLink href="/contact" text="Contact" />
                </div>

                {/* Mobile Menu Indicator - Simple for now */}
                <div className="md:hidden flex items-center px-4 py-1.5 text-[10px] uppercase tracking-widest bg-black/5 rounded-full">
                    Menu
                </div>
            </nav>
        </div>
    );
}
