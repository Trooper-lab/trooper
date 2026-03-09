"use client";

import { use } from "react";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const unwrappedParams = use(params);
    const slug = unwrappedParams.slug;
    const project = projects.find((p) => p.slug === slug);

    if (!project) notFound();

    const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];

    useGSAP(() => {
        if (!project) return;

        // Massive Title Reveal
        gsap.from(".project-title", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.2
        });

        // Parallax for staggered media
        const mediaElements = gsap.utils.toArray<HTMLElement>(".parallax-media");
        mediaElements.forEach((media) => {
            gsap.fromTo(media,
                { y: 50 },
                {
                    y: -50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: media,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        });
    }, { dependencies: [slug] }); // Correct configuration

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
            {/* Header Section */}
            <section className="h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden">
                <div className="z-10 text-center">
                    <span className="font-sans text-[14px] uppercase tracking-[0.4em] opacity-40 mb-8 block">Case Study {project.id}</span>
                    <h1 className="project-title font-sans text-[15vw] md:text-[12vw] font-medium leading-[0.9] tracking-tighter uppercase">
                        {project.title}
                    </h1>
                </div>

                {/* Background Shadow Text */}
                <div className="absolute bottom-10 left-10 md:bottom-24 md:left-24 opacity-5">
                    <span className="font-sans text-[20vw] font-bold leading-none select-none tracking-tighter">{project.year}</span>
                </div>
            </section>

            {/* Narrative Section */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32">
                <div className="md:col-span-12 lg:col-span-8">
                    <h2 className="font-sans text-[14px] uppercase tracking-[0.2em] opacity-40 mb-8">The Brief</h2>
                    <p className="font-sans text-[24px] md:text-[32px] leading-[1.2] font-medium tracking-tight">
                        {project.brief}
                    </p>
                </div>

                <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-12">
                    <div>
                        <h2 className="font-sans text-[14px] uppercase tracking-[0.2em] opacity-40 mb-6">What we did</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.whatWeDid.map((tag, i) => (
                                <span key={i} className="font-sans text-[13px] uppercase tracking-widest border border-black/10 px-4 py-1.5 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="font-sans text-[14px] uppercase tracking-[0.2em] opacity-40 mb-2">Year</h2>
                        <span className="font-sans text-[18px] opacity-60">{project.year}</span>
                    </div>
                </div>
            </section>

            {/* Media Gallery (Alternating) */}
            <section className="px-6 md:px-12 pb-32 max-w-7xl mx-auto flex flex-col gap-32">
                <div className="parallax-media w-full aspect-[16/9] bg-black/[0.03] border border-black/5 flex items-center justify-center overflow-hidden">
                    <span className="font-sans text-[12px] uppercase tracking-widest opacity-20">Full Width Media Placeholder</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-32 h-[80vh]">
                    <div className="parallax-media w-full h-full bg-black/[0.03] border border-black/5 flex items-center justify-center self-start">
                        <span className="font-sans text-[12px] uppercase tracking-widest opacity-20">Inset Media (Left)</span>
                    </div>
                    <div className="parallax-media w-full h-full bg-black/[0.03] border border-black/5 flex items-center justify-center self-end mt-40">
                        <span className="font-sans text-[12px] uppercase tracking-widest opacity-20">Inset Media (Right)</span>
                    </div>
                </div>

                <div className="parallax-media w-full aspect-[16/9] bg-black/[0.03] border border-black/5 flex items-center justify-center">
                    <span className="font-sans text-[12px] uppercase tracking-widest opacity-20">Detailed Close-up Video Placeholder</span>
                </div>
            </section>

            {/* Next Project Footer */}
            <section className="py-40 bg-[#E0E0E0] text-foreground px-6 md:px-12 text-center group">
                <Link href={`/projects/${nextProject.slug}`} className="cursor-pointer">
                    <span className="font-sans text-[12px] uppercase tracking-[0.4em] opacity-40 mb-8 block group-hover:opacity-100 transition-opacity">Next Project</span>
                    <h2 className="font-sans text-[5vw] font-medium leading-none tracking-tighter uppercase transition-transform group-hover:scale-105 duration-700">
                        {nextProject.title}
                    </h2>
                </Link>
            </section>
        </main>
    );
}
