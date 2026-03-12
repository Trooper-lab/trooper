"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { Suspense } from "react";

/**
 * Footer Architecture
 * 
 * WHY: Maintains brand presence at the bottom of pages.
 * Optimized: Conditional rendering for Studio/Viewer modes to prevent interface clutter.
 */

export function Footer() {
    return (
        <Suspense fallback={null}>
            <FooterContent />
        </Suspense>
    );
}

function FooterContent() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const isViewer = searchParams.get("viewer") === "true" || pathname?.startsWith("/studio");

    if (isViewer) return null;

    return (
        <footer className="pt-32 pb-8 px-6 md:px-12 bg-background flex flex-col items-center justify-end border-t border-foreground/10 min-h-[30vh]">
            <h2 className="font-display text-[28px] leading-none opacity-20 select-none text-foreground tracking-tighter">
                TROOPER
            </h2>
        </footer>
    );
}
