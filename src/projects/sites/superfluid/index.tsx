'use client';

import styles from './Superfluid.module.css';

const deliverables = [
    { label: 'SaaS Product Design', desc: 'End-to-end UI/UX for a teacher-facing dashboard, onboarding flow, and grade sync interface.' },
    { label: 'Google Classroom API', desc: 'OAuth 2.0 integration pulling courses, assignments, and grades in real time.' },
    { label: 'Firebase Backend', desc: 'Firestore data model, Auth, and App Hosting for a zero-ops deployment pipeline.' },
    { label: 'Landing Page', desc: 'Clean SaaS marketing site with Boldonse typography, purple/yellow palette, and Google sign-in.' },
];

const stack = ['Next.js 15', 'TypeScript', 'Firebase', 'Firestore', 'Tailwind CSS', 'ShadCN', 'Google Classroom API', 'App Hosting'];

export default function SuperfluidSite() {
    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <span className={styles.headerEyebrow}>Case Study</span>
                    <span className={styles.headerTitle}>Superfluid</span>
                </div>
                <a
                    href="https://superfluid.work"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.headerCta}
                >
                    Visit live site ↗
                </a>
            </header>

            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <p className={styles.heroEyebrow}>SaaS · Education · 2025</p>
                    <h1 className={styles.heroHeadline}>
                        Grade sync and student management for educators.
                    </h1>
                    <p className={styles.heroSub}>
                        Superfluid automates the bridge between Google Classroom and school information systems — giving teachers back hours every week.
                    </p>
                </div>
                {/* Colour block preview */}
                <div className={styles.heroBrand}>
                    <div className={styles.heroBrandPurple}>
                        <span className={styles.heroBrandLogo}>Superfluid</span>
                        <span className={styles.heroBrandTag}>Flow state for teachers.</span>
                    </div>
                    <div className={styles.heroBrandYellow} />
                </div>
            </section>

            {/* Deliverables */}
            <section className={styles.section}>
                <p className={styles.sectionLabel}>What we built</p>
                <div className={styles.deliverablesGrid}>
                    {deliverables.map((d) => (
                        <div key={d.label} className={styles.deliverableCard}>
                            <h3 className={styles.deliverableTitle}>{d.label}</h3>
                            <p className={styles.deliverableDesc}>{d.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stack */}
            <section className={styles.sectionAlt}>
                <p className={styles.sectionLabel}>Tech stack</p>
                <div className={styles.stackList}>
                    {stack.map((s) => (
                        <span key={s} className={styles.stackTag}>{s}</span>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className={styles.cta}>
                <h2 className={styles.ctaHeadline}>See it live.</h2>
                <a
                    href="https://superfluid.work"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaButton}
                >
                    superfluid.work ↗
                </a>
            </section>
        </div>
    );
}
