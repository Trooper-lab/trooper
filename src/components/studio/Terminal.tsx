"use client";

import { useEffect, useRef } from "react";
import { useStudioStore } from "@/data/studioStore";

/**
 * Terminal Component Architecture
 * 
 * WHY: This component reinforces the "Technological/Industrial" brand of Trooper.
 * It uses a monospace font and a simulated scrolling log to make the 
 * "Project Studio" feel like a real developer workbench.
 */

export function Terminal() {
    const { logs, status } = useStudioStore();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of logs
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="w-full h-full bg-[#0D0D0D] border border-white/10 flex flex-col font-mono text-[12px] overflow-hidden rounded-sm shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <span className="opacity-40 uppercase tracking-widest text-[9px] font-bold">Trooper_Build_v1.0.4</span>
            </div>

            {/* Log Content */}
            <div 
                ref={scrollRef}
                className="flex-1 p-4 overflow-y-auto space-y-1 scrollbar-hide select-none"
            >
                {logs.length === 0 && status === 'idle' && (
                    <div className="opacity-20 animate-pulse">SYSTEM READY... AWAITING COMMAND.</div>
                )}
                
                {logs.map((log, i) => (
                    <div key={i} className="flex gap-3 leading-relaxed">
                        <span className="opacity-20 shrink-0">{(i + 1).toString().padStart(3, '0')}</span>
                        <span className={log.includes('ERROR') ? 'text-red-400' : 'text-white/80'}>{log}</span>
                    </div>
                ))}

                {status === 'building' && (
                    <div className="flex gap-2 items-center">
                        <span className="w-2 h-4 bg-white/40 animate-pulse" />
                        <span className="opacity-40 italic">Executing...</span>
                    </div>
                )}

                {status === 'complete' && (
                    <div className="pt-4 text-green-400 font-bold tracking-widest uppercase text-[10px]">
                        [ BUILD SUCCESSFUL ]
                    </div>
                )}
            </div>
        </div>
    );
}
