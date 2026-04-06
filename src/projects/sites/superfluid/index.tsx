'use client';

import styles from './Superfluid.module.css';

const GoogleIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const features = [
    { icon: '🔄', bg: '#EDE9FE', label: 'Auto-sync', title: 'Grades sync automatically.', desc: 'Push grades from Google Classroom to your SIS without touching a single field manually.' },
    { icon: '🔔', bg: '#FEF9C3', label: 'Missing work', title: 'Spot missing work instantly.', desc: 'Surface patterns across your class in one view. Intervene early, not at report card time.' },
    { icon: '📋', bg: '#DCFCE7', label: 'Term setup', title: 'Map categories once.', desc: 'Set up grading categories and term mappings once. Superfluid remembers them forever.' },
    { icon: '📊', bg: '#FEE2E2', label: 'Reporting', title: 'Clean reports for leadership.', desc: 'Export clean, formatted grade reports — ready for admin, parents, or accreditation.' },
    { icon: '⚡', bg: '#DBEAFE', label: 'Automations', title: 'Build your own workflows.', desc: 'Chain triggers and actions to automate the parts of your workflow that are uniquely yours.' },
    { icon: '👥', bg: '#EDE9FE', label: 'Overview', title: 'See every class at a glance.', desc: 'One dashboard for all your classes, assignments, and student statuses — across every platform.' },
];

const useCases = [
    { number: '01', title: 'Google Classroom → SIS', desc: 'Sync grades and assignments automatically between Google Classroom and Veracross, Canvas, or PowerSchool.', bg: '#7C3AED', color: '#fff' },
    { number: '02', title: 'Missing work tracking', desc: 'Surface students falling behind before it becomes a problem. One view, all classes.', bg: '#FBBF24', color: '#111827' },
    { number: '03', title: 'Term setup & mapping', desc: 'Map grading categories and term structures once. Never redo it again.', bg: '#fff', color: '#111827', border: '1px solid #E5E7EB' },
    { number: '04', title: 'Intervention logging', desc: 'Keep a clean record of every student support action — ready for parent meetings or admin review.', bg: '#111827', color: '#fff' },
    { number: '05', title: 'Teacher overview', desc: 'See the status of every class, assignment, and sync in a single glance.', bg: '#fff', color: '#111827', border: '1px solid #E5E7EB' },
    { number: '06', title: 'Admin reporting', desc: 'Export formatted, accurate reports for leadership, accreditation, or parent communication.', bg: 'rgba(124,58,237,0.08)', color: '#111827' },
];

const footerCols = [
    { title: 'Product', links: ['Features', 'Use cases', 'Integrations', 'Changelog', 'Documentation'] },
    { title: 'Company', links: ['About us', 'Blog', 'Careers', 'Security'] },
    { title: 'Resources', links: ['Help center', 'Community', 'Contact us', 'Status'] },
    { title: 'Legal', links: ['Privacy policy', 'Terms of service', 'Cookie settings'] },
];

const APP_URL = 'https://superfluid.work';

export default function SuperfluidSite() {
    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Boldonse&display=swap" />
            <div className={styles.page}>

                {/* Header */}
                <header className={styles.header}>
                    <span className={styles.logo}>Superfluid</span>
                    <nav className={styles.headerNav}>
                        <a href="#features" className={styles.headerNavLink}>Features</a>
                        <a href="#use-cases" className={styles.headerNavLink}>Use cases</a>
                        <a href={APP_URL} target="_blank" rel="noopener noreferrer" className={styles.headerNavLink}>Documentation</a>
                    </nav>
                    <div className={styles.headerActions}>
                        <a href={APP_URL} target="_blank" rel="noopener noreferrer" className={styles.headerSignIn}>Sign in</a>
                        <a href={APP_URL} target="_blank" rel="noopener noreferrer" className={styles.headerGetStarted}>
                            <GoogleIcon /> Get started free
                        </a>
                    </div>
                </header>

                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroBgGrid} />
                    <div className={styles.heroBgGlow} />
                    <div className={styles.heroInner}>
                        <div className={styles.heroBadge}>
                            <span className={styles.heroBadgeDot} />
                            Now in beta — free for educators
                        </div>
                        <h1 className={styles.heroHeadline}>
                            Flow state{' '}
                            <span className={styles.heroAccent}>for teachers.</span>
                        </h1>
                        <p className={styles.heroSub}>
                            Superfluid syncs Google Classroom with your SIS automatically — so you can stop copying grades and start teaching.
                        </p>
                        <div className={styles.heroCtas}>
                            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
                                <GoogleIcon /> Get started free
                            </a>
                            <a href="#features" className={styles.ctaSecondary}>
                                See how it works →
                            </a>
                        </div>
                        <p className={styles.heroNote}>No credit card required · Works with Veracross, Canvas &amp; more</p>

                        {/* Browser mockup */}
                        <div className={styles.heroBrowser}>
                            <div className={styles.heroBrowserBar}>
                                <span className={styles.heroBrowserDot} style={{ background: '#F87171' }} />
                                <span className={styles.heroBrowserDot} style={{ background: '#FCD34D' }} />
                                <span className={styles.heroBrowserDot} style={{ background: '#4ADE80' }} />
                                <span className={styles.heroBrowserUrl}>app.superfluid.work/dashboard</span>
                            </div>
                            <div className={styles.heroBrowserScreen}>
                                <span className={styles.heroBrowserScreenLabel}>Dashboard preview</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section id="features" className={styles.features}>
                    <div className={styles.sectionHeader}>
                        <p className={styles.sectionEyebrow}>Features</p>
                        <h2 className={styles.sectionHeading}>Built for the way teachers actually work.</h2>
                        <p className={styles.sectionSub}>Everything you need to eliminate admin friction — nothing you don&apos;t.</p>
                    </div>
                    <div className={styles.featureGrid}>
                        {features.map((f) => (
                            <div key={f.title} className={styles.featureCard}>
                                <div className={styles.featureIconWrap} style={{ background: f.bg }}>{f.icon}</div>
                                <p className={styles.featureLabel}>{f.label}</p>
                                <h3 className={styles.featureTitle}>{f.title}</h3>
                                <p className={styles.featureDesc}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Use Cases */}
                <section id="use-cases" className={styles.useCases}>
                    <div className={styles.useCasesHeader}>
                        <div className={styles.useCasesHeaderLeft}>
                            <p className={styles.sectionEyebrow}>Use cases</p>
                            <h2 className={styles.sectionHeading} style={{ margin: 0 }}>What can Superfluid do for you?</h2>
                        </div>
                        <a href={APP_URL} target="_blank" rel="noopener noreferrer" className={styles.headerNavLink}>
                            Explore all →
                        </a>
                    </div>
                    <div className={styles.useCasesGrid}>
                        {useCases.map((u) => (
                            <div
                                key={u.title}
                                className={styles.useCaseCard}
                                style={{ background: u.bg, color: u.color, border: u.border || 'none' }}
                            >
                                <span className={styles.useCaseNum}>{u.number}</span>
                                <h3 className={styles.useCaseTitle}>{u.title}</h3>
                                <p className={styles.useCaseDesc} style={{ opacity: u.color === '#fff' ? 0.75 : 0.65 }}>{u.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div className={styles.ctaBand}>
                    <div className={styles.ctaBandInner}>
                        <div className={styles.ctaBandBlob1} />
                        <div className={styles.ctaBandBlob2} />
                        <div className={styles.ctaBandContent}>
                            <h2 className={styles.ctaBandHeadline}>Ready to get in the flow?</h2>
                            <p className={styles.ctaBandSub}>Join educators already saving hours every week. Free to start — no credit card required.</p>
                            <div className={styles.ctaBandButtons}>
                                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaBandPrimary}>
                                    <GoogleIcon /> Get started free
                                </a>
                                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaBandSecondary}>
                                    Read the docs →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className={styles.footer}>
                    <div className={styles.footerInner}>
                        <div className={styles.footerBrand}>
                            <span className={styles.footerLogo}>Superfluid</span>
                            <p className={styles.footerTagline}>Sync grades, track students, and reclaim your time.</p>
                        </div>
                        <div className={styles.footerLinks}>
                            {footerCols.map((col) => (
                                <div key={col.title} className={styles.footerCol}>
                                    <h4>{col.title}</h4>
                                    <ul>
                                        {col.links.map((l) => (
                                            <li key={l}>
                                                <a href={APP_URL} target="_blank" rel="noopener noreferrer">{l}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.footerBottom}>
                        <span className={styles.footerCopy}>&copy; {new Date().getFullYear()} Superfluid. All rights reserved.</span>
                        <span className={styles.footerCopy}>Built for educators, by educators.</span>
                    </div>
                </footer>

            </div>
        </>
    );
}
