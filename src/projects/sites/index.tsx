"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

/**
 * Projects Site Registry
 * 
 * WHY: This dynamic registry allows us to load specific "Live Drafts" 
 * only when requested (e.g., in the Studio Viewer). This keeps the main 
 * bundle light and avoids code conflicts between different projects.
 */

const LazySite = dynamic(() => import("./lazy"), { ssr: false });
const BefacoSite = dynamic(() => import("./befaco/index"), { ssr: false });
const VCMCPage = dynamic(() => import("./befaco/vcmc"), { ssr: false });

export const ProjectSites: Record<string, () => ReactNode> = {
    "laazy": () => <LazySite />,
    "befaco": () => <BefacoSite />,
    "vcmc": () => <VCMCPage />,
};
