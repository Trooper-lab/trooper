/**
 * Main Projects Data Hub
 * 
 * WHY: This file serves as the core index for all projects. 
 * By importing modular configs, we maintain a conflict-free and scalable project ecosystem.
 */

import { lazyConfig } from "../configs/laazy";
import { befacoConfig } from "../configs/befaco";
import { superfluidConfig } from "../configs/superfluid";

export interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    whatWeDid: string[];
    brief: string;
    color: string;
    secondaryColor?: string;
    accentColor?: string;
    year: string;
    hidden?: boolean;
    assets?: {
        [key: string]: string;
    }
}

export const projects: Project[] = [
    lazyConfig,
    befacoConfig,
    superfluidConfig,
    {
        id: "befaco-vcmc",
        slug: "vcmc",
        title: "VCMC",
        description: "Voltage Controlled MIDI Controller — 8 faders, 8 buttons, 10 CV inputs.",
        whatWeDid: ["Product Page", "Eurorack Module"],
        brief: "VCMC product page.",
        color: "#0f0e12",
        secondaryColor: "#f05a24",
        year: "2025",
        hidden: true
    },
    {
        id: "04",
        slug: "hashstraat",
        title: "Hashstraat",
        description: "A headless commerce storefront that turns product discovery into a cinematic scroll experience.",
        whatWeDid: ["Headless Commerce", "Next.js", "GSAP Animations", "Brand Strategy"],
        brief: "Hashstraat is a deep-dive into the future of decentralised retail. We built a headless Shopify storefront that uses anti-gravity scroll mechanics to guide users through its product universe.",
        color: "#BFB8AF",
        year: "2024"
    }
];

export const visibleProjects = projects.filter((p) => !p.hidden);
