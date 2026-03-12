"use client";

import { useStudioStore } from "@/data/studioStore";
import { Monitor, Tablet, Smartphone, Play, Loader2, CheckCircle2, List } from "lucide-react";
import { projects } from "@/projects/data";

import Link from "next/link";
import { useState } from "react";

/**
 * Studio Header Architecture: Integrated Control & Index
 * 
 * WHY: We moved project navigation into the header to maximize screen real-estate.
 * The "Project Index" dropdown allows rapid switching between builds without
 * needing a bulky side panel.
 */

export function StudioHeader({ currentProjectTitle }: { currentProjectTitle: string }) {
    const { status, setStatus, viewport, setViewport, progress, addLog } = useStudioStore();
    const [isIndexOpen, setIsIndexOpen] = useState(false);

    const handleLaunch = () => {
        if (status === 'building') return;
        
        setStatus('building');
        addLog('Initializing Project Manifest...');
        addLog('Validating Repository Scopes...');
        addLog('Optimising GSAP ScrollTriggers...');
    };

    return (
        <div className="fixed top-6 left-0 w-full flex justify-center z-[110] pointer-events-none">
            <header className="pointer-events-auto bg-white/80 backdrop-blur-xl border border-black/10 px-4 h-[32px] rounded-full flex items-center justify-between gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] min-w-[60vw] max-w-[90vw]">
                {/* Project Selector / Index */}
                <div className="flex items-center gap-4 h-full">
                    <Link href="/" className="font-display text-[10px] tracking-tighter hover:opacity-70 transition-opacity text-black">
                        TROOPER
                    </Link>

                    <div className="h-3 w-[1px] bg-black/10" />

                    <div className="relative h-full flex items-center">
                        <button 
                            onClick={() => setIsIndexOpen(!isIndexOpen)}
                            className="flex items-center gap-2 group h-full"
                        >
                            <div className="flex flex-row items-center gap-2 leading-none whitespace-nowrap">
                                <span className="text-[9px] text-black font-semibold uppercase tracking-tighter">{currentProjectTitle}</span>
                                <List size={10} className="text-black/40" />
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {isIndexOpen && (
                            <div className="absolute top-[calc(100%+8px)] left-0 w-48 bg-white border border-black/5 rounded-lg shadow-2xl z-[120] overflow-hidden">
                                <div className="px-3 py-1.5 bg-black/5 border-b border-black/5">
                                    <span className="text-[8px] text-black/40 uppercase tracking-[0.2em] font-bold">Select Project</span>
                                </div>
                                <div className="flex flex-col">
                                    {projects.map((p) => (
                                        <Link
                                            key={p.slug}
                                            href={`/studio/${p.slug}`}
                                            onClick={() => setIsIndexOpen(false)}
                                            className="px-3 py-2 text-[10px] text-black/60 hover:text-black hover:bg-black/5 border-b border-black/5 last:border-0 transition-all flex items-center justify-between group"
                                        >
                                            <span className="uppercase tracking-widest">{p.title}</span>
                                            <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">Launch →</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="h-3 w-px bg-black/10 hidden md:block" />

                    {/* Viewport Controls */}
                    <div className="hidden md:flex bg-black/[0.03] border border-black/5 rounded-full p-0.5">
                        <button
                            onClick={() => setViewport('desktop')}
                            className={`p-1.5 transition-all rounded-full ${viewport === 'desktop' ? 'bg-white text-black shadow-sm' : 'text-black/30 hover:text-black/60'}`}
                        >
                            <Monitor size={10} />
                        </button>
                        <button
                            onClick={() => setViewport('tablet')}
                            className={`p-1.5 transition-all rounded-full ${viewport === 'tablet' ? 'bg-white text-black shadow-sm' : 'text-black/30 hover:text-black/60'}`}
                        >
                            <Tablet size={10} />
                        </button>
                        <button
                            onClick={() => setViewport('mobile')}
                            className={`p-1.5 transition-all rounded-full ${viewport === 'mobile' ? 'bg-white text-black shadow-sm' : 'text-black/30 hover:text-black/60'}`}
                        >
                            <Smartphone size={10} />
                        </button>
                    </div>
                </div>

                {/* Right Side: Build Actions & Status */}
                <div className="flex items-center gap-4 h-full">
                    {/* Build Progress */}
                    {status === 'building' && (
                        <div className="hidden lg:flex items-center gap-2">
                            <div className="w-16 h-0.5 bg-black/5 relative overflow-hidden rounded-full">
                                <div 
                                    className="absolute top-0 left-0 h-full bg-black transition-all duration-300 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="font-mono text-[8px] text-black/40 tracking-wider">{progress}%</span>
                        </div>
                    )}

                    {/* Launch Action */}
                    <button
                        disabled={status === 'building'}
                        onClick={handleLaunch}
                        className={`flex items-center gap-2 px-4 h-[22px] rounded-full border transition-all uppercase tracking-widest text-[8px] font-bold ${
                            status === 'building' 
                                ? 'border-black/5 text-black/20 cursor-not-allowed' 
                                : status === 'complete'
                                    ? 'border-green-500/50 text-green-600 bg-green-500/5'
                                    : 'border-black/10 text-black hover:bg-black/5 shadow-sm active:scale-95'
                        }`}
                    >
                        {status === 'building' ? (
                            <Loader2 size={10} className="animate-spin" />
                        ) : status === 'complete' ? (
                            <CheckCircle2 size={10} />
                        ) : (
                            <Play size={10} fill="currentColor" />
                        )}
                        {status === 'building' ? 'BUILDING...' : status === 'complete' ? 'READY' : 'LAUNCH'}
                    </button>
                </div>
            </header>
        </div>
    );
}
