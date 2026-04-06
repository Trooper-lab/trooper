'use client';

import styles from './Superfluid.module.css';

const features = [
    {
        icon: '🔄',
        bg: '#EDE9FE',
        title: 'Auto grade sync',
        desc: 'Push grades from Google Classroom to Veracross, Canvas, or PowerSchool automatically.',
    },
    {
        icon: '🔔',
        bg: '#FEF9C3',
        title: 'Missing work alerts',
        desc: 'Surface students falling behind before it becomes a problem — one view, all classes.',
    },
    {
        icon: '📋',
        bg: '#DCFCE7',
        title: 'Term setup & mapping',
        desc: 'Map grading categories and term structures once. Never redo it again.',
    },
    {
        icon: '📊',
        bg: '#FEE2E2',
        title: 'Admin reporting',
        desc: 'Export clean, formatted reports ready for leadership, accreditation, or parents.',
    },
    {
        icon: '⚡',
        bg: '#DBEAFE',
        title: 'Custom automations',
        desc: 'Chain triggers and actions to automate the parts of your workflow that are uniquely yours.',
    },
    {
        icon: '👥',
        bg: '#EDE9FE',
        title: 'Teacher overview',
        desc: 'See every class, assignment, and sync status in a single glance.',
    },
];

export default function SuperfluidSite() {
    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <span className={styles.logo}>Superfluid</span>
                <a
                    href="https://superfluid.work"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.headerCta}
                >
                    Open app →
                </a>
            </header>

            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBg} />
                <div className={styles.heroBgGrid} />
                <div style={{ position: 'relative' }}>
                    <div className={styles.heroBadge}>
                        <span className={styles.heroBadgeDot} />
                        Now in beta — free for educators
                    </div>
                    <h1 className={styles.heroHeadline}>
                        Flow state{' '}
                        <span className={styles.heroHeadlineAccent}>for teachers.</span>
                    </h1>
                    <p className={styles.heroSub}>
                        Superfluid syncs Google Classroom with your SIS automatically — so you can stop copying grades and start teaching.
                    </p>
                    <div className={styles.heroCtas}>
                        <a
                            href="https://superfluid.work"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.ctaPrimary}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Get started free
                        </a>
                        <a href="#features" className={styles.ctaSecondary}>
                            See features →
                        </a>
                    </div>

                    {/* Browser mockup */}
                    <div className={styles.heroBrowserWrap}>
                        <div className={styles.heroBrowserBar}>
                            <span className={styles.heroBrowserDot} style={{ background: '#F87171' }} />
                            <span className={styles.heroBrowserDot} style={{ background: '#FCD34D' }} />
                            <span className={styles.heroBrowserDot} style={{ background: '#4ADE80' }} />
                            <span className={styles.heroBrowserUrl}>app.superfluid.school/dashboard</span>
                        </div>
                        <div className={styles.heroBrowserScreen}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect width="40" height="40" rx="10" fill="#7C3AED" opacity="0.1" />
                                <path d="M20 10 L28 15 L28 25 L20 30 L12 25 L12 15 Z" stroke="#7C3AED" strokeWidth="1.5" fill="none" />
                                <circle cx="20" cy="20" r="4" fill="#7C3AED" opacity="0.6" />
                            </svg>
                            <span className={styles.heroBrowserScreenLabel}>Dashboard preview</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className={styles.features}>
                <div style={{ textAlign: 'center' }}>
                    <p className={styles.sectionLabel}>Features</p>
                    <h2 className={styles.sectionHeading}>
                        Built for the way teachers actually work.
                    </h2>
                </div>
                <div className={styles.featureGrid}>
                    {features.map((f) => (
                        <div key={f.title} className={styles.featureCard}>
                            <div className={styles.featureIcon} style={{ background: f.bg }}>
                                {f.icon}
                            </div>
                            <h3 className={styles.featureCardTitle}>{f.title}</h3>
                            <p className={styles.featureCardDesc}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA band */}
            <div className={styles.ctaBand}>
                <div className={styles.ctaBandBlob1} />
                <div className={styles.ctaBandBlob2} />
                <div style={{ position: 'relative' }}>
                    <h2 className={styles.ctaBandHeadline}>Ready to get in the flow?</h2>
                    <p className={styles.ctaBandSub}>
                        Join educators already saving hours every week. Free to start — no credit card required.
                    </p>
                    <a
                        href="https://superfluid.work"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.ctaBandButton}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Get started free
                    </a>
                </div>
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <span className={styles.footerLogo}>Superfluid</span>
                <span className={styles.footerCopy}>&copy; {new Date().getFullYear()} Superfluid. Built for educators.</span>
            </footer>
        </div>
    );
}
