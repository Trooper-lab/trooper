"use client";

/**
 * Services Page — Full-Viewport Snap Edition
 *
 * WHY: Each service fills the entire viewport and snaps into position.
 * Headings animate up on scroll entry, creating a premium 'chapter reveal'.
 * Background colors shift through the industrial eggshell palette.
 */

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleHeading } from "@/components/animations/ScrambleHeading";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ─── Service Data ────────────────────────────────────────────────────────────
interface ServiceDetail {
    id: string;
    title: string;
    tagline: string;
    body: string;
    deliverables: string[];
}

const SERVICE_DETAILS: ServiceDetail[] = [
    {
        id: "01",
        title: "Design & Development",
        tagline: "High-fidelity digital engineering.",
        body: "We don't just 'make websites'. We build digital products that feel like they shouldn't exist yet. By combining senior-level design with deep engineering, we bypass the typical friction of agency handoffs.",
        deliverables: [
            "Next.js & React Core",
            "Advanced GSAP Interaction",
            "Brand Visual Identity",
            "Performance Engineering",
        ],
    },
    {
        id: "02",
        title: "SEO & Advertising",
        tagline: "Visibility via architecture.",
        body: "Organic growth is a byproduct of good structure. We treat SEO as an infrastructure challenge, ensuring your site is found by the right people at the right depth of the funnel.",
        deliverables: [
            "Technical Grid Audits",
            "Content Strategy",
            "Performance Ad Ops",
            "Conversion Funnels",
        ],
    },
    {
        id: "03",
        title: "Automation",
        tagline: "Autonomous logic pipelines.",
        body: "If it's repetitive, it's a liability. We build custom pipelines that handle everything from lead management to complex reporting, freeing your team to do high-leverage work.",
        deliverables: [
            "Workflow Mapping",
            "n8n & Make Pipelines",
            "CRM Architecture",
            "API Integration",
        ],
    },
    {
        id: "04",
        title: "AI Integration",
        tagline: "Proprietary brand intelligence.",
        body: "We integrate custom-trained AI models directly into your workflow. Whether it's a brand-aware chatbot or an automated content engine, we make AI work for your specific business logic.",
        deliverables: [
            "LLM Implementation",
            "Brand-aware Training",
            "Intelligent Site Ops",
            "AI Strategy",
        ],
    },
];

const BG_COLORS = ["#FFFFFF", "#F9F9F8", "#F2F2F1", "#ECECE9"];

export default function ServicesPage() {
    const mainRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        /**
         * WHY: Each service-section heading and content block gets a scroll-triggered 
         * 'rise-up' reveal. This creates the cinematic chapter-entry feeling 
         * that makes each service feel like a sovereign environment.
         */
        const sections = gsap.utils.toArray<HTMLElement>(".service-section");

        sections.forEach((section) => {
            const heading = section.querySelector(".service-heading");
            const tagline = section.querySelector(".service-tagline");
            const body = section.querySelector(".service-body");
            const deliverables = section.querySelector(".service-deliverables");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    scroller: mainRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none reverse",
                }
            });

            if (heading) {
                tl.fromTo(heading,
                    { y: 80, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    0
                );
            }
            if (tagline) {
                tl.fromTo(tagline,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 0.4, duration: 0.6, ease: "power3.out" },
                    0.15
                );
            }
            if (body) {
                tl.fromTo(body,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 0.7, duration: 0.6, ease: "power3.out" },
                    0.25
                );
            }
            if (deliverables) {
                tl.fromTo(deliverables,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
                    0.35
                );
            }
        });

    }, { scope: mainRef });

    return (
        <main
            ref={mainRef}
            className="h-screen overflow-y-auto snap-y snap-mandatory bg-white"
        >

            {/* ── Hero (Snap Section 1) ─────────────────────────────── */}
            <section className="snap-start min-h-screen flex flex-col justify-center px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="flex items-center gap-4 mb-12 opacity-40">
                        <div className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
                        <span className="font-display text-[9px] tracking-[1.2em] uppercase">
                            [ ECOSYSTEM / SERVICES ]
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                        <div className="max-w-4xl">
                            <ScrambleHeading
                                text="An interconnected"
                                as="h1"
                                className="font-sans font-medium text-[48px] md:text-[80px] leading-[1.0] tracking-tight"
                                revealSpeed={15}
                                disableIdleFlicker
                            />
                            <div className="overflow-hidden">
                                <ScrambleHeading
                                    text="service machine."
                                    as="h1"
                                    className="font-sans font-medium text-[48px] md:text-[80px] leading-[1.0] tracking-tight opacity-30 whitespace-nowrap"
                                    revealSpeed={20}
                                    disableIdleFlicker
                                />
                            </div>
                        </div>
                        <p className="font-sans text-[18px] md:text-[20px] opacity-60 max-w-sm leading-relaxed mb-4">
                            We don't sell disconnected tasks. We build an integrated digital engine where every node fuels the next.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Service Sections (Snap Sections 2–5) ────────────── */}
            {SERVICE_DETAILS.map((service, i) => (
                <section
                    key={service.id}
                    className="service-section snap-start min-h-screen flex flex-col justify-center px-6 md:px-12 w-full border-b border-foreground/5"
                    style={{ backgroundColor: BG_COLORS[i] }}
                >
                    <div className="max-w-7xl mx-auto w-full md:pl-24">
                        <span className="font-display text-[10px] opacity-20 mb-8 tracking-widest block">
                            NODE_0{i + 1}
                        </span>
                        <h2 className="service-heading font-sans font-medium text-[40px] md:text-[85px] tracking-tighter leading-[0.9] mb-10 max-w-4xl">
                            {service.title}
                        </h2>

                        <p className="service-tagline font-sans text-[16px] md:text-[22px] italic opacity-40 mb-10">
                            {service.tagline}
                        </p>
                        <p className="service-body font-sans text-[20px] md:text-[28px] leading-relaxed opacity-70 mb-14 max-w-3xl">
                            {service.body}
                        </p>

                        <div className="service-deliverables grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {service.deliverables.map(item => (
                                <div key={item} className="flex items-center gap-4 group">
                                    <div className="w-1.5 h-1.5 bg-accent opacity-30 group-hover:opacity-100 transition-opacity shrink-0" />
                                    <span className="font-sans text-[14px] uppercase tracking-[0.2em] opacity-50 group-hover:opacity-80 transition-opacity">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

        </main>
    );
}
