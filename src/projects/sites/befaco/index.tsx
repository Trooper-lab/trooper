"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { befacoContent } from "./data/content";
import { befacoConfig } from "../../configs/befaco";
import { BefacoHeader } from "./components/BefacoHeader";
import { BefacoFooter } from "./components/BefacoFooter";
import styles from "./Befaco.module.css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

function OscilloscopeDisplay() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef<number>(0);
    const phaseRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;

            // Background
            ctx.fillStyle = "#0a0a0d";
            ctx.fillRect(0, 0, W, H);

            // Graticule grid
            ctx.strokeStyle = "rgba(178,178,178,0.08)";
            ctx.lineWidth = 0.5;
            const cols = 10, rows = 8;
            for (let i = 0; i <= cols; i++) {
                ctx.beginPath();
                ctx.moveTo((i / cols) * W, 0);
                ctx.lineTo((i / cols) * W, H);
                ctx.stroke();
            }
            for (let j = 0; j <= rows; j++) {
                ctx.beginPath();
                ctx.moveTo(0, (j / rows) * H);
                ctx.lineTo(W, (j / rows) * H);
                ctx.stroke();
            }

            // Centre axis
            ctx.strokeStyle = "rgba(178,178,178,0.15)";
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(0, H / 2);
            ctx.lineTo(W, H / 2);
            ctx.stroke();

            // Glow sine wave
            ctx.save();
            ctx.shadowColor = "#f05a24";
            ctx.shadowBlur = 10;
            ctx.strokeStyle = "#f05a24";
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let x = 0; x <= W; x++) {
                const t = (x / W) * Math.PI * 4 + phaseRef.current;
                const y = H / 2 + Math.sin(t) * (H * 0.32);
                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.restore();

            // Second harmonic ghost
            ctx.save();
            ctx.globalAlpha = 0.25;
            ctx.strokeStyle = "#b2b2b2";
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let x = 0; x <= W; x++) {
                const t = (x / W) * Math.PI * 8 + phaseRef.current * 1.5;
                const y = H / 2 + Math.sin(t) * (H * 0.14);
                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.restore();

            phaseRef.current -= 0.03;
            frameRef.current = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(frameRef.current);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={120}
            style={{ width: "100%", height: "120px", display: "block" }}
        />
    );
}

/**
 * Befaco Site Architecture
 * 
 * WHY: This component implements the 'No Slop' TE-inspired industrial aesthetic.
 * All layout spacing is tied to viewport width (vw), creating a perfectly proportional
 * technical interface at any size.
 */


export default function BefacoSite() {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const productRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [carouselIndex, setCarouselIndex] = useState(0);

    const CAROUSEL_IMAGES: { src: string; label: string }[] = [
        { src: "https://iili.io/BAQeMxt.png", label: "Image 01" },
        { src: "", label: "Image 02" },
        { src: "", label: "Image 03" },
        { src: "", label: "Image 04" },
    ];

    const prevSlide = useCallback(() =>
        setCarouselIndex(i => (i - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length),
        [CAROUSEL_IMAGES.length]
    );
    const nextSlide = useCallback(() =>
        setCarouselIndex(i => (i + 1) % CAROUSEL_IMAGES.length),
        [CAROUSEL_IMAGES.length]
    );

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

            // Hero image reveal — scale up from slightly zoomed, fade in
            gsap.fromTo(`.${styles.heroImage} img`, {
                scale: 1.08,
                opacity: 0,
                filter: "blur(12px)",
            }, {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.8,
                ease: "power3.out",
                delay: 0.2,
            });

            // Hero caption slides up
            gsap.from(`.${styles.heroCaption}`, {
                y: 30,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                delay: 0.8,
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

            // Heading scroll reveals
            document.querySelectorAll("h1, h2, h3").forEach((el) => {
                gsap.from(el, {
                    y: 40,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                        toggleActions: "play none none none",
                    }
                });
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
            <BefacoHeader />

            <section className={styles.grid12}>
                <div className={styles.heroImage}>
                    <Image
                        src={befacoConfig.assets.hero}
                        alt="Befaco Hero"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
                <div className={styles.heroCaption}>
                    <span className={styles.label}>Series 2025</span>
                    <h1 className={styles.heroOverlayHeading}>Oneiroi</h1>
                    <p className={styles.heroOverlayCopy}>A voice module built for ambient textures and endless exploration.</p>
                    <div className={styles.heroCTAGroup}>
                        <button className={styles.heroOverlayCTA}>Order assembled</button>
                        <button className={styles.heroOverlayCTASecondary}>Build the kit</button>
                    </div>
                </div>
            </section>

            {/* ── [ONEIROI DETAIL] ─────────────────────── */}
            <section className={styles.grid12}>
                {/* Features — left 8 cols */}
                <div className={`${styles.cell} col-span-8`} style={{ minHeight: "20vw" }}>
                    <span className={styles.label}>Features</span>
                    <ul className={styles.featureList}>
                        {[
                            "Stereo external input with selectable gain",
                            "5-second looper — records stereo input or module output",
                            "Sine oscillator",
                            "Supersaw oscillator",
                            "Wavetable oscillator using the looper buffer",
                            "Multimode filter: low-pass, band-pass, high-pass, and comb filter",
                            "3-band resonator",
                            "2-tap echo",
                            "Reverb with macro control for size, filtering, and direction",
                            "CV control with attenuators on most parameters",
                            "Various types of self-modulation with configurable routing and level/speed control",
                            "External synchronization via sync input",
                            "Powerful randomizer — four targets, three intensity levels, undo/redo",
                            "Knob catch behaviour for re-coupling parameter positions",
                        ].map((f, i) => (
                            <li key={i} className={styles.featureItem}>
                                <span className={styles.featureDash}>—</span>{f}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Specs + Docs — right 4 cols */}
                <div className={`${styles.cell} col-span-4 flex flex-col gap-0`} style={{ minHeight: "20vw" }}>
                    <span className={styles.label}>Specs</span>
                    <div className={styles.specTable}>
                        {[
                            ["Power", "+12V = 200mA, −12V = 80mA"],
                            ["Width", "30 HP"],
                            ["Depth", "25mm (assembled)"],
                            ["Origin", "Barcelona, Spain"],
                        ].map(([k, v]) => (
                            <div key={k} className={styles.specTableRow}>
                                <span>{k}</span>
                                <span>{v}</span>
                            </div>
                        ))}
                    </div>

                    <span className={`${styles.label} mt-8`}>Documentation</span>
                    <div className={styles.docLinks}>
                        {[
                            "User Manual",
                            "Assembly Manual",
                            "Software",
                            "Interactive Guide",
                            "ModularGrid Page",
                            "Schematic",
                        ].map((doc) => (
                            <span key={doc} className={styles.docLink}>{doc} →</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── [SPLIT FEATURE] ──────────────────────── */}
            <section className={styles.grid12}>
                <div className={styles.splitLeft}>
                    <span className={styles.label}>Series 2025 — Featured Module</span>
                    <h2 className={styles.h2}>Designed in Barcelona. Built by you.</h2>
                    <p className={styles.splitCopy}>
                        Available assembled or as a DIY kit — every Befaco module is made to be understood, not just used.
                    </p>
                    <div className={styles.heroCTAGroup}>
                        <button className={styles.ctaOutline}>Shop modules</button>
                        <button className={styles.ctaGhost}>Join a workshop →</button>
                    </div>
                </div>
                <div className={styles.carousel}>
                    <div className={styles.carouselTrack}>
                        {CAROUSEL_IMAGES[carouselIndex].src ? (
                            <div className={styles.carouselImageWrap}>
                                <Image
                                    src={CAROUSEL_IMAGES[carouselIndex].src}
                                    alt={CAROUSEL_IMAGES[carouselIndex].label}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        ) : (
                            <div className={styles.carouselPlaceholder}>
                                <span className={styles.label}>{CAROUSEL_IMAGES[carouselIndex].label}</span>
                            </div>
                        )}
                    </div>
                    <div className={styles.carouselControls}>
                        <button className={styles.carouselBtn} onClick={prevSlide}>←</button>
                        <span className={styles.carouselCounter}>
                            {String(carouselIndex + 1).padStart(2, "0")} / {String(CAROUSEL_IMAGES.length).padStart(2, "0")}
                        </span>
                        <button className={styles.carouselBtn} onClick={nextSlide}>→</button>
                    </div>
                    <div className={styles.carouselDots}>
                        {CAROUSEL_IMAGES.map((_, i) => (
                            <button
                                key={i}
                                className={`${styles.carouselDot} ${i === carouselIndex ? styles.carouselDotActive : ""}`}
                                onClick={() => setCarouselIndex(i)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── [THE HOOK] ────────────────────────────── */}
            <section className={styles.grid12}>
                <div className={`${styles.cell} col-span-12 md:col-span-8`}>
                    <span className={styles.label}>{hook.note}</span>
                    <h2 className={`${styles.h2} mt-12`}>{hook.title}</h2>
                </div>
                <div className={`${styles.cell} col-span-12 md:col-span-4 flex flex-col justify-between`}>
                    <div className={styles.oscilloscopeWrap}>
                        <OscilloscopeDisplay />
                    </div>
                    <button className={styles.ctaFull}>Browse all modules →</button>
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
                                <h3 className="text-[2vw]">{product.name}</h3>
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
                        <div className={`${styles.cell} flex gap-3`}>
                            <button
                                className={styles.productCTAPrimary}
                                onClick={() => product.id === "vcmc" ? router.push("/projects/vcmc?viewer=true") : undefined}
                            >
                                {product.id === "vcmc" ? "View module" : "Buy now"}
                            </button>
                            <button className={styles.productCTASecondary}>View kit</button>
                        </div>
                    </div>
                ))}
            </section>

            {/* ── [WHITE FEATURE] ──────────────────────────── */}
            <section className={styles.whiteSection}>
                <div className={styles.whiteSectionInner}>
                    <Image
                        src="https://iili.io/BAtOX94.png"
                        alt="Befaco Feature"
                        width={800}
                        height={600}
                        className="object-contain w-full max-w-[50vw]"
                        unoptimized
                    />
                    <h2 className={styles.whiteSectionHeading}>The module is the instrument.</h2>
                    <p className={styles.whiteSectionBody}>
                        Oneiroi brings six synthesis modes, a live looper, and deep CV control into 30HP. Ready to enjoy straight out of the box — or build it yourself.
                    </p>
                    <div className={styles.whiteSectionCTAs}>
                        <button className={styles.ctaDark}>Order assembled</button>
                        <button className={styles.ctaDarkOutline}>Build the kit</button>
                    </div>
                </div>
            </section>

            {/* ── [RESOURCES] ──────────────────────────────── */}
            <section className={styles.grid12}>
                <div className={`${styles.cell} col-span-3 flex items-center`}>
                    <span className={styles.h2}>Resources</span>
                </div>
                <div className={`${styles.cell} col-span-9`}>
                    {[
                        "Articles",
                        "Software Center",
                        "DIY Interactive Guide",
                        "Workshops",
                        "Legacy",
                        "Old Versions",
                        "Videos",
                    ].map((item) => (
                        <div key={item} className={styles.resourceRow}>
                            <span>{item}</span>
                            <span className={styles.resourceArrow}>→</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── [FOOTER] ───────────────────────────────── */}
            <BefacoFooter />
        </div>
    );
}
