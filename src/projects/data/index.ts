/**
 * Main Projects Data Hub
 * 
 * WHY: This file serves as the core index for all projects. 
 * By importing modular configs, we maintain a conflict-free and scalable project ecosystem.
 */

import { lazyConfig } from "../configs/laazy";
import { befacoConfig } from "../configs/befaco";

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
    assets?: {
        [key: string]: string;
    }
}

export const projects: Project[] = [
    lazyConfig,
    befacoConfig,
    {
        id: "03",
        slug: "magicalbutter",
        title: "Magicalbutter.com",
        description: "A full-stack web application for a high-volume IoT device brand — fast, scalable, and built to last.",
        whatWeDid: ["Web Application", "Full-stack Dev", "IoT Integration", "Cloud Architecture"],
        brief: "MagicalButter needed a robust, scalable backend to manage thousands of IoT-connected devices. We delivered a clean interface that handles massive data throughput without breaking a sweat.",
        color: "#D4C9BD",
        year: "2023"
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
    },
    {
        id: "05",
        slug: "electrcross",
        title: "Electrcross.nl",
        description: "A high-energy digital identity for an electric sports brand — bold visuals, zero load time.",
        whatWeDid: ["Brand Identity", "Web Design", "Performance Optimisation", "Motion Design"],
        brief: "Electrcross needed a digital presence that matched the adrenaline of their sport. We delivered a blazing-fast site with kinetic typography and electric motion design baked in from day one.",
        color: "#A8A09A",
        year: "2025"
    },
    {
        id: "06",
        slug: "clouds",
        title: "Clouds",
        description: "A minimal, immersive web experience for a creative collective — where simplicity becomes the statement.",
        whatWeDid: ["Creative Direction", "Interactive Design", "WebGL", "Art Direction"],
        brief: "Clouds wanted a digital home that captured the feeling of their work — weightless, expansive, and quietly powerful. We built an ambient, WebGL-backed experience that invites people to slow down and look.",
        color: "#928C88",
        year: "2025"
    }
];
