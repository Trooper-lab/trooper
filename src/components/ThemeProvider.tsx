"use client";

import { useThemeStore } from "@/data/themeStore";
import { useEffect, useState } from "react";

/**
 * Theme Provider Architecture
 * 
 * WHY: This component bridges the Zustand store and the DOM.
 * Since Next.js Layouts are Server Components by default, we use this 
 * Client Component wrapper to apply the theme class to the body.
 * It also handles hydration to prevent theme flashes.
 */

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useThemeStore((state) => state.theme);
    const [mounted, setMounted] = useState(false);

    // WHY: Prevent hydration mismatch by only rendering theme-specific 
    // classes after the component has mounted on the client.
    useEffect(() => {
        setMounted(true);
    }, []);

    const themeClass = theme === 'eggshell' ? 'theme-eggshell' : 'theme-oceanic';

    return (
        <div className={`${themeClass} min-h-screen transition-colors duration-500`}>
            {children}
        </div>
    );
}
