import { create } from 'zustand';

/**
 * Theme Store Architecture
 * 
 * WHY: This store serves as the Single Source of Truth for the application's appearance.
 * By centralizing the theme state, we ensure that color transitions are synchronized 
 * across disparate components (Hero, Navbar, Projects) without complex prop-drilling.
 */

export type ThemePalette = 'eggshell' | 'oceanic';

interface ThemeState {
    theme: ThemePalette;
    setTheme: (theme: ThemePalette) => void;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: 'eggshell',
    setTheme: (theme) => set({ theme }),
    toggleTheme: () => set((state) => ({
        theme: state.theme === 'eggshell' ? 'oceanic' : 'eggshell'
    })),
}));
