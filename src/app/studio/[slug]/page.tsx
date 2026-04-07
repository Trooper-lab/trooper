"use client";

import { use, useEffect, useState } from "react";
import { Terminal } from "@/components/studio/Terminal";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { useStudioStore } from "@/data/studioStore";
import { projects } from "@/projects/data";

import { notFound } from "next/navigation";
import { Terminal as TerminalIcon, X } from "lucide-react";

/**
 * Studio Page Architecture: Panoramic Site Preview
 * 
 * WHY: We removed the persistent sidebar to prioritize the site's design.
 * The terminal is now a 'Collapsible Overlay' — allowing users to inspect 
 * logs only when needed, maintaining the industrial "Developer" feel without 
 * sacrificing screen space.
 */

export default function StudioPage({ params }: { params: Promise<{ slug: string }> }) {
    const unwrappedParams = use(params);
    const slug = unwrappedParams.slug;
    const project = projects.find((p) => p.slug === slug);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    
    const { status, setStatus, viewport, setProgress, addLog, reset } = useStudioStore();

    if (!project) notFound();

    useEffect(() => {
        if (project.externalUrl) {
            window.location.href = project.externalUrl;
        }
    }, [project.externalUrl]);

    // Auto-start build on mount if idle
    useEffect(() => {
        if (status === 'idle') {
            setStatus('building');
        }
    }, [status, setStatus]);

    // Auto-open terminal on building, close on complete
    useEffect(() => {
        if (status === 'building') setIsTerminalOpen(true);
        if (status === 'complete') {
            const timeout = setTimeout(() => setIsTerminalOpen(false), 2000);
            return () => clearTimeout(timeout);
        }
    }, [status]);

    useEffect(() => {
        if (status === 'building') {
            const buildSteps = [
                { log: "Initializing Project Build v0.8.2...", delay: 200 },
                { log: "Compiling shaders for background textures...", delay: 800 },
                { log: "Optimising GSAP ScrollTriggers...", delay: 1500 },
                { log: "Bundling assets: Next.js + TailwindCSS...", delay: 2400 },
                { log: "Minifying production build...", delay: 3000 },
                { log: "Verifying response metrics...", delay: 3600 },
                { log: "Project ready for deployment.", delay: 4200 },
            ];

            let stepIndex = 0;
            const interval = setInterval(() => {
                const currentProgress = (stepIndex / buildSteps.length) * 100;
                setProgress(Math.round(currentProgress));

                if (stepIndex < buildSteps.length) {
                    addLog(buildSteps[stepIndex].log);
                    stepIndex++;
                } else {
                    clearInterval(interval);
                    setProgress(100);
                    setStatus('complete');
                }
            }, 600);

            return () => clearInterval(interval);
        }
    }, [status, addLog, setProgress, setStatus]);

    useEffect(() => {
        return () => reset();
    }, [reset]);

    return (
        <main className="h-screen w-full bg-white overflow-hidden flex flex-col selection:bg-black selection:text-white">
            <StudioHeader currentProjectTitle={project.title} />

            <div className="flex-1 flex relative overflow-hidden">
                
                {/* Collapsible Terminal Overlay */}
                <div 
                    className={`absolute bottom-8 left-8 w-[400px] h-[300px] z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                        isTerminalOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                    }`}
                >
                    <div className="absolute top-2 right-2 z-10">
                        <button 
                            onClick={() => setIsTerminalOpen(false)}
                            className="p-1 hover:bg-white/10 rounded-sm text-white/40 transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>
                    <Terminal />
                </div>

                {/* Floating Terminal Trigger */}
                <button
                    onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                    className={`absolute bottom-6 left-6 z-40 p-3 bg-white border border-black/10 rounded-full text-black shadow-lg hover:bg-black/5 active:scale-95 transition-all ${
                        isTerminalOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                    }`}
                >
                    <TerminalIcon size={18} />
                </button>

                {/* Main Viewport Shell: Expanded Panoramic Mode */}
                <div className="flex-1 bg-[#F5F5F7] relative flex items-center justify-center p-4 md:p-6 lg:p-8 overflow-hidden overflow-y-auto">
                    
                    {/* Minimalist Grid / Background */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
                        <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
                    </div>

                    {/* Viewport Frame */}
                    <div 
                        className={`mx-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden relative border border-black/5 ${
                            viewport === 'desktop' ? 'w-full h-full' :
                            viewport === 'tablet' ? 'w-[768px] h-full sm:h-[1024px]' :
                            'w-[375px] h-[667px] sm:h-[812px]'
                        }`}
                    >
                        {status !== 'complete' ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 gap-6 text-center px-12 z-[100]">
                                <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin" />
                                <div className="space-y-1">
                                    <h3 className="font-sans text-white uppercase tracking-widest text-[12px] font-bold">Awaiting Build...</h3>
                                    <p className="text-white/40 text-[11px] font-sans">Launch your project to start the simulation.</p>
                                </div>
                            </div>
                        ) : (
                            <iframe 
                                src={`/projects/${slug}?viewer=true`}
                                className="w-full h-full border-none transition-opacity duration-1000"
                                style={{ opacity: status === 'complete' ? 1 : 0 }}
                                title={`${project.title} Preview`}
                            />
                        )}

                        {/* Device Frame Borders */}
                        {viewport !== 'desktop' && (
                            <div className="absolute inset-0 pointer-events-none border-[12px] border-black/40 rounded-[2px] z-20" />
                        )}
                    </div>

                    {/* Floating Info Badge - Industrial Style */}
                    <div className="absolute bottom-6 right-6 font-mono text-[9px] text-black/20 tracking-[0.3em] uppercase flex flex-col items-end gap-1">
                        <div className="flex gap-4">
                            <span>MODE: {viewport}</span>
                            <span>{viewport === 'desktop' ? 'AUTO' : viewport === 'tablet' ? '768x1024' : '375x812'}</span>
                        </div>
                        <div className="w-12 h-[1px] bg-black/5" />
                    </div>

                </div>
            </div>
        </main>
    );
}
