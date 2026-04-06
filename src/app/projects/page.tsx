"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { visibleProjects as projects, type Project } from "@/projects/data";


/**
 * Projects Page Architecture
 * 
 * WHY: This page provides a list view of all work.
 * It uses a heavy minimalist aesthetic with high-contrast typography.
 * Added: Studio Launch capability for individual projects.
 */

export default function ProjectsPage() {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-[#F2F2F2] pt-40 pb-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="font-sans font-medium text-[14px] uppercase tracking-[0.3em] opacity-40 mb-20">
                    Selected Works
                </h1>

                <div className="flex flex-col border-t border-black/10">
                    {projects.map((project) => (
                        <ProjectRow
                            key={project.id}
                            project={project}
                            onHover={() => setHoveredProject(project.id)}
                            onLeave={() => setHoveredProject(null)}
                        />
                    ))}
                </div>
            </div>

            {/* Hover Floating Image Preview - Desktop Only */}
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] aspect-[4/3] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${hoveredProject === project.id ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-6"}`}
                        style={{ backgroundColor: project.color }}
                    >
                        {(project.assets?.preview || project.assets?.hero) && (
                            <Image
                                src={project.assets.preview || project.assets.hero}
                                alt={project.title}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
}

function ProjectRow({ project, onHover, onLeave }: { project: Project, onHover: () => void, onLeave: () => void }) {
    return (
        <div
            className="group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-20 border-b border-black/10 transition-colors hover:bg-black/[0.02]"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <div className="flex items-baseline gap-4 md:gap-8">
                <span className="font-sans text-[12px] md:text-[14px] opacity-30 font-medium">{project.id}</span>
                <div className="flex flex-col">
                    <a href={project.externalUrl ?? `/projects/${project.slug}`} target={project.externalUrl ? '_blank' : undefined} rel={project.externalUrl ? 'noopener noreferrer' : undefined}>
                        <h2 className="font-sans text-[40px] md:text-[80px] font-medium leading-[0.9] md:leading-none tracking-tighter transition-transform md:group-hover:translate-x-4 duration-500">
                            {project.title}
                        </h2>
                    </a>
                    {!project.externalUrl && (
                        <Link
                            href={`/studio/${project.slug}`}
                            className="mt-4 font-sans font-bold text-[10px] uppercase tracking-[0.3em] bg-black text-white px-4 py-2 w-max rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 hover:bg-black/80"
                        >
                            Launch Studio
                        </Link>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:items-end mt-6 md:mt-0">
                <div className="flex flex-wrap gap-2 md:justify-end mb-4">
                    {project.whatWeDid.map((tag: string, i: number) => (
                        <span key={i} className="font-sans text-[12px] uppercase tracking-widest opacity-40 border border-black/10 px-3 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <span className="font-sans text-[16px] opacity-40">{project.year}</span>
            </div>
        </div>
    );
}
