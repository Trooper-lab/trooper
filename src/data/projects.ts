/**
 * Project Data Architecture
 * 
 * WHY: This file serves as the Single Source of Truth (SSoT) for the agency's portfolio.
 * Strict Interface: ensures that the gallery component can rely on these specific 
 * properties for automated layout and color-theming.
 */

export interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    whatWeDid: string[];
    brief: string;
    color: string;
    year: string;
}

export const projects: Project[] = [
    {
        id: "01",
        slug: "snoetje",
        title: "Snoetje",
        description: "A premium e-commerce experience built with custom scroll animations and a gallery-first UX.",
        whatWeDid: ["E-commerce", "Custom Animation", "Visual Identity", "UX/UI Design"],
        brief: "Snoetje needed a high-performance e-commerce platform that felt more like a digital art gallery than a store. We focused on seamless transitions and a premium-first mobile experience.",
        color: "#E8E4DF",
        year: "2024"
    },
    {
        id: "02",
        slug: "magicalbutter",
        title: "Magicalbutter.com",
        description: "A full-stack web application for a high-volume IoT device brand — fast, scalable, and built to last.",
        whatWeDid: ["Web Application", "Full-stack Dev", "IoT Integration", "Cloud Architecture"],
        brief: "MagicalButter needed a robust, scalable backend to manage thousands of IoT-connected devices. We delivered a clean interface that handles massive data throughput without breaking a sweat.",
        color: "#D4C9BD",
        year: "2023"
    },
    {
        id: "03",
        slug: "hashstraat",
        title: "Hashstraat",
        description: "A headless commerce storefront that turns product discovery into a cinematic scroll experience.",
        whatWeDid: ["Headless Commerce", "Next.js", "GSAP Animations", "Brand Strategy"],
        brief: "Hashstraat is a deep-dive into the future of decentralised retail. We built a headless Shopify storefront that uses anti-gravity scroll mechanics to guide users through its product universe.",
        color: "#BFB8AF",
        year: "2024"
    },
    {
        id: "04",
        slug: "electrcross",
        title: "Electrcross.nl",
        description: "A high-energy digital identity for an electric sports brand — bold visuals, zero load time.",
        whatWeDid: ["Brand Identity", "Web Design", "Performance Optimisation", "Motion Design"],
        brief: "Electrcross needed a digital presence that matched the adrenaline of their sport. We delivered a blazing-fast site with kinetic typography and electric motion design baked in from day one.",
        color: "#A8A09A",
        year: "2025"
    },
    {
        id: "05",
        slug: "clouds",
        title: "Clouds",
        description: "A minimal, immersive web experience for a creative collective — where simplicity becomes the statement.",
        whatWeDid: ["Creative Direction", "Interactive Design", "WebGL", "Art Direction"],
        brief: "Clouds wanted a digital home that captured the feeling of their work — weightless, expansive, and quietly powerful. We built an ambient, WebGL-backed experience that invites people to slow down and look.",
        color: "#928C88",
        year: "2025"
    }
];

