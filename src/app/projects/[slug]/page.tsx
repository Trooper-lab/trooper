"use client";

import { use, Suspense } from "react";
import { projects, visibleProjects } from "@/projects/data";
import { notFound, useSearchParams } from "next/navigation";
import { ProjectSites } from "@/projects/sites";
import { ProjectCaseStudies } from "@/projects/case-studies";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

function ProjectContent({ slug }: { slug: string }) {
    const searchParams = useSearchParams();
    const isViewer = searchParams.get("viewer") === "true";
    const project = projects.find((p) => p.slug === slug);

    const isCustomView = (isViewer && !!ProjectSites[slug]) || !!ProjectCaseStudies[slug];

    const visibleIdx = project ? visibleProjects.indexOf(project) : -1;
    const nextProject = visibleProjects[(visibleIdx >= 0 ? visibleIdx + 1 : 1) % visibleProjects.length];

    useGSAP(() => {
        if (!project || isCustomView) return;
        gsap.from(".project-title", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.2
        });
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
    }, { dependencies: [slug] });

    if (!project) notFound();

    // If we are in the Studio Viewer, render the actual site draft
    if (isViewer && ProjectSites[slug]) {
        const SiteComponent = ProjectSites[slug];
        return <SiteComponent />;
    }

    // If a custom case study exists, render it
    if (ProjectCaseStudies[slug]) {
        const CaseStudy = ProjectCaseStudies[slug];
        return <CaseStudy />;
    }

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
            <section className="h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden">
                <div className="z-10 text-center">
                    <span className="font-sans text-[14px] uppercase tracking-[0.4em] opacity-40 mb-8 block">Case Study {project.id}</span>
                    <h1 className="project-title font-sans text-[10vw] md:text-[12vw] font-medium leading-[0.9] tracking-tighter uppercase">
                        {project.title}
                    </h1>
                </div>
                <div className="absolute bottom-10 left-10 md:bottom-24 md:left-24 opacity-5">
                    <span className="font-sans text-[20vw] font-bold leading-none select-none tracking-tighter">{project.year}</span>
                </div>
            </section>

            <section className="py-16 md:py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32">
                <div className="md:col-span-12 lg:col-span-8">
                    <h2 className="font-sans text-[14px] uppercase tracking-[0.2em] opacity-40 mb-8">The Brief</h2>
                    <p className="font-sans text-[18px] md:text-[32px] leading-[1.2] font-medium tracking-tight">
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
                </div>
            </section>

            <section className="px-6 md:px-12 pb-32 max-w-7xl mx-auto flex flex-col gap-32">
                <div
                    className="parallax-media w-full aspect-[16/9] relative overflow-hidden border border-black/5"
                    style={{ backgroundColor: project.color }}
                >
                    {(project.assets?.hero || project.assets?.preview) ? (
                        <img
                            src={(project.assets.preview || project.assets.hero) as string}
                            alt={`${project.title} preview`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-sans text-[12px] uppercase tracking-widest opacity-20">
                                {project.title}
                            </span>
                        </div>
                    )}
                </div>

                {/* Studio CTA: Launch the interactive site draft */}
                {ProjectSites[project.slug] && (
                    <div className="flex flex-col items-center gap-6 py-24 border-t border-black/5">
                        <span className="font-sans text-[12px] uppercase tracking-[0.4em] opacity-40">Interactive Preview</span>
                        <Link
                            href={`/studio/${project.slug}`}
                            className="font-sans font-bold text-[14px] px-10 py-4 bg-black text-white hover:bg-black/80 transition-all uppercase tracking-[0.2em] rounded-sm shadow-lg"
                        >
                            Open in Studio →
                        </Link>
                    </div>
                )}
            </section>

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

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const unwrappedParams = use(params);
    return (
        <Suspense fallback={null}>
            <ProjectContent slug={unwrappedParams.slug} />
        </Suspense>
    );
}
