"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

import { projects } from "@/data/projects";

/**
 * ProjectGallery Architecture: Pinned Stacking Interaction
 * 
 * WHY: This component creates a 'deep-dive' cinematic experience for the portfolio.
 * Stacking Logic: Instead of a standard scroll, we pin the entire section and move 
 * upcoming slides from yPercent: 100 to 0. 
 * Parallax Depth: The massive background text moves at a different rate (xPercent: -30) 
 * than the slides, creating a 3D sense of scale even in a flat 2D layout.
 *
 * Scroll Indicator: A thin vertical progress line on the right edge with the
 * current slide number. Industrial aesthetic — monospace, tracking-widest,
 * minimal opacity that increases on the active state.
 */

export function ProjectGallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const slides = gsap.utils.toArray<HTMLElement>(".project-slide");
        const slideCount = projects.length;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${slideCount * 100}%`,
                pin: true,
                scrub: 1,
                snap: {
                    snapTo: 1 / (slideCount - 1),
                    duration: { min: 0.2, max: 0.5 },
                    delay: 0,
                    ease: "power1.inOut"
                },
                onUpdate: (self) => {
                    /**
                     * WHY: Update both the progress bar fill and the active slide
                     * number from the ScrollTrigger's progress (0–1).
                     */
                    const progressPercent = self.progress * 100;
                    if (progressRef.current) {
                        progressRef.current.style.height = `${progressPercent}%`;
                    }

                    const currentSlide = Math.round(self.progress * (slideCount - 1));
                    setActiveSlide(currentSlide);
                },
            }
        });

        // Background text parallax (Desktop Only)
        tl.to(".bg-text-projects", {
            xPercent: -30,
            ease: "none"
        }, 0);

        slides.forEach((slide, i) => {
            if (i === 0) return;
            const outer = (slide as HTMLElement).querySelector(".slide__outer");
            const inner = (slide as HTMLElement).querySelector(".slide__inner");

            tl.fromTo(outer,
                { yPercent: 100 },
                { yPercent: 0, ease: "none" },
                i - 1
            );

            tl.fromTo(inner,
                { yPercent: -100 },
                { yPercent: 0, ease: "none" },
                i - 1
            );
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-background">

            {/* Massive Background Text - Hidden on mobile */}
            <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <span className="bg-text-projects font-display text-[25vw] leading-none opacity-[0.05] whitespace-nowrap">
                    WORK PROJECTS WORK PROJECTS WORK PROJECTS
                </span>
            </div>

            {/* ── Scroll Indicator ──────────────────────────────────── */}
            <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4">
                {/* Current / Total */}
                <span className="font-display text-[9px] tracking-[0.3em] opacity-40">
                    {String(activeSlide + 1).padStart(2, "0")}
                </span>

                {/* Progress Track */}
                <div className="w-[1px] h-24 md:h-32 bg-foreground/10 relative overflow-hidden">
                    <div
                        ref={progressRef}
                        className="absolute top-0 left-0 w-full bg-foreground/60 transition-[height] duration-100"
                        style={{ height: "0%" }}
                    />
                </div>

                {/* Total count */}
                <span className="font-display text-[9px] tracking-[0.3em] opacity-20">
                    {String(projects.length).padStart(2, "0")}
                </span>
            </div>

            <div className="relative w-full h-full">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="project-slide absolute inset-0 w-full h-full overflow-hidden"
                        style={{ zIndex: index + 1 }}
                    >
                        <div className="slide__outer w-full h-full overflow-hidden will-change-transform">
                            <div className="slide__inner w-full h-full bg-[#E9E9E9] flex items-center justify-center relative border-t border-black/5 will-change-transform">

                                {/* Progress Number (Desktop Only) */}
                                <div className="absolute top-12 left-6 md:top-24 md:left-24 hidden md:flex flex-col items-start z-20">
                                    <span className="font-sans text-[12px] md:text-[14px] uppercase tracking-[0.2em] opacity-40 mb-1 md:mb-2 font-medium">Project</span>
                                    <span className="font-sans text-[10vw] md:text-[6vw] leading-none font-medium opacity-10">{project.id}</span>
                                    <div className="w-8 md:w-12 h-[1px] bg-black/20 mt-2 md:mt-4"></div>
                                </div>

                                <div className="max-w-7xl w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center z-10 pt-8 md:pt-0">

                                    {/* Image Container */}
                                    <div className={`md:col-span-7 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                                        <div
                                            className="aspect-[4/3] w-full bg-black/10 relative overflow-hidden group border border-black/5"
                                            style={{ backgroundColor: project.color }}
                                        >
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                                        </div>
                                    </div>

                                    {/* Text Info */}
                                    <div className={`md:col-span-5 ${index % 2 === 0 ? "md:order-2" : "md:order-1"} flex flex-col`}>
                                        <h3 className="font-sans text-[10vw] md:text-[56px] font-medium leading-[1.05] mb-4 md:mb-6 tracking-tight break-words">
                                            {project.title}
                                        </h3>
                                        <p className="font-sans text-[15px] md:text-[18px] opacity-70 mb-6 md:mb-10 max-w-sm leading-relaxed">
                                            {project.description}
                                        </p>

                                        <a
                                            href={`/projects/${project.slug}`}
                                            className="font-sans font-medium text-[14px] md:text-[16px] underline underline-offset-8 hover:opacity-50 transition-opacity uppercase tracking-widest"
                                        >
                                            View Case Study
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
