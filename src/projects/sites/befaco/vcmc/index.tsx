"use client";

import Image from "next/image";
import { BefacoHeader } from "../components/BefacoHeader";
import { BefacoFooter } from "../components/BefacoFooter";
import styles from "./VCMC.module.css";

export default function VCMCPage() {

    return (
        <div className={styles.container}>
            <BefacoHeader />

            {/* ── HERO ── */}
            <section className={styles.hero}>
                <div className={styles.heroImage}>
                    <Image
                        src="https://iili.io/BRKozjn.png"
                        alt="VCMC Module"
                        fill
                        className="object-contain"
                        unoptimized
                    />
                </div>
                <div className={styles.heroContent}>
                    <span className={styles.label}>Befaco — Eurorack Module</span>
                    <h1 className={styles.title}>VCMC</h1>
                    <p className={styles.description}>
                        VCMC is a voltage controlled MIDI controller. A fully editable MIDI controller with eight faders and push buttons — each with a CV or Gate input to automate their function via external signals, or configured independently for further control.
                    </p>
                    <p className={styles.description}>
                        Each control can be edited on its OLED screen and outputs via DIN-5 or USB as a class compliant MIDI device.
                    </p>
                    <div className={styles.ctaGroup}>
                        <button className={styles.ctaPrimary}>Buy assembled — €300</button>
                        <button className={styles.ctaSecondary}>Buy DIY kit</button>
                    </div>
                </div>
            </section>

            {/* ── DETAIL GRID ── */}
            <section className={styles.detailGrid}>

                {/* Features */}
                <div className={styles.detailCol}>
                    <h2 className={styles.colHeading}>Features</h2>
                    <ul className={styles.list}>
                        {[
                            "Class-compliant USB MIDI and DIN5 connectors",
                            "10 CV inputs and 8 gate inputs",
                            "8 faders and 8 buttons",
                            "Controls fully mappable to any MIDI message (CC, Notes, Program change, Clock, ST/SP, NRPN…)",
                            "Configurations saved in internal memory and via Sysex",
                            "Online Web Editor",
                            "Custom 3D printed case",
                        ].map((f) => (
                            <li key={f} className={styles.listItem}>
                                <span className={styles.dash}>—</span>{f}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Specs */}
                <div className={styles.detailCol}>
                    <h2 className={styles.colHeading}>Specs</h2>
                    <ul className={styles.list}>
                        {[
                            "Current: +12V: 64mA, −12V: 12mA",
                            "Width: 20 HP",
                            "Depth: 26 mm (including power connector)",
                            "Aluminium, heat-treated front panel",
                            "Designed, kits prepared and assembled in Barcelona",
                        ].map((s) => (
                            <li key={s} className={styles.listItem}>
                                <span className={styles.dash}>—</span>{s}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Resources */}
                <div className={styles.detailCol}>
                    <h2 className={styles.colHeading}>Resources</h2>
                    <ul className={styles.list}>
                        {[
                            "Assembly Instructions",
                            "User Manual v1.4.1",
                            "Schematic v1.1",
                            "Firmware",
                            "BOM File",
                            "Interactive Guide",
                            "Web Editor",
                            "ModularGrid Page",
                            "Add to ModularGrid",
                            "3D print Case Files",
                        ].map((r) => (
                            <li key={r} className={styles.resourceItem}>{r} →</li>
                        ))}
                    </ul>
                    <p className={styles.note}>
                        * Interactive guide is meant to be used together with Befaco's Assembly guide.
                    </p>
                </div>

            </section>

            <BefacoFooter />

        </div>
    );
}
