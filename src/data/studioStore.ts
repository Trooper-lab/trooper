import { create } from 'zustand';

/**
 * Studio Store Architecture
 * 
 * WHY: This store centralises the "Build & Preview" lifecycle.
 * It allows different components (Terminal, Viewer, Sidebar) to stay in sync
 * during the simulated build process.
 */

type BuildStatus = 'idle' | 'building' | 'complete' | 'error';
type ViewportSize = 'desktop' | 'tablet' | 'mobile';

interface StudioState {
    status: BuildStatus;
    logs: string[];
    viewport: ViewportSize;
    progress: number;
    
    // Actions
    setStatus: (status: BuildStatus) => void;
    addLog: (log: string) => void;
    clearLogs: () => void;
    setViewport: (size: ViewportSize) => void;
    setProgress: (value: number) => void;
    reset: () => void;
}

export const useStudioStore = create<StudioState>((set) => ({
    status: 'idle',
    logs: [],
    viewport: 'desktop',
    progress: 0,

    setStatus: (status) => set({ status }),
    addLog: (log) => set((state) => ({ logs: [...state.logs, `[${new Date().toLocaleTimeString()}] ${log}`] })),
    clearLogs: () => set({ logs: [] }),
    setViewport: (viewport) => set({ viewport }),
    setProgress: (progress) => set({ progress }),
    reset: () => set({ status: 'idle', logs: [], progress: 0, viewport: 'desktop' }),
}));
