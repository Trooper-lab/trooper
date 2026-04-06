"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { befacoConfig } from "../../../configs/befaco";
import styles from "../Befaco.module.css";

const NAV_ITEMS = [
    { label: "Modules", sub: ["Oscillators", "Filters", "Utilities", "Voice Modules"] },
    { label: "Power", sub: [] },
    { label: "Accessories", sub: [] },
    { label: "Resources", sub: ["Articles", "Software Center", "DIY Interactive Guide", "Workshops", "Legacy", "Videos"] },
    { label: "Community", sub: [] },
    { label: "Store", sub: [] },
    { label: "VCV Rack", sub: [] },
];

function HeaderInner() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`${styles.grid12} ${styles.hero}`} style={{ position: "relative" }}>
            <div className={styles.logo}>
                <Image
                    src={befacoConfig.assets.logo}
                    alt="Befaco"
                    width={400}
                    height={48}
                    className="logo-img object-contain h-[40px] w-auto cursor-pointer"
                    unoptimized
                    onClick={() => router.push("/projects/befaco?viewer=true")}
                />
                <button
                    className={styles.menuBtn}
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.menuBar} ${menuOpen ? styles.menuBarTopOpen : ""}`} />
                    <span className={`${styles.menuBar} ${menuOpen ? styles.menuBarMidOpen : ""}`} />
                    <span className={`${styles.menuBar} ${menuOpen ? styles.menuBarBotOpen : ""}`} />
                </button>
            </div>

            {menuOpen && (
                <nav className={styles.dropdown}>
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className={styles.dropdownItem}>
                            <span className={styles.dropdownLabel}>{item.label}</span>
                            {item.sub.length > 0 && (
                                <ul className={styles.dropdownSub}>
                                    {item.sub.map(s => (
                                        <li key={s} className={styles.dropdownSubItem}>{s}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </nav>
            )}
        </div>
    );
}

export function BefacoHeader() {
    return (
        <Suspense fallback={null}>
            <HeaderInner />
        </Suspense>
    );
}
