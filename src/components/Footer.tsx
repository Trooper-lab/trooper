"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Footer() {
    return (
        <Suspense fallback={null}>
            <FooterContent />
        </Suspense>
    );
}

function FooterContent() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const isViewer = searchParams.get("viewer") === "true" || pathname?.startsWith("/studio");
    const isContact = pathname === "/contact";

    if (isViewer || isContact) return null;

    return <FooterInner />;
}

function FooterInner() {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [emailTouched, setEmailTouched] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const successRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [message]);

    const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const emailValid = isValidEmail(email);
    const hasContent = message.trim().length > 0 && emailValid;

    const handleSubmit = async () => {
        if (!message.trim() || !emailValid) return;
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, email }),
            });
            if (res.ok) {
                const tl = gsap.timeline();
                tl.to(formRef.current, { opacity: 0, y: -24, duration: 0.4, ease: "power2.inOut" });
                tl.call(() => setStatus("success"));
                tl.fromTo(successRef.current,
                    { opacity: 0, y: 32, scale: 0.97 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
                );
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <footer className="bg-background border-t border-foreground/10 relative overflow-hidden">

            {/* ── Contact form section ── */}
            <div className="relative px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-32 min-h-[60vh] flex items-center">

                {/* Giant background wordmark */}
                <div className="absolute inset-0 flex items-end justify-start pointer-events-none select-none overflow-hidden pb-4 px-6 md:px-12">
                    <span className="font-display text-[18vw] leading-none opacity-[0.04] text-foreground tracking-tighter whitespace-nowrap">
                        TROOPER
                    </span>
                </div>

                {/* Success state */}
                <div
                    ref={successRef}
                    className="absolute inset-0 flex flex-col justify-center items-center px-6"
                    style={{ opacity: 0, pointerEvents: status === "success" ? "auto" : "none" }}
                >
                    <div className="w-12 h-[1px] bg-foreground/20 mb-10" />
                    <h2 className="font-sans text-[36px] md:text-[64px] font-medium tracking-tighter leading-[1.05] text-center mb-6">
                        Thank you.
                    </h2>
                    <p className="font-sans text-[16px] md:text-[20px] opacity-50 text-center max-w-md leading-relaxed">
                        Your message just landed in our inbox.<br />We&apos;ll get back to you within 24 hours.
                    </p>
                    <div className="w-12 h-[1px] bg-foreground/20 mt-10" />
                </div>

                {/* Form */}
                <div
                    ref={formRef}
                    className="relative z-10 w-full max-w-4xl flex flex-col gap-12"
                    style={{ pointerEvents: status === "success" ? "none" : "auto" }}
                >
                    <div>
                        <span className="font-sans text-[12px] uppercase tracking-[0.3em] opacity-40 block mb-4">
                            Start a project
                        </span>
                        <h2 className="font-sans text-[28px] md:text-[64px] font-medium tracking-tighter leading-[1.0]">
                            Write to Trooper.
                        </h2>
                    </div>

                    {/* Email */}
                    <div className="w-full flex justify-between items-baseline border-b border-foreground/20 pb-4 focus-within:border-foreground transition-colors duration-300 relative">
                        <span className="font-sans text-[13px] uppercase tracking-widest opacity-40 whitespace-nowrap">
                            From:
                        </span>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setEmailTouched(true)}
                            className="bg-transparent border-none outline-none font-sans text-[18px] md:text-[24px] text-right w-full ml-8 placeholder:opacity-20"
                        />
                        {emailTouched && email.length > 0 && !emailValid && (
                            <span className="absolute -bottom-6 right-0 font-sans text-[11px] tracking-wide text-red-400/80">
                                Please enter a valid email
                            </span>
                        )}
                        {message.trim().length > 0 && email.length === 0 && (
                            <span className="absolute -bottom-6 right-0 font-sans text-[11px] tracking-wide opacity-50 animate-pulse">
                                ↑ Add your email so we can reply
                            </span>
                        )}
                    </div>

                    {/* Message */}
                    <textarea
                        ref={textareaRef}
                        placeholder="Tell us what you want to build..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-transparent border-none outline-none font-sans text-[18px] md:text-[40px] leading-[1.3] tracking-tight placeholder:opacity-20 resize-none overflow-hidden min-h-[100px] md:min-h-[180px]"
                    />

                    {/* Send */}
                    {status === "error" && (
                        <span className="text-red-500/80 font-sans text-[14px] tracking-wide">
                            Something went wrong — please try again.
                        </span>
                    )}
                    <div className="w-full flex justify-start">
                        <button
                            onClick={handleSubmit}
                            disabled={status === "sending" || !hasContent}
                            className={`group relative flex items-center gap-4 px-8 py-4 uppercase tracking-[0.2em] text-[13px] font-medium overflow-hidden transition-all duration-500 border ${
                                hasContent
                                    ? "bg-foreground text-background border-foreground"
                                    : "bg-transparent text-foreground/40 border-foreground/20 cursor-default"
                            }`}
                        >
                                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[150%]">
                                    {status === "sending" ? "Sending..." : "Send message"}
                                </span>
                                <span className="absolute z-10 inset-0 flex items-center justify-center translate-y-[150%] transition-transform duration-300 group-hover:translate-y-0 tracking-[0.2em] text-[13px] uppercase font-medium">
                                    {status === "sending" ? "Sending..." : "Send message"}
                                </span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                            </button>
                    </div>
                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="px-6 md:px-12 py-8 border-t border-foreground/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <span className="font-sans text-[12px] uppercase tracking-[0.3em] opacity-30">
                    &copy; {new Date().getFullYear()} Trooper. All rights reserved.
                </span>

                <nav className="flex items-center gap-8">
                    {[
                        { label: "Work", href: "/projects" },
                        { label: "Services", href: "/services" },
                        { label: "Contact", href: "/contact" },
                    ].map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            className="font-sans text-[12px] uppercase tracking-[0.25em] opacity-40 hover:opacity-100 transition-opacity duration-300"
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <span className="font-sans text-[12px] uppercase tracking-[0.3em] opacity-20 hidden md:block">
                    Anti-Agency
                </span>
            </div>

        </footer>
    );
}
