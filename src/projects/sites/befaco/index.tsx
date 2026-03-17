"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { befacoContent } from "./data/content";
import { befacoConfig } from "../../configs/befaco";
import styles from "./Befaco.module.css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Befaco Site Architecture
 * 
 * WHY: This component implements the 'No Slop' TE-inspired industrial aesthetic.
 * All layout spacing is tied to viewport width (vw), creating a perfectly proportional
 * technical interface at any size.
 */

export default function BefacoSite() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const productRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // High-fidelity entry: Reveal the logo image
            gsap.from(".logo-img", {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                delay: 0.5
            });

            // Industrial line drawing on scroll
            gsap.from(`.${styles.cell}`, {
                borderRightWidth: 0,
                borderBottomWidth: 0,
                duration: 1,
                stagger: 0.02,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom bottom",
                    scrub: 1
                }
            });

            // Product grid entry
            gsap.from(`.${styles.productCard}`, {
                y: 40,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: `.${styles.productGrid}`,
                    start: "top 80%"
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const { hero, products, hook, tech } = befacoContent;

    return (
        <div ref={containerRef} className={styles.container}>
            {/* ── [HEADER / HERO] ────────────────────────── */}
            <header className={`${styles.grid12} ${styles.hero}`}>
                <div className={styles.logo}>
                    <div className="flex justify-center items-center overflow-hidden py-12">
                        <Image 
                            src={befacoConfig.assets.logo}
                            alt="Befaco"
                            width={400}
                            height={120}
                            className="logo-img object-contain w-[30%] min-w-[200px]"
                            unoptimized
                        />
                    </div>
                    <p className={`${styles.label} mt-4 uppercase`}>{hero.subText}</p>
                </div>
            </header>

            {/* ── [THE HOOK] ────────────────────────────── */}
            <section className={styles.grid12}>
                <div className={`${styles.cell} col-span-12 md:col-span-8`}>
                    <span className={styles.label}>{hook.note}</span>
                    <h2 className={`${styles.h2} mt-12`}>{hook.title}</h2>
                </div>
                <div className={`${styles.cell} col-span-12 md:col-span-4 flex items-end`}>
                    <button className="w-full py-4 border border-white/20 uppercase text-[12px] tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                        Request SDK
                    </button>
                </div>
            </section>

            {/* ── [PRODUCT GRID] ──────────────────────────── */}
            <section className={`${styles.grid12} ${styles.productGrid}`}>
                {products.map((product, idx) => (
                    <div 
                        key={product.id} 
                        className={styles.productCard}
                    >
                        <div className={styles.cell}>
                            <span className={styles.label}>{product.id} // {product.tagline}</span>
                            <div className="mt-4 flex justify-between items-baseline">
                                <h3 className="text-[2vw] uppercase">{product.name}</h3>
                                <span className="opacity-50">{product.price}</span>
                            </div>
                        </div>
                        <div className={styles.productImage}>
                            <Image 
                                src={product.image} 
                                alt={product.name} 
                                width={600} 
                                height={600} 
                                className="object-contain grayscale hover:grayscale-0 transition-all duration-700 w-[60%]"
                                unoptimized
                            />
                        </div>
                        <div className={`${styles.cell} flex flex-col gap-2 opacity-40 hover:opacity-100 transition-opacity`}>
                            <p className="text-[12px] uppercase">{product.details.specs}</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* ── [TECHNICAL SPECIFICATIONS] ───────────────── */}
            <section className={`${styles.grid12} ${styles.techSpecs}`}>
                <div className={`${styles.cell} col-span-12`}>
                    <h2 className={styles.h2}>{tech.title}</h2>
                </div>
                {tech.specs.map((spec, i) => (
                    <div key={i} className={styles.specRow}>
                        <span className={styles.label}>{spec.label}</span>
                        <span className="uppercase">{spec.value}</span>
                    </div>
                ))}
            </section>

            {/* ── [FOOTER] ───────────────────────────────── */}
            <footer className={styles.grid12}>
                <div className={`${styles.cell} col-span-12 py-20 text-center`}>
                    <p className={`${styles.label} opacity-20`}>{befacoContent.footer.note}</p>
                    <div className="mt-8 text-[12vw] font-bold opacity-5 tracking-tighter">
                        BEFACO.ORG
                    </div>
                </div>
            </footer>
        </div>
    );
}
