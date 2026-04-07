"use client";

import styles from "./Lazy.module.css";

function ImagePlaceholder({ label, aspect = "16/9" }: { label: string; aspect?: string }) {
    return (
        <div className={styles.imagePlaceholder} style={{ aspectRatio: aspect }}>
            <span className={styles.imagePlaceholderLabel}>{label}</span>
        </div>
    );
}

export default function LazyCaseStudy() {
    return (
        <article className={styles.article}>

            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className={styles.heroMeta}>
                    <span>Case Study</span>
                    <span>2025</span>
                    <span>Branding · Storytelling · Gen Z</span>
                </div>
                <h1 className={styles.heroTitle}>Lazy.</h1>
                <p className={styles.heroSub}>
                    A skincare brand built on a radical idea — what if you didn't have to think about skincare at all?
                </p>
            </section>

            {/* ── Full bleed ── */}
            <div className={styles.fullBleed}>
                <ImagePlaceholder label="Hero — Brand campaign imagery" aspect="21/9" />
            </div>

            {/* ── Overview ── */}
            <section className={styles.section}>
                <div className={styles.sectionGrid}>
                    <div className={styles.sectionMeta}>
                        <span className={styles.label}>The brief</span>
                    </div>
                    <div className={styles.sectionContent}>
                        <p className={styles.bodyLarge}>
                            Skincare has a noise problem. Serums, actives, SPF layering, double cleansing, slugging, moisture barriers — the internet turned a basic human habit into a full-time job. Gen Z, the generation most likely to research ingredients before buying, is also the generation most likely to feel overwhelmed by doing so.
                        </p>
                        <p className={styles.body}>
                            Lazy was conceived as a direct response to that exhaustion. Not another product asking you to build a routine around it. The opposite: a product good enough that the routine becomes irrelevant.
                        </p>
                        <p className={styles.body}>
                            The brief wasn't to design packaging. It was to build a brand with a point of view — one that Gen Z would feel, not just recognise.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Pull quote ── */}
            <section className={styles.pullQuote}>
                <blockquote>
                    "Lazy isn't about doing nothing.<br />
                    It's about doing only what matters."
                </blockquote>
            </section>

            {/* ── Two col ── */}
            <section className={styles.twoCol}>
                <ImagePlaceholder label="Brand identity — logomark & typography system" aspect="4/3" />
                <ImagePlaceholder label="Colour palette & brand tokens" aspect="4/3" />
            </section>

            {/* ── The Insight ── */}
            <section className={styles.section}>
                <div className={styles.sectionGrid}>
                    <div className={styles.sectionMeta}>
                        <span className={styles.label}>The insight</span>
                    </div>
                    <div className={styles.sectionContent}>
                        <h2 className={styles.heading}>
                            Gen Z doesn't have decision fatigue about skincare. They have decision anxiety. That's a different problem entirely.
                        </h2>
                        <p className={styles.body}>
                            Fatigue is about volume. Anxiety is about consequence. When a generation grows up watching skincare influencers warn about ingredient interactions, pH levels, and the long-term damage of getting it wrong, "just pick something" stops feeling like an option.
                        </p>
                        <p className={styles.body}>
                            The insight that shaped Lazy: the target audience doesn't want fewer choices. They want permission to stop caring. Permission to trust a single product completely and get on with their day. Lazy's job was to earn that trust — and to make earning it feel effortless.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Full bleed ── */}
            <div className={styles.fullBleed}>
                <ImagePlaceholder label="Campaign — lifestyle photography direction" aspect="16/9" />
            </div>

            {/* ── The Positioning ── */}
            <section className={styles.section}>
                <div className={styles.sectionGrid}>
                    <div className={styles.sectionMeta}>
                        <span className={styles.label}>Positioning</span>
                    </div>
                    <div className={styles.sectionContent}>
                        <h2 className={styles.heading}>
                            Anti-routine. Not anti-care.
                        </h2>
                        <p className={styles.body}>
                            The trap with "simple skincare" brands is that they still talk about skincare. They simplify the routine instead of questioning why a routine is necessary in the first place. Lazy went further — the brand positioning isn't about simplification, it's about liberation.
                        </p>
                        <p className={styles.body}>
                            You're not lazy because you don't have a twelve-step routine. You're lazy because you found something that works and you moved on. That reframe — laziness as intelligence, not neglect — became the foundation for every brand decision that followed.
                        </p>
                        <p className={styles.body}>
                            This also meant the brand had to carry real credibility. The product formulation — all organic, a handful of ingredients your skin already recognises — had to be good enough that the claim held. Branding can't do that work alone.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Three col ── */}
            <section className={styles.threeCol}>
                <ImagePlaceholder label="Product — soap bar, hero shot" aspect="3/4" />
                <ImagePlaceholder label="Product — packaging detail" aspect="3/4" />
                <ImagePlaceholder label="Product — lifestyle context" aspect="3/4" />
            </section>

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
                                    title: "Brand strategy & positioning",
                                    body: "Audience research, competitive mapping, and the core positioning thesis — anti-routine, not anti-care. The framework that every subsequent decision was tested against."
                                },
                                {
                                    n: "02",
                                    title: "Visual identity",
                                    body: "Logo, typography system, colour palette, and the full set of brand tokens. DXBurst for the wordmark. A purple, white, and black palette that sits between luxury and irreverence. Nothing safe."
                                },
                                {
                                    n: "03",
                                    title: "Brand voice & tone",
                                    body: "Copy guidelines, tone principles, and a vocabulary that sounds like the audience — direct, a little deadpan, occasionally funny. The goal: a brand Gen Z would quote back to itself."
                                },
                                {
                                    n: "04",
                                    title: "Web design & development",
                                    body: "A full landing experience built in Next.js with GSAP-driven scroll interactions, a product carousel, a lifestyle gallery, and a cinematic video hero. Every interaction earns its presence."
                                },
                                {
                                    n: "05",
                                    title: "Packaging direction",
                                    body: "Art direction for the physical product — the soap bar, its wrapping, and the tactile details that translate the digital brand into something you hold. Simple. Considered. Unmistakably Lazy."
                                },
                                {
                                    n: "06",
                                    title: "The Lazy People Society",
                                    body: "A community concept built into the brand architecture — not a loyalty programme, not a newsletter. A cultural identity for people who've opted out of the routine and feel good about it."
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

            {/* ── Full bleed ── */}
            <div className={styles.fullBleed}>
                <ImagePlaceholder label="Web — full page scroll sequence" aspect="16/9" />
            </div>

            {/* ── Storytelling ── */}
            <section className={styles.section}>
                <div className={styles.sectionGrid}>
                    <div className={styles.sectionMeta}>
                        <span className={styles.label}>Storytelling</span>
                    </div>
                    <div className={styles.sectionContent}>
                        <h2 className={styles.heading}>
                            The site isn't a product page. It's an argument.
                        </h2>
                        <p className={styles.body}>
                            Most skincare websites sell by listing what their product contains. Lazy sells by making you feel what it doesn't ask of you. The scroll experience moves from the claim — "Lazy" in massive display type — through the evidence: clean ingredients, honest copy, a community of people who've already made the trade.
                        </p>
                        <p className={styles.body}>
                            The GSAP scroll animations aren't decoration. Each one controls the pace at which information arrives. The user earns the details by staying — which means by the time they reach the product, they've already bought the idea.
                        </p>
                        <p className={styles.body}>
                            The Lazy People Society section sits near the end deliberately. It doesn't ask for a sale. It asks for an identity. That's a harder ask, and the brand has to have earned it by that point in the scroll.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Two col ── */}
            <section className={styles.twoCol}>
                <ImagePlaceholder label="Web — mobile experience" aspect="9/16" />
                <ImagePlaceholder label="Web — Lazy People Society section" aspect="9/16" />
            </section>

            {/* ── Outcome ── */}
            <section className={styles.section}>
                <div className={styles.sectionGrid}>
                    <div className={styles.sectionMeta}>
                        <span className={styles.label}>Outcome</span>
                    </div>
                    <div className={styles.sectionContent}>
                        <h2 className={styles.heading}>
                            A brand that works because it asks less of you.
                        </h2>
                        <p className={styles.body}>
                            Lazy is an exercise in restraint as a brand strategy. Every element — the name, the product, the copy, the palette, the interactions — is held to the same standard: does this earn its presence, or is it just noise?
                        </p>
                        <p className={styles.body}>
                            The result is a brand that doesn't need to explain itself. Gen Z either gets it immediately or they don't — and if they do, they feel seen. That recognition is the conversion. The product closes it.
                        </p>
                        <p className={styles.body}>
                            The deeper lesson from this project: great branding for a generation that's sceptical of branding looks less like marketing and more like honesty. Lazy works because it means what it says.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Final full bleed ── */}
            <div className={styles.fullBleed}>
                <ImagePlaceholder label="Campaign — closing brand image" aspect="21/9" />
            </div>

        </article>
    );
}
