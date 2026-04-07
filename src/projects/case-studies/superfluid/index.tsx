"use client";

import styles from "./Superfluid.module.css";

function ImagePlaceholder({ label, aspect = "16/9" }: { label: string; aspect?: string }) {
    return (
        <div
            className={styles.imagePlaceholder}
            style={{ aspectRatio: aspect }}
        >
            <span className={styles.imagePlaceholderLabel}>{label}</span>
        </div>
    );
}

export default function SuperfluidCaseStudy() {
    return (
        <article className={styles.article}>

            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className={styles.heroMeta}>
                    <span>Case Study</span>
                    <span>2025</span>
                    <span>SaaS · Education</span>
                </div>
                <h1 className={styles.heroTitle}>Superfluid</h1>
                <p className={styles.heroSub}>
                    An automation platform that gives teachers back the hours they spend copying grades between systems.
                </p>
            </section>

            {/* ── Full-bleed image ── */}
            <div className={styles.fullBleed}>
                <ImagePlaceholder label="Hero — Dashboard overview screenshot" aspect="21/9" />
            </div>

            {/* ── Overview ── */}
            <section className={styles.section}>
                <div className={styles.sectionGrid}>
                    <div className={styles.sectionMeta}>
                        <span className={styles.label}>The brief</span>
                    </div>
                    <div className={styles.sectionContent}>
                        <p className={styles.bodyLarge}>
                            Teachers at modern schools use Google Classroom for assignments and grading — but their official school system (the SIS) is something entirely different. Veracross. Canvas. PowerSchool. Every grade entered in Classroom has to be manually re-entered elsewhere. Every term. Every class. Every student.
                        </p>
                        <p className={styles.body}>
                            That double-entry problem compounds. A teacher with five classes and thirty students per class is re-entering hundreds of data points every reporting cycle. It's not just tedious — it's error-prone, demoralising, and a genuine drain on the hours that should go toward teaching.
                        </p>
                        <p className={styles.body}>
                            We saw the problem firsthand. Superfluid was built to eliminate it entirely.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Stats row ── */}
            <section className={styles.statsRow}>
                {[
                    { value: "4–6 hrs", label: "Saved per teacher per week" },
                    { value: "100%", label: "Grade accuracy on sync" },
                    { value: "3 SIS", label: "Platforms supported at launch" },
                    { value: "1 click", label: "To push a full class gradebook" },
                ].map((s) => (
                    <div key={s.label} className={styles.stat}>
                        <span className={styles.statValue}>{s.value}</span>
                        <span className={styles.statLabel}>{s.label}</span>
                    </div>
                ))}
            </section>

            {/* ── The Problem ── */}
            <section className={styles.section}>
                <div className={styles.sectionGrid}>
                    <div className={styles.sectionMeta}>
                        <span className={styles.label}>The problem</span>
                    </div>
                    <div className={styles.sectionContent}>
                        <h2 className={styles.heading}>
                            The average teacher re-enters the same data three times a week. We timed it. It doesn't have to be that way.
                        </h2>
                        <p className={styles.body}>
                            The root cause is a gap between two worlds that were never designed to talk to each other. Google built Classroom for pedagogy. School software vendors built SIS platforms for administration. Neither side has a strong incentive to close the gap — so teachers live in it.
                        </p>
                        <p className={styles.body}>
                            Beyond grades, the problem bleeds into missing work tracking, term setup, intervention logging, and report generation. Every one of these tasks requires a teacher to touch the same data in a different system.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Two column image ── */}
            <section className={styles.twoCol}>
                <ImagePlaceholder label="Teacher dashboard — grade sync view" aspect="4/3" />
                <ImagePlaceholder label="Missing work panel — student flagging" aspect="4/3" />
            </section>

            {/* ── The Approach ── */}
            <section className={styles.section}>
                <div className={styles.sectionGrid}>
                    <div className={styles.sectionMeta}>
                        <span className={styles.label}>Our approach</span>
                    </div>
                    <div className={styles.sectionContent}>
                        <h2 className={styles.heading}>
                            Build for the teacher's actual workflow — not the admin's ideal one.
                        </h2>
                        <p className={styles.body}>
                            Most EdTech tools are designed by administrators for administrators. They're powerful but dense — full of configuration screens and permission structures that make sense to an IT manager and nobody else. We designed Superfluid for the teacher who has four minutes between lessons to get something done.
                        </p>
                        <p className={styles.body}>
                            The onboarding flow connects Google Classroom in under two minutes via OAuth. From there, Superfluid maps courses, pulls gradebooks, and surfaces a clean sync interface. The teacher sees what will push, what's pending, and what failed — and can resolve issues without leaving the dashboard.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Full-bleed image ── */}
            <div className={styles.fullBleed}>
                <ImagePlaceholder label="Onboarding flow — Google Classroom OAuth connection" aspect="16/9" />
            </div>

            {/* ── What we built ── */}
            <section className={styles.section}>
                <div className={styles.sectionGrid}>
                    <div className={styles.sectionMeta}>
                        <span className={styles.label}>What we built</span>
                    </div>
                    <div className={styles.sectionContent}>
                        <div className={styles.deliverables}>
                            {[
                                {
                                    n: "01",
                                    title: "Grade sync engine",
                                    body: "A real-time pipeline connecting Google Classroom's API to Veracross, Canvas, and PowerSchool. Grades push on demand or on schedule, with conflict detection and rollback."
                                },
                                {
                                    n: "02",
                                    title: "Missing work surface",
                                    body: "A per-class view that flags students with outstanding or late submissions before teachers have to go looking. Colour-coded by urgency, sortable by class or student."
                                },
                                {
                                    n: "03",
                                    title: "Term setup & mapping",
                                    body: "A one-time configuration wizard that maps grading categories, term structures, and assessment types across platforms. Set once, used every cycle."
                                },
                                {
                                    n: "04",
                                    title: "Intervention log",
                                    body: "A lightweight record of every student support action — who, when, what. Exportable for parent meetings, admin reviews, and accreditation documentation."
                                },
                                {
                                    n: "05",
                                    title: "Admin reporting",
                                    body: "Clean, formatted exports for leadership — grade distributions, class averages, and sync histories — without touching a spreadsheet."
                                },
                                {
                                    n: "06",
                                    title: "Automation builder",
                                    body: "A trigger-action system for custom workflows. Push grades when an assignment is marked. Flag a student when they miss two in a row. The building blocks are there; the teacher decides the rules."
                                },
                            ].map((d) => (
                                <div key={d.n} className={styles.deliverable}>
                                    <span className={styles.deliverableN}>{d.n}</span>
                                    <div>
                                        <h3 className={styles.deliverableTitle}>{d.title}</h3>
                                        <p className={styles.deliverableBody}>{d.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Three column image ── */}
            <section className={styles.threeCol}>
                <ImagePlaceholder label="Automation builder interface" aspect="3/4" />
                <ImagePlaceholder label="Term setup wizard" aspect="3/4" />
                <ImagePlaceholder label="Intervention log view" aspect="3/4" />
            </section>

            {/* ── Tech ── */}
            <section className={styles.section}>
                <div className={styles.sectionGrid}>
                    <div className={styles.sectionMeta}>
                        <span className={styles.label}>Stack</span>
                    </div>
                    <div className={styles.sectionContent}>
                        <div className={styles.stackGrid}>
                            {[
                                { tech: "Next.js 15", role: "Frontend framework" },
                                { tech: "TypeScript", role: "Type safety end-to-end" },
                                { tech: "Firebase", role: "Auth, Firestore, App Hosting" },
                                { tech: "Google Classroom API", role: "Course & grade data" },
                                { tech: "Tailwind CSS", role: "Styling system" },
                                { tech: "ShadCN", role: "Component primitives" },
                            ].map((s) => (
                                <div key={s.tech} className={styles.stackItem}>
                                    <span className={styles.stackTech}>{s.tech}</span>
                                    <span className={styles.stackRole}>{s.role}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Full-bleed image ── */}
            <div className={styles.fullBleed}>
                <ImagePlaceholder label="Mobile view — teacher dashboard on phone" aspect="16/9" />
            </div>

            {/* ── Outcome ── */}
            <section className={styles.section}>
                <div className={styles.sectionGrid}>
                    <div className={styles.sectionMeta}>
                        <span className={styles.label}>Outcome</span>
                    </div>
                    <div className={styles.sectionContent}>
                        <h2 className={styles.heading}>
                            A tool teachers actually want to use — because it removes work instead of adding it.
                        </h2>
                        <p className={styles.body}>
                            Superfluid launched in beta in 2025 and is currently free for educators. Early users report saving between four and six hours per week across grading, reporting, and admin tasks. The missing work surface alone has changed how several teachers approach intervention — catching at-risk students weeks earlier than they previously would have.
                        </p>
                        <p className={styles.body}>
                            The goal was never to build another EdTech platform. It was to close one specific, grinding gap — and to close it so well that teachers stop thinking about it entirely.
                        </p>
                        <a
                            href="https://superfluid.work"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.visitLink}
                        >
                            Visit superfluid.work →
                        </a>
                    </div>
                </div>
            </section>

        </article>
    );
}
