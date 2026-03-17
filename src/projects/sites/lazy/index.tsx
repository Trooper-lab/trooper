"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { lazyContent } from "./data/content";
import styles from "./Lazy.module.css";
import {
    IconJaggedStar,
    IconZBolt,
    IconComplexAsterisk,
    IconStarBurst,
    IconNordicStar,
    IconCart,
    IconProfile
} from "./components/Icons";

// Removed local Video Player logic in favor of a simpler native HTML5 element.

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * LazySite - High Fidelity Reconstruction
 * 
 * DESIGN: Strict adherence to the provided reference image.
 * FONTS: DXBurst (Logo), Reign (All other text).
 */
/**
 * WHY: Strict interface prevents untyped `as any` casts in the gallery map.
 * noWatermark/customBottomCrop are optional display overrides per image.
 */
interface LifestyleImage {
    src: string;
    id: string;
    caption: string;
    noWatermark?: boolean;
    customBottomCrop?: boolean;
}

const lifestyleImages: LifestyleImage[] = [
    { src: "https://iili.io/q5gIPQR.png", id: "03", caption: "The Glow" },
    { src: "/lazy/lifestyle/lazy_lifestyle_5_1773265526081.png", id: "05", caption: "Liquid Metal" },
    { src: "https://iili.io/qYA1han.png", id: "07", caption: "Industrial Form", noWatermark: true },
    { src: "https://iili.io/qYA1MGI.png", id: "08", caption: "Pure Essence", noWatermark: true },
    { src: "https://iili.io/q7hqbS4.webp", id: "09", caption: "Raw Ritual", customBottomCrop: true }
];

export default function LazySite() {
    const containerRef = useRef<HTMLDivElement>(null);
    const productRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLDivElement>(null);
    const navLogoRef = useRef<HTMLDivElement>(null);
    const horizontalWrapperRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const { hero, hook, products, value, soap, footer } = lazyContent;

    const handleNext = () => {
        gsap.to(productRef.current, {
            opacity: 0,
            x: -20,
            duration: 0.3,
            onComplete: () => {
                setCurrentIndex((prev) => (prev + 1) % products.length);
                gsap.fromTo(productRef.current, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
            }
        });
    };

    const handlePrev = () => {
        gsap.to(productRef.current, {
            opacity: 0,
            x: 20,
            duration: 0.3,
            onComplete: () => {
                setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
                gsap.fromTo(productRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
            }
        });
    };

    useGSAP(() => {
        // Subtle entrance for logo
        gsap.from(".hero-logo", {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        });

        // Navbar scroll logic
        ScrollTrigger.create({
            trigger: "#hero-section",
            start: "bottom top",
            onEnter: () => {
                gsap.to(navbarRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
                gsap.to(navLogoRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
            },
            onLeaveBack: () => {
                gsap.to(navbarRef.current, { y: -100, opacity: 0, duration: 0.5, ease: "power2.in" });
                gsap.to(navLogoRef.current, { opacity: 0, scale: 0.8, duration: 0.3 });
            }
        });

        // Value Statement Title - Elegant Clip-Path Reveal
        gsap.fromTo(".value-title span",
            {
                clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                y: 40,
                opacity: 0
            },
            {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".value-title",
                    start: "top 85%",
                }
            }
        );

        // Society Icon Reveal Animation (SVG Path Draw + Slide)
        const societyPaths = document.querySelectorAll(".society-icon-reveal path");
        if (societyPaths.length > 0) {
            gsap.set(societyPaths, { strokeDasharray: 500, strokeDashoffset: 500 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".society-icon-reveal",
                    start: "top 95%",
                }
            });

            tl.fromTo(".society-icon-reveal",
                { x: 200, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
            )
                .to(societyPaths, {
                    strokeDashoffset: 0,
                    duration: 1.8,
                    ease: "power2.inOut",
                    stagger: 0.1
                }, "-=0.8");

            // Perpetual Rotation
            gsap.to(".society-icon-reveal svg", {
                rotate: 360,
                duration: 20,
                repeat: -1,
                ease: "none"
            });
        }

        // Side Panel GSAP Animation
        if (isPanelOpen) {
            gsap.fromTo(".drawer-content",
                { xPercent: 100 },
                { xPercent: 0, duration: 0.8, ease: "power4.out" }
            );
            gsap.fromTo(".drawer-backdrop",
                { opacity: 0 },
                { opacity: 1, duration: 0.5 }
            );
        }

        // Section 8 Ticker Animation
        const ticker = document.querySelector(".ticker-wrapper");
        if (ticker) {
            gsap.to(ticker, {
                xPercent: -50,
                duration: 30,
                repeat: -1,
                ease: "none"
            });
        }

        // Immersive Product Image Parallax
        gsap.to(".parallax-img", {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
                trigger: ".parallax-img",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Soap Section - Staggered Story Reveal
        gsap.from(".soap-line", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".soap-line",
                start: "top 85%",
            }
        });

        gsap.from(".reveal-text", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".reveal-text",
                start: "top 85%",
            }
        });

        gsap.fromTo(".reveal-visual",
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".reveal-visual",
                    start: "top 80%",
                }
            }
        );

        // Horizontal Gallery Robust Panning
        if (galleryRef.current && horizontalWrapperRef.current) {
            const gallery = galleryRef.current;
            gsap.to(gallery, {
                x: () => -(gallery.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: horizontalWrapperRef.current,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    start: "top top",
                    end: () => "+=" + (gallery.scrollWidth - window.innerWidth),
                }
            });
        }

    }, { scope: containerRef });



    const currentProduct = products[currentIndex];

    return (
        <div ref={containerRef} className={`${styles.lazyWrapper} selection:bg-[#C38FFF] selection:text-white overflow-x-hidden antialiased bg-white`}>
            {/* Load Lenis via CDN - Industrial Fallback for restricted node_modules environments */}

            {/* ── Navbar ────────────────────────────── */}
            <nav ref={navbarRef} className="fixed top-0 left-0 w-full h-24 z-[100] flex items-center justify-between px-8 md:px-12 pointer-events-none opacity-0 translate-y-[-100px] border-b border-black/5 bg-white/80 backdrop-blur-md">
                <div className="flex gap-8 items-center pointer-events-auto h-full">
                    <span className={`${styles.fontReign} text-[14px] uppercase tracking-[0.2em] font-medium text-black cursor-pointer hover:text-black/40 transition-colors`}>Shop</span>
                    <span className={`${styles.fontReign} text-[14px] uppercase tracking-[0.2em] font-medium text-black cursor-pointer hover:text-black/40 transition-colors`}>Story</span>
                </div>

                <div ref={navLogoRef} className={`${styles.fontBurst} absolute left-1/2 -translate-x-1/2 text-4xl text-black pointer-events-auto opacity-0 scale-75 select-none`}>
                    lazy
                </div>

                <div className="flex gap-6 md:gap-10 text-black/60 items-center pointer-events-auto h-full">
                    <IconJaggedStar size={32} className={`${styles.softResponse} ${styles.hoverSoftResponse} transition-all cursor-pointer hover:text-black`} />
                    <IconProfile size={32} className={`${styles.softResponse} ${styles.hoverSoftResponse} transition-all cursor-pointer hover:text-black`} />
                    <IconCart size={32} className={`${styles.softResponse} ${styles.hoverSoftResponse} transition-all cursor-pointer hover:text-black`} />
                    <IconNordicStar size={32} className={`${styles.softResponse} ${styles.hoverSoftResponse} transition-all cursor-pointer hover:text-black`} />
                </div>
            </nav>

            {/* ── [SECTION 1] Hero ─────────────────────────── */}
            <section id="hero-section" className="h-screen relative flex flex-col items-center justify-center overflow-hidden bg-[#121212]">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className={styles.heroVideoContainer}>
                        <iframe
                            src="https://streamable.com/e/5ctu8o?autoplay=1&muted=1&loop=1&background=1&autopause=0"
                            frameBorder="0"
                            width="100%"
                            height="100%"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            className={styles.heroVideoIframe}
                        ></iframe>
                    </div>
                </div>

                <div className="absolute top-8 left-8 md:left-12 z-10 hidden md:flex gap-8 items-center text-white/90">
                    <span className={`${styles.fontReign} text-[14px] uppercase tracking-[0.2em] font-medium cursor-pointer hover:text-white/40 transition-colors`}>Shop</span>
                    <span className={`${styles.fontReign} text-[14px] uppercase tracking-[0.2em] font-medium cursor-pointer hover:text-white/40 transition-colors`}>Story</span>
                </div>

                <div className="absolute top-8 right-8 md:right-12 z-10 flex gap-6 md:gap-10 items-center text-white/60">
                    <IconJaggedStar size={32} className={`${styles.softResponse} ${styles.hoverSoftResponse} transition-all cursor-pointer`} />
                    <IconProfile size={32} className={`${styles.softResponse} ${styles.hoverSoftResponse} transition-all cursor-pointer hover:text-white`} />
                    <IconCart size={32} className={`${styles.softResponse} ${styles.hoverSoftResponse} transition-all cursor-pointer hover:text-white`} />
                    <IconNordicStar size={32} className={`${styles.softResponse} ${styles.hoverSoftResponse} transition-all cursor-pointer`} />
                </div>

                <div className={`${styles.fontBurst} hero-logo relative z-10 text-[40vw] md:text-[250pt] text-white leading-none select-none`}>
                    {hero.logoText}
                </div>
            </section>

            {/* ── [SECTION 2] The Hook (48pt Rhythm) ─────── */}
            <section className="bg-white px-6 md:px-24 flex flex-col items-center py-12">
                <div className="max-w-7xl w-full">
                    <div className="text-left py-8">
                        <p className={`${styles.fontSatoshi} text-[14pt] md:text-[18pt] text-[#7A7A7A] mb-6 md:mb-8 leading-[1.2] max-w-2xl font-light`}>
                            {hook.note}
                        </p>
                        <h2 className={`${styles.fontReign} text-[24pt] md:text-[32pt] font-normal text-[#121212] leading-[1.1]`}>
                            {hook.title}
                        </h2>
                    </div>
                </div>
            </section>

            {/* ── [SECTION 3] Immersive Product Carousel ───── */}
            <section className="bg-white px-6 md:px-24 h-screen flex flex-col items-center justify-center py-12">
                <div className="max-w-7xl w-full">
                    <div className="relative w-full flex flex-col items-center">
                        <div className="absolute left-[-10px] md:left-0 top-1/2 -translate-y-1/2 z-10">
                            <button
                                onClick={handlePrev}
                                className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-black/10 flex items-center justify-center text-black/20 hover:text-black hover:border-black transition-all bg-white/50 backdrop-blur-sm"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="md:w-12 md:h-12"><path d="M15 19L8 12L15 5" /></svg>
                            </button>
                        </div>

                        <div className="relative w-full max-w-[300px] md:max-w-[640px] aspect-square mb-4 flex items-center justify-center">
                            <div ref={productRef} className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src={currentProduct.image}
                                    alt={currentProduct.name}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => setIsPanelOpen(true)}
                            className={`${styles.fontReign} ${styles.ghostUnderline} text-[16px] md:text-[18px] text-black/40 hover:text-black uppercase tracking-[0.2em] mb-12`}
                        >
                            What's inside?
                        </button>

                        <div className="flex flex-col items-center">
                            <h3 className={`${styles.fontReign} text-[28px] md:text-[42px] text-[#121212] mb-6 font-normal uppercase text-center`}>{currentProduct.name}</h3>

                            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
                                <span className={`${styles.fontReign} text-[18px] md:text-[20px] text-[#121212] opacity-80 font-medium`}>{currentProduct.price}</span>
                                <button className={`${styles.fontReign} bg-black text-white px-8 py-4 md:px-12 md:py-5 text-[14px] uppercase font-medium hover:bg-[#333] transition-all`}>
                                    {currentProduct.cta}
                                </button>
                            </div>
                        </div>

                        <div className="absolute right-[-10px] md:right-0 top-1/2 -translate-y-1/2 z-10">
                            <button
                                onClick={handleNext}
                                className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-black/10 flex items-center justify-center text-black/20 hover:text-black hover:border-black transition-all bg-white/50 backdrop-blur-sm"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="md:w-12 md:h-12"><path d="M9 5L16 12L9 19" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── [SECTION 3.5] Ingredients (The Truth) ────── */}
            <section className="bg-white px-6 md:px-24 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24 overflow-hidden">
                <div className="max-w-md w-full">
                    <div className="flex flex-col gap-8 md:gap-10">
                        <p className={`${styles.fontReign} text-[18px] md:text-[24px] text-[#121212] font-normal leading-[1.1] tracking-tight reveal-text`}>
                            Turns out healthy skin isn’t that complicated. You need a handful of good things.
                        </p>

                        <div className="flex flex-col gap-3">
                            {["Natural oils.", "Real botanicals.", "Ingredients your skin recognizes."].map((text, i) => (
                                <p key={i} className={`${styles.fontReign} text-[18px] md:text-[24px] text-[#121212] font-normal leading-none tracking-tight reveal-text`}>
                                    {text}
                                </p>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3 pt-6 border-t border-black/5">
                            <p className={`${styles.fontReign} text-[18px] md:text-[24px] text-[#121212]/60 font-light reveal-text leading-none`}>
                                We already put them together.
                            </p>
                            <div className="flex flex-col gap-1">
                                <p className={`${styles.fontReign} text-[18px] md:text-[24px] text-[#121212] font-medium reveal-text leading-none`}>All organic.</p>
                                <p className={`${styles.fontReign} text-[18px] md:text-[24px] text-[#121212] font-medium reveal-text leading-none`}>All in one bar.</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <p className={`${styles.fontReign} text-[14px] md:text-[18px] text-[#121212]/40 leading-tight mb-8 reveal-text`}>
                                So you don't have to research what <span className="text-black/60 italic">"hyaluro-something complex"</span> means.
                            </p>
                        </div>
                    </div>
                </div>

                {/* LUXURY VISUAL ON THE RIGHT */}
                <div className="flex w-full md:flex-[4] h-[450px] md:h-[850px] items-center justify-center relative overflow-hidden rounded-[2px] mt-12 md:mt-0">
                    <Image
                        src="/lazy/ingredients_new.png"
                        alt="Lazy Ingredients"
                        fill
                        className="object-cover reveal-visual"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none" />
                </div>
            </section>

            {/* ── [SECTION 4] Value Statement (48pt Start) ── */}
            <section className="min-h-screen bg-white flex flex-col items-center justify-center py-12 overflow-hidden">
                <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col pt-[80px] md:pt-[100px] items-center text-center">
                    <div className="flex flex-col items-center gap-4 mb-12">
                        <div className="text-black/10 origin-center scale-[0.65] md:scale-100">
                            <IconJaggedStar size={64} />
                        </div>
                        <h2 className={`${styles.fontReign} value-title text-[24px] md:text-[32px] text-[#121212] leading-[1.2] max-w-2xl font-normal overflow-hidden`}>
                            <div className="overflow-hidden">
                                <span className="block">
                                    {value.title}
                                </span>
                            </div>
                        </h2>
                    </div>
                </div>

                {/* Full-bleed responsive Streamable Embed */}
                <div className={styles.videoContainer}>
                    <iframe
                        src="https://streamable.com/e/h0m82u?autoplay=1&muted=1&loop=1&background=1&autopause=0"
                        frameBorder="0"
                        width="100%"
                        height="100%"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        className={styles.videoIframe}
                    ></iframe>
                </div>
            </section>

            {/* ── [SECTION 5] Soap Story ───────────────────── */}
            <section className="bg-white min-h-screen pt-24 md:pt-32 pb-12 px-6 md:px-24 flex flex-col md:flex-row items-center justify-center gap-12 max-w-full mx-auto relative overflow-hidden">
                <div className={`${styles.fontReign} flex-1 md:w-2/5 w-full max-w-xl text-left flex flex-col justify-between py-12 md:py-8 min-h-[500px] md:min-h-[777px] relative z-10 -translate-x-[50px] md:-translate-x-[150px]`}>
                    <div className="flex flex-col gap-1">
                        {soap.story.map((line, i) => (
                            <p key={i} className="soap-line text-[24px] md:text-[32px] leading-[1.1] text-[#121212] font-normal mb-0 tracking-tight">
                                {line}
                            </p>
                        ))}
                    </div>

                    <div className="mt-16 md:mt-0">
                        <div className="flex items-center gap-2 md:gap-3 mb-2">
                            <div className="origin-left scale-[0.65] md:scale-100 flex items-center"><IconComplexAsterisk size="32" className="text-[#121212] hover:rotate-[30deg] transition-transform duration-500" /></div>
                            <h3 className="text-[28px] md:text-[48px] leading-none text-[#121212] font-normal tracking-tight">{soap.subTitle}</h3>
                        </div>
                        <p className={`${styles.fontSatoshi} text-[18px] md:text-[32px] text-[#121212]/30 font-light tracking-tight`}>
                            Dermatologists hate how simple this is.
                        </p>
                    </div>
                </div>

                <div className="absolute top-0 right-0 w-full h-full md:w-[70vw] z-0 pointer-events-none">
                    {/* BALANCED LARGE SCALE: Reduced from 2.2x to 1.2x to stop text overlap while remaining "really big" */}
                    <div className="relative w-full h-full scale-[1.1] md:scale-[1.2] translate-y-[calc(10%-20px)] md:translate-y-[-20px] translate-x-[calc(10%-20px-100px)] md:translate-x-[calc(5%-20px-100px)]">
                        <Image
                            src={soap.image}
                            alt="Soap Visual"
                            fill
                            className="object-contain md:object-right-bottom parallax-img"
                            unoptimized
                        />
                    </div>
                </div>
            </section>

            {/* ── [SECTION 6] Lazy People Society ─────────── */}
            <section className="bg-white px-6 md:px-24 flex flex-col items-start pt-12 pb-24 overflow-hidden">
                <div className="max-w-7xl w-full flex flex-row items-center gap-4 md:gap-12">
                    <h2 className={`${styles.fontBurst} text-[15vw] md:text-[200px] text-black leading-[0.85] soap-line`}>
                        Lazy People Society
                    </h2>
                    <div className="society-icon-reveal flex-shrink-0 flex items-center h-full">
                        <IconComplexAsterisk size={200} className="text-black hidden md:block" />
                        <IconComplexAsterisk size={15} className="text-black md:hidden" />
                    </div>
                </div>
            </section>

            {/* ── [SECTION 7] Horizontal Lifestyle Scroll ──── */}
            <section ref={horizontalWrapperRef} className="horizontal-section bg-white h-screen overflow-hidden flex items-start">
                <div ref={galleryRef} className="gallery-inner flex flex-nowrap h-full items-start gap-0">
                    {lifestyleImages.map((img, i) => (
                        <div key={i} className="gallery-item flex-shrink-0 w-[70vw] md:w-[60vw] h-[90vh] relative group overflow-hidden border-r border-black/5 bg-[#F9F9F9]">
                            <Image
                                src={img.src}
                                alt={img.caption}
                                fill
                                className={`object-cover transition-transform duration-1000 
                                    ${img.customBottomCrop ? "scale-[1.2] translate-y-[-10%] origin-top" :
                                        img.noWatermark ? "scale-[1.1] translate-y-[-2%] translate-x-[-2%] origin-top-left" :
                                            "group-hover:scale-105"}`}
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-black/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            <div className="absolute top-12 left-12 flex flex-col items-start gap-1">
                                <span className={`${styles.fontReign} text-[12px] md:text-[14px] text-black/40 uppercase tracking-widest`}>
                                    {img.id}/05
                                </span>
                                <span className={`${styles.fontReign} text-[12px] md:text-[14px] text-black uppercase tracking-widest bg-white/80 px-3 py-1 backdrop-blur-sm rounded-[2px]`}>
                                    @lazy_society
                                </span>
                            </div>

                            <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                                <span className={`${styles.fontBurst} text-[32px] md:text-[48px] text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-700`}>
                                    {img.caption}
                                </span>
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-1000 scale-75 group-hover:scale-100">
                                    <IconJaggedStar size={32} />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* SOCIALS CTA AT THE END */}
                    <div className="gallery-item flex-shrink-0 w-[50vw] md:w-[40vw] h-[80vh] flex flex-col items-center justify-center gap-6 border-r border-black/5 bg-[#F9F9F9] px-12">
                        <span className={`${styles.fontReign} text-[14px] text-black/40 uppercase tracking-widest`}>Beyond Skin</span>
                        <h3 className={`${styles.fontBurst} text-[56px] md:text-[80px] text-black text-center leading-none px-8`}>Join the Society</h3>
                        <button className={`${styles.fontReign} bg-black text-white px-12 py-6 text-[14px] uppercase font-medium hover:bg-[#333] transition-all rounded-full`}>
                            Follow us
                        </button>
                    </div>
                </div>
            </section>
            {/* ── [SECTION 8] Society ──────────────────────── */}
            <section className="bg-white py-12 px-6 flex flex-col items-center justify-center text-center">
                <div className="max-w-4xl mx-auto">
                    <p className={`${styles.fontReign} text-[24px] md:text-[36px] text-[#121212] leading-[1.4] mb-12 font-light`}>
                        Lazy isn't about doing nothing.<br />
                        It's about doing only what matters.
                    </p>

                    <div className="mb-16 flex flex-col gap-2">
                        <p className={`${styles.fontReign} text-[24px] md:text-[36px] text-[#121212] leading-[1.2]`}>
                            Wash. Leave.
                        </p>
                        <p className={`${styles.fontReign} text-[24px] md:text-[36px] text-[#121212] leading-[1.2]`}>
                            Go live your life.
                        </p>
                    </div>

                    <button className={`${styles.fontReign} bg-black text-white px-12 py-6 text-[18px] md:text-[22px] uppercase font-medium hover:bg-[#333] transition-all tracking-tight`}>
                        Join the Lazy People Society
                    </button>
                </div>
            </section>

            {/* ── [SECTION 8] Icon Row Ticker ──────────────── */}
            <section className="py-24 md:py-40 border-t border-black/5 overflow-hidden whitespace-nowrap bg-white">
                <div className="ticker-wrapper flex items-center gap-12 md:gap-24 w-max">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
                            {[
                                IconJaggedStar,
                                IconZBolt,
                                IconComplexAsterisk,
                                IconStarBurst,
                                IconNordicStar,
                                IconJaggedStar,
                                IconZBolt,
                                IconComplexAsterisk,
                                IconStarBurst,
                                IconNordicStar
                            ].map((Icon, j) => (
                                <React.Fragment key={j}>
                                    <div className="text-black/20 hover:text-black transition-colors duration-500 scale-75 md:scale-100 flex-shrink-0">
                                        <Icon size="64" />
                                    </div>
                                    <span className={`${styles.fontReign} text-[24px] md:text-[32px] text-black/10 uppercase tracking-widest pointer-events-none flex-shrink-0`}>
                                        be lazy my friend
                                    </span>
                                </React.Fragment>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* ── [SECTION 9] Footer ────────────────────────── */}
            <footer className="py-24 md:py-40 bg-[#D9D9D9] flex flex-col items-center px-6">
                <div className={`${styles.fontBurst} text-[25vw] md:text-[15vw] text-white select-none leading-none mb-8 md:mb-12`}>
                    lazy
                </div>
                <p className={`${styles.fontReign} text-[14px] md:text-[18px] text-black/60 font-medium text-center`}>
                    {footer.note}
                </p>
            </footer>

            {/* ── [PRODUCT DETAILS PANEL] ────────────────────── */}
            {isPanelOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm drawer-backdrop"
                        onClick={() => setIsPanelOpen(false)}
                    />
                    <div className={`relative w-full max-w-md bg-white h-full flex flex-col p-12 overflow-y-auto drawer-content ${styles.drawerContent}`}>
                        <button
                            onClick={() => setIsPanelOpen(false)}
                            className={`${styles.fontReign} absolute top-8 right-8 text-black/40 hover:text-black uppercase tracking-widest text-[12px]`}
                        >
                            Close
                        </button>

                        <div className="mt-12 flex flex-col gap-12">
                            <div className="flex flex-col gap-4">
                                <span className={styles.drawerLabel}>The Product</span>
                                <h4 className={`${styles.drawerTitle} text-[48px] text-black`}>
                                    {products[currentIndex].name}
                                </h4>
                            </div>

                            <div className="flex flex-col gap-4">
                                <span className={styles.drawerLabel}>What's Inside?</span>
                                <p className={`${styles.drawerText} text-[22px] text-black italic`}>
                                    "{products[currentIndex].details?.ingredients}"
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-8">
                                <div className="flex flex-col gap-2">
                                    <span className={styles.drawerLabel}>Sourcing</span>
                                    <p className={`${styles.drawerText} text-[16px] text-black/70`}>
                                        {products[currentIndex].details?.sourcing}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className={styles.drawerLabel}>Skin Type</span>
                                    <p className={`${styles.drawerText} text-[16px] text-black/70`}>
                                        {products[currentIndex].details?.skinType}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className={styles.drawerLabel}>How to use</span>
                                    <p className={`${styles.drawerText} text-[16px] text-black/70`}>
                                        {products[currentIndex].details?.howToUse}
                                    </p>
                                </div>
                            </div>

                            <button className={`${styles.fontReign} bg-black text-white py-6 text-[16px] uppercase tracking-widest mt-8 hover:bg-[#333] transition-colors`}>
                                Add to cart — {products[currentIndex].price}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
