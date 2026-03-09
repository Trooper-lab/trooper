import { IndustrialButton } from "./IndustrialButton";

/**
 * CopySection Architecture
 * 
 * WHY: This transitionary component breaks up the visual density of glyphs and grids 
 * with strong, authoritative typography. 
 * Asymmetry: Left-alignment and tracking-tighter on the header reinforce the site's 
 * industrial, high-impact aesthetic.
 */

export function CopySection() {
    return (
        <section className="w-full text-left py-24 px-6 md:px-12 bg-[#F2F2F2] flex flex-col items-start">
            <h2 className="font-sans text-[48px] font-medium mb-[24px] leading-[1.1] max-w-4xl tracking-tighter">
                We build the cool stuff. <br />
                You keep the remote.
            </h2>
            <p className="font-sans text-[24px] text-foreground/70 max-w-2xl mb-[48px] tracking-tight leading-relaxed">
                High-end websites that move like liquid, plus a built-in AI brain so you can edit anything without needing a degree in web design.
            </p>

            <IndustrialButton
                href="#contact"
                className="tracking-[0.2em]"
            >
                Secure the remote
            </IndustrialButton>
        </section>
    );
}
