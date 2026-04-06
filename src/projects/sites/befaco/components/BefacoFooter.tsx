"use client";

import styles from "../Befaco.module.css";
import { befacoContent } from "../data/content";

export function BefacoFooter() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerGrid}>
                <div className={styles.footerCol}>
                    <span className={styles.label}>About</span>
                    <p className={styles.footerAbout}>
                        Modular synthesizers designed and assembled in Barcelona since 2010. Open source hardware, built for the community.
                    </p>
                </div>
                <div className={styles.footerCol}>
                    <span className={styles.label}>Products</span>
                    <ul className={styles.footerLinks}>
                        {["Oneiroi", "Lich", "VCMC", "Burst", "View all modules →"].map(l => (
                            <li key={l} className={styles.footerLink}>{l}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.footerCol}>
                    <span className={styles.label}>Learn</span>
                    <ul className={styles.footerLinks}>
                        {["Workshops", "DIY Kits", "Documentation", "ModularGrid", "GitHub →"].map(l => (
                            <li key={l} className={styles.footerLink}>{l}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.footerCol}>
                    <span className={styles.label}>Contact</span>
                    <ul className={styles.footerLinks}>
                        {["info@befaco.org", "Instagram", "Facebook", "YouTube"].map(l => (
                            <li key={l} className={styles.footerLink}>{l}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <span className={styles.footerNote}>{befacoContent.footer.note}</span>
                <span className={styles.footerNote}>© 2025 Befaco — Barcelona, Spain</span>
            </div>
        </footer>
    );
}
